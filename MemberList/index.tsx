import { Loading } from "@illa-design/react"
import { FC } from "react"
import { Header } from "@/illa-public-component/MemberList/components/Header"
import { List } from "@/illa-public-component/MemberList/components/List"
import { MemberListContext } from "@/illa-public-component/MemberList/context/MemberListContext"
import { MemberListProps } from "@/illa-public-component/MemberList/interface"
import {
  MemberListWrapperStyle,
  fullContentStyle,
} from "@/illa-public-component/MemberList/style"

export const MemberList: FC<MemberListProps> = (props) => {
  const {
    isCloudVersion = true,
    currentUserRole,
    currentUserID,
    currentTeamMemberID,
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
    onSubscribe,
    totalTeamLicense,
    currentTeamLicense,
    teamName,
    userNickname,
    loading,
  } = props

  return (
    <MemberListContext.Provider
      value={{ isCloudVersion, currentTeamLicense, totalTeamLicense }}
    >
      <div css={MemberListWrapperStyle}>
        <Header
          hasApp={hasApp}
          currentUserID={currentUserID}
          currentUserRole={currentUserRole}
          currentTeamMemberID={currentTeamMemberID}
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
          teamName={teamName}
          userNickname={userNickname}
          updateTeamPermissionConfig={updateTeamPermissionConfig}
          isCloudVersion={isCloudVersion}
          currentTeamLicense={currentTeamLicense}
        />
        {loading ? (
          <div css={fullContentStyle}>
            <Loading colorScheme="techPurple" />
          </div>
        ) : (
          <List
            isCloudVersion={isCloudVersion}
            currentUserID={currentUserID}
            currentUserRole={currentUserRole}
            userListData={userListData}
            currentTeamLicense={currentTeamLicense}
            totalTeamLicense={totalTeamLicense}
            changeTeamMembersRole={changeTeamMembersRole}
            removeTeamMembers={removeTeamMembers}
            onSubscribe={onSubscribe}
          />
        )}
      </div>
    </MemberListContext.Provider>
  )
}
