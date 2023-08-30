import { UpgradeIcon } from "@illa-public/icon"
import { useUpgradeModal } from "@illa-public/upgrade-modal"
import { USER_ROLE } from "@illa-public/user-data"
import { isBiggerThanTargetRole } from "@illa-public/user-role-utils"
import {
  getMarketLinkTemplate,
  getPublicLinkTemplate,
  isCloudVersion,
} from "@illa-public/utils"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  Button,
  DoubtIcon,
  Input,
  Skeleton,
  Switch,
  Trigger,
  TriggerProvider,
  getColor,
  useMergeValue,
  useMessage,
} from "@illa-design/react"
import { ShareBlockPC } from "../../ShareBlock/pc"
import { AppPublicProps } from "../interface"
import { makeAppContribute, updateAppPublicConfig } from "../service"
import {
  blockContainerStyle,
  blockLabelStyle,
  doubtStyle,
  linkCopyContainer,
  premiumContainerStyle,
  publicContainerStyle,
} from "./style"

export const AppPublicPC: FC<AppPublicProps> = (props) => {
  const {
    title,
    onShare,
    appID,
    ownerTeamID,
    ownerTeamIdentify,
    userRoleForThisApp,
    defaultAppPublic,
    defaultAppContribute,
    canUseBillingFeature,
    onAppPublic,
    onAppContribute,
    onCopyContributeLink,
    onCopyPublicLink,
    hidePublic,
  } = props

  const message = useMessage()

  const { t } = useTranslation()

  const [appLinkLoading, setAppLinkLoading] = useState(false)

  const [appPublic, setAppPublic] = useMergeValue(false, {
    defaultValue: defaultAppPublic,
  })

  const [marketLinkLoading, setMarketLinkLoading] = useState(false)

  const [appContribute, setAppContribute] = useMergeValue(false, {
    defaultValue: defaultAppContribute,
  })

  const canManageApp = isBiggerThanTargetRole(
    USER_ROLE.VIEWER,
    userRoleForThisApp,
    false,
  )

  const upgradeModal = useUpgradeModal()

  const publicBlock = (
    <>
      <div css={blockContainerStyle}>
        <div css={blockLabelStyle}>
          {t("user_management.modal.link.make_public_title")}
        </div>
        {!canUseBillingFeature && (
          <div css={premiumContainerStyle}>
            <UpgradeIcon />
            <div style={{ marginLeft: 4 }}>Premium</div>
          </div>
        )}
        <div
          style={{
            flexGrow: 1,
          }}
        />
        {canManageApp && (
          <Switch
            disabled={appContribute}
            checked={appPublic}
            colorScheme={getColor("grayBlue", "02")}
            onChange={async (value) => {
              if (isCloudVersion && !canUseBillingFeature) {
                upgradeModal({ modalType: "upgrade" })
                return
              }
              setAppPublic(value)
              try {
                setAppLinkLoading(true)
                await updateAppPublicConfig(value, ownerTeamID, appID)
                onAppPublic?.(value)
              } catch (e) {
                message.error({
                  content: t(
                    "user_management.modal.message.make_public_failed",
                  ),
                })
                setAppPublic(!value)
              } finally {
                setAppLinkLoading(false)
              }
            }}
          />
        )}
      </div>
      {appPublic && (
        <div css={linkCopyContainer}>
          <Input
            flexShrink="1"
            flexGrow="1"
            w="unset"
            readOnly
            colorScheme="techPurple"
            value={
              appLinkLoading ? (
                <Skeleton
                  text={{ rows: 1 }}
                  opac={0.5}
                  animation
                  flexGrow="1"
                />
              ) : (
                getPublicLinkTemplate(ownerTeamIdentify, appID)
              )
            }
          />
          <Button
            ml="8px"
            w="80px"
            colorScheme={getColor("grayBlue", "02")}
            loading={appLinkLoading}
            onClick={() => {
              onCopyPublicLink?.(
                getPublicLinkTemplate(ownerTeamIdentify, appID),
              )
            }}
          >
            {!appLinkLoading ? t("user_management.modal.link.copy") : undefined}
          </Button>
        </div>
      )}
    </>
  )

  const contributeBlock = (
    <>
      <div css={blockContainerStyle}>
        <div css={blockLabelStyle}>
          {t("user_management.modal.contribute.label")}
        </div>
        <TriggerProvider zIndex={1000}>
          <Trigger
            trigger="hover"
            position="top"
            content={t("user_management.modal.contribute.app.desc")}
          >
            <div css={doubtStyle}>
              <DoubtIcon />
            </div>
          </Trigger>
        </TriggerProvider>
        <div
          style={{
            flexGrow: 1,
          }}
        />
        {canManageApp && (
          <Switch
            checked={appContribute}
            colorScheme={getColor("grayBlue", "02")}
            onChange={async (value) => {
              setAppContribute(value)
              try {
                setMarketLinkLoading(true)
                await makeAppContribute(ownerTeamID, appID)
                onAppContribute?.(value)
                if (value) {
                  setAppPublic(true)
                  onAppPublic?.(true)
                }
              } catch (e) {
                message.error({
                  content: t(
                    "user_management.modal.message.make_public_failed",
                  ),
                })
                setAppContribute(!value)
              } finally {
                setMarketLinkLoading(false)
              }
            }}
          />
        )}
      </div>
      {appContribute && (
        <div css={linkCopyContainer}>
          <Input
            flexShrink="1"
            flexGrow="1"
            w="unset"
            readOnly
            colorScheme="techPurple"
            value={
              marketLinkLoading ? (
                <Skeleton
                  text={{ rows: 1 }}
                  opac={0.5}
                  animation
                  flexGrow="1"
                />
              ) : (
                getMarketLinkTemplate(appID)
              )
            }
          />
          <Button
            ml="8px"
            w="80px"
            colorScheme={getColor("grayBlue", "02")}
            loading={marketLinkLoading}
            onClick={() => {
              onCopyContributeLink?.(getMarketLinkTemplate(appID))
            }}
          >
            {!marketLinkLoading
              ? t("user_management.modal.link.copy")
              : undefined}
          </Button>
        </div>
      )}
    </>
  )

  const shareBlock = (
    <>
      <div
        style={{
          height: 16,
        }}
      />
      <ShareBlockPC
        onShare={onShare}
        title={title}
        shareUrl={
          appContribute
            ? getMarketLinkTemplate(appID)
            : getPublicLinkTemplate(ownerTeamIdentify, appID)
        }
      />
    </>
  )

  return (
    <div css={publicContainerStyle}>
      {!hidePublic && (appPublic || canManageApp) && publicBlock}
      {(appContribute || canManageApp) && contributeBlock}
      {(appContribute || appPublic) && shareBlock}
    </div>
  )
}

AppPublicPC.displayName = "AppPublicPC"