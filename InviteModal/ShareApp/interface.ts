import { AppPublicProps } from "../component/AppPublic/interface"
import { InviteByEmailProps } from "../component/InviteByEmail/interface"
import { InviteLinkProps } from "../component/InviteLink/interface"

export type ShareAppPage = "public" | "use" | "edit"

export interface ShareAppProps
  extends Omit<InviteByEmailProps, "defaultInviteUserRole">,
    Omit<InviteLinkProps, "defaultInviteUserRole" | "onCopyInviteLink">,
    AppPublicProps {
  onClose: () => void
  canInvite: boolean
  defaultTab?: ShareAppPage
  onCopyEditInviteLink: (inviteLink: string) => void
  onCopyUseInviteLink: (inviteLink: string) => void
}
