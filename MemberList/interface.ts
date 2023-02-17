import {
  USER_ROLE,
  USER_STATUS,
} from "@/illa-public-component/UserRoleUtils/interface"

interface UserData {
  teamMemberID: string
  userID: string
  nickname: string
  email: string
  avatar: string
  userRole: USER_ROLE
  userStatus: USER_STATUS
  permission: Record<string, any> // Reserved Field
  createdAt: string
  updatedAt: string
}

export interface fetchInviteLinkResponse {
  inviteLink: string
  teamID: number
  userRole: USER_ROLE
}

export interface inviteByEmailResponse {
  name?: string
  email: string
  userID: string
  teamMemberID: string
  userRole: USER_ROLE
  userAvatar?: string
  emailStatus: USER_STATUS
}

export interface MemberListProps {
  isCloudVersion?: boolean
  hasApp?: boolean
  loading?: boolean
  appLink?: string
  isAppPublic?: boolean
  currentUserID: string
  currentTeamMemberID: string
  currentUserRole: USER_ROLE
  userListData: UserData[]
  allowEditorManageTeamMember: boolean
  allowViewerManageTeamMember: boolean
  allowInviteByLink: boolean
  changeTeamMembersRole: (
    teamMemberID: string,
    userRole: USER_ROLE,
  ) => Promise<boolean>
  configInviteLink: (inviteLinkEnabled: boolean) => Promise<boolean>
  removeTeam: () => Promise<boolean>
  removeTeamMembers: (teamMemberID: string) => Promise<boolean>
  fetchInviteLink: (userRole: USER_ROLE) => Promise<fetchInviteLinkResponse>
  renewInviteLink: (userRole: USER_ROLE) => Promise<fetchInviteLinkResponse>
  inviteByEmail: (
    email: string,
    userRole: USER_ROLE,
  ) => Promise<inviteByEmailResponse>
  updateTeamPermissionConfig: (
    allowEditorManageTeamMember: boolean,
    allowViewerManageTeamMember: boolean,
  ) => Promise<boolean>
  updateAppPublicConfig?: (isPublic: boolean) => Promise<boolean>
}
