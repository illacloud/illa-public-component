import { getCurrentTeamInfo, getPlanUtils } from "@illa-public/user-data"
import { canManagePayment } from "@illa-public/user-role-utils"
import { FC, Fragment, useCallback, useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { InsufficientNoticeModal } from "../../component/InsufficientNoticeModal"
import { INSUFFICIENT_MODAL_CONFIG_KEYS } from "../../component/InsufficientNoticeModal/constants"
import { InsufficientNoticeModalType } from "../../component/InsufficientNoticeModal/interface"
import { SubscriptionReminderModal } from "../../component/SubscriptionReminderModal"
import { UPGRADE_MODAL_CONFIG_KEYS } from "../../component/SubscriptionReminderModal/constants"
import { UpgradeModalType } from "../../component/SubscriptionReminderModal/interface"
import { DrawerDefaultConfig } from "../../interface"
import { useUpgradeDrawer } from "../drawer/hook"
import { ModalShowProps } from "./interface"
import { modalStore } from "./store"

export const UpgradeLicenseModal: FC = () => {
  const [modal, setModal] = useState<ModalShowProps | null>(null)
  const currentTeamInfo = useSelector(getCurrentTeamInfo)
  const drawer = useUpgradeDrawer()

  const handleLicenseDrawerVisible = useCallback(
    (_: boolean, config: DrawerDefaultConfig) => {
      drawer(modal?.from!, { defaultConfig: config })
    },
    [drawer, modal?.from],
  )

  const canPay = canManagePayment(
    currentTeamInfo?.myRole,
    getPlanUtils(currentTeamInfo),
    currentTeamInfo?.totalTeamLicense?.teamLicenseAllPaid,
  )
  const show = canPay
    ? UPGRADE_MODAL_CONFIG_KEYS.includes(modal?.modalType || "")
    : INSUFFICIENT_MODAL_CONFIG_KEYS.includes(modal?.modalType || "")

  const subscribeModal = useMemo(() => {
    if (!modal) return null
    if (!show) {
      modalStore.remove()
      return null
    } else {
      return (
        <>
          {canPay ? (
            <SubscriptionReminderModal
              configType={modal.modalType as UpgradeModalType}
              visible={modal.visible && show}
              onCancel={() => {
                if (modal.id) {
                  modalStore.update({ ...modal, visible: false })
                }
              }}
              handleLicenseDrawerVisible={handleLicenseDrawerVisible}
              afterClose={() => modalStore.remove()}
              from={modal.from}
            />
          ) : (
            <InsufficientNoticeModal
              configType={modal.modalType as InsufficientNoticeModalType}
              visible={modal.visible && show}
              onCancel={() => {
                if (modal.id) {
                  modalStore.update({ ...modal, visible: false })
                }
              }}
              afterClose={() => modalStore.remove()}
            />
          )}
        </>
      )
    }
  }, [canPay, handleLicenseDrawerVisible, modal, show])

  useEffect(() => {
    const listener = modalStore.subscribe(() => {
      setModal(modalStore.getModal())
    })
    return () => {
      modalStore.unSubscribe(listener.listenerId)
    }
  }, [])

  if (!modal) return null
  return <>{subscribeModal}</>
}
