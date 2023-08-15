import { LayoutAutoChange } from "@illa-public/layout-auto-change"
import { FC } from "react"
import { ShareToSocialMediaProps } from "./interface"
import ShareToSocialMediaMobile from "./mobile"
import ShareToSocialMediaPC from "./pc"

export const ShareToSocialMedia: FC<ShareToSocialMediaProps> = (props) => {
  const { agentID, agentName, visible, onCancel } = props
  const agentLink = `${location.protocol}//${location.host}/${agentID}/detail`

  return (
    <LayoutAutoChange
      desktopPage={
        <ShareToSocialMediaPC
          agentLink={agentLink}
          agentName={agentName}
          visible={visible}
          onCancel={onCancel}
        />
      }
      mobilePage={
        <ShareToSocialMediaMobile
          agentLink={agentLink}
          agentName={agentName}
          visible={visible}
          onCancel={onCancel}
        />
      }
    />
  )
}

ShareToSocialMedia.displayName = "ShareToSocialMedia"
