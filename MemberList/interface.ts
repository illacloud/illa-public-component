import {
  USER_ROLE,
  USER_STATUS,
} from "@/illa-public-component/UserRoleUtils/interface"

interface UserData {
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
  email: string
  userRole: USER_ROLE
  userAvatar?: string
  emailStatus: USER_STATUS
}

export interface MemberListProps {
  hasApp: boolean
  currentUserID: string
  currentUserRole: USER_ROLE
  userListData: UserData[]
  allowEditorOrViewerInvite: boolean
  allowInviteByLink: boolean
  changeTeamMembersRole: (
    userID: string,
    userRole: USER_ROLE,
  ) => Promise<boolean>
  configInviteLink: (inviteLinkEnabled: boolean) => Promise<boolean>
  removeTeamMembers: (userID: string) => Promise<boolean>
  fetchInviteLink: (userRole: USER_ROLE) => Promise<fetchInviteLinkResponse>
  renewInviteLink: (userRole: USER_ROLE) => Promise<fetchInviteLinkResponse>
  inviteByEmail: (
    email: string,
    userRole: USER_ROLE,
  ) => Promise<inviteByEmailResponse>
  updateTeamPermissionConfig: (
    allowEditorOrViewerInvite: boolean,
  ) => Promise<boolean>
}
