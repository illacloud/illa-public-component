import { FC } from "react"
import { useTranslation } from "react-i18next"
import { WHITE_LIST_IP } from "../../config"
import {
  descriptionContainerStyle,
  headerContainerStyle,
  ipItemStyle,
  ipListContainerStyle,
  titleContainerStyle,
} from "./style"

export const WhiteList: FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <div css={headerContainerStyle}>
        <h6 css={titleContainerStyle}>
          {t("editor.action.resource.tip.allowlist.title")}
        </h6>
        <p css={descriptionContainerStyle}>
          {t("editor.action.resource.tip.allowlist.message")}
        </p>
      </div>
      <div css={ipListContainerStyle}>
        {WHITE_LIST_IP.map((ip) => (
          <p key={ip} css={ipItemStyle}>
            {ip}
          </p>
        ))}
      </div>
    </>
  )
}
