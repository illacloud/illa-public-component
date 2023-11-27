import { RestApiResourceInit } from "@illa-public/public-configs"
import {
  Resource,
  RestApiAuth,
  RestApiAuthType,
  RestApiResource,
  VerifyMode,
} from "@illa-public/public-types"
import { FC, useContext } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Alert, Divider } from "@illa-design/react"
import { ResourceGeneratorContext } from "../../../provider"
import { validateNotEmpty } from "../../../utils"
import { ControlledElement } from "../../ControlledElement"
import { InputRecordEditor } from "../../InputRecordEditor"
import { BaseConfigElementProps } from "../interface"
import { container, optionLabelStyle } from "../style"
import { BasicAuthPanel } from "./BasicAuthPanel"
import { BearerAuthPanel } from "./BearerAuthPanel"
import { DigestAuthPanel } from "./DigestAuthPanel"

const RestApiAuthTypeComponentMap = {
  none: null,
  basic: BasicAuthPanel,
  bearer: BearerAuthPanel,
  digest: DigestAuthPanel,
}

const RestApiConfigElement: FC<BaseConfigElementProps> = (props) => {
  const { resourceID } = props

  const { t } = useTranslation()
  const { control, watch } = useFormContext()
  const { getResourceByID } = useContext(ResourceGeneratorContext)
  const findResource = getResourceByID(resourceID) as Resource<
    RestApiResource<RestApiAuth>
  >

  const content = findResource?.content ?? RestApiResourceInit

  const showCertificates = (watch("baseUrl", content.baseUrl) ?? "").startsWith(
    "https://",
  )
  const showCertificatesConfig = watch(
    "selfSignedCert",
    content?.selfSignedCert,
  )
  const showSkipVerify = watch("mode", content.certs?.mode) === "skip"
  const authType = watch("authentication", content.authentication)

  const SubPanelComponent =
    RestApiAuthTypeComponentMap[
      authType as keyof typeof RestApiAuthTypeComponentMap
    ]

  const AuthenticationOptions: {
    label: string
    value: RestApiAuthType
  }[] = [
    {
      label: t("editor.action.resource.restapi.option.authentication.none"),
      value: "none",
    },
    {
      label: t(
        "editor.action.resource.restapi.option.authentication.basic_auth",
      ),
      value: "basic",
    },
    {
      label: t("editor.action.resource.restapi.option.authentication.bearer"),
      value: "bearer",
    },
    {
      label: t("editor.action.form.option.restapi.authentication.digest_auth"),
      value: "digest",
    },
  ]

  const VerificationModeOptions: {
    label: string
    value: VerifyMode
  }[] = [
    {
      label: t(
        "editor.action.form.option.restapi.verification_mode.full_verification",
      ),
      value: "verify-full",
    },
    {
      label: t(
        "editor.action.form.option.restapi.verification_mode.verify_ca_certificat",
      ),
      value: "verify-ca",
    },
    {
      label: t(
        "editor.action.form.option.restapi.verification_mode.skip_ca_certificate_",
      ),
      value: "skip",
    },
  ]

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
          title={t("editor.action.resource.restapi.label.base_url")}
          defaultValue={content.baseUrl}
          isRequired
          name="baseUrl"
          controlledType="input"
          control={control}
          rules={[{ validate: validateNotEmpty }]}
          placeholders={[
            t("editor.action.resource.restapi.placeholder.base_url"),
          ]}
        />
        <Controller
          control={control}
          defaultValue={content.urlParams}
          render={({ field: { value, onChange } }) => (
            <InputRecordEditor
              label={t("editor.action.resource.restapi.label.url_parameters")}
              records={value}
              onAdd={() => {
                onChange([...value, { key: "", value: "" }])
              }}
              onDelete={(index) => {
                let newRecords = [...value]
                newRecords.splice(index, 1)
                if (newRecords.length === 0) {
                  newRecords = [{ key: "", value: "" }]
                }
                onChange(newRecords)
              }}
              onChangeKey={(index, key, v) => {
                let newRecords = [...value]
                newRecords[index] = { key, value: v }
                onChange(newRecords)
              }}
              onChangeValue={(index, key, v) => {
                let newRecords = [...value]
                newRecords[index] = { key, value: v }
                onChange(newRecords)
              }}
            />
          )}
          name="urlParams"
        />
        <Controller
          control={control}
          defaultValue={content.headers}
          render={({ field: { value, onChange } }) => (
            <InputRecordEditor
              label={t("editor.action.resource.restapi.label.headers")}
              records={value}
              onAdd={() => {
                onChange([...value, { key: "", value: "" }])
              }}
              onDelete={(index) => {
                let newRecords = [...value]
                newRecords.splice(index, 1)
                if (newRecords.length === 0) {
                  newRecords = [{ key: "", value: "" }]
                }
                onChange(newRecords)
              }}
              onChangeKey={(index, key, v) => {
                let newRecords = [...value]
                newRecords[index] = { key, value: v }
                onChange(newRecords)
              }}
              onChangeValue={(index, key, v) => {
                let newRecords = [...value]
                newRecords[index] = { key, value: v }
                onChange(newRecords)
              }}
            />
          )}
          name="headers"
        />
        <Controller
          control={control}
          defaultValue={content.cookies}
          render={({ field: { value, onChange } }) => (
            <InputRecordEditor
              label={t("editor.action.resource.restapi.label.cookies")}
              records={value}
              onAdd={() => {
                onChange([...value, { key: "", value: "" }])
              }}
              onDelete={(index) => {
                let newRecords = [...value]
                newRecords.splice(index, 1)
                if (newRecords.length === 0) {
                  newRecords = [{ key: "", value: "" }]
                }
                onChange(newRecords)
              }}
              onChangeKey={(index, key, v) => {
                let newRecords = [...value]
                newRecords[index] = { key, value: v }
                onChange(newRecords)
              }}
              onChangeValue={(index, key, v) => {
                let newRecords = [...value]
                newRecords[index] = { key, value: v }
                onChange(newRecords)
              }}
            />
          )}
          name="cookies"
        />
        {showCertificates && (
          <ControlledElement
            title={t("editor.action.form.label.restapi.certificates")}
            defaultValue={content?.selfSignedCert ?? false}
            name="selfSignedCert"
            controlledType="switch"
            control={control}
            contentLabel={t("editor.action.form.option.restapi.certificates")}
          />
        )}
        {showCertificatesConfig && (
          <>
            <ControlledElement
              controlledType={["textarea"]}
              title={t("editor.action.form.option.restapi.ca_certificate")}
              control={control}
              defaultValue={content?.certs?.caCert ?? ""}
              name="caCert"
              placeholders={[
                t("editor.action.resource.db.placeholder.certificate"),
              ]}
            />
            <ControlledElement
              controlledType={["textarea"]}
              title={t("editor.action.form.option.restapi.client_key")}
              control={control}
              defaultValue={content?.certs?.clientKey ?? ""}
              name="clientKey"
              placeholders={[
                t("editor.action.resource.db.placeholder.certificate"),
              ]}
            />
            <ControlledElement
              controlledType={["textarea"]}
              title={t("editor.action.form.option.restapi.client_certificate")}
              control={control}
              defaultValue={content?.certs?.clientCert ?? ""}
              name="clientCert"
              placeholders={[
                t("editor.action.resource.db.placeholder.certificate"),
              ]}
            />
            <ControlledElement
              title={t("editor.action.form.label.restapi.verification_mode")}
              defaultValue={content?.certs?.mode ?? "verify-full"}
              name="mode"
              controlledType="select"
              control={control}
              options={VerificationModeOptions}
            />
            {showSkipVerify && (
              <ControlledElement
                title=""
                defaultValue=""
                name=""
                controlledType="none"
                control={control}
                tips={
                  <Alert
                    title={t(
                      "editor.action.form.tips.connect_to_local.title.tips",
                    )}
                    content={t(
                      "editor.action.form.tips.restapi.verification_mode.skip_ca_certificate",
                    )}
                  />
                }
              />
            )}
          </>
        )}
        <ControlledElement
          title={t("editor.action.resource.restapi.label.authentication")}
          defaultValue={content.authentication}
          name="authentication"
          controlledType="select"
          control={control}
          options={AuthenticationOptions}
        />

        {SubPanelComponent && (
          <SubPanelComponent control={control} auth={content.authContent} />
        )}
      </div>
    </>
  )
}

RestApiConfigElement.displayName = "RestApiConfigElement"
export default RestApiConfigElement
