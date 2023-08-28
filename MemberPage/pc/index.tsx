import { useUpgradeDrawer } from "@illa-public/upgrade-modal"
import { UsageCard } from "@illa-public/usage-card"
import {
  SUBSCRIBE_PLAN,
  SUBSCRIPTION_CYCLE,
  getCurrentTeamInfo,
} from "@illa-public/user-data"
import { canManagePayment } from "@illa-public/user-role-utils"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Header } from "./components/Header"
import { PCMemberList } from "./components/List"
import {
  cardAndMemberListContainerStyle,
  memberListWrapperStyle,
} from "./style"

export const PCMemberPage: FC = () => {
  const currentTeamInfo = useSelector(getCurrentTeamInfo)!
  const { t } = useTranslation()
  const hasPaymentManagementPermission = canManagePayment(
    currentTeamInfo.myRole,
    currentTeamInfo.totalTeamLicense.teamLicenseAllPaid,
  )
  const currentTeamLicense = currentTeamInfo.currentTeamLicense
  const upgradeDrawer = useUpgradeDrawer()
  const openDrawer = () => {
    upgradeDrawer({
      defaultConfig: {
        type: "license",
        subscribeInfo: {
          quantity: currentTeamLicense.cancelAtPeriodEnd
            ? 1
            : currentTeamLicense.volume,
          cycle: currentTeamLicense.cycle || SUBSCRIPTION_CYCLE.MONTHLY,
          plan: SUBSCRIBE_PLAN.TEAM_LICENSE_PREMIUM,
          currentPlan: currentTeamLicense.plan,
          cancelAtPeriodEnd: currentTeamLicense?.cancelAtPeriodEnd,
        },
        // onSubscribeCallback: onSubscribe,
      },
    })
  }

  return (
    <div css={memberListWrapperStyle}>
      <Header />
      <div css={cardAndMemberListContainerStyle}>
        {hasPaymentManagementPermission && (
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
            onClick={openDrawer}
          />
        )}
        <PCMemberList />
      </div>
    </div>
  )
}

PCMemberPage.displayName = "MemberListPC"

export default PCMemberPage
