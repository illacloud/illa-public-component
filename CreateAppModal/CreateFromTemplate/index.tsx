import { FC, useEffect, useState } from "react"
import FromTemplateModalContent from "./FromTemplateModalContent"
import { Modal } from "./ModalHandler/interface"
import { fromTemplateStore } from "./ModalHandler/store"

const CreateFromTemplate: FC = () => {
  const [modal, setModal] = useState<Modal | null>()

  useEffect(() => {
    const listener = fromTemplateStore.subscribe(() => {
      setModal(fromTemplateStore.getModal())
    })
    return () => {
      fromTemplateStore.unSubscribe(listener.listenerId)
    }
  }, [])

  if (!modal) return null

  return (
    <FromTemplateModalContent
      {...modal}
      visible={modal.visible}
      closeModal={() => {
        if (modal.id) {
          fromTemplateStore.update({
            ...modal,
            visible: false,
          })
        }
      }}
      afterClose={() => {
        fromTemplateStore.remove()
      }}
    />
  )
}

export default CreateFromTemplate
