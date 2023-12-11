import { InsufficientNoticeModalType } from "../../component/InsufficientNoticeModal/interface"
import { UpgradeModalType } from "../../component/SubscriptionReminderModal/interface"

export interface ModalShowProps {
  from: string
  visible?: boolean
  id?: string
  modalType: UpgradeModalType | InsufficientNoticeModalType
}
