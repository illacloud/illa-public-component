import { FC, useContext } from "react"
import { Trans, useTranslation } from "react-i18next"
import { ILLA_MIXPANEL_EVENT_TYPE } from "@/illa-public-component/MixpanelUtils/interface"
import { MixpanelTrackContext } from "@/illa-public-component/MixpanelUtils/mixpanelContext"
import { TextLink } from "@/illa-public-component/TextLink"
import { LayoutProps } from "@/illa-public-component/User/layout/interface"
import { handleLinkOpen } from "@/utils/navigate"
import { contentStyle, layoutStyle, policyStyle } from "./style"

export const MobileUserLayout: FC<LayoutProps> = ({ children }) => {
  const { t } = useTranslation()
  const { track } = useContext(MixpanelTrackContext)

  const handleLinkOpenClick = (link: string) => {
    track?.(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: /privacy/.test(link) ? "privacy" : "terms",
    })
    handleLinkOpen(link)
  }

  return (
    <div css={layoutStyle}>
      <div css={contentStyle}>{children}</div>
      <div css={policyStyle}>
        <Trans
          i18nKey="page.user.policy"
          t={t}
          components={[
            <TextLink
              key="text-link"
              onClick={() => {
                handleLinkOpenClick("/privacy-policy")
              }}
            />,
            <TextLink
              key="text-link"
              onClick={() => {
                handleLinkOpenClick("/terms-and-conditions")
              }}
            />,
          ]}
        />
      </div>
    </div>
  )
}

MobileUserLayout.displayName = "MobileUserLayout"
