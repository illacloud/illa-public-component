import { getCurrentTeamInfo } from "@illa-public/user-data"
import { canManagePayment } from "@illa-public/user-role-utils"
import { FC, Fragment, useCallback, useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import {
  InsufficientNoticeModal,
  InsufficientNoticeModalType,
} from "./component/InsufficientNoticeModal"
import {
  SubscriptionReminderModal,
  UpgradeModalType,
} from "./component/SubscriptionReminderModal"
import { DrawerDefaultConfig } from "./component/UpgradeDrawer/interface"
import {
  UpgradeSuccessModal,
  UpgradeSuccessModalType,
  modalConfigKey,
} from "./component/UpgradeSuccessModal"
import { useUpgradeDrawer } from "./hook"
import { ModalShowProps } from "./interface"
import { modalStore } from "./store"

export const UpgradeModalGroup: FC = () => {
  const [modalList, setModalList] = useState<ModalShowProps[]>([])
  const currentTeamInfo = useSelector(getCurrentTeamInfo)
  const drawer = useUpgradeDrawer()

  const handleLicenseDrawerVisible = useCallback(
    (_: boolean, config: DrawerDefaultConfig) => {
      drawer({ defaultConfig: config })
    },
    [drawer],
  )

  useEffect(() => {
    const listener = modalStore.subscribe(() => {
      setModalList([...modalStore.getModals()])
    })
    return () => {
      modalStore.unSubscribe(listener.listenerId)
    }
  }, [])

  const modals = useMemo(() => {
    return modalList.map((modal) => {
      const canPay = canManagePayment(
        currentTeamInfo?.myRole,
        currentTeamInfo?.totalTeamLicense?.teamLicenseAllPaid,
      )
      return (
        <Fragment key={modal.id}>
          {Object.keys(modalConfigKey).includes(modal.modalType) ? (
            <UpgradeSuccessModal
              configType={modal.modalType as UpgradeSuccessModalType}
              visible={modal.visible}
              onCancel={() => {
                if (modal.id) {
                  modalStore.update(modal.id, {
                    ...modal,
                    visible: false,
                  })
                }
              }}
            />
          ) : canPay ? (
            <SubscriptionReminderModal
              configType={modal.modalType as UpgradeModalType}
              visible={modal.visible}
              onCancel={() => {
                if (modal.id) {
                  modalStore.update(modal.id, {
                    ...modal,
                    visible: false,
                  })
                }
              }}
              handleLicenseDrawerVisible={handleLicenseDrawerVisible}
            />
          ) : (
            <InsufficientNoticeModal
              configType={modal.modalType as InsufficientNoticeModalType}
              visible={modal.visible}
              onCancel={() => {
                if (modal.id) {
                  modalStore.update(modal.id, {
                    ...modal,
                    visible: false,
                  })
                }
              }}
            />
          )}
        </Fragment>
      )
    })
  }, [
    currentTeamInfo?.myRole,
    currentTeamInfo?.totalTeamLicense?.teamLicenseAllPaid,
    handleLicenseDrawerVisible,
    modalList,
  ])

  return <>{modals}</>
}
