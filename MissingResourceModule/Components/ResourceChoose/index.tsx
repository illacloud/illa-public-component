import { getIconFromResourceType } from "@illa-public/icon"
import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { Resource, ResourceType } from "@illa-public/public-types"
import {
  ResourceGenerator,
  ResourceGeneratorProvider,
} from "@illa-public/resource-generator"
import { FC, Suspense, useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { AddIcon, Select, SelectOptionObject, Space } from "@illa-design/react"
import { MissingResourceContext } from "../../context"
import {
  agentActionStyle,
  createNewStyle,
  itemContainer,
  itemLogo,
  itemText,
} from "./style"
import { LIKE_MYSQL_TYPES, getSameTypeResourceList } from "./utils"

interface ResourceChooseProps {
  changeResourceID: (resourceID: string) => void
  resourceID?: string
  resourceType: string
}

const ResourceChoose: FC<ResourceChooseProps> = ({
  resourceID,
  resourceType: origanResourceType,
  changeResourceID,
}) => {
  const { t } = useTranslation()

  const { resourceList, aiAgentList, addResourceCallback } = useContext(
    MissingResourceContext,
  )
  const { track } = useContext(MixpanelTrackContext)

  const finalResourceList = getSameTypeResourceList(
    resourceList,
    origanResourceType,
  )
  const [generatorVisible, setGeneratorVisible] = useState(false)
  const isMysqlLike = LIKE_MYSQL_TYPES.includes(origanResourceType)
  const isAIAgent = origanResourceType === "aiagent"

  const createOrUpdateResourceCallback = (
    resource: Resource,
    isUpdate: boolean,
  ) => {
    setGeneratorVisible(false)
    if (!isUpdate) {
      addResourceCallback(resource)
      changeResourceID(resource.resourceID)
    }
  }

  const options: SelectOptionObject[] = isAIAgent
    ? aiAgentList.map((item) => ({
        label: (
          <div css={itemContainer}>
            <span css={itemLogo}>
              <img src={item?.icon} css={agentActionStyle("14px")} />
            </span>
            <span css={itemText}>{item.name}</span>
          </div>
        ),
        value: item.aiAgentID,
      }))
    : finalResourceList.map((item) => ({
        label: (
          <div css={itemContainer}>
            <span css={itemLogo}>
              <Suspense>
                {getIconFromResourceType(item.resourceType, "14px")}
              </Suspense>
            </span>
            <span css={itemText}>{item.resourceName}</span>
          </div>
        ),
        value: item.resourceID,
      }))
  if (!isAIAgent) {
    options.unshift({
      label: (
        <Space
          size="8px"
          direction="horizontal"
          alignItems="center"
          css={createNewStyle}
        >
          <AddIcon size="16px" />
          {t("editor.action.panel.option.resource.new")}
        </Space>
      ),
      value: "create",
    })
  }

  return (
    <>
      <Select
        w="100%"
        colorScheme="techPurple"
        options={options}
        value={
          resourceID ||
          t(
            "editor.action.panel.label.placeholder.missing_resource.choose_a_resource",
          )
        }
        onChange={(value) => {
          if (value === "create" && !isAIAgent) {
            track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
              element: "replacement_dropdown_create_new",
            })
            setGeneratorVisible(true)
            return
          }
          changeResourceID(value as string)
        }}
        onClick={() => {
          track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
            element: "replacement_dropdown",
          })
        }}
      />

      {generatorVisible && (
        <ResourceGeneratorProvider
          allResource={resourceList}
          createOrUpdateResourceCallback={createOrUpdateResourceCallback}
        >
          <ResourceGenerator
            visible={generatorVisible}
            onClose={() => {
              setGeneratorVisible(false)
            }}
            defaultConfig={{
              defaultResourceType: origanResourceType as ResourceType,
              defaultStep: isMysqlLike ? "select" : "createResource",
              canBack: false,
            }}
            filterResourceType={(resourceType) => {
              if (isMysqlLike) {
                return LIKE_MYSQL_TYPES.includes(resourceType)
              }
              return true
            }}
          />
        </ResourceGeneratorProvider>
      )}
    </>
  )
}

export default ResourceChoose
