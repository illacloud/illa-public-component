import {
  ApiKeyAuth,
  GraphQLAuthValue,
  GraphQLBasicAuth,
  GraphQLBearerAuth,
  GraphQLResource,
  Resource,
} from "@illa-public/public-types"
import { FC, useContext } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Divider, WarningCircleIcon } from "@illa-design/react"
import { ResourceGeneratorContext } from "../../../provider"
import { urlValidate, validateNotEmpty } from "../../../utils"
import { ControlledElement } from "../../ControlledElement"
import { InputRecordEditor } from "../../InputRecordEditor"
import { BaseConfigElementProps } from "../interface"
import {
  container,
  errorIconStyle,
  errorMsgStyle,
  optionLabelStyle,
} from "../style"
import { APIKeyAuthPanel } from "./APIKeyAuthPanel"
import { BasicAuthPanel } from "./BasicAuthPanel"
import { BearerAuthPanel } from "./BearerAuthPanel"
import { GraphQLAuthTypeSelect } from "./constants"

const GraphQLConfigElement: FC<BaseConfigElementProps> = (props) => {
  const { resourceID } = props

  const { t } = useTranslation()
  const { control, formState, watch } = useFormContext()
  const { getResourceByID } = useContext(ResourceGeneratorContext)
  const findResource = getResourceByID(resourceID) as Resource<GraphQLResource>

  const InputRecord = [
    {
      name: "urlParams",
      title: t("editor.action.resource.restapi.label.url_parameters"),
      defaultValue: findResource?.content.urlParams,
    },
    {
      name: "headers",
      defaultValue: findResource?.content.headers,
      title: t("editor.action.resource.restapi.label.headers"),
    },
    {
      name: "cookies",
      defaultValue: findResource?.content.cookies,
      title: t("editor.action.resource.restapi.label.cookies"),
    },
  ]

  const authType = watch(
    "authentication",
    findResource?.content.authentication ?? GraphQLAuthValue.NONE,
  )

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
          mt="16px"
          mb="8px"
          w="unset"
        />
        <div css={optionLabelStyle}>
          {t("editor.action.resource.db.title.general_option")}
        </div>

        <ControlledElement
          title={t("editor.action.resource.restapi.label.base_url")}
          defaultValue={findResource?.content.baseUrl ?? ""}
          isRequired
          name={"baseUrl"}
          controlledType={"input"}
          control={control}
          rules={[
            {
              required: t("editor.action.resource.error.invalid_url"),
              validate: urlValidate,
            },
          ]}
          placeholders={[
            t("editor.action.resource.restapi.placeholder.base_url"),
          ]}
          tips={
            formState.errors.baseUrl && (
              <div css={errorMsgStyle}>
                <WarningCircleIcon css={errorIconStyle} />
                <>{formState.errors.baseUrl.message}</>
              </div>
            )
          }
        />
        {InputRecord.map(({ name, title, defaultValue }) => (
          <Controller
            key={name}
            control={control}
            defaultValue={
              defaultValue ?? [
                {
                  key: "",
                  value: "",
                },
              ]
            }
            render={({ field: { value, onChange } }) => (
              <InputRecordEditor
                label={title}
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
                  newRecords[index].value = v
                  onChange(newRecords)
                }}
              />
            )}
            name={name}
          />
        ))}
        <ControlledElement
          title={t("editor.action.resource.restapi.label.authentication")}
          defaultValue={findResource?.content.authentication ?? "none"}
          name="authentication"
          controlledType={["select"]}
          control={control}
          options={GraphQLAuthTypeSelect}
        />

        {authType === GraphQLAuthValue.BASIC && (
          <BasicAuthPanel
            control={control}
            auth={findResource?.content.authContent as GraphQLBasicAuth}
          />
        )}
        {authType === GraphQLAuthValue.BEARER && (
          <BearerAuthPanel
            control={control}
            auth={findResource?.content.authContent as GraphQLBearerAuth}
          />
        )}
        {authType === GraphQLAuthValue.APIKEY && (
          <APIKeyAuthPanel
            watch={watch}
            control={control}
            auth={findResource?.content.authContent as ApiKeyAuth}
          />
        )}
        <Divider
          direction="horizontal"
          ml="24px"
          mr="24px"
          mt="16px"
          mb="8px"
          w="unset"
        />
        <div css={optionLabelStyle}>
          {t("editor.action.resource.db.title.graphql_introspection")}
        </div>
        <ControlledElement
          title={t("editor.action.resource.db.label.introspection")}
          contentLabel={t(
            "editor.action.resource.db.label.disable_introspection",
          )}
          defaultValue={findResource?.content.disableIntrospection ?? false}
          name="disableIntrospection"
          controlledType={["switch"]}
          control={control}
          tips={t("editor.action.resource.db.tip.introspection")}
        />
      </div>
    </>
  )
}

GraphQLConfigElement.displayName = "GraphQLConfigElement"
export default GraphQLConfigElement
