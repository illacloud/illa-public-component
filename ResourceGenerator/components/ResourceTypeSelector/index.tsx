import { FC } from "react"
import { ResourceTypeList } from "../../config"
import { ResourceCard } from "../ResourceCard"
import { SuggestResourceCard } from "../ResourceCard/suggestCard"
import { ResourceTypeSelectorProps } from "./interface"
import { categoryStyle, containerStyle, resourceListStyle } from "./style"

export const ResourceTypeSelector: FC<ResourceTypeSelectorProps> = (props) => {
  const { onSelect, filterResourceType } = props

  return (
    <div css={containerStyle}>
      {ResourceTypeList.map(({ title, item, category }) => (
        <div key={category}>
          <span css={categoryStyle}>{title}</span>
          {category === "notFind" ? (
            <div css={resourceListStyle}>
              <SuggestResourceCard />
            </div>
          ) : (
            <div css={resourceListStyle}>
              {item
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
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

ResourceTypeSelector.displayName = "ResourceTypeSelector"
