import { FC } from "react"
import { Tag } from "@illa-design/react"
import { LIMIT_TAG_NUM } from "./constants"
import { CardHashtagsProps } from "./interface"
import {
  cardTagsContainerStyle,
  tagContainerCoverStyle,
  tagContentStyle,
} from "./style"

export * from "./interface"

export const CardHashtags: FC<CardHashtagsProps> = (props) => {
  const { cardHashtags } = props
  const tagLength = cardHashtags.length

  if (!cardHashtags || tagLength < 1) return null
  return (
    <div css={cardTagsContainerStyle}>
      {cardHashtags.slice(0, LIMIT_TAG_NUM).map((name) => (
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

CardHashtags.displayName = "CardHashtags"
