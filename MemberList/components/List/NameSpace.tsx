import { Avatar } from "@illa-design/react"
import { FC } from "react"
import { NameSpaceProps } from "@/illa-public-component/MemberList/components/List/interface"
import {
  emailStyle,
  nameAndEmailWrapperStyle,
  nameSpaceWrapperStyle,
  nameStyle,
} from "@/illa-public-component/MemberList/components/List/style"

export const NameSpace: FC<NameSpaceProps> = (props) => {
  const { name, email, avatar } = props
  return (
    <div css={nameSpaceWrapperStyle}>
      <Avatar src={avatar} colorScheme="techPurple" />
      <div css={nameAndEmailWrapperStyle}>
        <p css={nameStyle}>{name}</p>
        <p css={emailStyle}>{email}</p>
      </div>
    </div>
  )
}

NameSpace.displayName = "NameSpace"
