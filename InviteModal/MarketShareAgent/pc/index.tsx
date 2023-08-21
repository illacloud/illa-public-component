import { FC } from "react"
import { CloseIcon, Modal, TabPane, Tabs } from "@illa-design/react"
import { ShareAgentTab } from "../../ShareAgent/interface"
import { AgentToMarketplacePC } from "../../component/AgentToMarketplace/pc"
import { MarketShareAgentProps } from "../interface"
import {
  closeIconStyle,
  contentContainerStyle,
  headerContainerStyle,
} from "./style"


export const MarketShareAgentPC: FC<MarketShareAgentProps> = (props) => {
  return (
    <Modal
      withoutLine={false}
      withoutPadding
      w="498px"
      onCancel={() => {
        props.onClose?.()
      }}
      footer={false}
      maskClosable={false}
      visible={true}
    >
      <div css={headerContainerStyle}>
        <Tabs variant="text" colorScheme="grayBlue" withoutBorderLine>
          <TabPane title="To Marketplace" key={ShareAgentTab.TO_MARKETPLACE} />
        </Tabs>
        <div
          css={closeIconStyle}
          onClick={() => {
            props.onClose?.()
          }}
        >
          <CloseIcon />
        </div>
      </div>
      <div css={contentContainerStyle}>
        <AgentToMarketplacePC
          defaultAgentContributed={props.defaultAgentContributed}
          onAgentContributed={props.onAgentContributed}
          agentID={props.agentID}
          onCopyAgentMarketLink={props.onCopyAgentMarketLink}
          userRoleForThisAgent={props.userRoleForThisAgent}
          ownerTeamID={props.ownerTeamID}
        />
      </div>
    </Modal>
  )
}

MarketShareAgentPC.displayName = "MarketShareAgentPC"