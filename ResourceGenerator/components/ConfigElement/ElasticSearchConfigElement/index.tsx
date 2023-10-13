import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { ElasticSearchResource, Resource } from "@illa-public/public-types"
import { isCloudVersion } from "@illa-public/utils"
import { FC, useCallback, useContext, useMemo, useState } from "react"
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
import {
  onActionConfigElementSubmit,
  onActionConfigElementTest,
} from "@/page/App/components/Actions/api"
import { ElasticSearchResourceInitial } from "../../../ResourceDefaultConfig/elasticSearch"
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
} from "../style"

export const ElasticSearchConfigElement: FC<ConfigElementProps> = (props) => {
  const { onBack, resourceID, onFinished } = props

  const { t } = useTranslation()

  const { control, handleSubmit, getValues, formState } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  })

  const findResource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceID === resourceID)
  })

  const content = useMemo(() => {
    if (findResource === undefined) {
      return ElasticSearchResourceInitial
    } else {
      return (findResource as Resource<ElasticSearchResource>).content
    }
  }, [findResource])

  const [testLoading, setTestLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const { track } = useContext(MixpanelTrackContext)

  const handleResourceTest = useCallback(() => {
    track?.(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "resource_configure_test",
      parameter5: "elasticsearch",
    })
    const data = getValues()
    onActionConfigElementTest(
      data,
      {
        host: data.host.trim(),
        port: data.port.toString(),
        username: data.username,
        password: data.password,
      },
      "elasticsearch",
      setTestLoading,
    )
  }, [getValues, track])

  return (
    <form
      onSubmit={onActionConfigElementSubmit(
        handleSubmit,
        resourceID,
        "elasticsearch",
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
          defaultValue={findResource?.resourceName ?? ""}
          rules={[
            {
              validate,
            },
          ]}
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

        <ControlledElement
          controlledType="input"
          isRequired
          title={t("editor.action.resource.db.label.hosturl")}
          control={control}
          defaultValue={content.host}
          rules={[
            {
              required: t("editor.action.resource.error.invalid_url"),
              validate: urlValidate,
            },
          ]}
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
          isRequired
          title={t("editor.action.resource.db.label.port")}
          defaultValue={content.port}
          name="port"
          controlledType="number"
          control={control}
        />

        <ControlledElement
          title={t("editor.action.resource.db.label.username_password")}
          controlledType={["input", "password"]}
          defaultValue={[content.username, content.password]}
          name={["username", "password"]}
          control={control}
          isRequired
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
            onClick={handleResourceTest}
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

ElasticSearchConfigElement.displayName = "ElasticSearchConfigElement"
