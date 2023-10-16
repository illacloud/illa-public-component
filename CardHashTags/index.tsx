import { FC } from "react"
import { Tag } from "@illa-design/react"
import { LIMIT_TAG_NUM } from "./constants"
import { CardHashTagsProps } from "./interface"
import {
  cardTagsContainerStyle,
  tagContainerCoverStyle,
  tagContentStyle,
} from "./style"

export * from "./interface"

export const CardHashTags: FC<CardHashTagsProps> = (props) => {
  const { cardHashTags } = props
  const tagLength = cardHashTags.length

  if (!cardHashTags || tagLength < 1) return null
  return (
    <div css={cardTagsContainerStyle}>
      {cardHashTags.slice(0, LIMIT_TAG_NUM).map((name) => (
        <Tag key={name} colorScheme="grayBlue" css={tagContainerCoverStyle}>
          <span css={tagContentStyle}>
            <span>{name}</span>
          </span>
        </Tag>
      ))}
      {tagLength > LIMIT_TAG_NUM && (
        <Tag colorScheme="grayBlue" css={tagContainerCoverStyle}>
          <span css={tagContentStyle}>
            <span>+{tagLength - LIMIT_TAG_NUM}</span>
          </span>
        </Tag>
      )}
    </div>
  )
}

CardHashTags.displayName = "CardHashTags"
