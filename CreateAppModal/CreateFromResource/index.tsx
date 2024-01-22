import { getIconFromResourceType } from "@illa-public/icon"
import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { Resource } from "@illa-public/public-types"
import {
  ResourceGenerator,
  ResourceGeneratorProvider,
} from "@illa-public/resource-generator"
import { getCurrentTeamInfo } from "@illa-public/user-data"
import { useGridApiRef } from "@mui/x-data-grid-premium"
import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { createPortal } from "react-dom"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  AddIcon,
  Button,
  CloseIcon,
  Empty,
  Modal,
  Select,
  SelectValue,
  TriggerProvider,
  isObject,
} from "@illa-design/react"
import { CreateLoading } from "../Loading"
import { fetchResourceMeta } from "../service"
import DatasetTable from "./Table"
import { buildAppWithResourceSchema } from "./config"
import { buildActionInfo } from "./config/buildActions"
import { BIGGER_THAN_MODAL_RESOURCE, CREATE_RESOURCE } from "./constants"
import { useSelectOptions } from "./hooks/useSelectOptions"
import {
  CreateWithResourceProps,
  ISchemaData,
  RESOURCE_TYPE,
} from "./interface"
import { DatasetTableRows } from "./interface"
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
import { formateLabel } from "./utils"

export const CreateFromResourceModal: FC<CreateWithResourceProps> = ({
  resourceList = [],
  getResourceLoading,
  updateResourceList,
  closeModal,
  createCallBack,
}) => {
  const teamInfo = useSelector(getCurrentTeamInfo)!
  const teamID = teamInfo?.id
  const [loading, setLoading] = useState(false)
  const modelList = useRef<Map<string, ISchemaData>>()
  const [modelKeyList, setModelKeyList] = useState<string[]>([])
  const [selectModelName, setSelectModelName] = useState<string>("")
  const dataGridRef = useGridApiRef()
  const [createLoading, setCreateLoading] = useState(false)
  const { getInputType } = useSelectOptions()
  const controllerRef = useRef<AbortController>()
  const { t } = useTranslation()
  const [showResourceGenerate, setShowResourceGenerate] = useState(false)
  const { track } = useContext(MixpanelTrackContext)

  const resourceOptions = useMemo(() => {
    const list = resourceList.map((resource) => {
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
    return [
      {
        label: (
          <div css={resourceOptionStyle}>
            <AddIcon size="14px" />
            <span>create</span>
          </div>
        ),
        value: CREATE_RESOURCE,
      },
      ...list,
    ]
  }, [resourceList])

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
      if (resourceID === CREATE_RESOURCE) {
        setShowResourceGenerate(true)
        setSelectResourceID(undefined)
        return
      }
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
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      {
        element: "create_from_db_modal_create",
        parameter5: selectResource?.resourceType,
      },
      "both",
    )
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

  const createResourceCallback = async (resource: Resource) => {
    await updateResourceList(resource)
    await getDetails(resource.resourceID)
    setSelectResourceID(resource.resourceID)
    setShowResourceGenerate(false)
  }
  const handleResourceSelectClick = () => {
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      {
        element: "create_from_db_modal_table",
        parameter5: selectResource?.resourceType,
      },
      "both",
    )
  }

  useEffect(() => {
    if (resourceList && resourceList.length !== 0) {
      setSelectResourceID(resourceList[0].resourceID)
      getDetails(resourceList[0].resourceID)
    } else {
      setShowResourceGenerate(true)
    }
  }, [getDetails, resourceList])

  useEffect(() => {
    showResourceGenerate &&
      track?.(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        {
          element: "create_from_db_modal",
        },
        "both",
      )
  }, [showResourceGenerate, track])

  return createPortal(
    <>
      <div css={modalContainerStyle}>
        <Modal
          w="auto"
          visible
          footer={false}
          closable
          withoutPadding
          onCancel={closeModal}
        >
          <div css={modalCloseIconStyle} onClick={closeModal}>
            <CloseIcon size="12px" />
          </div>
          <div css={containerStyle}>
            <div css={headerStyle}>
              <div css={labelStyle}>
                <span>{t("new_dashboard.create_from_resource.resource")}</span>
                <Select
                  w="100%"
                  flex="1"
                  colorScheme="techPurple"
                  value={selectResourceID}
                  options={resourceOptions}
                  onClick={handleResourceSelectClick}
                  onChange={getDetails}
                />
              </div>
              <div css={labelStyle}>
                <span>{t("new_dashboard.create_from_resource.table")}</span>
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
              {getResourceLoading || loading ? (
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
                {t(
                  "new_dashboard.create_from_resource.input_type_option.create",
                )}
              </Button>
            </div>
          </div>
        </Modal>
      </div>

      <TriggerProvider zIndex={BIGGER_THAN_MODAL_RESOURCE}>
        <ResourceGeneratorProvider
          allResource={resourceList}
          createOrUpdateResourceCallback={createResourceCallback}
        >
          <ResourceGenerator
            visible={showResourceGenerate}
            onClose={() => {
              setShowResourceGenerate(false)
              ;(!resourceList || resourceList.length === 0) && closeModal?.()
            }}
            filterResourceType={(resourceType) =>
              Object.values(RESOURCE_TYPE).includes(
                resourceType as RESOURCE_TYPE,
              )
            }
          />
        </ResourceGeneratorProvider>
      </TriggerProvider>
    </>,
    document.body,
  )
}

export default CreateFromResourceModal
