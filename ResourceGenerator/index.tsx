import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { ResourceType } from "@illa-public/public-types"
import { FC, useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Modal } from "@illa-design/react"
import { ResourceCreator } from "./components/ResourceCreator"
import { ResourceTypeSelector } from "./components/ResourceTypeSelector"
import { ACTION_MODAL_WIDTH } from "./config"
import { ResourceCreatorPage, ResourceGeneratorProps } from "./interface"
import { modalContentStyle } from "./style"

export * from "./components/ResourceTypeSelector"
export * from "./components/ActionGenerator"
export * from "./components/ResourceCreator"
export * from "./components/ResourceCreatePanel"
export * from "./provider"
export * from "./utils"
export * from "./config"

export const ResourceGenerator: FC<ResourceGeneratorProps> = (props) => {
  const { visible, onClose, filterResourceType, defaultConfig } = props
  const [currentStep, setCurrentStep] = useState<ResourceCreatorPage>(
    defaultConfig?.defaultStep ?? "select",
  )
  const { track } = useContext(MixpanelTrackContext)

  const [currentResource, setCurrentResource] = useState<ResourceType | null>(
    defaultConfig?.defaultResourceType ?? null,
  )

  const onCancel = () => {
    const element =
      currentStep === "createResource"
        ? "resource_configure_close"
        : "resource_type_modal_close"
    track?.(ILLA_MIXPANEL_EVENT_TYPE.CLICK, { element })
    onClose()
    setCurrentStep("select")
    setCurrentResource(null)
  }

  const { t } = useTranslation()

  useEffect(() => {
    if (visible) {
      const element =
        currentStep === "createResource"
          ? "resource_configure_modal"
          : "resource_type_modal"
      track?.(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        {
          element,
          parameter5: currentResource,
        },
        "both",
      )
    }
  }, [currentStep, visible, track, currentResource])

  let title
  switch (currentStep) {
    case "select":
      title = t("editor.action.form.title.select")
      break
  }
  const isMaskCloseable = currentStep === "select"

  return (
    <Modal
      w={`${ACTION_MODAL_WIDTH}px`}
      visible={visible}
      footer={false}
      closable
      maskClosable={isMaskCloseable}
      withoutLine
      withoutPadding
      title={title}
      onCancel={onCancel}
    >
      <div css={modalContentStyle}>
        {currentStep === "select" && (
          <ResourceTypeSelector
            onSelect={(resourceType) => {
              setCurrentStep("createResource")
              setCurrentResource(resourceType)
              track?.(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
                element: "resource_type_modal_resource",
                parameter5: resourceType,
              })
            }}
            filterResourceType={filterResourceType}
          />
        )}
        {currentStep === "createResource" && currentResource != null && (
          <ResourceCreator
            onBack={() => {
              if (defaultConfig?.canBack ?? true) {
                setCurrentStep("select")
                setCurrentResource(null)
                track?.(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
                  element: "resource_configure_back",
                  parameter5: currentResource,
                })
              } else {
                onCancel()
              }
            }}
            resourceType={currentResource}
          />
        )}
      </div>
    </Modal>
  )
}

ResourceGenerator.displayName = "ResourceGenerator"
