import { getCurrentId } from "@illa-public/user-data"
import { FC, useContext } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { onActionConfigElementSubmit } from "../../../formUtils"
import { ResourceGeneratorContext } from "../../../provider"
import { ConfigElementProviderProps } from "./interface"
import { formContainerStyle } from "./style"

export const ConfigElementProvider: FC<ConfigElementProviderProps> = (
  props,
) => {
  const { children, resourceType, resourceID } = props
  const methods = useForm({ mode: "onChange", shouldUnregister: true })
  const teamID = useSelector(getCurrentId)!

  const { createOrUpdateResourceCallback } = useContext(
    ResourceGeneratorContext,
  )
  return (
    <FormProvider {...methods}>
      <form
        autoComplete="off"
        onSubmit={onActionConfigElementSubmit(
          teamID,
          methods.handleSubmit,
          resourceID,
          resourceType,
          createOrUpdateResourceCallback,
        )}
        css={formContainerStyle}
      >
        {children}
      </form>
    </FormProvider>
  )
}
