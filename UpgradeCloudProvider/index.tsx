import { useMessage } from "@illa-design/react"
import {
  FC,
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { useSelector } from "react-redux"
import {
  InsufficientNoticeModal,
  InsufficientNoticeModalType,
  insufficientModalConfigKeys,
} from "@/illa-public-component/UpgradeCloudProvider/component/InsufficientNoticeModal"
import {
  SubscriptionReminderModal,
  UpgradeModalType,
  upgradeModalConfigKeys,
} from "@/illa-public-component/UpgradeCloudProvider/component/SubscriptionReminderModal"
import {
  DrawerDefaultConfig,
  UpgradeDrawer,
} from "@/illa-public-component/UpgradeCloudProvider/component/UpgradeDrawer"
import {
  UpgradeSuccessModal,
  UpgradeSuccessModalType,
} from "@/illa-public-component/UpgradeCloudProvider/component/UpgradeSuccessModal"
import { canManagePayment } from "@/illa-public-component/UserRoleUtils"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"

interface ProviderProps {
  children: ReactNode
}

interface Inject extends Omit<ProviderProps, "children"> {
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

function removeSearchParameter(currentURL: string) {
  const url = new URL(currentURL)
  url.search = ""
  const newPath = url.toString()
  window.history.replaceState(null, "", newPath)
}

export const UpgradeCloudContext = createContext<Inject>({} as Inject)

export const UpgradeCloudProvider: FC<ProviderProps> = (props) => {
  const { children } = props
  const currentTeamInfo = useSelector(getCurrentTeamInfo)
  const searchParams = new URLSearchParams(window.location.search)
  const stripeSuccessType = searchParams.get("stripeSuccessType")
  const stripeCancelType = searchParams.get("stripeCancelType")
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

  const message = useMessage()

  const canPay = useMemo(
    () =>
      canManagePayment(
        currentTeamInfo?.myRole,
        currentTeamInfo?.totalLicenseInfo?.teamLicensePurchased,
      ),
    [
      currentTeamInfo?.myRole,
      currentTeamInfo?.totalLicenseInfo?.teamLicensePurchased,
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

  const handleUpgradeModalVisible = (
    visible: boolean,
    modalType: UpgradeModalType | InsufficientNoticeModalType,
  ) => {
    if (
      canPay
        ? upgradeModalConfigKeys.includes(modalType)
        : insufficientModalConfigKeys.includes(modalType)
    ) {
      setUpgradeModalType(modalType)
      setUpgradeModalVisible((prevState) => {
        if (prevState !== visible) {
          return visible
        }
        return prevState
      })
    }
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

  useEffect(() => {
    if (stripeSuccessType) {
      switch (stripeSuccessType) {
        case "license":
          handleSuccessModalVisible(true, "subscribe-license")
          break
        case "storage":
          handleSuccessModalVisible(true, "upgrade-storage")
          break
        case "traffic":
          handleSuccessModalVisible(true, "upgrade-traffic")
          break
      }
      removeSearchParameter(window.location.href)
    }
  }, [stripeSuccessType])

  useEffect(() => {
    if (stripeCancelType) {
      switch (stripeCancelType) {
        case "license":
        case "storage":
        case "traffic":
          message.error({
            content: "billing.message.cancel_purchase",
          })
          removeSearchParameter(window.location.href)
          break
      }
    }
  }, [stripeCancelType, message])

  return (
    <UpgradeCloudContext.Provider value={value}>
      {children}
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
