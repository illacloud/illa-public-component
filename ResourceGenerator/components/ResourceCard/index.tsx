import { getIconFromResourceType } from "@illa-public/icon"
import { FC, Suspense } from "react"
import {
  getResourceNameFromResourceType,
  getResourceSubTitleFromResourceType,
} from "../../utils"
import { ResourceCardSelectorProps } from "./interface"
import {
  applyItemStyle,
  nameStyle,
  subTitleStyle,
  titleContainerStyle,
} from "./style"

export const ResourceCard: FC<ResourceCardSelectorProps> = (props) => {
  const { resourceType, onSelect } = props

  const subTitle = getResourceSubTitleFromResourceType(resourceType)

  return (
    <div
      css={applyItemStyle}
      onClick={() => {
        onSelect?.(resourceType)
      }}
    >
      <Suspense>{getIconFromResourceType(resourceType, "24px")}</Suspense>
      <div css={titleContainerStyle}>
        <div css={nameStyle}>
          {getResourceNameFromResourceType(resourceType)}
        </div>
        {subTitle !== "" && <div css={subTitleStyle}>{subTitle}</div>}
      </div>
    </div>
  )
}

ResourceCard.displayName = "ResourceCard"
