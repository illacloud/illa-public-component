import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@illa-design/react"
import { MoreAction } from "./moreAction"
import { buttonGroup, headerWrapperStyle, titleStyle } from "./style"

export const Header: FC = () => {
  const { t } = useTranslation()

  const handleClickInviteButton = () => {}

  return (
    <div css={headerWrapperStyle}>
      <h1 css={titleStyle}>{t("user_management.page.member")}</h1>
      <div css={buttonGroup}>
        <MoreAction />
        <Button
          w="200px"
          colorScheme="techPurple"
          onClick={handleClickInviteButton}
        >
          {t("user_management.page.invite")}
        </Button>
      </div>
    </div>
  )
}
