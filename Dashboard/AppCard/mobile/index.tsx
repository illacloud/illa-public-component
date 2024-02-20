import { Avatar } from "@illa-public/avatar"
import { APP_TYPE } from "@illa-public/public-types"
import { fromNow, getAuthToken, getILLABuilderURL } from "@illa-public/utils"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Link, useParams } from "react-router-dom"
import { Button, Tag } from "@illa-design/react"
import DesktopIcon from "../assets/desktop.svg?react"
import MobileIcon from "../assets/mobile.svg?react"
import { MobileCardItemProps } from "./interface"
import {
  cardItemContainerStyle,
  cardItemFooterContainerStyle,
  descContainerStyle,
  editTimeInfo,
  editorAvatarStyle,
  editorInfoContainerStyle,
  headerContainerStyle,
  linkButtonStyle,
  tagContainerStyle,
  titleStyle,
} from "./style"

export const MobileAppCardItem: FC<MobileCardItemProps> = (props) => {
  const {
    appName,
    appActivity,
    appDeployed,
    appID,
    description,
    publishedToMarketplace,
    editorInfo,
    appType = APP_TYPE.PC,
    cardType,
  } = props

  const { t } = useTranslation()
  const { teamIdentifier } = useParams()

  return (
    <div css={cardItemContainerStyle}>
      <header css={headerContainerStyle}>
        <h6 css={titleStyle}>{appName}</h6>
        <p css={editTimeInfo}>
          {t("dashboard.app.edited_time", {
            time: fromNow(appActivity.modifiedAt),
            user: appActivity.modifier,
          })}
        </p>
        <div css={tagContainerStyle}>
          {appDeployed ? (
            <Tag colorScheme="green" size="small">
              {t("new_dashboard.status.deployed")}
            </Tag>
          ) : (
            <Tag colorScheme="grayBlue" size="small">
              {t("new_dashboard.status.undeploy")}
            </Tag>
          )}
          {cardType === "app" && appType === APP_TYPE.MOBILE ? (
            <Tag colorScheme="grayBlue" size="small" icon={<MobileIcon />}>
              {t("new_dashboard.type.mobile")}
            </Tag>
          ) : (
            <Tag colorScheme="grayBlue" size="small" icon={<DesktopIcon />}>
              {t("new_dashboard.type.desktop")}
            </Tag>
          )}
          {publishedToMarketplace && (
            <Tag size="small" colorScheme="techPurple">
              {t("dashboard.common.marketplace")}
            </Tag>
          )}
        </div>
      </header>
      <p css={descContainerStyle}>
        {description || t("new_dashboard.desc.no_description")}
      </p>
      <footer css={cardItemFooterContainerStyle}>
        <div css={editorInfoContainerStyle}>
          {editorInfo?.map((editor) => (
            <Avatar
              size={24}
              key={editor.userID}
              css={editorAvatarStyle}
              avatarUrl={editor.avatar}
              name={editor.nickname}
              id={editor.userID}
            />
          ))}
        </div>
        {cardType === "app" && (
          <Link
            to={`${getILLABuilderURL(
              window.customDomain,
            )}/${teamIdentifier}/deploy/app/${appID}?token=${getAuthToken()}`}
            target="_blank"
            css={linkButtonStyle}
          >
            <Button
              colorScheme="grayBlue"
              variant="outline"
              size="large"
              w="100%"
            >
              {t("dashboard.common.launch")}
            </Button>
          </Link>
        )}
      </footer>
    </div>
  )
}
