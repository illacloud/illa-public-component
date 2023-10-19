import { FC } from "react"
import { CloseIcon, Drawer, TriggerProvider } from "@illa-design/react"
import { AgentToMarketplaceMobile } from "../../component/AgentToMarketplace/mobile"
import { MarketShareAgentProps } from "../interface"
import {
  closeIconContainerStyle,
  contentContainerStyle,
  inviteHeaderContainerStyle,
  inviteModalStyle,
} from "./style"

export const MarketShareAgentMobile: FC<MarketShareAgentProps> = (props) => {
  const { onClose } = props

  return (
    <TriggerProvider renderInBody zIndex={1005}>
      <Drawer
        css={inviteModalStyle}
        w="100%"
        h="70%"
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
          <AgentToMarketplaceMobile
            title={props.title}
            onShare={props.onShare}
            agentID={props.agentID}
            onCopyAgentMarketLink={props.onCopyAgentMarketLink}
          />
        </div>
      </Drawer>
    </TriggerProvider>
  )
}

MarketShareAgentMobile.displayName = "MarketShareAgentMobile"
