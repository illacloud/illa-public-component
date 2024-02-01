import { SUBSCRIPTION_CYCLE } from "@illa-public/public-types"
import { COLLAR_TYPE } from "../../interface"

export interface CollarDrawerShowProps {
  from: string
  visible?: boolean
  id: string
  onSuccessCallback?: (teamID: string, operationType: COLLAR_TYPE) => void
  subCycle?: SUBSCRIPTION_CYCLE
}
