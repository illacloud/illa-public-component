import { Avatar } from "@illa-public/avatar"
import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { APP_TYPE } from "@illa-public/public-types"
import { getCurrentTeamInfo, getPlanUtils } from "@illa-public/user-data"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
  canManage,
} from "@illa-public/user-role-utils"
import {
  getAuthToken,
  getILLABuilderURL,
  isCloudVersion,
} from "@illa-public/utils"
import { fromNow } from "@illa-public/utils"
import { FC, useCallback, useContext, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Space, Tag } from "@illa-design/react"
import DesktopIcon from "../assets/desktop.svg?react"
import MobileIcon from "../assets/mobile.svg?react"
import { PCAppCardProps } from "../interface"
import { ActionButtonGroup } from "./components/ActionButtonGroup"
import { AppCardActionItem } from "./components/AppCardItem"
import { AppConfigSelect } from "./components/AppConfigSelect"
import {
  appNameStyle,
  cardStyle,
  descriptionStyle,
  editedStyle,
  editorAvatarStyle,
  editorContainerStyle,
  footerStyle,
  headerStyle,
  titleInfoStyle,
} from "./style"

export * from "./context"

export const PCAppCard: FC<PCAppCardProps> = (props) => {
  const { t } = useTranslation()
  const { appInfo } = props
  const { teamIdentifier } = useParams()
  const { track } = useContext(MixpanelTrackContext)

  const teamInfo = useSelector(getCurrentTeamInfo)!!

  const canEditApp = canManage(
    teamInfo.myRole,
    ATTRIBUTE_GROUP.APP,
    getPlanUtils(teamInfo),
    ACTION_MANAGE.EDIT_APP,
  )

  const onClickCard = useCallback(() => {
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      {
        element: "card",
        parameter3: "team",
        parameter5: appInfo.appId,
      },
      "both",
    )
    if (canEditApp) {
      window.open(
        `${getILLABuilderURL(window.customDomain)}/${teamIdentifier}/app/${
          appInfo.appId
        }?token=${getAuthToken()}`,
        "_blank",
      )
    } else if (appInfo.deployed) {
      window.open(
        `${getILLABuilderURL(
          window.customDomain,
        )}/${teamIdentifier}/deploy/app/${
          appInfo.appId
        }?token=${getAuthToken()}`,
        "_blank",
      )
    }
  }, [appInfo.appId, appInfo.deployed, canEditApp, teamIdentifier, track])

  const editors = useMemo(() => {
    return (
      <div css={editorContainerStyle}>
        {appInfo?.editedBy?.map((editor) =>
          editor ? (
            <Avatar
              key={editor.userID}
              css={editorAvatarStyle}
              avatarUrl={editor.avatar}
              name={editor.nickname}
              id={editor.userID}
            />
          ) : null,
        )}
      </div>
    )
  }, [appInfo?.editedBy])

  return (
    <div css={cardStyle} onClick={onClickCard}>
      <div css={headerStyle}>
        <div css={titleInfoStyle}>
          <div css={appNameStyle}>{appInfo.appName}</div>
          <div css={editedStyle}>
            {t("dashboard.app.edited_time", {
              time: fromNow(appInfo.updatedAt),
              user: appInfo.appActivity.modifier,
            })}
          </div>
          <Space>
            {appInfo.deployed ? (
              <Tag colorScheme="green" size="small">
                {t("new_dashboard.status.deployed")}
              </Tag>
            ) : (
              <Tag colorScheme="grayBlue" size="small">
                {t("new_dashboard.status.undeploy")}
              </Tag>
            )}
            {appInfo.config.appType === APP_TYPE.MOBILE ? (
              <Tag colorScheme="grayBlue" size="small" icon={<MobileIcon />}>
                {t("new_dashboard.type.mobile")}
              </Tag>
            ) : (
              <Tag colorScheme="grayBlue" size="small" icon={<DesktopIcon />}>
                {t("new_dashboard.type.desktop")}
              </Tag>
            )}
            {appInfo.config.publishedToMarketplace && (
              <Tag size="small" colorScheme="techPurple">
                {t("dashboard.common.marketplace")}
              </Tag>
            )}
          </Space>
        </div>
        <AppCardActionItem
          appID={appInfo.appId}
          appDeployed={appInfo.deployed}
          appName={appInfo.appName}
          appConfig={appInfo.config}
        />
      </div>
      <div>
        <div css={descriptionStyle}>
          {appInfo.config.description || t("new_dashboard.desc.no_description")}
        </div>
      </div>
      {isCloudVersion ? (
        <>
          {editors}
          <div css={footerStyle}>
            <div
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <AppConfigSelect
                appId={appInfo.appId}
                isPublic={appInfo.config.public}
                isDeployed={appInfo.deployed}
                canEditApp={canEditApp}
              />
            </div>
            <ActionButtonGroup
              appID={appInfo.appId}
              appDeployed={appInfo.deployed}
              canEditApp={canEditApp}
            />
          </div>
        </>
      ) : (
        <div css={footerStyle}>
          {editors}
          <ActionButtonGroup
            appID={appInfo.appId}
            appDeployed={appInfo.deployed}
            canEditApp={canEditApp}
          />
        </div>
      )}
    </div>
  )
}

PCAppCard.displayName = "AppCard"
