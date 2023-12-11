import { DriveVolumeInfo } from "../../interface"
import { isSubscribeForDrawer } from "../../utils"

export const isQuantityDecreased = (
  quantity: number,
  driveVolume: DriveVolumeInfo,
) => quantity < driveVolume.quantity

export const getDescText = (
  quantity: number,
  driveVolume?: DriveVolumeInfo,
) => {
  if (!driveVolume) return ""
  if (driveVolume && isSubscribeForDrawer(driveVolume?.plan)) {
    if (driveVolume.quantity === quantity) {
      return ""
    } else {
      if (isQuantityDecreased(quantity, driveVolume)) {
        return "billing.payment_sidebar.description_title.remove_storage"
      } else {
        return "billing.payment_sidebar.description_title.add_storage"
      }
    }
  }
  return "billing.payment_sidebar.description_title.subscribe_storage_monthly"
}

export const geButtonText = (
  quantity: number,
  driveVolume?: DriveVolumeInfo,
) => {
  if (driveVolume && isSubscribeForDrawer(driveVolume?.plan)) {
    if (driveVolume.quantity === quantity) {
      return "billing.payment_sidebar.button.subscribe"
    } else {
      if (isQuantityDecreased(quantity, driveVolume)) {
        return "billing.payment_sidebar.button.storage_traffic_remove"
      } else {
        return "billing.payment_sidebar.button.storage_traffic_increase"
      }
    }
  }
  return "billing.payment_sidebar.button.subscribe"
}

export const formatCeilNum = (num?: number) => {
  if (!num) return 0
  return Math.ceil(num / Math.pow(1024, 3))
}
