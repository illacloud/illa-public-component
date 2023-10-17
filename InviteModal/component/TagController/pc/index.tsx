import { USER_ROLE } from "@illa-public/user-data"
import { isBiggerThanTargetRole } from "@illa-public/user-role-utils"
import { isEqual } from "lodash"
import { FC, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  Button,
  InputTag,
  Space,
  Tag,
  getColor,
  useMessage,
} from "@illa-design/react"
import { HASHTAG_REQUEST_TYPE } from "../../../constants"
import { TagControllerProps } from "../interface"
import {
  fetchAgentDetailInfoByAgentID,
  fetchAppDetailInfoByAppID,
  fetchRecommendHashtag,
  updateContributeAttr,
} from "../service"
import {
  recommendLabelStyle,
  tagContainer,
  tagInputContainerStyle,
  titleStyle,
} from "./style"


export const TagControllerPC: FC<TagControllerProps> = (props) => {
  const {
    userRoleForThisProduct,
    productType,
    productID,
    defaultAppContribute,
    teamID,
    showSave = true,
    onTagChange,
  } = props

  const { t } = useTranslation()

  const [savingHashtags, setSavingHashtags] = useState<string[]>([])

  const [currentHashtags, setCurrentHashtags] = useState<string[]>([])

  const [saving, setSaving] = useState(false)

  const message = useMessage()

  const [recommendTags, setRecommendTags] = useState<string[]>([])

  const readOnly =
    !isBiggerThanTargetRole(USER_ROLE.VIEWER, userRoleForThisProduct, false) ||
    teamID === undefined

  useEffect(() => {
    if (defaultAppContribute) {
      setSavingHashtags([])
      setCurrentHashtags([])
    }
    switch (productType) {
      case HASHTAG_REQUEST_TYPE.UNIT_TYPE_AI_AGENT:
        fetchAppDetailInfoByAppID(productID).then((res) => {
          setSavingHashtags(res.data.marketplace.hashtags)
          setCurrentHashtags(res.data.marketplace.hashtags)
        })
        break
      case HASHTAG_REQUEST_TYPE.UNIT_TYPE_APP:
        fetchAgentDetailInfoByAgentID(productID).then((res) => {
          setSavingHashtags(res.data.marketplace.hashtags)
          setCurrentHashtags(res.data.marketplace.hashtags)
        })
        break
    }
  }, [defaultAppContribute, productID, productType])

  useEffect(() => {
    fetchRecommendHashtag(productType).then((res) => {
      setRecommendTags(res.data)
    })
  }, [productType])

  return (
    <div css={tagContainer}>
      <div css={titleStyle}>{t("Tag")}</div>
      <div css={tagInputContainerStyle}>
        <InputTag
          validate={(inputValue, values) => {
            return !(values as string[]).includes(inputValue)
          }}
          labelInValue={false}
          readOnly={isBiggerThanTargetRole(
            USER_ROLE.VIEWER,
            userRoleForThisProduct,
            false,
          )}
          saveOnBlur={true}
          value={currentHashtags}
          onChange={(value) => {
            setCurrentHashtags(value as string[])
            onTagChange?.(value as string[])
          }}
        />
        {!readOnly && showSave && (
          <Button
            ml="8px"
            w="80px"
            colorScheme={getColor("grayBlue", "02")}
            loading={saving}
            disabled={isEqual(savingHashtags, currentHashtags)}
            onClick={async () => {
              setSaving(true)
              try {
                await updateContributeAttr(
                  teamID,
                  productID,
                  productType,
                  currentHashtags,
                )
              } catch (e) {
                message.error({
                  content: t("gg"),
                })
              } finally {
                setSaving(false)
              }
            }}
          >
            {t("Save")}
          </Button>
        )}
      </div>
      <div css={recommendLabelStyle}>{t("recommand tag")}</div>
      <Space mt="8px">
        {recommendTags.map((tag) => (
          <Tag
            key={tag}
            onClick={() => {
              if (currentHashtags.includes(tag)) {
                return
              }
              setCurrentHashtags([...currentHashtags, tag])
            }}
          >
            {tag}
          </Tag>
        ))}
      </Space>
    </div>
  )
}