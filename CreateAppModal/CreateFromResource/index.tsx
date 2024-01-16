import { FC, useEffect, useState } from "react"
import FromResourceModalContent from "./FromResourceModalContent"
import { Modal } from "./ModalHandler/interface"
import { fromResourceStore } from "./ModalHandler/store"

const CreateFromResource: FC = () => {
  const [modal, setModal] = useState<Modal | null>()

  useEffect(() => {
    const listener = fromResourceStore.subscribe(() => {
      setModal(fromResourceStore.getModal())
    })
    return () => {
      fromResourceStore.unSubscribe(listener.listenerId)
    }
  }, [])

  if (!modal) return null

  return (
    <FromResourceModalContent
      createCallBack={modal.createCallBack}
      visible={modal.visible}
      closeModal={() => {
        if (modal.id) {
          fromResourceStore.update({
            ...modal,
            visible: false,
          })
        }
      }}
      afterClose={() => fromResourceStore.remove()}
    />
  )
}

export default CreateFromResource
