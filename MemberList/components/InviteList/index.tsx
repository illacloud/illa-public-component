import RoleSelect from "@illa-public/role-select"
import { USER_ROLE } from "@illa-public/user-data"
import { FC, useCallback } from "react"
import { Avatar } from "@illa-design/react"
import { InviteListItemProps, InviteListProps } from "./interface"
import {
  avatarAndNameWrapperStyle,
  inviteAvatarStyle,
  inviteListTitleWrapperStyle,
  inviteListWrapperStyle,
  nicknameStyle,
} from "./style"

const InviteListItem: FC<InviteListItemProps> = (props) => {
  const {
    email,
    userRole,
    userAvatar,
    teamMemberID,
    currentUserRole,
    changeMembersRole,
  } = props
  const handleChangeRole = useCallback(
    (value: USER_ROLE) => {
      changeMembersRole(teamMemberID, value)
    },
    [teamMemberID, changeMembersRole],
  )

  return (
    <div css={inviteListTitleWrapperStyle}>
      <div css={avatarAndNameWrapperStyle}>
        {userAvatar ? (
          <Avatar src={userAvatar} />
        ) : (
          <div css={inviteAvatarStyle} />
        )}
        <span css={nicknameStyle}>{email}</span>
      </div>
      <RoleSelect
        value={userRole}
        userRole={currentUserRole}
        onChange={handleChangeRole}
      />
    </div>
  )
}

export const InviteList: FC<InviteListProps> = (props) => {
  const { inviteList, currentUserRole, changeMembersRole } = props
  return (
    <div css={inviteListWrapperStyle}>
      {inviteList?.map((item) => (
        <InviteListItem
          key={item.email}
          email={item.email}
          emailStatus={item.emailStatus}
          userAvatar={item.userAvatar}
          userRole={item.userRole}
          userID={item.userID}
          teamMemberID={item.teamMemberID}
          currentUserRole={currentUserRole}
          changeMembersRole={changeMembersRole}
        />
      ))}
    </div>
  )
}

InviteList.displayName = "InviteList"
