import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { FC, useCallback, useContext } from "react"
import { useTranslation } from "react-i18next"
import {
  DropList,
  DropListItem,
  Dropdown,
  MoreIcon,
  useMessage,
  useModal,
} from "@illa-design/react"
import { ResourceMoreActionProps } from "./interface"
import { moreIconStyle } from "./style"

export const ResourceMoreAction: FC<ResourceMoreActionProps> = (props) => {
  const { t } = useTranslation()
  const { onDeleteResource, onEditResource, resourceID } = props

  const { track } = useContext(MixpanelTrackContext)
  const modal = useModal()
  const message = useMessage()

  const handleClickOkOnDeleteModal = useCallback(async () => {
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      {
        element: "resource_more_delete",
        parameter5: resourceID,
      },
      "both",
    )
    track(
      ILLA_MIXPANEL_EVENT_TYPE.SHOW,
      {
        element: "resource_more_delete_modal",
        parameter5: resourceID,
      },
      "both",
    )
    const modalId = modal.show({
      blockOkHide: true,
      title: t("dashboard.common.delete_title"),
      children: t("dashboard.common.delete_content"),
      cancelText: t("dashboard.common.delete_cancel_text"),
      okText: t("dashboard.common.delete_ok_text"),
      okButtonProps: {
        colorScheme: "red",
      },
      closable: false,
      onOk: async () => {
        modal.update(modalId, {
          okLoading: true,
        })
        track(
          ILLA_MIXPANEL_EVENT_TYPE.CLICK,
          {
            element: "resource_more_delete_modal_delete",
            parameter5: resourceID,
          },
          "both",
        )
        try {
          await onDeleteResource()
          message.success({
            content: t("dashboard.resource.delete_success"),
          })
          modal.close(modalId)
        } catch (e) {
          // if (isILLAAPiError(e)) {
          //   message.error({
          //     content: t("dashboard.resource.delete_fail"),
          //   })
          // } else {
          //   message.error({
          //     content: t("network_error"),
          //   })
          // }
        }
        modal.update(modalId, {
          okLoading: false,
        })
      },
      onCancel: () => {
        track(
          ILLA_MIXPANEL_EVENT_TYPE.CLICK,
          {
            element: "resource_more_delete_modal_close",
            parameter5: resourceID,
          },
          "both",
        )
      },
    })
  }, [message, modal, onDeleteResource, resourceID, t, track])

  return (
    <Dropdown
      position="bottom-end"
      trigger="click"
      triggerProps={{ closeDelay: 0, openDelay: 0 }}
      dropList={
        <DropList w="184px">
          <DropListItem
            value="edit"
            key="edit"
            title={t("dashboard.common.edit")}
            onClick={onEditResource}
          />
          <DropListItem
            value="delete"
            key={"delete"}
            title={t("dashboard.common.delete")}
            deleted
            onClick={handleClickOkOnDeleteModal}
          />
        </DropList>
      }
    >
      <MoreIcon w="16px" h="16px" css={moreIconStyle} />
    </Dropdown>
  )
}
