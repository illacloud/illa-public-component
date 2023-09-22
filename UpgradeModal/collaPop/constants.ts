import { CollarModalType } from "../interface"

export const OPERATION_NO_PERMISSION = {
  [CollarModalType.STORAGE]: "billing.message.no_storage",
  [CollarModalType.TRAFFIC]: "billing.message.no_traffic",
  [CollarModalType.TOKEN]: "billing.message.no_token",
}
