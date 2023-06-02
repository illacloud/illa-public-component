import { FC, ReactNode, createContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { UpgradeDrawer } from "@/illa-public-component/UpgradeCloudProvider/component/UpgradeDrawer"
import { UpgradeSuccessModal } from "@/illa-public-component/UpgradeCloudProvider/component/UpgradeSuccessModal"
import { getCurrentTeamRole } from "@/store/team/teamSelector"

interface ProviderProps {
  children: ReactNode
}

interface Inject extends Omit<ProviderProps, "children"> {
  handleLicenseDrawerVisible: (visible: boolean) => void
  handleSuccessModalVisible: (visible: boolean) => void
}

export const UpgradeCloudContext = createContext<Inject>({} as Inject)

export const UpgradeCloudProvider: FC<ProviderProps> = (props) => {
  const { children } = props
  const { t } = useTranslation()
  const currentTeamRole = useSelector(getCurrentTeamRole)

  const [drawerVisible, setDrawerVisible] = useState(false)
  const [successModalVisible, setSuccessModalVisible] = useState(false)

  const handleLicenseDrawerVisible = (visible: boolean) => {
    setDrawerVisible((prevState) => {
      if (prevState !== visible) {
        return visible
      }
      return prevState
    })
  }

  const handleCloseDrawer = () => {
    setDrawerVisible(false)
  }

  const handleSuccessModalVisible = (visible: boolean) => {
    setSuccessModalVisible((prevState) => {
      if (prevState !== visible) {
        return visible
      }
      return prevState
    })
  }

  const handleCloseSuccessModal = () => {
    setSuccessModalVisible(false)
  }

  const value = {
    ...props,
    handleLicenseDrawerVisible,
    handleSuccessModalVisible,
  }

  return (
    <UpgradeCloudContext.Provider value={value}>
      {children}
      <UpgradeDrawer visible={drawerVisible} onCancel={handleCloseDrawer} />
      {/*<InsufficientNoticeModal*/}
      {/*  visible={successModalVisible}*/}
      {/*  onCancel={handleCloseSuccessModal}*/}
      {/*/>*/}
      <UpgradeSuccessModal
        visible={successModalVisible}
        onCancel={handleCloseSuccessModal}
      />
    </UpgradeCloudContext.Provider>
  )
}

UpgradeCloudProvider.displayName = "UpgradeCloudProvider"
