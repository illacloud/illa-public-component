import { APP_TYPE } from "@illa-public/public-types"

export interface ICreateOptionsProps {
  isInModal: boolean
  handleCreateBlankApp: (appType: APP_TYPE) => Promise<void>
  handleOpenCreateFromResource: () => void
  closeModal?: () => void
}

export interface ICreateBlankAppProps {
  isInModal: boolean
  handleCreateBlankApp: (appType: APP_TYPE) => Promise<void>
  closeModal?: () => void
}

export interface ICreateFromDatabaseProps {
  isInModal: boolean
  handleOpenCreateFromResource: () => void
  closeModal?: () => void
}
