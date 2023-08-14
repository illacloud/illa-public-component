import { Avatar } from "@illa-public/avatar"
import { USER_STATUS } from "@illa-public/user-data"
import { FC } from "react"
import { NameSpaceProps } from "./interface"
import {
  emailStyle,
  memberStatusWhenPending,
  nameAndEmailWrapperStyle,
  nameSpaceStyle,
  nameSpaceWrapperStyle,
  nameStyle,
  textOverflowStyle,
} from "./style"

export const NameSpace: FC<NameSpaceProps> = (props) => {
  const { name, email, avatar, status, userID, currentUserID } = props
  return (
    <div css={nameSpaceWrapperStyle}>
      <Avatar css={nameSpaceStyle} avatarUrl={avatar} name={name} id={userID} />
      {name ? (
        <div css={nameAndEmailWrapperStyle}>
          <p css={nameStyle}>
            <span css={textOverflowStyle}>{name}</span>
            {userID === currentUserID && <span>(You)</span>}{" "}
            {status === USER_STATUS.PENDING && (
              <span css={memberStatusWhenPending}>(Pending)</span>
            )}
          </p>
          <p css={[emailStyle, textOverflowStyle]}>{email}</p>
        </div>
      ) : (
        <div css={nameAndEmailWrapperStyle}>
          <p css={nameStyle}>
            <span css={textOverflowStyle}>{email}</span>
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
