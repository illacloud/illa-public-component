import { FC, useEffect, useState } from "react"
import { TeamLimitModal } from "../../component/TeamLimitModal"
import { ModalShowProps } from "./interface"
import { modalStore } from "./store"

export const TeamLimitPop: FC = () => {
  const [modal, setModal] = useState<ModalShowProps | null>(null)

  useEffect(() => {
    const listener = modalStore.subscribe(() => {
      setModal(modalStore.getModal())
    })
    return () => {
      modalStore.unSubscribe(listener.listenerId)
    }
  }, [])

  if (!modal) return null

  return (
    <TeamLimitModal
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
}

TeamLimitPop.displayName = "TeamLimitPop"
