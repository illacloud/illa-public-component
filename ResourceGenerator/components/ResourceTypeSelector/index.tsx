import { FC } from "react"
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
            {item
              .filter(({ hidden }) => !hidden)
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
        </div>
      ))}
      <WhiteList />
    </div>
  )
}

ResourceTypeSelector.displayName = "ResourceTypeSelector"
