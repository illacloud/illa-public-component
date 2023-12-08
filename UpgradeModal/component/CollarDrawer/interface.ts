import { COLLAR_TYPE } from "../../interface"

export interface CollarDrawerProps {
  from: string
  visible?: boolean
  onCancel?: () => void
  afterClose?: () => void
  onSuccessCallback?: (teamID: string, operationType: COLLAR_TYPE) => void
}
