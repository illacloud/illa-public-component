import { UsageCard } from "@illa-public/usage-card"
import { SUBSCRIPTION_CYCLE, getCurrentTeamInfo } from "@illa-public/user-data"
import { canManagePayment } from "@illa-public/user-role-utils"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Button } from "@illa-design/react"
import { MobileMemberList } from "./List"
import {
  inviteBtnStyle,
  mobileMemberContainerStyle,
  mobileTitleStyle,
  usageCardContainerStyle,
} from "./style"

export const MobileMemberPage: FC = () => {
  const { t } = useTranslation()
  const currentTeamInfo = useSelector(getCurrentTeamInfo)!

  const hasPaymentManagementPermission = canManagePayment(
    currentTeamInfo.myRole,
    currentTeamInfo.totalTeamLicense.teamLicenseAllPaid,
  )

  return (
    <div css={mobileMemberContainerStyle}>
      <h1 css={mobileTitleStyle}>{t("user_management.page.member")}</h1>
      {hasPaymentManagementPermission ? (
        <div css={usageCardContainerStyle}>
          <UsageCard
            type="License"
            current={
              currentTeamInfo.totalTeamLicense.volume -
              currentTeamInfo.totalTeamLicense.balance
            }
            total={currentTeamInfo.totalTeamLicense.volume}
            buttonColorScheme="grayBlue"
            buttonVariant="outline"
            actionDes={
              currentTeamInfo.currentTeamLicense?.cycle ===
              SUBSCRIPTION_CYCLE.YEARLY
                ? t(`billing.license_price_new.yearly`, { price: "$200" })
                : t(`billing.license_price_new.monthly`, { price: "$20" })
            }
            isMobile
            onClick={() => {}}
          />
        </div>
      ) : null}
      <MobileMemberList />
      <Button _css={inviteBtnStyle} fullWidth colorScheme="techPurple">
        {t("homepage.workspace.invite")}
      </Button>
    </div>
  )
}

MobileMemberPage.displayName = "MemberListMobile"

export default MobileMemberPage
