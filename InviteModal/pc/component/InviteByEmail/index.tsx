import { RoleSelector } from "@illa-public/role-selector"
import { FC, MutableRefObject, useContext, useRef, useState } from "react"
import {
  Button,
  InputTag,
  getColor,
  useMergeValue,
  useMessage,
} from "@illa-design/react"
import { InviteModalContext } from "../../../context"
import { InviteByEmailProps } from "./interface"
import {
  applyLicenseNumberStyle,
  inviteByEmailContainerStyle,
  inviteByEmailInputContainerStyle,
  inviteByEmailLabelStyle,
  licenseContainerStyle,
  licenseLabelStyle,
} from "./style"

export const EMAIL_FORMAT =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const InviteByEmail: FC<InviteByEmailProps> = (props) => {
  const { defaultInviteUserRole, license = 0 } = props

  const { teamID, currentUserRole } = useContext(InviteModalContext)

  const message = useMessage()

  const [inviteUserRole, setInviteUserRole] = useMergeValue(
    defaultInviteUserRole,
    {
      defaultValue: defaultInviteUserRole,
    },
  )

  const [inviting, setInviting] = useState(false)

  const inputRef = useRef() as MutableRefObject<HTMLInputElement>

  const [currentValue, setCurrentValue] = useState<string[]>([])

  return (
    <div css={inviteByEmailContainerStyle}>
      <div css={inviteByEmailLabelStyle}>Invite By Email</div>
      <div css={inviteByEmailInputContainerStyle}>
        <InputTag
          inputTagRef={inputRef}
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
          flexShrink="0"
          disabled={currentValue.length === 0}
          colorScheme={getColor("grayBlue", "02")}
          loading={inviting}
          onClick={() => {}}
        >
          {!inviting ? "Invite" : undefined}
        </Button>
      </div>
      <div css={licenseContainerStyle}>
        <div css={licenseLabelStyle}>Remaining license</div>
        <div css={applyLicenseNumberStyle(license > 0)}>{license}</div>
      </div>
    </div>
  )
}