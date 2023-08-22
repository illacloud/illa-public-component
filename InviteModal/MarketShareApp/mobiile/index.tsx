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

export const ShareAgentMobile: FC<MarketShareAppProps> = (props) => {
  const { onClose } = props

  return (
    <TriggerProvider renderInBody zIndex={1005}>
      <Drawer
        _css={inviteModalStyle}
        w="100%"
        placement="bottom"
        maskClosable={false}
        closable={false}
        footer={false}
        onCancel={onClose}
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
            appID={props.appID}
            onCopyContributeLink={props.onCopyContributeLink}
            ownerTeamID={props.ownerTeamID}
          />
        </div>
      </Drawer>
    </TriggerProvider>
  )
}
