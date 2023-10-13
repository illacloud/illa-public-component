import { TextLink } from "@illa-public/text-link"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Button, ButtonGroup, PreviousIcon } from "@illa-design/react"
import { AirtableResourceInitial } from "../../../ResourceDefaultConfig/airtable"
import { useOnActionConfigElementSubmit } from "../../../hooks/resourceAction"
import { validate } from "../../../utils/validate"
import { ControlledElement } from "../../ControlledElement"
import { ConfigElementProps } from "../interface"
import { containerStyle, footerStyle } from "../style"

export const AirtableConfigElement: FC<ConfigElementProps> = (props) => {
  const { onBack, onFinished, resourceID } = props
  const { t } = useTranslation()

  const { control, handleSubmit, formState } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  })

  const resource = useSelector((state: RootState) => {
    return state.resource.find(
      (r) => r.resourceID === resourceID,
    ) as Resource<AirtableResource>
  })

  const content = resource?.content ?? AirtableResourceInitial

  const [saving, setSaving] = useState(false)

  const handleURLClick = (link: string) => window.open(link, "_blank")

  const onActionConfigElementSubmit = useOnActionConfigElementSubmit(
    handleSubmit,
    resourceID,
    "airtable",
    onFinished,
    setSaving,
  )

  return (
    <form onSubmit={onActionConfigElementSubmit}>
      <div css={containerStyle}>
        <ControlledElement
          controlledType="input"
          isRequired
          title={t("editor.action.resource.db.label.name")}
          control={control}
          defaultValue={resource?.resourceName ?? ""}
          rules={[
            {
              validate,
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
            colorScheme="techPurple"
            value="creating"
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

AirtableConfigElement.displayName = "AirtableConfigElement"
