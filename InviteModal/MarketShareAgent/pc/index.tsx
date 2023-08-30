import { FC } from "react"
import { useTranslation } from "react-i18next"
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
  const { t } = useTranslation()

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
          <TabPane
            title={t("user_management.modal.link.marketplace.label")}
            key={ShareAgentTab.TO_MARKETPLACE}
          />
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
          title={props.title}
          onShare={props.onShare}
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
