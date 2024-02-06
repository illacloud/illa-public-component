import { ShareAppPC } from "@illa-public/invite-modal"
import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
  MixpanelTrackProvider,
} from "@illa-public/mixpanel-utils"
import { MemberInfo, USER_STATUS } from "@illa-public/public-types"
import { useUpgradeModal } from "@illa-public/upgrade-modal"
import {
  getCurrentTeamInfo,
  getCurrentUser,
  getPlanUtils,
  teamActions,
} from "@illa-public/user-data"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
  canManage,
  canManageInvite,
  canUseUpgradeFeature,
  openShareAppModal,
  showShareAppModal,
} from "@illa-public/user-role-utils"
import {
  getILLABuilderURL,
  getMarketLinkTemplate,
  isCloudVersion,
} from "@illa-public/utils"
import { getAuthToken } from "@illa-public/utils"
import { AnimatePresence } from "framer-motion"
import { FC, useCallback, useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import {
  Button,
  CopyIcon,
  DeleteOutlineIcon,
  DependencyIcon,
  DropList,
  DropListItem,
  Dropdown,
  MoreIcon,
  PenIcon,
  useMessage,
  useModal,
} from "@illa-design/react"
import { copyToClipboard } from "../../../../utils"
import { AppListContext } from "../../context"
import { AppSettingModal } from "../AppSettingModal"
import { AppCardActionItemProps } from "./interface"

export const AppCardActionItem: FC<AppCardActionItemProps> = (props) => {
  const { appID, appName, appDeployed, appConfig } = props

  const { t } = useTranslation()
  const message = useMessage()
  const modal = useModal()
  const dispatch = useDispatch()
  const { deleteApp, copyApp, updateAppConfig } = useContext(AppListContext)
  const { track, pageName } = useContext(MixpanelTrackContext)

  const teamInfo = useSelector(getCurrentTeamInfo)!!

  const canEditApp = canManage(
    teamInfo.myRole,
    ATTRIBUTE_GROUP.APP,
    getPlanUtils(teamInfo),
    ACTION_MANAGE.EDIT_APP,
  )

  const currentUserInfo = useSelector(getCurrentUser)

  const upgradeModal = useUpgradeModal()
  const [shareVisible, setShareVisible] = useState(false)
  const [appSettingVisible, setAppSettingVisible] = useState(false)

  const showInvite = canManageInvite(
    teamInfo.myRole,
    teamInfo.permission.allowEditorManageTeamMember,
    teamInfo.permission.allowViewerManageTeamMember,
  )

  const canShowShareButton = showShareAppModal(
    teamInfo,
    teamInfo.myRole,
    appConfig.public,
    appConfig.publishedToMarketplace,
    appDeployed,
  )

  const canUseBillingFeature = canUseUpgradeFeature(
    teamInfo.myRole,
    getPlanUtils(teamInfo),
    teamInfo?.totalTeamLicense?.teamLicensePurchased,
    teamInfo?.totalTeamLicense?.teamLicenseAllPaid,
  )

  const handleDuplicateApp = async () => {
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      {
        element: "app_duplicate",
        parameter5: appID,
      },
      "both",
    )
    copyApp(appID).catch(() => {
      message.error({
        content: t("dashboard.app.duplicate_fail"),
      })
    })
  }

  const handleOpenAppSettingModal = () => {
    setAppSettingVisible(true)
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.SHOW,
      {
        element: "app_setting_modal",
        parameter5: appID,
      },
      "both",
    )
  }

  const handleOpenInviteModal = useCallback(() => {
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      {
        element: "invite_entry",
        parameter5: appID,
      },
      "both",
    )
    if (
      !openShareAppModal(
        teamInfo,
        teamInfo.myRole,
        appConfig.public,
        appConfig.publishedToMarketplace,
      )
    ) {
      upgradeModal({
        modalType: "upgrade",
        from: "app_card_more_share",
      })
      return
    }
    setShareVisible(true)
  }, [
    appConfig.public,
    appConfig.publishedToMarketplace,
    appID,
    teamInfo,
    track,
    upgradeModal,
  ])

  const handleDeleteApp = useCallback(() => {
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      {
        element: "app_delete",
        parameter5: appID,
      },
      "both",
    )
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      {
        element: "app_delete_modal",
        parameter5: appID,
      },
      "both",
    )
    const modalId = modal.show({
      w: "496px",
      blockOkHide: true,
      title: t("dashboard.common.delete_title"),
      children: t("dashboard.common.delete_content"),
      cancelText: t("dashboard.common.delete_cancel_text"),
      okText: t("dashboard.common.delete_ok_text"),
      okButtonProps: {
        colorScheme: "red",
      },
      maskClosable: false,
      onOk: () => {
        track?.(
          ILLA_MIXPANEL_EVENT_TYPE.CLICK,
          {
            element: "app_delete_modal_delete",
            parameter5: appID,
          },
          "both",
        )

        modal.close(modalId)
        deleteApp(appID).then(
          () => {
            message.success({
              content: t("dashboard.app.trash_success"),
            })
          },
          () => {
            message.error({
              content: t("dashboard.app.trash_failure"),
            })
          },
        )
      },
      onCancel: () => {
        track?.(
          ILLA_MIXPANEL_EVENT_TYPE.CLICK,
          {
            element: "app_delete_modal_close",
            parameter5: appID,
          },
          "both",
        )
      },
    })
  }, [track, appID, modal, t, message, deleteApp])

  const onVisibleChangeForEdit = useCallback(
    (visible: boolean) => {
      if (visible) {
        track?.(
          ILLA_MIXPANEL_EVENT_TYPE.CLICK,
          { element: "app_more", parameter5: appID },
          "both",
        )
        track?.(
          ILLA_MIXPANEL_EVENT_TYPE.SHOW,
          { element: "app_duplicate", parameter5: appID },
          "both",
        )
        track?.(
          ILLA_MIXPANEL_EVENT_TYPE.SHOW,
          { element: "app_delete", parameter5: appID },
          "both",
        )
        canShowShareButton &&
          track?.(
            ILLA_MIXPANEL_EVENT_TYPE.SHOW,
            { element: "invite_entry", parameter5: appID },
            "both",
          )
      }
    },
    [appID, track, canShowShareButton],
  )

  const onVisibleChangeForView = useCallback(
    (visible: boolean) => {
      if (visible) {
        track?.(
          ILLA_MIXPANEL_EVENT_TYPE.CLICK,
          { element: "app_more", parameter5: appID },
          "both",
        )
        track?.(
          ILLA_MIXPANEL_EVENT_TYPE.SHOW,
          { element: "invite_entry", parameter5: appID },
          "both",
        )
      }
    },
    [appID, track],
  )

  useEffect(() => {
    if (canEditApp || (appDeployed && showInvite)) {
      track?.(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        { element: "app_more", parameter5: appID },
        "both",
      )
    }
  }, [canEditApp, appDeployed, showInvite, appID, track])

  useEffect(() => {
    track?.(ILLA_MIXPANEL_EVENT_TYPE.SHOW, { element: "app" }, "both")
  }, [track])

  useEffect(() => {
    shareVisible &&
      track?.(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        {
          element: "invite_modal",
          parameter5: appID,
        },
        "both",
      )
  }, [appID, shareVisible, track])

  useEffect(() => {
    appSettingVisible &&
      track?.(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        { element: "app_setting_modal", parameter5: appID },
        "both",
      )
  }, [appID, appSettingVisible, track])

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      {canEditApp ? (
        <Dropdown
          position="bottom-end"
          trigger="click"
          onVisibleChange={onVisibleChangeForEdit}
          dropList={
            <DropList w={"184px"}>
              <DropListItem
                key="rename"
                value="rename"
                title={
                  <div>
                    <PenIcon mr="8px" />
                    <span>{t("new_dashboard.app_setting.app_setting")}</span>
                  </div>
                }
                onClick={handleOpenAppSettingModal}
              />
              {canShowShareButton && (
                <DropListItem
                  key="share"
                  value="share"
                  title={
                    <div>
                      <DependencyIcon mr="8px" />
                      <span>{t("dashboard.common.share")}</span>
                    </div>
                  }
                  onClick={handleOpenInviteModal}
                />
              )}
              <DropListItem
                key="duplicate"
                value="duplicate"
                title={
                  <div>
                    <CopyIcon mr="8px" />
                    <span>{t("dashboard.common.duplicate")}</span>
                  </div>
                }
                onClick={handleDuplicateApp}
              />
              <DropListItem
                key="delete"
                value="delete"
                title={
                  <div>
                    <DeleteOutlineIcon mr="8px" />
                    <span>{t("dashboard.common.delete")}</span>
                  </div>
                }
                deleted
                onClick={handleDeleteApp}
              />
            </DropList>
          }
        >
          <Button
            variant="text"
            colorScheme="grayBlue"
            leftIcon={<MoreIcon size="14px" />}
          />
        </Dropdown>
      ) : (
        canShowShareButton && (
          <Dropdown
            position="bottom-end"
            trigger="click"
            triggerProps={{
              closeDelay: 0,
              openDelay: 0,
            }}
            onVisibleChange={onVisibleChangeForView}
            dropList={
              <DropList w={"184px"}>
                <DropListItem
                  key="share"
                  value="share"
                  title={
                    <div>
                      <DependencyIcon mr="8px" />
                      <span>{t("dashboard.common.share")}</span>
                    </div>
                  }
                  onClick={handleOpenInviteModal}
                />
              </DropList>
            }
          >
            <Button
              variant="text"
              colorScheme="grayBlue"
              leftIcon={<MoreIcon size="14px" />}
            />
          </Dropdown>
        )
      )}
      <MixpanelTrackProvider
        basicTrack={(event, pageName, properties, extendProperty) => {
          track?.(event, properties, extendProperty)
        }}
        pageName={pageName}
      >
        {shareVisible && isCloudVersion && (
          <ShareAppPC
            itemID={appID}
            onInvitedChange={(userList) => {
              const memberListInfo: MemberInfo[] = userList.map((user) => {
                return {
                  ...user,
                  userID: "",
                  nickname: "",
                  avatar: "",
                  userStatus: USER_STATUS.PENDING,
                  permission: {},
                  createdAt: "",
                  updatedAt: "",
                }
              })
              dispatch(teamActions.updateInvitedUserReducer(memberListInfo))
            }}
            appDesc={appConfig.description}
            appName={appName}
            onAppInfoUpdate={(appConfig) => {
              updateAppConfig(appID, {
                ...appConfig,
                appName: appConfig.appName,
                description: appConfig.appDesc,
                publishWithAIAgent: appConfig.publishWithAIAgent,
              })
            }}
            isDeployed={appDeployed}
            title={t("user_management.modal.social_media.default_text.app", {
              appName: appName,
            })}
            editRedirectURL={`${getILLABuilderURL(window.customDomain)}/${
              teamInfo.identifier
            }/app/${appID}`}
            useRedirectURL={`${getILLABuilderURL(window.customDomain)}/${
              teamInfo.identifier
            }/deploy/app/${appID}`}
            defaultAllowInviteLink={teamInfo.permission.inviteLinkEnabled}
            defaultPublishWithAIAgent={appConfig.publishWithAIAgent}
            onInviteLinkStateChange={(enableInviteLink) => {
              dispatch(
                teamActions.updateTeamMemberPermissionReducer({
                  teamID: teamInfo.id,
                  newPermission: {
                    ...teamInfo.permission,
                    inviteLinkEnabled: enableInviteLink,
                  },
                }),
              )
            }}
            onClose={() => {
              setShareVisible(false)
            }}
            canInvite={showInvite}
            defaultBalance={
              isCloudVersion ? teamInfo.totalTeamLicense.balance : Infinity
            }
            teamID={teamInfo.id}
            currentUserRole={teamInfo.myRole}
            onBalanceChange={(balance) => {
              dispatch(
                teamActions.updateTeamMemberSubscribeReducer({
                  teamID: teamInfo.id,
                  subscribeInfo: {
                    ...teamInfo.currentTeamLicense,
                    balance: balance,
                  },
                }),
              )
            }}
            defaultAppPublic={appConfig.public}
            defaultAppContribute={appConfig.publishedToMarketplace}
            appID={appID}
            userRoleForThisApp={teamInfo.myRole}
            ownerTeamID={teamInfo.id}
            ownerTeamIdentify={teamInfo.identifier}
            onAppPublic={(isPublic) => {
              updateAppConfig(appID, { public: isPublic })
            }}
            onAppContribute={(isContributed) => {
              updateAppConfig(appID, {
                publishedToMarketplace: isContributed,
              })
              if (isContributed) {
                const newUrl = new URL(getMarketLinkTemplate(appID))
                newUrl.searchParams.set("token", getAuthToken())
                window.open(newUrl, "_blank")
              }
            }}
            onCopyPublicLink={(link) => {
              copyToClipboard(
                t("user_management.modal.custom_copy_text_app_invite", {
                  userName: currentUserInfo.nickname,
                  teamName: teamInfo.name,
                  inviteLink: link,
                }),
              )
            }}
            onCopyContributeLink={(link) => {
              track?.(
                ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                {
                  element: "invite_modal_public_copy",
                  parameter5: appID,
                },
                "both",
              )
              copyToClipboard(
                t("user_management.modal.contribute.default_text.app", {
                  appName: appName,
                  appLink: link,
                }),
              )
            }}
            onCopyEditInviteLink={(link) => {
              copyToClipboard(
                t("user_management.modal.custom_copy_text_app_invite", {
                  userName: currentUserInfo.nickname,
                  teamName: teamInfo.name,
                  inviteLink: link,
                }),
              )
            }}
            onCopyUseInviteLink={(link) => {
              copyToClipboard(
                t("user_management.modal.custom_copy_text_app_invite", {
                  userName: currentUserInfo.nickname,
                  teamName: teamInfo.name,
                  inviteLink: link,
                }),
              )
            }}
            canUseBillingFeature={canUseBillingFeature}
            onShare={(name) => {
              const { publishedToMarketplace } = appConfig
              track?.(
                ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                {
                  element: "share_modal_social_media",
                  parameter1: publishedToMarketplace,
                  parameter4: name,
                  parameter5: appID,
                },
                "both",
              )
            }}
          />
        )}
      </MixpanelTrackProvider>
      <AnimatePresence>
        {appSettingVisible && (
          <AppSettingModal
            appID={appID}
            appDesc={appConfig.description}
            appName={appName}
            onVisibleChange={(visible) => {
              setAppSettingVisible(visible)
            }}
            onSaveEvent={() => {
              track?.(
                ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                {
                  element: "app_setting_modal_save",
                  parameter5: appID,
                },
                "both",
              )
            }}
            onCloseEvent={() => {
              track?.(
                ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                {
                  element: "app_setting_modal_close",
                  parameter5: appID,
                },
                "both",
              )
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

AppCardActionItem.displayName = "AppCardActionItem"
