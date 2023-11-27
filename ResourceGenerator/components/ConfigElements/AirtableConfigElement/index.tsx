import { AirtableResourceInitial } from "@illa-public/public-configs"
import { AirtableResource } from "@illa-public/public-types"
import { TextLink } from "@illa-public/text-link"
import { FC, useContext } from "react"
import { useFormContext } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { ResourceGeneratorContext } from "../../../provider"
import { validateNotEmpty } from "../../../utils"
import { ControlledElement } from "../../ControlledElement"
import { BaseConfigElementProps } from "../interface"
import { container } from "../style"

const AirtableConfigElement: FC<BaseConfigElementProps> = (props) => {
  const { resourceID } = props
  const { t } = useTranslation()

  const { control } = useFormContext()
  const { getResourceByID } = useContext(ResourceGeneratorContext)
  const findResource = getResourceByID(resourceID)
  const content = (findResource?.content ??
    AirtableResourceInitial) as AirtableResource

  const handleURLClick = (link: string) => window.open(link, "_blank")

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

        <ControlledElement
          title={t("editor.action.form.option.airtable.access_token")}
          defaultValue={content.authenticationConfig.token}
          name="token"
          controlledType="password"
          control={control}
          isRequired
          tips={
            <Trans
              i18nKey="editor.action.form.tips.airtable.access_token"
              t={t}
              components={[
                <TextLink
                  key={"text-link"}
                  onClick={() => {
                    handleURLClick(
                      "https://support.airtable.com/docs/creating-and-using-api-keys-and-access-tokens",
                    )
                  }}
                />,
              ]}
            />
          }
        />
      </div>
    </>
  )
}

AirtableConfigElement.displayName = "AirtableConfigElement"
export default AirtableConfigElement
