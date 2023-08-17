import { Avatar } from "@illa-public/avatar"
import { RoleSelector } from "@illa-public/role-selector"
import { USER_STATUS } from "@illa-public/user-data"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { ListItemProps } from "./interface"
import {
  emailStyle,
  listAvatarAndNameContainerStyle,
  listItemContainerStyle,
  nickNameAndEmailContainerStyle,
  nickNameContainerStyle,
  statusStyle,
} from "./style"

export const MobileMemberListItem: FC<ListItemProps> = (props) => {
  const {
    nickName,
    userID,
    email,
    status,
    userRole,
    currentUserID,
    currentUserRole,
    avatarURL,
  } = props

  const { t } = useTranslation()

  return (
    <div css={listItemContainerStyle}>
      <div css={listAvatarAndNameContainerStyle}>
        <Avatar name={nickName} id={userID} avatarUrl={avatarURL} size={40} />
        <div css={nickNameAndEmailContainerStyle}>
          <div css={nickNameContainerStyle}>
            <span>{nickName}</span>
            {status === USER_STATUS.PENDING && (
              <span> ({t("user_management.status.current-user")})</span>
            )}
            {userID === currentUserID && (
              <span css={statusStyle}>
                {" "}
                ({t("user_management.status.pending")})
              </span>
            )}
          </div>
          <span css={emailStyle}>{email}</span>
        </div>
      </div>
      <RoleSelector value={userRole} currentUserRole={currentUserRole} />
    </div>
  )
}
