import { FC } from "react"
import { useTranslation } from "react-i18next"
import { CloseIcon, Modal, TabPane, Tabs } from "@illa-design/react"
import { AppPublicPC } from "../../component/AppPublic/pc"
import { MarketShareAppProps } from "../interface"
import {
  closeIconStyle,
  contentContainerStyle,
  headerContainerStyle,
} from "./style"

export const MarketShareAppPC: FC<MarketShareAppProps> = (props) => {
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
            key="public"
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
        <AppPublicPC
          appDesc={props.appDesc}
          appName={props.appName}
          onAppInfoUpdate={() => {}}
          title={props.title}
          onShare={props.onShare}
          hidePublic={true}
          canUseBillingFeature={props.canUseBillingFeature}
          defaultAppPublic={props.defaultAppPublic}
          defaultAppContribute={props.defaultAppContribute}
          defaultPublishWithAIAgent={props.defaultPublishWithAIAgent}
          appID={props.appID}
          userRoleForThisApp={props.userRoleForThisApp}
          ownerTeamIdentify={props.ownerTeamIdentify}
          onAppPublic={props.onAppPublic}
          onAppContribute={props.onAppContribute}
          onCopyPublicLink={props.onCopyPublicLink}
          onCopyContributeLink={props.onCopyContributeLink}
          ownerTeamID={props.ownerTeamID}
        />
      </div>
    </Modal>
  )
}

MarketShareAppPC.displayName = "MarketShareAppPC"
