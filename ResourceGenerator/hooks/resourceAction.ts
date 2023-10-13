import { isILLAAPiError } from "@illa-public/illa-net"
import { ResourceContent, ResourceType } from "@illa-public/public-types"
import { getCurrentId } from "@illa-public/user-data"
import { FieldValues, UseFormHandleSubmit } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useMessage } from "@illa-design/react"
import { fetchActionTestConnection } from "../service"
import { getActionContentByType } from "../utils"

export const useOnActionConfigElementSubmit = (
  handleSubmit: UseFormHandleSubmit<FieldValues>,
  resourceID: string | undefined,
  resourceType: ResourceType,
  finishedHandler: (resourceID: string) => void,
  loadingHandler: (value: boolean) => void,
) => {
  const message = useMessage()
  const { t } = useTranslation()
  const isUpdate = resourceID != undefined
  // const {onUpdate,onCreate} =useContext(ResourceGeneratorContext)

  return handleSubmit(async (data: FieldValues) => {
    let content
    try {
      content = getActionContentByType(data, resourceType)
    } catch (e) {
      message.error({
        content: t("editor.action.resource.db.invalid_private.key"),
      })
      return
    }
    const requestData = {
      ...(isUpdate && { resourceID: data.resourceID }),
      resourceName: data.resourceName,
      resourceType: resourceType,
      content,
    }
    loadingHandler(true)

    try {
      if (isUpdate) {
        // onUpdate()
        // const response = await requestUpdateResource(resourceID, requestData)
        // store.dispatch(resourceActions.updateResourceItemReducer(response.data))
        // finishedHandler(response.data.resourceID)
      } else {
        // onCreate()
        // const response = await requestCreateResource(requestData)
        // store.dispatch(resourceActions.addResourceItemReducer(response.data))
        // finishedHandler(response.data.resourceID)
      }
      message.success({
        content: t("dashboard.resource.save_success"),
      })
    } catch (e) {
      if (isILLAAPiError(e)) {
        message.error({
          content: e.data.errorMessage || t("dashboard.resource.save_fail"),
        })
      } else {
        message.error({
          content: t("dashboard.resource.save_fail"),
        })
      }
    }
    loadingHandler(false)
  })
}

export const useActionConfigElementTest = (
  data: FieldValues,
  content: ResourceContent,
  resourceType: ResourceType,
  loadingHandler: (value: boolean) => void,
) => {
  const { t } = useTranslation()
  const message = useMessage()
  const currentTeamID = useSelector(getCurrentId)!

  return async () => {
    loadingHandler(true)
    const requestBody = {
      resourceID: data.resourceID,
      resourceName: data.resourceName,
      resourceType,
      content,
    }
    try {
      await fetchActionTestConnection(currentTeamID, requestBody)
      message.success({
        content: t("dashboard.resource.test_success"),
      })
    } catch (error) {
      if (isILLAAPiError(error)) {
        message.error({
          content: error.data.errorMessage,
        })
      } else {
        message.error({
          content: t("dashboard.resource.test_fail"),
        })
      }
    }
    loadingHandler(false)
  }
}
