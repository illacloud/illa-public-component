import { FC } from "react"
import { CloseIcon, Drawer, TriggerProvider } from "@illa-design/react"
import { AppPublicMobile } from "../../component/AppPublic/mobile"
import { MarketShareAppProps } from "../interface"
import {
  closeIconContainerStyle,
  contentContainerStyle,
  inviteHeaderContainerStyle,
  inviteModalStyle,
} from "./style"


export const MarketShareAppMobile: FC<MarketShareAppProps> = (props) => {
  return (
    <TriggerProvider renderInBody zIndex={1005}>
      <Drawer
        _css={inviteModalStyle}
        w="100%"
        h="70%"
        placement="bottom"
        maskClosable={false}
        closable={false}
        footer={false}
        onCancel={props.onClose}
        visible={true}
      >
        <div css={inviteHeaderContainerStyle}>
          <div
            css={closeIconContainerStyle}
            onClick={() => {
              props.onClose?.()
            }}
          >
            <CloseIcon size="12" />
          </div>
        </div>
        <div css={contentContainerStyle}>
          <AppPublicMobile
            title={props.title}
            onShare={props.onShare}
            appID={props.appID}
            onCopyContributeLink={props.onCopyContributeLink}
            ownerTeamID={props.ownerTeamID}
          />
        </div>
      </Drawer>
    </TriggerProvider>
  )
}
MarketShareAppMobile.displayName = "MarketShareAppMobile"