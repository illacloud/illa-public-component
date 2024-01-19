import { FC, useState } from "react"
import { AddIcon, Loading, getColor } from "@illa-design/react"
import { CreateOptionsProps } from "./interface"
import {
  createOptionsContainerStyle,
  createOptionsStyle,
  iconStyle,
} from "./style"

const CreateBlankApp: FC<CreateOptionsProps> = ({
  isInModal = false,
  handleCreateBlankApp,
  closeModal,
}) => {
  const [loading, setLoading] = useState(false)
  const createBlankApp = async () => {
    setLoading(true)
    try {
      await handleCreateBlankApp?.()
    } catch (e) {
    } finally {
      setLoading(false)
    }
    closeModal?.()
  }
  return (
    <div
      css={createOptionsContainerStyle(
        isInModal,
        getColor("techPurple", "03"),
        loading,
      )}
      onClick={createBlankApp}
    >
      <div css={iconStyle}>
        {loading ? <Loading colorScheme="white" /> : <AddIcon size="16px" />}
      </div>
      <span>Create blank app</span>
    </div>
  )
}

const CreateFromDatabase: FC<CreateOptionsProps> = ({
  isInModal = false,
  handleOpenCreateFromResource,
  closeModal,
}) => {
  const createFromDatabase = async () => {
    closeModal?.()
    handleOpenCreateFromResource?.()
  }
  return (
    <div
      css={createOptionsContainerStyle(isInModal, "#1AB0F1")}
      onClick={createFromDatabase}
    >
      <div css={iconStyle}>
        <AddIcon size="16px" />
      </div>
      <span>Generate from database</span>
    </div>
  )
}

export const CreateOptions: FC<CreateOptionsProps> = (props) => {
  return (
    <div css={createOptionsStyle}>
      <CreateBlankApp {...props} />
      <CreateFromDatabase {...props} />
    </div>
  )
}

export default CreateOptions
