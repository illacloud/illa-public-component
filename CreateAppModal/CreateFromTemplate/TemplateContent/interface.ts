import { APP_TYPE } from "@illa-public/public-types"

export interface ICreateBlankAppProps {
  isInModal: boolean
  handleCreateBlankApp: (appType: APP_TYPE) => Promise<void>
  closeModal: () => void
  handleOpenCreateFromResource: () => void
}
