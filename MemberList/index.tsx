import { Loading } from "@illa-design/react"
import { FC } from "react"
import { Header } from "@/illa-public-component/MemberList/components/Header"
import { List } from "@/illa-public-component/MemberList/components/List"
import { MemberListProps } from "@/illa-public-component/MemberList/interface"
import {
  MemberListWrapperStyle,
  fullContentStyle,
} from "@/illa-public-component/MemberList/style"

export const MemberList: FC<MemberListProps> = (props) => {
  const {
    currentUserRole,
    currentUserID,
    allowEditorManageTeamMember,
    allowViewerManageTeamMember,
    hasApp,
    allowInviteByLink,
    userListData = [],
    removeTeam,
    updateTeamPermissionConfig,
    removeTeamMembers,
    changeTeamMembersRole,
    inviteByEmail,
    renewInviteLink,
    fetchInviteLink,
    configInviteLink,
    loading,
  } = props
  return (
    <div css={MemberListWrapperStyle}>
      <Header
        hasApp={hasApp}
        currentUserID={currentUserID}
        currentUserRole={currentUserRole}
        userListData={userListData}
        allowEditorManageTeamMember={allowEditorManageTeamMember}
        allowViewerManageTeamMember={allowViewerManageTeamMember}
        allowInviteByLink={allowInviteByLink}
        removeTeam={removeTeam}
        changeTeamMembersRole={changeTeamMembersRole}
        configInviteLink={configInviteLink}
        removeTeamMembers={removeTeamMembers}
        fetchInviteLink={fetchInviteLink}
        renewInviteLink={renewInviteLink}
        inviteByEmail={inviteByEmail}
        updateTeamPermissionConfig={updateTeamPermissionConfig}
      />
      {loading ? (
        <div css={fullContentStyle}>
          <Loading size="large" colorScheme="techPurple" />
        </div>
      ) : (
        <List
          currentUserID={currentUserID}
          currentUserRole={currentUserRole}
          userListData={userListData}
          changeTeamMembersRole={changeTeamMembersRole}
          removeTeamMembers={removeTeamMembers}
        />
      )}
    </div>
  )
}
