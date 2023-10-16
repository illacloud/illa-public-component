import { USER_ROLE } from "@illa-public/user-data"
import { isBiggerThanTargetRole } from "@illa-public/user-role-utils"
import { FC, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Button, InputTag, getColor } from "@illa-design/react"
import { updateContributeAttr } from "../../AgentToMarketplace/service"
import { TagControllerProps } from "../interface"
import { tagContainer, tagInputContainerStyle, titleStyle } from "./style"


export const TagControllerPC: FC<TagControllerProps> = (props) => {
  const { userRoleForThisProduct, productType, productID, teamID } = props

  const { t } = useTranslation()

  const [currentHashTag, setCurrentHashTag] = useState<string[]>([])

  const [saving, setSaving] = useState(false)

  useEffect(() => {}, [productID, productType])

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
          value={currentHashTag}
          onChange={(value) => {
            setCurrentHashTag(value as string[])
          }}
        />
        <Button
          ml="8px"
          w="80px"
          colorScheme={getColor("grayBlue", "02")}
          loading={saving}
          onClick={async () => {
            setSaving(true)
            try {
              await updateContributeAttr(teamID, productID, currentHashTag)
            } catch (e) {
              console.error(e)
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