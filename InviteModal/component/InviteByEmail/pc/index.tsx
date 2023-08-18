import { Avatar } from "@illa-public/avatar"
import { ERROR_FLAG, isILLAAPiError } from "@illa-public/illa-net"
import { RoleSelector } from "@illa-public/role-selector"
import { FC, useState } from "react"
import {
  Button,
  InputTag,
  getColor,
  useMergeValue,
  useMessage,
} from "@illa-design/react"
import { InviteByEmailProps, InvitedUser } from "../interface"
import { changeUserRoleByTeamMemberID, inviteByEmail } from "../service"
import {
  applyLicenseNumberStyle,
  avatarContainerStyle,
  inviteByEmailContainerStyle,
  inviteByEmailInputContainerStyle,
  inviteByEmailLabelStyle,
  inviteListContainerStyle,
  licenseContainerStyle,
  licenseLabelStyle,
  nicknameStyle,
} from "./style"

export const EMAIL_FORMAT =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const InviteByEmailPC: FC<InviteByEmailProps> = (props) => {
  const { defaultInviteUserRole, license, teamID, currentUserRole } = props

  const message = useMessage()

  const [inviteUserRole, setInviteUserRole] = useMergeValue(
    defaultInviteUserRole,
    {
      defaultValue: defaultInviteUserRole,
    },
  )

  const [alreadyInvited, setAlreadyInvited] = useState<InvitedUser[]>([])

  const [inviting, setInviting] = useState(false)

  const [currentValue, setCurrentValue] = useState<string[]>([])

  return (
    <div css={inviteByEmailContainerStyle}>
      <div css={inviteByEmailLabelStyle}>Invite By Email</div>
      <div css={inviteByEmailInputContainerStyle}>
        <InputTag
          flexShrink="1"
          readOnly={inviting}
          flexGrow="1"
          value={currentValue}
          onChange={(value) => {
            setCurrentValue(value as string[])
          }}
          w="unset"
          colorScheme="techPurple"
          validate={(value) => {
            if (value.length === 0) {
              return true
            }
            const suc = value.length > 0 && EMAIL_FORMAT.test(value)
            if (!suc) {
              message.error({
                content: "g",
              })
            }
            return suc
          }}
          suffix={
            <RoleSelector
              inline
              currentUserRole={currentUserRole}
              value={inviteUserRole}
              onClickItem={async (role) => {
                setInviteUserRole(role)
              }}
            />
          }
        />
        <Button
          ml="8px"
          w="80px"
          h="32px"
          flexShrink="0"
          disabled={currentValue.length === 0}
          colorScheme={getColor("grayBlue", "02")}
          loading={inviting}
          onClick={async () => {
            setInviting(true)
            const finalInviteUserList: InvitedUser[] = [...alreadyInvited]
            for (let i = 0; i < currentValue.length; i++) {
              try {
                const invitedUserResp = await inviteByEmail(
                  teamID,
                  currentValue[i],
                  inviteUserRole,
                )
                const currentIndex = finalInviteUserList.findIndex(
                  (item) => item.email === currentValue[i],
                )
                const user = {
                  email: currentValue[i],
                  userRole: inviteUserRole,
                  teamMemberID: invitedUserResp.data.teamMemberID,
                }
                if (currentIndex !== -1) {
                  finalInviteUserList[currentIndex] = user
                } else {
                  finalInviteUserList.push(user)
                }
                setCurrentValue([])
              } catch (e) {
                if (isILLAAPiError(e)) {
                  if (
                    e.data.errorFlag ===
                    ERROR_FLAG.ERROR_FLAG_EMAIL_ALREADY_USED
                  ) {
                    message.error({
                      content: "already invite",
                    })
                  }
                } else {
                  message.error({
                    content: "net error",
                  })
                }
              }
            }
            setAlreadyInvited(finalInviteUserList)
            setInviting(false)
          }}
        >
          {!inviting ? "Invite" : undefined}
        </Button>
      </div>
      <div css={licenseContainerStyle}>
        <div css={licenseLabelStyle}>Remaining license</div>
        <div css={applyLicenseNumberStyle(license > 0)}>{license}</div>
      </div>
      <div css={inviteListContainerStyle}>
        {alreadyInvited.map((user) => {
          return (
            <div key={user.email} css={avatarContainerStyle}>
              <Avatar name={user.email} />
              <div css={nicknameStyle}>{user.email}</div>
              <RoleSelector
                currentUserRole={currentUserRole}
                value={user.userRole}
                onClickItem={async (item) => {
                  setInviting(true)
                  try {
                    await changeUserRoleByTeamMemberID(
                      teamID,
                      user.teamMemberID,
                      item,
                    )
                    const index = alreadyInvited.findIndex(
                      (u) => u.email === user.email,
                    )
                    if (index != -1) {
                      const newAlreadyInvited = [...alreadyInvited]
                      newAlreadyInvited[index].userRole = item
                      setAlreadyInvited(newAlreadyInvited)
                    }
                  } catch (e) {
                    message.error({
                      content: "net error",
                    })
                  } finally {
                    setInviting(false)
                  }
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

InviteByEmailPC.displayName = "InviteByEmailPC"