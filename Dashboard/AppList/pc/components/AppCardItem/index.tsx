import { ShareAppPC } from "@illa-public/invite-modal"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME, // ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackProvider,
} from "@illa-public/mixpanel-utils"
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
import { getMarketLinkTemplate, isCloudVersion } from "@illa-public/utils"
import { getAuthToken } from "@illa-public/utils"
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
// import { track } from "@/utils/mixpanelHelper"
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
  const [duplicateLoading, setDuplicateLoading] = useState(false)

  const showInvite = canManageInvite(
    teamInfo.myRole,
    teamInfo.permission.allowEditorManageTeamMember,
    teamInfo.permission.allowViewerManageTeamMember,
  )

  const canUseBillingFeature = canUseUpgradeFeature(
    teamInfo.myRole,
    getPlanUtils(teamInfo),
    teamInfo?.totalTeamLicense?.teamLicensePurchased,
    teamInfo?.totalTeamLicense?.teamLicenseAllPaid,
  )

  const handleDuplicateApp = async () => {
    // track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP, {
    //   element: "app_duplicate",
    //   parameter5: appID,
    // })
    if (duplicateLoading) return
    setDuplicateLoading(true)
    copyApp(appID)
    // duplicateApp(appID, teamInfo.id, appName)
    //   .then(
    //     (response) => {
    //       // dispatch(
    //       //   dashboardAppActions.addDashboardAppReducer({
    //       //     app: response.data,
    //       //   }),
    //       // )
    //       navigate(`/${teamIdentifier}/app/${response.data.appId}`)
    //     },
    //     (failure) => {
    //       if (isILLAAPiError(failure)) {
    //         message.error({
    //           content: t("dashboard.app.duplicate_fail"),
    //         })
    //       } else {
    //         message.error({
    //           content: t("network_error"),
    //         })
    //       }
    //     },
    //   )
    //   .finally(() => {
    //     setDuplicateLoading(false)
    //   })
  }

  const handleOpenAppSettingModal = () => {
    setAppSettingVisible(true)
    // track(ILLA_MIXPANEL_EVENT_TYPE.SHOW, ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP, {
    //   element: "app_setting_modal",
    //   parameter5: appID,
    // })
  }

  const handleOpenInviteModal = useCallback(() => {
    // track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP, {
    //   element: "app_share",
    //   parameter5: appID,
    // })
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
      })
      return
    }
    setShareVisible(true)
  }, [
    appConfig.public,
    appConfig.publishedToMarketplace,
    teamInfo,
    upgradeModal,
  ])

  const handleDeleteApp = useCallback(() => {
    // track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP, {
    //   element: "app_delete",
    //   parameter5: appID,
    // })
    // track(ILLA_MIXPANEL_EVENT_TYPE.SHOW, ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP, {
    //   element: "app_delete_modal",
    //   parameter5: appID,
    // })
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
        // track(
        //   ILLA_MIXPANEL_EVENT_TYPE.CLICK,
        //   ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
        //   {
        //     element: "app_delete_modal_delete",
        //     parameter5: appID,
        //   },
        // )

        message.success({
          content: t("dashboard.app.trash_success"),
        })
        deleteApp(appID)
        modal.close(modalId)
      },
      onCancel: () => {
        // track(
        //   ILLA_MIXPANEL_EVENT_TYPE.CLICK,
        //   ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
        //   {
        //     element: "app_delete_modal_close",
        //     parameter5: appID,
        //   },
        // )
      },
    })
  }, [modal, t, message, deleteApp, appID])

  const onVisibleChange = useCallback((visible: boolean) => {
    if (visible) {
      // track(
      //   ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      //   ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
      //   { element: "app_more", parameter5: appID },
      // )
      // track(
      //   ILLA_MIXPANEL_EVENT_TYPE.SHOW,
      //   ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
      //   { element: "app_duplicate", parameter5: appID },
      // )
      // track(
      //   ILLA_MIXPANEL_EVENT_TYPE.SHOW,
      //   ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
      //   { element: "app_delete", parameter5: appID },
      // )
      // appDeployed &&
      //   track(
      //     ILLA_MIXPANEL_EVENT_TYPE.SHOW,
      //     ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
      //     { element: "app_share", parameter5: appID },
      //   )
    }
  }, [])

  useEffect(() => {
    if (canEditApp || (appDeployed && showInvite)) {
      // track(
      //   ILLA_MIXPANEL_EVENT_TYPE.SHOW,
      //   ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
      //   { element: "app_more", parameter5: appID },
      // )
    }
  }, [canEditApp, appDeployed, showInvite, appID])

  useEffect(() => {
    // track(ILLA_MIXPANEL_EVENT_TYPE.SHOW, ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP, {
    //   element: "app",
    // })
  }, [])

  // useEffect(() => {
  //   shareVisible &&
  //     track(
  //       ILLA_MIXPANEL_EVENT_TYPE.SHOW,
  //       ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
  //       { element: "invite_modal", parameter5: appID },
  //     )
  // }, [appID, shareVisible])

  // useEffect(() => {
  //   appSettingVisible &&
  //     track(
  //       ILLA_MIXPANEL_EVENT_TYPE.SHOW,
  //       ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
  //       { element: "app_setting_modal", parameter5: appID },
  //     )
  // }, [appID, appSettingVisible])

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
          onVisibleChange={onVisibleChange}
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
              {showShareAppModal(
                teamInfo,
                teamInfo.myRole,
                appConfig.public,
                appConfig.publishedToMarketplace,
                appDeployed,
              ) && (
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
        showShareAppModal(
          teamInfo,
          teamInfo.myRole,
          appConfig.public,
          appConfig.publishedToMarketplace,
          appDeployed,
        ) && (
          <Dropdown
            position="bottom-end"
            trigger="click"
            triggerProps={{
              closeDelay: 0,
              openDelay: 0,
            }}
            onVisibleChange={(visible) => {
              if (visible) {
                // track(
                //   ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                //   ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
                //   { element: "app_more", parameter5: appID },
                // )
                // track(
                //   ILLA_MIXPANEL_EVENT_TYPE.SHOW,
                //   ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
                //   { element: "app_share", parameter5: appID },
                // )
              }
            }}
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
        basicTrack={() => {}}
        pageName={ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP}
      >
        {shareVisible && (
          <ShareAppPC
            isDeployed={appDeployed}
            title={t("user_management.modal.social_media.default_text.app", {
              appName: appName,
            })}
            editRedirectURL={`${window.location.origin}/${teamInfo.identifier}/app/${appID}`}
            useRedirectURL={`${window.location.origin}/${teamInfo.identifier}/deploy/app/${appID}`}
            defaultAllowInviteLink={teamInfo.permission.inviteLinkEnabled}
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
              isCloudVersion ? teamInfo.currentTeamLicense.balance : Infinity
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
              // dispatch(
              //   dashboardAppActions.updateDashboardAppPublicReducer({
              //     appId: appID,
              //     isPublic: isPublic,
              //   }),
              // )
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
              // track(
              //   ILLA_MIXPANEL_EVENT_TYPE.CLICK,
              //   ILLA_MIXPANEL_BUILDER_PAGE_NAME.EDITOR,
              //   {
              //     element: "invite_modal_public_copy",
              //     parameter5: appID,
              //   },
              // )
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
              // track(
              //   ILLA_MIXPANEL_EVENT_TYPE.CLICK,
              //   ILLA_MIXPANEL_BUILDER_PAGE_NAME.EDITOR,
              //   {
              //     element: "share_modal_social_media",
              //     parameter1: publishedToMarketplace,
              //     parameter4: name,
              //     parameter5: appID,
              //   },
              // )
            }}
          />
        )}
      </MixpanelTrackProvider>
      <AppSettingModal
        appID={appID}
        appDesc={appConfig.description}
        appName={appName}
        visible={appSettingVisible}
        onVisibleChange={(visible) => {
          setAppSettingVisible(visible)
        }}
        onSaveEvent={() => {
          // track(
          //   ILLA_MIXPANEL_EVENT_TYPE.CLICK,
          //   ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
          //   {
          //     element: "app_setting_modal_save",
          //     parameter5: appID,
          //   },
          // )
        }}
        onCloseEvent={() => {
          // track(
          //   ILLA_MIXPANEL_EVENT_TYPE.CLICK,
          //   ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
          //   {
          //     element: "app_setting_modal_close",
          //     parameter5: appID,
          //   },
          // )
        }}
      />
    </div>
  )
}

AppCardActionItem.displayName = "AppCardActionItem"
