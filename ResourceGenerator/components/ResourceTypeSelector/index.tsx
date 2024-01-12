import { FC, ReactNode } from "react"
import { ResourceItem, ResourceTypeList } from "../../config"
import { ResourceCard } from "../ResourceCard"
import { SuggestResourceCard } from "../ResourceCard/suggestCard"
import { WhiteList } from "../RowWhiteList"
import { ResourceTypeSelectorProps } from "./interface"
import { categoryStyle, containerStyle, resourceListStyle } from "./style"

export const ResourceTypeSelector: FC<ResourceTypeSelectorProps> = (props) => {
  const { onSelect, filterResourceType } = props

  const getResourceCardList = (resourceItem: ResourceItem[]) => {
    return resourceItem
      .filter(({ hidden }) => !hidden)
      .filter(({ resourceType }) => {
        if (filterResourceType) {
          return filterResourceType(resourceType)
        }
        return resourceType
      })
      .map(({ resourceType }) => (
        <ResourceCard
          key={resourceType}
          onSelect={(item) => {
            onSelect(item)
          }}
          resourceType={resourceType}
        />
      )) as ReactNode[]
  }

  return (
    <div css={containerStyle}>
      {ResourceTypeList.map(({ title, item, category }) => (
        <div key={category}>
          <span css={categoryStyle}>{title}</span>
          <div css={resourceListStyle}>
            {getResourceCardList(item).concat(
              (category === "databases" ? (
                <SuggestResourceCard />
              ) : undefined) as ReactNode,
            )}
          </div>
        </div>
      ))}
      <WhiteList />
    </div>
  )
}

ResourceTypeSelector.displayName = "ResourceTypeSelector"
