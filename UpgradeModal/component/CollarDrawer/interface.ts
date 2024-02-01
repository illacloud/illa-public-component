import { SUBSCRIPTION_CYCLE } from "@illa-public/public-types"
import { COLLAR_TYPE } from "../../interface"

export interface CollarDrawerProps {
  from: string
  subCycle?: SUBSCRIPTION_CYCLE
  visible?: boolean
  onCancel?: () => void
  afterClose?: () => void
  onSuccessCallback?: (teamID: string, operationType: COLLAR_TYPE) => void
}
