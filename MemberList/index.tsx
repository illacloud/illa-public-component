import { FC } from "react"
import { Loading } from "@illa-design/react"
import { Header } from "./components/Header"
import { List } from "./components/List"
import { MemberListContext } from "./context/MemberListContext"
import { MemberListProps } from "./interface"
import { MemberListWrapperStyle, fullContentStyle } from "./style"

export * from "./interface"
export * from "./context/MemberListContext"
export * from "./components/InviteList"

export const MemberList: FC<MemberListProps> = (props) => {
  const {
    isCloudVersion = true,
    currentUserRole,
    currentUserID,
    currentTeamMemberID,
    allowEditorManageTeamMember,
    allowViewerManageTeamMember,
    blockRegister,
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
          blockRegister={blockRegister}
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
