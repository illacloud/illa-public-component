import { FC } from "react"
import { Trans, useTranslation } from "react-i18next"
import { TextLink } from "@/illa-public-component/TextLink"
import { LayoutProps } from "@/illa-public-component/User/layout/interface"
import { handleLinkOpen } from "@/utils/navigate"
import { contentStyle, layoutStyle, policyStyle } from "./style"

export const MobileUserLayout: FC<LayoutProps> = ({ children }) => {
  const { t } = useTranslation()

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
              onClick={() => handleLinkOpen("/privacy-policy")}
            />,
            <TextLink
              key="text-link"
              onClick={() => handleLinkOpen("/terms-and-conditions")}
            />,
          ]}
        />
      </div>
    </div>
  )
}

MobileUserLayout.displayName = "MobileUserLayout"
