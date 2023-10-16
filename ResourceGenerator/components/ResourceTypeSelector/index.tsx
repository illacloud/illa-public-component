// import {
//   ILLA_MIXPANEL_BUILDER_PAGE_NAME,
//   ILLA_MIXPANEL_EVENT_TYPE,
// } from "@illa-public/mixpanel-utils"
import { FC } from "react"
// import { track } from "@/utils/mixpanelHelper"
import { ResourceTypeList } from "../../config"
import { ResourceCard } from "../ResourceCard"
import { WhiteList } from "../WhiteList"
import { ResourceTypeSelectorProps } from "./interface"
import { categoryStyle, containerStyle, resourceListStyle } from "./style"

export const ResourceTypeSelector: FC<ResourceTypeSelectorProps> = (props) => {
  const { onSelect } = props

  return (
    <div css={containerStyle}>
      {ResourceTypeList.map(({ title, item, category }) => (
        <div key={category}>
          <span css={categoryStyle}>{title}</span>
          <div css={resourceListStyle}>
            {item.map((resourceType) => (
              <ResourceCard
                key={resourceType}
                onSelect={(item) => {
                  onSelect(item)
                }}
                resourceType={resourceType}
              />
            ))}
          </div>
        </div>
      ))}
      <WhiteList
      // onCopyIpReport={() => {
      //   track(
      //     ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      //     ILLA_MIXPANEL_BUILDER_PAGE_NAME.RESOURCE,
      //     { element: "resource_type_modal_copy" },
      //   )
      // }}
      />
    </div>
  )
}

ResourceTypeSelector.displayName = "ResourceTypeSelector"
