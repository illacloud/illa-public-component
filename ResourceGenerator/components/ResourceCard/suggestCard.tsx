import { FC } from "react"
import { useTranslation } from "react-i18next"
import { CommentIcon } from "@illa-design/react"
import { applyItemStyle, nameStyle, titleContainerStyle } from "./style"

export const SuggestResourceCard: FC = () => {
  const { t } = useTranslation()
  return (
    <div
      css={applyItemStyle}
      onClick={() => {
        window.open(
          "https://builder.illacloud.com/illacloud/deploy/app/ILAbx4p1C7Q2",
          "_blank",
        )
      }}
    >
      <CommentIcon size="24px" />
      <div css={titleContainerStyle}>
        <div css={nameStyle}>{t("editor.action.form.option.tell_us")}</div>
      </div>
    </div>
  )
}

SuggestResourceCard.displayName = "SuggestResourceCard"
