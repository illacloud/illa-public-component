import { GoogleSheetResourceInitial } from "@illa-public/public-configs"
import {
  GoogleSheetAuthStatus,
  GoogleSheetResource,
} from "@illa-public/public-types"
import { TextLink } from "@illa-public/text-link"
import { FC, useCallback, useContext, useMemo } from "react"
import { useFormContext } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { WarningCircleIcon } from "@illa-design/react"
import { ResourceGeneratorContext } from "../../../provider"
import { validateNotEmpty } from "../../../utils"
import { ControlledElement } from "../../ControlledElement"
import { ResourceDivider } from "../../ResourceDivider"
import { BaseConfigElementProps } from "../interface"
import { container } from "../style"
import {
  getOAuthStatusContentStyle,
  oAuthErrorIconStyle,
  oAuthStatusContainerStyle,
} from "./style"

const GoogleSheetsConfigElement: FC<BaseConfigElementProps> = (props) => {
  const { resourceID } = props

  const { control, watch } = useFormContext()

  const { t } = useTranslation()
  const { getResourceByID } = useContext(ResourceGeneratorContext)
  const findResource = getResourceByID(resourceID)

  const content = (findResource?.content ??
    GoogleSheetResourceInitial) as GoogleSheetResource

  const authenticationWatch = watch("authentication", content.authentication)

  const isOauthType = authenticationWatch === "oauth2"
  // redirect authentication status
  const isAuthenticated =
    content.opts?.status === GoogleSheetAuthStatus.Authenticated

  const showAuthStatus = content.opts?.status !== GoogleSheetAuthStatus.Initial

  const handleLinkTo = useCallback(
    (link: string) => () => {
      window.open(link, "_blank")
    },
    [],
  )

  const oauthMethodOptions = useMemo(() => {
    if (import.meta.env.ILLA_APP_ENV === "production") {
      return [
        {
          label: t("editor.action.form.option.gs.service_account"),
          value: "serviceAccount",
        },
      ]
    } else {
      return [
        {
          label: t("editor.action.form.option.gs.service_account"),
          value: "serviceAccount",
        },
        {
          label: t("editor.action.form.option.gs.oauth_2.0"),
          value: "oauth2",
        },
      ]
    }
  }, [t])

  return (
    <>
      <div css={container}>
        <ControlledElement
          controlledType="input"
          isRequired
          title={t("editor.action.resource.db.label.name")}
          control={control}
          defaultValue={findResource?.resourceName ?? ""}
          rules={[
            {
              validate: validateNotEmpty,
            },
          ]}
          placeholders={[t("editor.action.resource.db.placeholder.name")]}
          name="resourceName"
          tips={t("editor.action.resource.restapi.tip.name")}
        />
        <ResourceDivider type="General Option" />
        <ControlledElement
          isRequired
          title={t("editor.action.form.label.gs.authentication")}
          defaultValue={content.authentication}
          name="authentication"
          controlledType="select"
          control={control}
          options={oauthMethodOptions}
        />
        {isOauthType ? (
          <ControlledElement
            isRequired
            title={t("editor.action.form.label.gs.access_type")}
            key="editor.action.form.label.gs.access_type"
            defaultValue={content.opts?.accessType ?? "rw"}
            name="accessType"
            controlledType="radio"
            control={control}
            options={[
              {
                label: t("editor.action.form.option.gs.read_and_write"),
                value: "rw",
              },
              {
                label: t("editor.action.form.option.gs.read_only"),
                value: "r",
              },
            ]}
          />
        ) : (
          <ControlledElement
            title={t("editor.action.form.label.gs.private_key")}
            key="editor.action.form.label.gs.private_key"
            defaultValue={content.opts?.privateKey ?? ""}
            name="privateKey"
            isRequired
            rules={[
              {
                validate: validateNotEmpty,
              },
            ]}
            controlledType="textarea"
            control={control}
            placeholders={[t("editor.action.form.placeholder.gs.private_key")]}
            tips={
              <Trans
                i18nKey="editor.action.form.tips.gs.private_key"
                t={t}
                components={[
                  <TextLink
                    key="editor.action.form.tips.gs.private_key.console"
                    onClick={handleLinkTo(
                      "https://console.cloud.google.com/cloud-resource-manager",
                    )}
                  />,
                  <TextLink
                    key="editor.action.form.tips.gs.private_key.docs"
                    onClick={handleLinkTo(
                      "https://cloud.google.com/docs/authentication/getting-started",
                    )}
                  />,
                  <TextLink
                    key="editor.action.form.tips.gs.private_key.limit"
                    onClick={handleLinkTo(
                      "https://developers.google.com/sheets/api/limits",
                    )}
                  />,
                ]}
              />
            }
          />
        )}
        {showAuthStatus && (
          <div css={oAuthStatusContainerStyle}>
            <div css={getOAuthStatusContentStyle(isAuthenticated)}>
              {!isAuthenticated ? (
                <>
                  <WarningCircleIcon css={oAuthErrorIconStyle} />
                  <>{t("editor.action.form.tips.gs.failed_to_authentica")}</>
                </>
              ) : (
                <>{t("editor.action.form.tips.gs.successfully_authent")}</>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
GoogleSheetsConfigElement.displayName = "GoogleSheetsConfigElement"
export default GoogleSheetsConfigElement
