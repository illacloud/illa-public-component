import { Button, MoreIcon } from "@illa-design/react"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { MoreAction } from "@/illa-public-component/MemberList/components/Header/MoreAction"
import {
  buttonGroup,
  headerWrapperStyle,
  titleStyle,
} from "@/illa-public-component/MemberList/components/Header/style"
import { HeaderProps } from "./interface"

export const Header: FC<HeaderProps> = (props) => {
  const {
    currentUserRole,
    currentUserID,
    allowEditorOrViewerInvite,
    updateTeamPermissionConfig,
    removeTeamMembers,
  } = props
  const { t } = useTranslation()
  return (
    <div css={headerWrapperStyle}>
      <h1 css={titleStyle}>Member</h1>
      <div css={buttonGroup}>
        <MoreAction
          currentUserRole={currentUserRole}
          allowEditorOrViewerInvite={allowEditorOrViewerInvite}
          updateTeamPermissionConfig={updateTeamPermissionConfig}
          currentUserID={currentUserID}
          removeTeamMembers={removeTeamMembers}
        >
          <Button w="32px" colorScheme="grayBlue">
            <MoreIcon />
          </Button>
        </MoreAction>
        <Button w="200px" colorScheme="techPurple">
          Invite
        </Button>
      </div>
    </div>
  )
}
