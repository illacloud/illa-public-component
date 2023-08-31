import { useUpgradeDrawer } from "@illa-public/upgrade-modal"
import { fetchTeamSubscription } from "@illa-public/upgrade-modal/service"
import { UsageCard } from "@illa-public/usage-card"
import {
  SUBSCRIBE_PLAN,
  SUBSCRIPTION_CYCLE,
  getCurrentTeamInfo,
  teamActions,
} from "@illa-public/user-data"
import { canManagePayment } from "@illa-public/user-role-utils"
import { isCloudVersion } from "@illa-public/utils"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Header } from "./components/Header"
import { PCMemberList } from "./components/List"
import { IPcMemberListProps } from "./components/interface"
import {
  cardAndMemberListContainerStyle,
  memberListWrapperStyle,
} from "./style"

export const PCMemberPage: FC<IPcMemberListProps> = (props) => {
  const { afterLeaveTeam } = props
  const currentTeamInfo = useSelector(getCurrentTeamInfo)!
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const hasPaymentManagementPermission = canManagePayment(
    currentTeamInfo.myRole,
    currentTeamInfo?.totalTeamLicense?.teamLicenseAllPaid,
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
        onSubscribeCallback: async (teamID) => {
          const response = await fetchTeamSubscription(teamID)
          dispatch(
            teamActions.updateCurrentTeamLicenseByTeamIDReducer({
              currentTeamLicense: response.data.teamLicense.current,
              teamID: teamID,
            }),
          )
        },
      },
    })
  }

  return (
    <div css={memberListWrapperStyle}>
      <Header afterLeaveTeam={afterLeaveTeam} />
      <div css={cardAndMemberListContainerStyle}>
        {isCloudVersion && hasPaymentManagementPermission && (
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
