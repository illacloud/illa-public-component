import { AppPublicProps } from "../component/AppPublic/interface"
import { InviteByEmailProps } from "../component/InviteByEmail/interface"
import { InviteLinkProps } from "../component/InviteLink/interface"


export type ShareAppPage = "public" | "use" | "edit"

export interface ShareAppProps
  extends Omit<
      InviteByEmailProps,
      "defaultInviteUserRole" | "redirectURL" | "excludeUserRole"
    >,
    Omit<
      InviteLinkProps,
      | "defaultInviteUserRole"
      | "onCopyInviteLink"
      | "redirectURL"
      | "excludeUserRole"
    >,
    AppPublicProps {
  onClose: () => void
  canInvite: boolean
  defaultTab?: ShareAppPage
  useRedirectURL: string
  editRedirectURL: string
  onCopyEditInviteLink: (inviteLink: string) => void
  onCopyUseInviteLink: (inviteLink: string) => void
}