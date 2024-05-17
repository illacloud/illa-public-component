import {
  COPY_STATUS,
  copyToClipboard,
  isCloudVersion,
} from "@illa-public/utils"
import { FC, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  Card,
  CopyIcon,
  DownIcon,
  UpIcon,
  useMessage,
} from "@illa-design/react"
import { WHITE_LIST_IP } from "../../config"
import {
  ipListContainerStyle,
  ipListStyle,
  whiteListButtonContainerStyle,
  whiteListButtonStyle,
  whiteListContentContainerStyle,
  whiteListContentStyle,
  whiteListDescriptionStyle,
  whiteListOperationIconStyle,
  whiteListTitleStyle,
} from "./style"

interface IWhiteList {
  onCopyIpReport?: () => void
}

export const WhiteList: FC<IWhiteList> = (props) => {
  const { t } = useTranslation()
  const message = useMessage()
  const { onCopyIpReport } = props

  const [showIPList, setShowIPList] = useState<boolean>(false)

  const handleOperationIconClick = () => {
    setShowIPList((prevState) => !prevState)
  }

  const handleCopyClick = useCallback(() => {
    onCopyIpReport && onCopyIpReport()
    const copyResult = copyToClipboard(WHITE_LIST_IP.join("\n"))
    if (copyResult === COPY_STATUS.SUCCESS) {
      message.success({
        content: t("copied"),
      })
    } else {
      message.error({
        content: t("copy_failed"),
      })
    }
  }, [message, onCopyIpReport, t])

  return (
    <div>
      <div css={whiteListContentContainerStyle}>
        <div css={whiteListContentStyle}>
          <div css={whiteListTitleStyle}>
            {t("editor.action.resource.tip.allowlist.title")}
          </div>
          <div css={whiteListDescriptionStyle}>
            {t("editor.action.resource.tip.allowlist.message")}
          </div>
        </div>
        {isCloudVersion && (
          <div css={whiteListButtonContainerStyle}>
            <div css={whiteListButtonStyle} onClick={handleCopyClick}>
              <CopyIcon />
              <span>{t("editor.action.resource.button.copy_ip")}</span>
            </div>
            <span
              css={whiteListOperationIconStyle}
              onClick={handleOperationIconClick}
            >
              {showIPList ? <UpIcon /> : <DownIcon />}
            </span>
          </div>
        )}
      </div>
      {isCloudVersion && showIPList && (
        <div css={ipListContainerStyle}>
          <Card>
            <div css={ipListStyle}>
              {WHITE_LIST_IP.map((ip) => (
                <div key={ip}>{ip}</div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
WhiteList.displayName = "WhiteList"
