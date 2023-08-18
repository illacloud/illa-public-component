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
import {
  blockContainerStyle,
  blockLabelStyle,
  linkCopyContainer,
  publicContainerStyle,
} from "./style"


function getPublicLinkTemplate(teamIdentify: string, appID: string): string {
  return `${import.meta.env.ILLA_CLOUD_URL}/${teamIdentify}/deploy/app/${appID}`
}

function getMarketLinkTemplate(appID: string): string {
  return `${import.meta.env.ILLA_CLOUD_URL}/app/${appID}/deploy`
}

export const AppPublicPC: FC<AppPublicProps> = (props) => {
  const {
    appID,
    teamIdentify,
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

  const [shareText, setShareText] = useState("")

  return (
    <div css={publicContainerStyle}>
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
          onChange={(value) => {
            onAppPublic?.(value)
            setAppPublic(value)
          }}
        />
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
                getPublicLinkTemplate(teamIdentify, appID)
              )
            }
          />
          <Button
            ml="8px"
            w="80px"
            colorScheme={getColor("grayBlue", "02")}
            loading={appLinkLoading}
            onClick={() => {
              message.success({
                content: t("copied"),
              })
              onCopyPublicLink?.(getPublicLinkTemplate(teamIdentify, appID))
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
          onChange={(value) => {
            onAppContribute?.(value)
            setAppContribute(value)
          }}
        />
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
              message.success({
                content: t("copied"),
              })
              onCopyContributeLink?.(getMarketLinkTemplate(appID))
            }}
          >
            {!marketLinkLoading ? "Copy" : undefined}
          </Button>
        </div>
      )}
      {(appContribute || appPublic) && <ShareBlockPC shareText={shareText} />}
    </div>
  )
}

AppPublicPC.displayName = "AppPublicPC"