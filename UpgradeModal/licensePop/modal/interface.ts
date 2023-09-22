import { InsufficientNoticeModalType } from "../../component/InsufficientNoticeModal/interface"
import { UpgradeModalType } from "../../component/SubscriptionReminderModal/interface"

export interface ModalShowProps {
  visible?: boolean
  id?: string
  modalType: UpgradeModalType | InsufficientNoticeModalType
}
