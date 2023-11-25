import { getIconFromResourceType } from "@illa-public/icon"
import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { ResourceType } from "@illa-public/public-types"
import { fromNow } from "@illa-public/utils"
import {
  FC,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { useTranslation } from "react-i18next"
import {
  AddIcon,
  Button,
  ButtonGroup,
  List,
  PreviousIcon,
} from "@illa-design/react"
import { ResourceGeneratorContext } from "../../../provider"
import { ActionResourceSelectorProps } from "./interface"
import {
  applyResourceItemStyle,
  containerStyle,
  footerStyle,
  resourceItemTimeStyle,
  resourceItemTitleStyle,
} from "./style"

export const ActionResourceSelector: FC<ActionResourceSelectorProps> = (
  props,
) => {
  const {
    actionType,
    canBack,
    onBack,
    onCreateAction,
    onCreateResource,
    handleCreateAction,
  } = props

  const { t } = useTranslation()

  const { getResourceByType } = useContext(ResourceGeneratorContext)
  const { track } = useContext(MixpanelTrackContext)

  const resourceList = getResourceByType(actionType as ResourceType).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  const [selectedResourceId, setSelectedResourceId] = useState<string>(
    resourceList[0]?.resourceID,
  )

  const [loading, setLoading] = useState(false)

  const handleClickCreateAction = useCallback(() => {
    handleCreateAction(
      actionType,
      selectedResourceId,
      () => onCreateAction?.(actionType, selectedResourceId),
      setLoading,
    )
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      {
        element: "resource_list_create_action",
        parameter1: actionType,
      },
      "both",
    )
  }, [
    actionType,
    handleCreateAction,
    onCreateAction,
    selectedResourceId,
    track,
  ])

  useEffect(() => {
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.SHOW,
      {
        element: "resource_list_show",
        parameter1: actionType,
      },
      "both",
    )
  }, [actionType, track])

  return (
    <div css={containerStyle}>
      <List
        bordered={false}
        height={524}
        data={resourceList}
        split={false}
        itemHeight={48}
        renderKey={(data) => {
          return data.resourceID
        }}
        h="524px"
        renderRaw
        render={(r) => {
          return (
            <div
              css={applyResourceItemStyle(r.resourceID === selectedResourceId)}
              onClick={() => {
                setSelectedResourceId(r.resourceID)
              }}
            >
              <Suspense>
                {getIconFromResourceType(r.resourceType, "24px")}
              </Suspense>
              <span css={resourceItemTitleStyle}>{r.resourceName}</span>
              <span css={resourceItemTimeStyle}>
                {t("created_at") + " " + fromNow(r.createdAt)}
              </span>
            </div>
          )
        }}
      />
      <div css={footerStyle}>
        {canBack ? (
          <Button
            leftIcon={<PreviousIcon />}
            variant="text"
            colorScheme="gray"
            onClick={() => {
              onBack("select")
            }}
          >
            {t("back")}
          </Button>
        ) : (
          <span />
        )}
        <ButtonGroup spacing="8px">
          <Button
            leftIcon={<AddIcon />}
            colorScheme="gray"
            onClick={() => {
              track?.(
                ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                {
                  element: "resource_list_new",
                  parameter1: actionType,
                },
                "both",
              )
              onCreateResource?.(actionType as ResourceType)
            }}
          >
            {t("editor.action.action_list.action_generator.btns.new_resource")}
          </Button>
          <Button
            colorScheme="techPurple"
            onClick={handleClickCreateAction}
            loading={loading}
            disabled={resourceList.length <= 0}
          >
            {t("editor.action.action_list.action_generator.btns.create_action")}
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

ActionResourceSelector.displayName = "ActionResourceSelector"
