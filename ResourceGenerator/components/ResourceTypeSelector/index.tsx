import { FC } from "react"
import { ResourceTypeList } from "../../config"
import { ResourceCard } from "../ResourceCard"
import { SuggestResourceCard } from "../ResourceCard/suggestCard"
import { ResourceTypeSelectorProps } from "./interface"
import { categoryStyle, containerStyle, resourceListStyle } from "./style"

export const ResourceTypeSelector: FC<ResourceTypeSelectorProps> = (props) => {
  const { onSelect, filterResourceType } = props

  const finalResourceTypeList = ResourceTypeList.filter((resource) => {
    const { category, item } = resource
    if (category === "notFind") {
      return true
    }

    const finalItems = item
      .filter(({ hidden }) => !hidden)
      .filter(({ resourceType }) => {
        if (filterResourceType) {
          return filterResourceType(resourceType)
        }
        return resourceType
      })
    return finalItems.length > 0
  })

  return (
    <div css={containerStyle}>
      {finalResourceTypeList.map(({ title, item, category }) => {
        return (
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
        )
      })}
    </div>
  )
}

ResourceTypeSelector.displayName = "ResourceTypeSelector"
