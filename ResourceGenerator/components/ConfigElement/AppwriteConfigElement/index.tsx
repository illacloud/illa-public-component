import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { AppWriteResource } from "@illa-public/public-types"
import { isCloudVersion } from "@illa-public/utils"
import { FC, useCallback, useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  Button,
  ButtonGroup,
  Divider,
  PreviousIcon,
  WarningCircleIcon,
  getColor,
} from "@illa-design/react"
import { AppWriteResourceInitial } from "../../../ResourceDefaultConfig/appwrite"
import { urlValidate, validate } from "../../../utils/validate"
import { ControlledElement } from "../../ControlledElement"
import { ConfigElementProps } from "../interface"
import {
  applyConfigItemLabelTextStyle,
  configItemTipStyle,
  connectContainerTypeStyle,
  connectTypeStyle,
  containerStyle,
  dividerStyle,
  errorIconStyle,
  errorMsgStyle,
  footerStyle,
  labelContainerStyle,
  optionLabelStyle,
} from "../style"

export const AppWriteConfigElement: FC<ConfigElementProps> = (props) => {
  const { resourceID, onBack, onFinished } = props
  const { t } = useTranslation()
  const { control, handleSubmit, getValues, formState } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  })
  const { track } = useContext(MixpanelTrackContext)
  const resource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceID === resourceID)
  })
  let content: AppWriteResource
  if (!resource) {
    content = AppWriteResourceInitial
  } else {
    content = resource.content as AppWriteResource
  }

  const [testLoading, setTestLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleConnectionTest = useCallback(() => {
    track?.(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "resource_configure_test",
      parameter5: "appwrite",
    })
    const data = getValues()
    onActionConfigElementTest(
      data,
      {
        host: data.host.trim(),
        projectID: data.projectID,
        databaseID: data.databaseID,
        apiKey: data.apiKey,
      },
      "appwrite",
      setTestLoading,
    )
  }, [getValues, track])

  const inputValueValidate = {
    validate,
  }

  return (
    <form
      onSubmit={onActionConfigElementSubmit(
        handleSubmit,
        resourceID,
        "appwrite",
        onFinished,
        setSaving,
      )}
    >
      <div css={containerStyle}>
        <div css={dividerStyle} />
        <ControlledElement
          controlledType="input"
          isRequired
          title={t("editor.action.resource.db.label.name")}
          control={control}
          defaultValue={resource?.resourceName ?? ""}
          rules={[inputValueValidate]}
          placeholders={[t("editor.action.resource.db.placeholder.name")]}
          name="resourceName"
          tips={t("editor.action.resource.restapi.tip.name")}
        />
        <Divider
          direction="horizontal"
          ml="24px"
          mr="24px"
          mt="8px"
          mb="8px"
          w="unset"
        />
        <div css={optionLabelStyle}>
          {t("editor.action.resource.db.title.general_option")}
        </div>
        <ControlledElement
          controlledType="input"
          isRequired
          title={t("editor.action.form.label.appwrite.host")}
          control={control}
          defaultValue={content.host}
          rules={[
            {
              required: t("editor.action.resource.error.invalid_url"),
              validate: urlValidate,
            },
          ]}
          placeholders={[t("editor.action.form.placeholder.appwrite.host")]}
          name="host"
          tips={
            formState.errors.host ? (
              <div css={errorMsgStyle}>
                <WarningCircleIcon css={errorIconStyle} />
                <>{formState.errors.host.message}</>
              </div>
            ) : null
          }
        />
        <ControlledElement
          controlledType="input"
          isRequired
          title={t("editor.action.form.label.appwrite.dbid")}
          control={control}
          defaultValue={content.databaseID}
          rules={[inputValueValidate]}
          placeholders={[t("editor.action.form.placeholder.appwrite.dbid")]}
          name="databaseID"
        />
        <ControlledElement
          controlledType="input"
          isRequired
          title={t("editor.action.form.label.appwrite.projectid")}
          control={control}
          defaultValue={content.projectID}
          rules={[inputValueValidate]}
          placeholders={[
            t("editor.action.form.placeholder.appwrite.projectid"),
          ]}
          name="projectID"
        />
        <ControlledElement
          controlledType="password"
          isRequired
          title={t("editor.action.form.label.appwrite.secret")}
          control={control}
          defaultValue={content.apiKey}
          rules={[inputValueValidate]}
          placeholders={[t("editor.action.form.placeholder.appwrite.secret")]}
          name="apiKey"
        />
        {isCloudVersion && (
          <>
            <div css={configItemTipStyle}>
              {t("editor.action.resource.db.tip.username_password")}
            </div>
            <div css={connectContainerTypeStyle}>
              <div css={labelContainerStyle}>
                <span
                  css={applyConfigItemLabelTextStyle(
                    getColor("grayBlue", "02"),
                  )}
                >
                  {t("editor.action.resource.db.label.connect_type")}
                </span>
              </div>
              <span css={connectTypeStyle}>
                {t("editor.action.resource.db.tip.connect_type")}
              </span>
            </div>
          </>
        )}
      </div>
      <div css={footerStyle}>
        <Button
          leftIcon={<PreviousIcon />}
          variant="text"
          colorScheme="gray"
          type="button"
          onClick={onBack}
        >
          {t("back")}
        </Button>
        <ButtonGroup spacing="8px">
          <Button
            colorScheme="gray"
            loading={testLoading}
            disabled={!formState.isValid}
            type="button"
            onClick={handleConnectionTest}
          >
            {t("editor.action.form.btn.test_connection")}
          </Button>
          <Button
            colorScheme="techPurple"
            disabled={!formState.isValid}
            loading={saving}
            type="submit"
          >
            {t("editor.action.form.btn.save_changes")}
          </Button>
        </ButtonGroup>
      </div>
    </form>
  )
}
AppWriteConfigElement.displayName = "AppWriteConfigElement"
