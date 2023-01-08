import { Avatar } from "@illa-design/react"
import { FC } from "react"
import { NameSpaceProps } from "@/illa-public-component/MemberList/components/List/interface"
import {
  emailStyle,
  memberStatusWhenPending,
  nameAndEmailWrapperStyle,
  nameSpaceWrapperStyle,
  nameStyle,
} from "@/illa-public-component/MemberList/components/List/style"
import { USER_STATUS } from "@/store/userInfo/userInfoState"

export const NameSpace: FC<NameSpaceProps> = (props) => {
  const { name, email, avatar, status } = props
  return (
    <div css={nameSpaceWrapperStyle}>
      <Avatar src={avatar} colorScheme="techPurple" />
      <div css={nameAndEmailWrapperStyle}>
        <p css={nameStyle}>
          {name}{" "}
          {status === USER_STATUS.PENDING && (
            <span css={memberStatusWhenPending}>(Pending)</span>
          )}
        </p>
        <p css={emailStyle}>{email}</p>
      </div>
    </div>
  )
}

NameSpace.displayName = "NameSpace"
