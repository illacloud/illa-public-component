import { FC, ReactNode, createContext, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  InsufficientNoticeModal,
  InsufficientNoticeModalType,
} from "@/illa-public-component/UpgradeCloudProvider/component/InsufficientNoticeModal"
import {
  SubscriptionReminderModal,
  UpgradeModalType,
} from "@/illa-public-component/UpgradeCloudProvider/component/SubscriptionReminderModal"
import { UpgradeDrawer } from "@/illa-public-component/UpgradeCloudProvider/component/UpgradeDrawer"
import {
  UpgradeSuccessModal,
  UpgradeSuccessModalType,
} from "@/illa-public-component/UpgradeCloudProvider/component/UpgradeSuccessModal"
import { canManagePayment } from "@/illa-public-component/UserRoleUtils"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"
import { getCurrentTeamInfo } from "@/store/team/teamSelector"

interface ProviderProps {
  children: ReactNode
}

interface Inject extends Omit<ProviderProps, "children"> {
  handleLicenseDrawerVisible: (visible: boolean) => void
  handleSuccessModalVisible: (
    visible: boolean,
    modalType: UpgradeSuccessModalType,
  ) => void
  handleUpgradeModalVisible: (
    visible: boolean,
    modalType: UpgradeModalType | InsufficientNoticeModalType,
  ) => void
}

export const UpgradeCloudContext = createContext<Inject>({} as Inject)

export const UpgradeCloudProvider: FC<ProviderProps> = (props) => {
  const { children } = props
  const { t } = useTranslation()
  const currentTeamInfo = useSelector(getCurrentTeamInfo)

  const [drawerVisible, setDrawerVisible] = useState(false)
  const [successModalVisible, setSuccessModalVisible] = useState(false)
  const [successModalType, setSuccessModalType] =
    useState<UpgradeSuccessModalType>()
  const [upgradeModalVisible, setUpgradeModalVisible] = useState(false)
  const [upgradeModalType, setUpgradeModalType] = useState<
    UpgradeModalType | InsufficientNoticeModalType
  >()

  const canPay = useMemo(
    () =>
      canManagePayment(
        currentTeamInfo?.myRole ?? USER_ROLE.VIEWER,
        currentTeamInfo?.teamSubscriptionStatus,
      ),
    [currentTeamInfo?.myRole, currentTeamInfo?.teamSubscriptionStatus],
  )

  const handleLicenseDrawerVisible = (visible: boolean) => {
    setDrawerVisible((prevState) => {
      if (prevState !== visible) {
        return visible
      }
      return prevState
    })
  }

  const handleSuccessModalVisible = (
    visible: boolean,
    modalType: UpgradeSuccessModalType,
  ) => {
    setSuccessModalVisible((prevState) => {
      if (prevState !== visible) {
        return visible
      }
      return prevState
    })
  }

  const handleUpgradeModalVisible = (
    visible: boolean,
    modalType: UpgradeModalType | InsufficientNoticeModalType,
  ) => {
    setUpgradeModalType(modalType)
    setUpgradeModalVisible((prevState) => {
      if (prevState !== visible) {
        return visible
      }
      return prevState
    })
  }

  const handleCloseDrawer = () => {
    setDrawerVisible(false)
  }

  const handleCloseSuccessModal = () => {
    setSuccessModalVisible(false)
  }
  const handleCloseUpgradeModal = () => {
    setUpgradeModalVisible(false)
  }

  const value = {
    ...props,
    handleLicenseDrawerVisible,
    handleSuccessModalVisible,
    handleUpgradeModalVisible,
  }

  return (
    <UpgradeCloudContext.Provider value={value}>
      {children}
      <UpgradeDrawer visible={drawerVisible} onCancel={handleCloseDrawer} />
      <UpgradeSuccessModal
        configType={successModalType}
        visible={successModalVisible}
        onCancel={handleCloseSuccessModal}
      />
      {canPay ? (
        <>
          <SubscriptionReminderModal
            configType={upgradeModalType as UpgradeModalType}
            visible={upgradeModalVisible}
            onCancel={handleCloseUpgradeModal}
          />
        </>
      ) : (
        <>
          <InsufficientNoticeModal
            configType={upgradeModalType as InsufficientNoticeModalType}
            visible={upgradeModalVisible}
            onCancel={handleCloseUpgradeModal}
          />
        </>
      )}
    </UpgradeCloudContext.Provider>
  )
}

UpgradeCloudProvider.displayName = "UpgradeCloudProvider"
