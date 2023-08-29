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
  Input,
  Skeleton,
  Switch,
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
  linkCopyContainer,
  premiumContainerStyle,
  publicContainerStyle,
} from "./style"

export const AppPublicPC: FC<AppPublicProps> = (props) => {
  const {
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

  const publickBlock = (
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
                <Skeleton text={{ rows: 1, width: 280 }} opac={0.5} animation />
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
                <Skeleton text={{ rows: 1, width: 280 }} opac={0.5} animation />
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
      {(appContribute || appPublic) && (
        <>
          <div
            style={{
              height: 16,
            }}
          />
          <ShareBlockPC
            title={t("user_management.modal.social_media.default_text.app")}
            shareUrl={
              appContribute
                ? getMarketLinkTemplate(appID)
                : getPublicLinkTemplate(ownerTeamIdentify, appID)
            }
          />
        </>
      )}
    </>
  )

  return (
    <div css={publicContainerStyle}>
      {!hidePublic && publickBlock}
      {contributeBlock}
      {shareBlock}
    </div>
  )
}

AppPublicPC.displayName = "AppPublicPC"
