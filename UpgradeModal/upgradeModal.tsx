import { getCurrentTeamInfo } from "@illa-public/user-data"
import { canManagePayment } from "@illa-public/user-role-utils"
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from "react"
import { useSelector } from "react-redux"
import { InsufficientNoticeModal } from "./component/InsufficientNoticeModal"
import { INSUFFICIENT_MODAL_CONFIG_KEYS } from "./component/InsufficientNoticeModal/constants"
import { InsufficientNoticeModalType } from "./component/InsufficientNoticeModal/interface"
import { SubscriptionReminderModal } from "./component/SubscriptionReminderModal"
import { UPGRADE_MODAL_CONFIG_KEYS } from "./component/SubscriptionReminderModal/constants"
import { UpgradeModalType } from "./component/SubscriptionReminderModal/interface"
import { UpgradeDrawer } from "./component/UpgradeDrawer"
import { UpgradeSuccessModal } from "./component/UpgradeSuccessModal"
import { UpgradeSuccessModalType } from "./component/UpgradeSuccessModal/interface"
import { DrawerDefaultConfig } from "./interface"

export interface UpgradeModalRef {
  handleLicenseDrawerVisible: (
    visible: boolean,
    drawerConfig: DrawerDefaultConfig,
  ) => void
  handleSuccessModalVisible: (
    visible: boolean,
    modalType: UpgradeSuccessModalType,
  ) => void
  handleUpgradeModalVisible: (
    visible: boolean,
    modalType: UpgradeModalType | InsufficientNoticeModalType,
  ) => void
}

export const UpgradeModal = forwardRef<UpgradeModalRef>((_, ref) => {
  const currentTeamInfo = useSelector(getCurrentTeamInfo)
  const [drawerConfig, setDrawerConfig] = useState<DrawerDefaultConfig>({
    type: "license",
  })
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
        currentTeamInfo?.myRole,
        currentTeamInfo?.totalTeamLicense?.teamLicenseAllPaid,
      ),
    [
      currentTeamInfo?.myRole,
      currentTeamInfo?.totalTeamLicense?.teamLicenseAllPaid,
    ],
  )

  const handleLicenseDrawerVisible = (
    visible: boolean,
    config: DrawerDefaultConfig,
  ) => {
    setDrawerConfig(config)
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
    setSuccessModalType(modalType)
    setSuccessModalVisible((prevState) => {
      if (prevState !== visible) {
        return visible
      }
      return prevState
    })
  }

  const handleUpgradeModalVisible = useCallback(
    (
      visible: boolean,
      modalType: UpgradeModalType | InsufficientNoticeModalType,
    ) => {
      if (
        canPay
          ? UPGRADE_MODAL_CONFIG_KEYS.includes(modalType)
          : INSUFFICIENT_MODAL_CONFIG_KEYS.includes(modalType)
      ) {
        setUpgradeModalType(modalType)
        setUpgradeModalVisible((prevState) => {
          if (prevState !== visible) {
            return visible
          }
          return prevState
        })
      }
    },
    [canPay],
  )

  const handleCloseDrawer = () => {
    setDrawerVisible(false)
  }

  const handleCloseSuccessModal = () => {
    setSuccessModalVisible(false)
  }
  const handleCloseUpgradeModal = () => {
    setUpgradeModalVisible(false)
  }

  useImperativeHandle(ref, () => ({
    handleLicenseDrawerVisible,
    handleSuccessModalVisible,
    handleUpgradeModalVisible,
  }))

  return (
    <>
      <UpgradeDrawer
        visible={drawerVisible}
        defaultConfig={drawerConfig}
        onCancel={handleCloseDrawer}
      />
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
            handleLicenseDrawerVisible={handleLicenseDrawerVisible}
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
    </>
  )
})

UpgradeModal.displayName = "UpgradeModal"
