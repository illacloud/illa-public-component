import { COLLAR_TYPE } from "../../interface"

export interface CollarDrawerShowProps {
  from: string
  visible?: boolean
  id: string
  onSuccessCallback?: (teamID: string, operationType: COLLAR_TYPE) => void
}
