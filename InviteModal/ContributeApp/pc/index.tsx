import { FC, useState } from "react"
import { Controller, useForm, useFormState } from "react-hook-form"
import { useTranslation } from "react-i18next"
import {
  Input,
  Modal,
  TextArea,
  getColor,
  useMessage,
} from "@illa-design/react"
import { ReactComponent as RequireIcon } from "../../asset/require.svg"
import { TagControllerPC } from "../../component/TagController/pc"
import { ContributeAppConfig, ContributeAppProps } from "../interface"
import {
  contributeAppWithHashtags,
  updateAppConfig,
  updateAppContribute,
} from "../service"
import { blockLabelStyle, blockRequireStyle, blockStyle } from "./style"


export const ContributeAppPC: FC<ContributeAppProps> = (props) => {
  const [contributeLoading, setContributeLoading] = useState(false)
  const { t } = useTranslation()

  const { control, formState, handleSubmit } = useForm<ContributeAppConfig>({
    mode: "onSubmit",
    defaultValues: {
      appName: props.appName,
      appDesc: props.appDesc,
      hashtags: [],
    },
  })

  const message = useMessage()

  const { isValid } = useFormState({ control })

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        setContributeLoading(true)
        try {
          if (props.productContributed) {
            await updateAppContribute(
              props.teamID,
              props.productID,
              data.hashtags,
            )
          } else {
            await contributeAppWithHashtags(
              props.teamID,
              props.productID,
              data.hashtags,
            )
          }
          await updateAppConfig(props.productID, props.teamID, {
            appName: data.appName,
            description: data.appDesc,
          })
          props.onAppInfoUpdate(data.appName, data.appDesc)
          props.onContributed(true)
          props.onClose?.()
        } catch (e) {
          message.error({
            content: t("user_management.modal.message.make_public_failed"),
          })
        } finally {
          setContributeLoading(false)
        }
      })}
    >
      <Modal
        withoutLine
        w="498px"
        closable={true}
        onCancel={() => {
          props.onClose?.()
        }}
        maskClosable={false}
        visible={true}
        hideCancel={!props.productContributed}
        okText={
          props.productContributed
            ? t("contribute.update_modal_button")
            : t("contribute.first_time_modal.button")
        }
        okButtonProps={{
          colorScheme: getColor("grayBlue", "02"),
          disabled: !isValid,
          loading: contributeLoading,
        }}
        title={
          props.productContributed
            ? t("contribute.update_modal.title")
            : t("contribute.first_time_modal.title")
        }
      >
        <Controller
          name="appName"
          control={control}
          render={({ field }) => (
            <section css={blockStyle}>
              <label css={blockLabelStyle}>
                {t("new_dashboard.app_setting.app_name")}
                <RequireIcon css={blockRequireStyle} />
              </label>
              <Input
                {...field}
                colorScheme="techPurple"
                error={!!formState?.errors.appName}
                placeholder={t(
                  "new_dashboard.app_setting.placeholder.app_name",
                )}
              />
            </section>
          )}
          rules={{
            required: t("page.user.sign_up.error_message.username.require"),
            maxLength: {
              value: 280,
              message: t("page.user.sign_up.error_message.username.length"),
            },
          }}
        />
        <Controller
          name="appDesc"
          control={control}
          render={({ field }) => (
            <section css={blockStyle}>
              <label css={blockLabelStyle}>
                {t("new_dashboard.app_setting.description")}
              </label>
              <TextArea
                {...field}
                showWordLimit
                maxLength={180}
                autoSize={{ minRows: 6 }}
                colorScheme="techPurple"
                error={!!formState?.errors.appDesc}
                placeholder={t(
                  "new_dashboard.app_setting.placeholder.description",
                )}
              />
            </section>
          )}
        />
        <Controller
          name="hashtags"
          control={control}
          rules={{
            required: true,
            validate: (value) => value.length > 0,
          }}
          render={({ field }) => (
            <TagControllerPC
              productID={props.productID}
              productType={props.productType}
              productContributed={props.productContributed}
              onTagChange={(tags) => {
                field.onChange(tags)
              }}
            />
          )}
        />
      </Modal>
    </form>
  )
}

ContributeAppPC.displayName = "ContributeAppPC"