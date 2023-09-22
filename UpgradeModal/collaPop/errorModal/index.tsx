import { getCurrentTeamInfo, getPlanUtils } from "@illa-public/user-data"
import { canManageCollar } from "@illa-public/user-role-utils"
import { FC, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useMessage } from "@illa-design/react"
import { PayErrorModal } from "../../component/PayErrorModal"
import { OPERATION_NO_PERMISSION } from "../constants"
import { ModalShowProps } from "./interface"
import { modalStore } from "./store"

export const PayErrorModalPop: FC = () => {
  const [modal, setModal] = useState<ModalShowProps | null>(null)
  const currentTeamInfo = useSelector(getCurrentTeamInfo)
  const { t } = useTranslation()
  const message = useMessage()
  const canManageThisCollar = canManageCollar(
    currentTeamInfo?.myRole,
    getPlanUtils(currentTeamInfo),
  )

  useEffect(() => {
    const listener = modalStore.subscribe(() => {
      setModal(modalStore.getModal())
    })
    return () => {
      modalStore.unSubscribe(listener.listenerId)
    }
  }, [])

  const payErrorModal = useMemo(() => {
    if (!modal) return null
    if (currentTeamInfo && !canManageThisCollar && modal.visible) {
      message.info({
        content: t(OPERATION_NO_PERMISSION[modal.modalType]),
      })
      modalStore.remove()
      return null
    }
    return (
      <PayErrorModal
        modalType={modal.modalType}
        visible={modal.visible}
        onCancel={() => {
          if (modal.id) {
            modalStore.update({ ...modal, visible: false })
          }
        }}
        afterClose={() => modalStore.remove()}
      />
    )
  }, [canManageThisCollar, currentTeamInfo, message, modal, t])

  return <>{payErrorModal}</>
}

PayErrorModalPop.displayName = "PayErrorModalPop"
