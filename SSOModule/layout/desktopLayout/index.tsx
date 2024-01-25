import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { DOC_PREFIX } from "@illa-public/public-configs"
import { TextLink } from "@illa-public/text-link"
import { isCloudVersion } from "@illa-public/utils"
import { FC, useContext } from "react"
import { Trans, useTranslation } from "react-i18next"
import DesktopLeftContent from "../../assets/desktop-left-content.svg?react"
import ILLALogoWhite from "../../assets/illa-logo-white.svg?react"
import { LayoutProps } from "../interface"
import {
  illaLogoStyle,
  layoutWrapperStyle,
  leftAsideWrapperStyle,
  policyStyle,
  rightAsideWrapperStyle,
  sectionBackgroundStyle,
  sectionBgContentStyle,
  sloganStyle,
} from "./style"

export const UserLayout: FC<LayoutProps> = ({ children }) => {
  const { t } = useTranslation()
  const { track } = useContext(MixpanelTrackContext)

  const handleLinkOpenClick = (link: string) => {
    if (isCloudVersion) {
      track?.(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
        element: /privacy/.test(link) ? "privacy" : "terms",
      })
      window.open(DOC_PREFIX + link, "_blank")
    } else {
      window.open(link, "_blank")
    }
  }

  return (
    <div css={layoutWrapperStyle}>
      <aside css={leftAsideWrapperStyle}>
        <ILLALogoWhite css={illaLogoStyle} />
        <span css={sloganStyle}>{t("page.user.description")}</span>
        <section css={sectionBackgroundStyle}>
          <span css={sectionBgContentStyle}>
            <DesktopLeftContent />
          </span>
        </section>
      </aside>
      <aside css={rightAsideWrapperStyle}>
        {children}
        <span css={policyStyle}>
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
                  handleLinkOpenClick("/terms-of-service")
                }}
              />,
            ]}
          />
        </span>
      </aside>
    </div>
  )
}

UserLayout.displayName = "UserLayout"
