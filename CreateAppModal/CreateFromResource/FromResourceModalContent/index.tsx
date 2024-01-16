import { getIconFromResourceType } from "@illa-public/icon"
import { Resource } from "@illa-public/public-types"
import { getCurrentTeamInfo } from "@illa-public/user-data"
import { useGridApiRef } from "@mui/x-data-grid-premium"
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useSelector } from "react-redux"
import {
  Button,
  CloseIcon,
  Empty,
  Modal,
  Select,
  SelectValue,
  isObject,
} from "@illa-design/react"
import { CreateLoading } from "../../Loading"
import { fetchResourceMeta, fetchResources } from "../../service"
import DatasetTable from "../Table"
import { buildAppWithResourceSchema } from "../config"
import { buildActionInfo } from "../config/buildActions"
import { useSelectOptions } from "../hooks/useSelectOptions"
import {
  CreateWithResourceProps,
  ISchemaData,
  RESOURCE_TYPE,
} from "../interface"
import { DatasetTableRows } from "../interface"
import { formateLabel } from "../utils"
import {
  containerStyle,
  contentContainerStyle,
  emptyStyle,
  footerStyle,
  headerStyle,
  labelStyle,
  modalCloseIconStyle,
  modalContainerStyle,
  resourceOptionStyle,
} from "./style"

const FromResourceModalContent: FC<CreateWithResourceProps> = ({
  visible,
  closeModal,
  createCallBack,
  afterClose,
}) => {
  const teamInfo = useSelector(getCurrentTeamInfo)!
  const teamID = teamInfo?.id
  const [resourceList, setResourceList] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const modelList = useRef<Map<string, ISchemaData>>()
  const [modelKeyList, setModelKeyList] = useState<string[]>([])
  const [selectModelName, setSelectModelName] = useState<string>("")
  const dataGridRef = useGridApiRef()
  const [createLoading, setCreateLoading] = useState(false)
  const { getInputType } = useSelectOptions()
  const controllerRef = useRef<AbortController>()

  const resourceOptions = resourceList.map((resource) => {
    return {
      label: (
        <div css={resourceOptionStyle}>
          {getIconFromResourceType(resource.resourceType, "14px")}
          <span>{resource.resourceName}</span>
        </div>
      ),
      value: resource.resourceID,
    }
  })
  const [selectResourceID, setSelectResourceID] = useState<string>()

  const selectResource = useMemo(() => {
    return resourceList.find(
      (resource) => resource.resourceID === selectResourceID,
    )
  }, [resourceList, selectResourceID])

  const showModelList = useMemo(() => {
    const model = modelList.current?.get(selectModelName)
    if (!selectResource) return []
    if (isObject(model) && model !== null) {
      return Object.keys(model).map((key) => ({
        name: key,
        type: model[key]?.data_type || "",
        label: formateLabel(key),
        inputType: getInputType(
          selectResource.resourceType as RESOURCE_TYPE,
          model[key].data_type || "",
        ),
      }))
    }
  }, [getInputType, selectModelName, selectResource])

  const getDetails = useCallback(
    async (resourceID?: SelectValue) => {
      setLoading(true)
      setSelectResourceID(resourceID as string)
      try {
        const controller = new AbortController()
        if (!controllerRef.current) {
          controllerRef.current = controller
        } else {
          controllerRef.current.abort()
          controllerRef.current = controller
        }
        const res = await fetchResourceMeta(
          resourceID as string,
          teamID,
          controller.signal,
        )
        const data = res?.data?.Schema as Record<string, ISchemaData>
        const schemeList: [string, ISchemaData][] = Object.keys(data).map(
          (key) => [key, data[key]],
        )
        modelList.current = new Map(schemeList)
        setModelKeyList(Object.keys(data))
        setSelectModelName(Object.keys(data)[0])
      } catch (e) {
        modelList.current = undefined
        setModelKeyList([])
        setSelectModelName("")
      } finally {
        setLoading(false)
      }
    },
    [teamID],
  )

  const handleCreate = async () => {
    if (!selectResourceID || !selectResource?.resourceType) return
    setCreateLoading(true)
    try {
      const rows = dataGridRef.current?.getAllRowIds().map((id) => {
        const isSelected = dataGridRef.current.isRowSelected(id)

        return {
          ...dataGridRef.current?.getRow(id),
          isSelected,
        } as DatasetTableRows
      })
      if (!rows || rows.length === 0) return

      const { appInfo, editInputDisplayNames, addInputDisplayNames } =
        buildAppWithResourceSchema(
          selectResource?.resourceType as RESOURCE_TYPE,
          rows,
        )
      const actionsInfo = buildActionInfo(
        selectResource?.resourceType,
        selectResourceID,
        selectModelName,
        rows,
        editInputDisplayNames,
        addInputDisplayNames,
      )
      await createCallBack(appInfo, actionsInfo)
      closeModal?.()
    } catch (e) {
    } finally {
      setCreateLoading(false)
    }
  }

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    const request = async () => {
      try {
        const res = await fetchResources(teamID, controller.signal)
        if (!res.data) return
        const { data } = res
        const resourceList = data.filter((item) =>
          Object.values(RESOURCE_TYPE).includes(
            item.resourceType as RESOURCE_TYPE,
          ),
        )
        setResourceList(resourceList)
        setSelectResourceID(resourceList[0].resourceID)
        await getDetails(resourceList[0].resourceID)
      } catch (e) {
      } finally {
        setLoading(false)
      }
    }
    request()
    return () => {
      controller.abort()
    }
  }, [getDetails, teamID])

  return (
    <div css={modalContainerStyle}>
      <Modal
        w="auto"
        visible={visible}
        footer={false}
        closable
        withoutPadding
        onCancel={closeModal}
        afterClose={afterClose}
      >
        <div css={modalCloseIconStyle} onClick={closeModal}>
          <CloseIcon size="12px" />
        </div>
        <div css={containerStyle}>
          <div css={headerStyle}>
            <div css={labelStyle}>
              <span>Source</span>
              <Select
                w="100%"
                flex="1"
                colorScheme="techPurple"
                value={selectResourceID}
                options={resourceOptions}
                onChange={getDetails}
              />
            </div>
            <div css={labelStyle}>
              <span>Model</span>
              <Select
                w="100%"
                flex="1"
                colorScheme="techPurple"
                value={selectModelName}
                options={modelKeyList}
                onChange={(name) => setSelectModelName(name as string)}
              />
            </div>
          </div>
          <div css={contentContainerStyle}>
            {loading ? (
              <CreateLoading />
            ) : showModelList && showModelList.length !== 0 ? (
              <DatasetTable
                closeModal={closeModal}
                rows={showModelList || []}
                dataGridRef={dataGridRef}
              />
            ) : (
              <div css={emptyStyle}>
                <Empty />
              </div>
            )}
          </div>
          <div css={footerStyle}>
            <Button
              w="200px"
              loading={createLoading}
              colorScheme="techPurple"
              onClick={handleCreate}
            >
              Create
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default FromResourceModalContent
