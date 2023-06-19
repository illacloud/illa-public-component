import { Input, Modal, ModalProps, useMessage } from "@illa-design/react"
import { FC, useContext, useMemo } from "react"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { LayoutAutoChange } from "@/illa-public-component/LayoutAutoChange"
import {
  descStyle,
  mobileModalButtonStyle,
  mobileModalContentStyle,
  mobileModalStyle,
  mobileModalTitleStyle,
} from "@/illa-public-component/MemberList/components/DeleteTeamModal/style"
import { ILLA_MIXPANEL_EVENT_TYPE } from "@/illa-public-component/MixpanelUtils/interface"
import { MixpanelTrackContext } from "@/illa-public-component/MixpanelUtils/mixpanelContext"
import {
  getCurrentMemberList,
  getCurrentTeamInfo,
} from "@/redux/team/teamSelector"
import { removeTeam } from "@/services/team"
import { pxToRem } from "@/style"

const DeleteTeamModal: FC<ModalProps> = (props) => {
  const {
    style: _style,
    className: _className,
    onOk,
    onCancel,
    ...rest
  } = props
  const { t } = useTranslation()
  const message = useMessage()
  const teamInfo = useSelector(getCurrentTeamInfo)
  const memberList = useSelector(getCurrentMemberList)
  const { control, formState, trigger, watch, reset } = useForm<{
    name: string
  }>({
    mode: "onSubmit",
    criteriaMode: "firstError",
  })

  const { name } = watch()
  const { track } = useContext(MixpanelTrackContext)
  const disabled = useMemo(() => {
    return !(name === teamInfo?.name)
  }, [name, teamInfo?.name])

  const removeTeamMember = async () => {
    const result = await trigger("name")
    if (result) {
      track?.(
        ILLA_MIXPANEL_EVENT_TYPE.CLICK,
        {
          element: "delete_modal_delete",
          parameter1: "delete_select",
          // userNumber
          parameter4: memberList?.length,
        },
        "team_id",
      )
      onOk?.()
      removeTeam()
        .then((res) => {
          if (res) {
            message.success({
              content: t("team_setting.mes.delete_suc"),
            })
          }
        })
        .catch(() => {
          message.error({
            content: t("team_setting.mes.delete_fail"),
          })
        })
    }
  }

  const handleOnCancel = () => {
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      {
        element: "delete_modal_cancel",
      },
      "team_id",
    )
    onCancel?.()
    reset()
  }

  const config = {
    title: t("team_setting.delete_modal.title"),
    description: t("team_setting.leave_modal.description"),
    okText: t("team_setting.delete_modal.delete"),
    cancelText: t("team_setting.delete_modal.cancel"),
    onOk: removeTeamMember,
  }

  return (
    <LayoutAutoChange
      desktopPage={
        <Modal
          title={config.title}
          okText={config.okText}
          cancelText={config.cancelText}
          okButtonProps={{
            variant: "light",
            colorScheme: "red",
            disabled,
          }}
          onOk={config.onOk}
          onCancel={handleOnCancel}
          withoutLine={false}
          closable
          {...rest}
        >
          <span css={descStyle}>{config.description}</span>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                size="large"
                mg="16px 0"
                variant="fill"
                placeholder={t("team_setting.team_info.team_name_placeholder")}
                colorScheme="techPurple"
                autoComplete="off"
              />
            )}
            rules={{
              required: t("team_setting.team_info.team_name_empty"),
            }}
          />
        </Modal>
      }
      mobilePage={
        <Modal
          _css={mobileModalStyle}
          withoutPadding
          okText={config.okText}
          cancelText={config.cancelText}
          cancelButtonProps={{ _css: mobileModalButtonStyle }}
          okButtonProps={{
            _css: mobileModalButtonStyle,
            variant: "light",
            colorScheme: "red",
            disabled,
          }}
          onOk={config.onOk}
          onCancel={handleOnCancel}
          {...rest}
        >
          <div css={mobileModalTitleStyle}>{config.title}</div>
          <div css={mobileModalContentStyle}>{config.description}</div>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                size="large"
                pd={`0 ${pxToRem(48)}`}
                error={!!formState?.errors.name}
                variant="fill"
                placeholder={t("team_setting.team_info.team_name_placeholder")}
                colorScheme="techPurple"
                autoComplete="off"
              />
            )}
            rules={{
              required: t("team_setting.team_info.team_name_empty"),
            }}
          />
        </Modal>
      }
    />
  )
}

DeleteTeamModal.displayName = "DeleteTeamModal"

export default DeleteTeamModal
