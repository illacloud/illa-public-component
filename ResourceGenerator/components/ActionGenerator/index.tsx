import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { ActionType, ResourceType } from "@illa-public/public-types"
import { FC, useCallback, useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Modal } from "@illa-design/react"
import { getAllResources } from "@/redux/resource/resourceSelector"
import { ResourceCreator } from "../ResourceGenerator/ResourceCreator"
import { ResourceTypeSelector } from "../ResourceTypeSelector"
import { AIAgentSelector } from "./AIAgentSelector"
import { ActionResourceSelector } from "./ActionResourceSelector"
import { ModalHeader } from "./Header"
import { ActionCreatorPage, ActionGeneratorProps } from "./interface"
import { modalContentStyle } from "./style"

export const ActionGenerator: FC<ActionGeneratorProps> = function (props) {
  const {
    visible,
    onClose,
    defaultStep = "select",
    defaultActionType = null,
    canBackToSelect = true,
    handleDirectCreateAction,
    handleCreateAgentAction,
  } = props
  const [currentStep, setCurrentStep] = useState<ActionCreatorPage>(defaultStep)

  const [currentActionType, setCurrentActionType] = useState<ActionType | null>(
    defaultActionType,
  )

  const { t } = useTranslation()

  const allResource = useSelector(getAllResources)
  const { track } = useContext(MixpanelTrackContext)

  useEffect(() => {
    if (currentStep === "createAction") {
      if (currentActionType === "aiagent") {
        return
      } else if (
        allResource.filter((value) => {
          return value.resourceType === currentActionType
        }).length === 0
      ) {
        setCurrentStep("createResource")
      }
    }
  }, [currentStep, currentActionType, allResource])

  const handleBack = useCallback(
    (page: ActionCreatorPage) => {
      track?.(
        ILLA_MIXPANEL_EVENT_TYPE.CLICK,
        {
          element: "resource_configure_back",
          parameter5: currentActionType,
        },
        "both",
      )
      setCurrentStep(page)
    },
    [track, currentActionType],
  )

  const handleCancelModal = useCallback(() => {
    const element =
      currentStep === "createResource"
        ? "resource_configure_close"
        : "resource_type_modal"
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      {
        element,
        parameter5: currentActionType,
      },
      "both",
    )
    onClose()
    setCurrentStep("select")
    setCurrentActionType(null)
  }, [currentStep, onClose, track, currentActionType])

  const handleActionTypeSelect = useCallback(
    (actionType: ActionType) => {
      track?.(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
        element: "resource_type_modal_resource",
        parameter5: actionType,
      })
      setCurrentStep("createAction")
      setCurrentActionType(actionType)
    },
    [track],
  )

  const handleCreateResource = useCallback((actionType: ActionType) => {
    setCurrentActionType(actionType)
    setCurrentStep("createResource")
  }, [])

  const handleCreateAction = useCallback(() => {
    setCurrentStep("select")
    onClose()
  }, [onClose])

  const handleFinishCreateNewResource = useCallback(
    (resourceID?: string) => {
      track?.(
        ILLA_MIXPANEL_EVENT_TYPE.CLICK,
        {
          element: "resource_configure_save",
          parameter5: currentActionType,
        },
        "both",
      )
      if (!resourceID) return
      handleDirectCreateAction(resourceID, () => {
        setCurrentStep("select")
        onClose()
      })
    },
    [handleDirectCreateAction, onClose, track, currentActionType],
  )
  useEffect(() => {
    if (currentStep === "createResource" && currentActionType && visible) {
      track?.(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        {
          element: "resource_configure_modal",
          parameter5: currentActionType,
        },
        "both",
      )
    }
  }, [currentStep, track, currentActionType, visible])

  useEffect(() => {
    if (currentStep === "select" && visible) {
      track?.(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        {
          element: "resource_type_modal",
          parameter5: currentActionType,
        },
        "both",
      )
    }
  }, [currentStep, track, currentActionType, visible])

  const isMaskClosable = currentStep !== "createResource"

  return (
    <Modal
      w={`${ACTION_MODAL_WIDTH}px`}
      visible={visible}
      footer={false}
      closable
      maskClosable={isMaskClosable}
      withoutLine
      withoutPadding
      onCancel={handleCancelModal}
      focusLock={false}
    >
      <div css={modalContentStyle}>
        {currentStep === "select" && (
          <>
            <ModalHeader
              title={t(
                "editor.action.action_list.action_generator.selector.title",
              )}
              onClickClose={handleCancelModal}
            />
            <ResourceTypeSelector onSelect={handleActionTypeSelect} />
          </>
        )}
        {currentStep === "createAction" &&
          currentActionType &&
          (currentActionType === "aiagent" ? (
            <>
              <ModalHeader
                title={t(
                  "editor.action.action_list.action_generator.title.choose_resource",
                )}
                onClickClose={handleCancelModal}
              />
              <AIAgentSelector
                actionType={currentActionType}
                onBack={handleBack}
                handleCreateAction={handleCreateAgentAction}
                onCreateAction={handleCreateAction}
                canBack={canBackToSelect}
              />
            </>
          ) : (
            <>
              <ModalHeader
                title={t(
                  "editor.action.action_list.action_generator.title.choose_resource",
                )}
                onClickClose={handleCancelModal}
              />
              <ActionResourceSelector
                actionType={currentActionType}
                onBack={handleBack}
                handleCreateAction={handleDirectCreateAction}
                onCreateResource={handleCreateResource}
                onCreateAction={handleCreateAction}
                canBack={canBackToSelect}
              />
            </>
          ))}
        {currentStep === "createResource" && currentActionType && (
          <ResourceCreator
            resourceType={currentActionType as ResourceType}
            onBack={handleBack}
            onFinished={handleFinishCreateNewResource}
          />
        )}
      </div>
    </Modal>
  )
}

ActionGenerator.displayName = "ActionGenerator"
