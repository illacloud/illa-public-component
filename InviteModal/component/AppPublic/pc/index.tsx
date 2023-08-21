import { USER_ROLE } from "@illa-public/user-data"
import { isBiggerThanTargetRole } from "@illa-public/user-role-utils"
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
  publicContainerStyle,
} from "./style"


function getPublicLinkTemplate(teamIdentify: string, appID: string): string {
  return `${process.env.ILLA_BUILDER_URL}/${teamIdentify}/deploy/app/${appID}`
}

function getMarketLinkTemplate(appID: string): string {
  return `${process.env.ILLA_MARKET_URL}/apps/${appID}/deploy`
}

export const AppPublicPC: FC<AppPublicProps> = (props) => {
  const {
    appID,
    ownerTeamID,
    ownerTeamIdentify,
    userRoleForThisApp,
    defaultAppPublic,
    defaultAppContribute,
    onAppPublic,
    onAppContribute,
    onCopyContributeLink,
    onCopyPublicLink,
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

  return (
    <div css={publicContainerStyle}>
      {canManageApp && (
        <div css={blockContainerStyle}>
          <div css={blockLabelStyle}>Make the app public</div>
          <div
            style={{
              flexGrow: 1,
            }}
          />
          <Switch
            disabled={appContribute}
            checked={appPublic}
            colorScheme={getColor("grayBlue", "02")}
            onChange={async (value) => {
              setAppPublic(value)
              try {
                setAppLinkLoading(true)
                await updateAppPublicConfig(value, ownerTeamID, appID)
                onAppPublic?.(value)
              } catch (e) {
                message.error({
                  content: t("public gg"),
                })
                setAppPublic(!value)
              } finally {
                setAppLinkLoading(false)
              }
            }}
          />
        </div>
      )}
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
            {!appLinkLoading ? "Copy" : undefined}
          </Button>
        </div>
      )}
      <div
        css={{
          height: 16,
        }}
      />
      {canManageApp && (
        <div css={blockContainerStyle}>
          <div css={blockLabelStyle}>Contribute to marketplace</div>
          <div
            style={{
              flexGrow: 1,
            }}
          />
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
                  content: t("contribute gg"),
                })
                setAppContribute(!value)
              } finally {
                setMarketLinkLoading(false)
              }
            }}
          />
        </div>
      )}
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
            {!marketLinkLoading ? "Copy" : undefined}
          </Button>
        </div>
      )}
      {(appContribute || appPublic) && (
        <>
          <div
            style={{
              height: 16,
            }}
          />
          <ShareBlockPC
            title=""
            shareUrl={
              appContribute
                ? getMarketLinkTemplate(appID)
                : getPublicLinkTemplate(ownerTeamIdentify, appID)
            }
          />
        </>
      )}
    </div>
  )
}

AppPublicPC.displayName = "AppPublicPC"