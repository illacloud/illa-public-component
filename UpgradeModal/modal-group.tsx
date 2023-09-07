import { getCurrentTeamInfo, getPlanUtils } from "@illa-public/user-data"
import { canManagePayment } from "@illa-public/user-role-utils"
import { FC, Fragment, useCallback, useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { InsufficientNoticeModal } from "./component/InsufficientNoticeModal"
import { INSUFFICIENT_MODAL_CONFIG_KEYS } from "./component/InsufficientNoticeModal/constants"
import { InsufficientNoticeModalType } from "./component/InsufficientNoticeModal/interface"
import { SubscriptionReminderModal } from "./component/SubscriptionReminderModal"
import { UPGRADE_MODAL_CONFIG_KEYS } from "./component/SubscriptionReminderModal/constants"
import { UpgradeModalType } from "./component/SubscriptionReminderModal/interface"
import { UpgradeSuccessModal } from "./component/UpgradeSuccessModal"
import { SUCCESS_MODAL_CONFIG_KEY } from "./component/UpgradeSuccessModal/constants"
import { UpgradeSuccessModalType } from "./component/UpgradeSuccessModal/interface"
import { useUpgradeDrawer } from "./hook"
import { DrawerDefaultConfig, ModalShowProps } from "./interface"
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
        getPlanUtils(currentTeamInfo),
        currentTeamInfo?.totalTeamLicense?.teamLicenseAllPaid,
      )
      let show = canPay
        ? UPGRADE_MODAL_CONFIG_KEYS.includes(modal.modalType)
        : INSUFFICIENT_MODAL_CONFIG_KEYS.includes(modal.modalType)
      const isShowSuccessModal = Object.keys(SUCCESS_MODAL_CONFIG_KEY).includes(
        modal.modalType,
      )
      if (isShowSuccessModal) {
        return (
          <UpgradeSuccessModal
            key={modal.id}
            configType={modal.modalType as UpgradeSuccessModalType}
            visible={modal.visible}
            onCancel={() => {
              if (modal.id) {
                modalStore.update(modal.id, { ...modal, visible: false })
              }
            }}
          />
        )
      } else {
        if (!show) {
          modalStore.remove(modal.id || "")
          return null
        } else {
          return (
            <Fragment key={modal.id}>
              {canPay ? (
                <SubscriptionReminderModal
                  configType={modal.modalType as UpgradeModalType}
                  visible={modal.visible && show}
                  onCancel={() => {
                    if (modal.id) {
                      modalStore.update(modal.id, { ...modal, visible: false })
                    }
                  }}
                  handleLicenseDrawerVisible={handleLicenseDrawerVisible}
                />
              ) : (
                <InsufficientNoticeModal
                  configType={modal.modalType as InsufficientNoticeModalType}
                  visible={modal.visible && show}
                  onCancel={() => {
                    if (modal.id) {
                      modalStore.update(modal.id, { ...modal, visible: false })
                    }
                  }}
                />
              )}
            </Fragment>
          )
        }
      }
    })
  }, [currentTeamInfo, handleLicenseDrawerVisible, modalList])

  return <>{modals}</>
}
