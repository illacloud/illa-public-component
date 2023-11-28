import { Avatar } from "@illa-public/avatar"
import { USER_STATUS } from "@illa-public/public-types"
import { FC } from "react"
import { useTranslation } from "react-i18next"
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
  const { t } = useTranslation()
  const { name, email, avatar, status, userID, teamMemberID, currentUserID } =
    props
  return (
    <div css={nameSpaceWrapperStyle}>
      <Avatar
        css={nameSpaceStyle}
        avatarUrl={avatar}
        name={name || email}
        id={userID}
      />
      {name ? (
        <div css={nameAndEmailWrapperStyle}>
          <p css={nameStyle}>
            <span css={textOverflowStyle}>{name}</span>
            {teamMemberID === currentUserID && (
              <span>({t("user_management.status.current-user")})</span>
            )}{" "}
            {status === USER_STATUS.PENDING && (
              <span css={memberStatusWhenPending}>
                ({t("user_management.status.pending")})
              </span>
            )}
          </p>
          <p css={[emailStyle, textOverflowStyle]}>{email}</p>
        </div>
      ) : (
        <div css={nameAndEmailWrapperStyle}>
          <p css={nameStyle}>
            <span css={textOverflowStyle}>{email}</span>
            {status === USER_STATUS.PENDING && (
              <span css={memberStatusWhenPending}>
                ({t("user_management.status.pending")})
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  )
}

NameSpace.displayName = "NameSpace"
