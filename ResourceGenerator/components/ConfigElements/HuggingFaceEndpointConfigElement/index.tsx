import {
  HuggingFaceEndpointResource,
  Resource,
} from "@illa-public/public-types"
import { TextLink } from "@illa-public/text-link"
import { FC, useContext } from "react"
import { useFormContext } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { FileDefaultIcon, WarningCircleIcon } from "@illa-design/react"
import { ResourceGeneratorContext } from "../../../provider"
import { urlValidate, validateNotEmpty } from "../../../utils"
import { ControlledElement } from "../../ControlledElement"
import {
  docContainerStyle,
  docItemStyle,
  docsItemContainerStyle,
  labelStyle,
  tipsStyle,
} from "../HuggingFaceConfigElement/style"
import { BaseConfigElementProps } from "../interface"
import {
  container,
  errorIconStyle,
  errorMsgStyle,
  labelContainer,
} from "../style"

const HuggingFaceEndpointConfigElement: FC<BaseConfigElementProps> = (
  props,
) => {
  const { resourceID } = props
  const { t } = useTranslation()

  const { control, formState } = useFormContext()
  const { getResourceByID } = useContext(ResourceGeneratorContext)
  const findResource = getResourceByID(
    resourceID,
  ) as Resource<HuggingFaceEndpointResource>
  const handleURLClick = (link: string) => window.open(link, "_blank")

  return (
    <>
      <div css={container}>
        <div css={docsItemContainerStyle}>
          <div css={labelContainer} />
          <div css={docContainerStyle}>
            <span css={docItemStyle}>Learn more about Hugging Face:</span>
            <span
              css={docItemStyle}
              onClick={() =>
                handleURLClick(
                  "https://huggingface.co/docs/inference-endpoints/index",
                )
              }
            >
              <FileDefaultIcon />
              <span>Inference Endpoint</span>
            </span>
            <span
              css={docItemStyle}
              onClick={() =>
                handleURLClick(
                  "https://huggingface.co/docs/api-inference/quicktour",
                )
              }
            >
              <FileDefaultIcon />
              <span>API Doc</span>
            </span>
          </div>
        </div>

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
          labelStyle={labelStyle}
          tipsStyle={tipsStyle}
        />

        <ControlledElement
          title={t("editor.action.resource.api.label.hf_endpoint")}
          defaultValue={findResource?.content.endpoint ?? ""}
          name="endpoint"
          controlledType="input"
          control={control}
          placeholders={[
            t("editor.action.resource.api.placeholder.hf_endpoint"),
          ]}
          rules={[
            {
              required: t("editor.action.resource.error.invalid_url"),
              validate: urlValidate,
            },
          ]}
          isRequired
          tips={
            formState.errors.endpoint ? (
              <div css={errorMsgStyle}>
                <WarningCircleIcon css={errorIconStyle} />
                <>{formState.errors.endpoint.message}</>
              </div>
            ) : (
              <Trans
                i18nKey="editor.action.resource.api.tips.hf_endpoint"
                t={t}
                components={[
                  <TextLink
                    key={"editor.action.resource.api.tips.hf_endpoint"}
                    onClick={() => {
                      handleURLClick(
                        "https://huggingface.co/docs/inference-endpoints/guides/create_endpoint",
                      )
                    }}
                  />,
                ]}
              />
            )
          }
          labelStyle={labelStyle}
          tipsStyle={tipsStyle}
        />
        <ControlledElement
          title={t("editor.action.resource.api.label.hf_endpoint_token")}
          defaultValue={findResource?.content.token ?? ""}
          name="token"
          controlledType="password"
          control={control}
          isRequired
          tips={
            <Trans
              i18nKey="editor.action.resource.api.tips.hf_endpoint_token"
              t={t}
              components={[
                <TextLink
                  key={"editor.action.resource.api.tips.hf_endpoint_token"}
                  onClick={() => {
                    handleURLClick("https://huggingface.co/settings/tokens")
                  }}
                />,
              ]}
            />
          }
          labelStyle={labelStyle}
          tipsStyle={tipsStyle}
        />
      </div>
    </>
  )
}

HuggingFaceEndpointConfigElement.displayName =
  "HuggingFaceEndpointConfigElement"
export default HuggingFaceEndpointConfigElement
