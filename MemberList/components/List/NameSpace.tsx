import { FC } from "react"
import { Avatar } from "@/illa-public-component/Avatar"
import { NameSpaceProps } from "@/illa-public-component/MemberList/components/List/interface"
import {
  emailStyle,
  memberStatusWhenPending,
  nameAndEmailWrapperStyle,
  nameSpaceWrapperStyle,
  nameStyle,
} from "@/illa-public-component/MemberList/components/List/style"
import { USER_STATUS } from "@/illa-public-component/UserRoleUtils/interface"

export const NameSpace: FC<NameSpaceProps> = (props) => {
  const { name, email, avatar, status, userID, currentUserID } = props
  return (
    <div css={nameSpaceWrapperStyle}>
      <Avatar avatarUrl={avatar} name={name} id={userID} />
      {name ? (
        <div css={nameAndEmailWrapperStyle}>
          <p css={nameStyle}>
            {name} {userID === currentUserID && <span>(You)</span>}{" "}
            {status === USER_STATUS.PENDING && (
              <span css={memberStatusWhenPending}>(Pending)</span>
            )}
          </p>
          <p css={emailStyle}>{email}</p>
        </div>
      ) : (
        <div css={nameAndEmailWrapperStyle}>
          <p css={nameStyle}>
            {email}{" "}
            {status === USER_STATUS.PENDING && (
              <span css={memberStatusWhenPending}>(Pending)</span>
            )}
          </p>
        </div>
      )}
    </div>
  )
}

NameSpace.displayName = "NameSpace"
