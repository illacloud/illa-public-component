import { USER_ROLE } from "@illa-public/user-data"
import { isBiggerThanTargetRole } from "@illa-public/user-role-utils"
import { isEqual } from "lodash"
import { FC, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Button, InputTag, getColor, useMessage } from "@illa-design/react"
import { TagControllerProps } from "../interface"
import { updateContributeAttr } from "../service"
import { tagContainer, tagInputContainerStyle, titleStyle } from "./style"


export const TagControllerPC: FC<TagControllerProps> = (props) => {
  const {
    userRoleForThisProduct,
    productType,
    productID,
    defaultAppContribute,
    teamID,
  } = props

  const { t } = useTranslation()

  const [savingHashtags, setSavingHashtags] = useState<string[]>([])

  const [currentHashtags, setCurrentHashtags] = useState<string[]>([])

  const [saving, setSaving] = useState(false)

  const message = useMessage()

  useEffect(() => {
    if (defaultAppContribute) {
      setSavingHashtags([])
      setCurrentHashtags([])
    }
    switch (productType) {

    }
  }, [productID, productType])

  return (
    <div css={tagContainer}>
      <div css={titleStyle}>{t("Tag")}</div>
      <div css={tagInputContainerStyle}>
        <InputTag
          labelInValue={false}
          readOnly={
            !isBiggerThanTargetRole(
              USER_ROLE.VIEWER,
              userRoleForThisProduct,
              false,
            )
          }
          saveOnBlur={true}
          value={currentHashtags}
          onChange={(value) => {
            setCurrentHashtags(value as string[])
          }}
        />
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
          {t("Saving")}
        </Button>
      </div>
    </div>
  )
}