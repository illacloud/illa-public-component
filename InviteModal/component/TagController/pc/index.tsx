import { debounce } from "lodash-es"
import { FC, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Select, Skeleton, Space, Tag } from "@illa-design/react"
import { HASHTAG_REQUEST_TYPE } from "../../../constants"
import { fetchFuzzySearchHashTag } from "../../../service"
import { TagControllerProps } from "../interface"
import {
  fetchAgentDetailInfoByAgentID,
  fetchAppDetailInfoByAppID,
  fetchRecommendHashtag,
} from "../service"
import {
  recommendLabelStyle,
  tagContainer,
  tagInputContainerStyle,
  titleStyle,
} from "./style"

export const TagControllerPC: FC<TagControllerProps> = (props) => {
  const { productType, productID, productContributed, onTagChange } = props

  const { t } = useTranslation()

  const currentInputValue = useRef<string>("")

  const [currentHashtags, setCurrentHashtags] = useState<string[]>([])

  const [recommendTags, setRecommendTags] = useState<string[]>([])

  const [searchRecommendTags, setSearchRecommendTags] = useState<string[]>([])

  const [searchRecommendTagsLoading, setSearchRecommendTagsLoading] =
    useState(false)

  useEffect(() => {
    if (!productContributed) {
      setCurrentHashtags([])
      return
    }
    switch (productType) {
      case HASHTAG_REQUEST_TYPE.UNIT_TYPE_APP:
        fetchAppDetailInfoByAppID(productID).then((res) => {
          setCurrentHashtags(res.data.marketplace.hashtags)
        })
        break
      case HASHTAG_REQUEST_TYPE.UNIT_TYPE_AI_AGENT:
        fetchAgentDetailInfoByAgentID(productID).then((res) => {
          setCurrentHashtags(res.data.marketplace.hashtags)
        })
        break
    }
  }, [productContributed, productID, productType])

  const debounceSearchKeywords = useRef(
    debounce(async (keywords: string) => {
      setSearchRecommendTagsLoading(true)
      try {
        const match = await fetchFuzzySearchHashTag(keywords)
        if (currentInputValue.current === keywords) {
          setSearchRecommendTags(match.data.match)
        }
      } catch (e) {
      } finally {
        setSearchRecommendTagsLoading(false)
      }
    }, 160),
  )

  useEffect(() => {
    fetchRecommendHashtag(productType).then((res) => {
      setRecommendTags(res.data.hashtags)
      if (currentInputValue.current === "") {
        setSearchRecommendTags(res.data.hashtags)
      }
    })
  }, [productType])

  return (
    <div css={tagContainer}>
      <div css={titleStyle}>{t("contribute.tag.tag")}</div>
      <div css={tagInputContainerStyle}>
        <Select
          loading={searchRecommendTagsLoading}
          options={searchRecommendTags}
          multiple
          flexShrink="1"
          flexGrow="1"
          filterOption={(inputValue, option) => {
            if (inputValue === option.value) {
              return true
            } else {
              return searchRecommendTags.includes(option.value.toString())
            }
          }}
          defaultFilterOption={(inputValue, option) => {
            return searchRecommendTags.includes(option.value.toString())
          }}
          placeholder="Enter↵"
          value={currentHashtags}
          onChange={(value) => {
            onTagChange?.(value as string[])
            setCurrentHashtags(value as string[])
          }}
          onInputValueChange={(value) => {
            currentInputValue.current = value as string
            if (value === "") {
              setSearchRecommendTags(recommendTags)
            } else {
              debounceSearchKeywords.current(value as string)
            }
          }}
          colorScheme="techPurple"
          labelInValue={false}
          inputAsOption
          showSearch
        />
      </div>
      <div css={recommendLabelStyle}>{t("contribute.tag.recommended")}</div>
      {recommendTags.length === 0 ? (
        <Skeleton text={{ rows: 4 }} opac={0.5} animation />
      ) : (
        <Space wrap>
          {recommendTags.map((tag) => (
            <Tag
              clickable
              variant={currentHashtags.includes(tag) ? "outline" : "light"}
              key={tag}
              colorScheme={
                currentHashtags.includes(tag) ? "techPurple" : "grayBlue"
              }
              onClick={() => {
                if (currentHashtags.includes(tag)) {
                  return
                }
                const newTags = [...currentHashtags, tag]
                setCurrentHashtags(newTags)
                onTagChange?.(newTags)
              }}
            >
              {tag}
            </Tag>
          ))}
        </Space>
      )}
    </div>
  )
}
