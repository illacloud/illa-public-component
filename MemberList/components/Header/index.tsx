import { Button, MoreIcon } from "@illa-design/react"
import { FC, useCallback, useState } from "react"
import { createPortal } from "react-dom"
import { useTranslation } from "react-i18next"
import { InviteMemberModal } from "@/illa-public-component/MemberList/components/Header/InviteMemberModalContent"
import { MoreAction } from "@/illa-public-component/MemberList/components/Header/MoreAction"
import {
  buttonGroup,
  headerWrapperStyle,
  titleStyle,
} from "@/illa-public-component/MemberList/components/Header/style"
import { geSmallThenTargetRole } from "@/illa-public-component/MemberList/utils"
import { USER_ROLE, USER_ROLE_ARRAY } from "@/store/userInfo/userInfoState"
import { HeaderProps } from "./interface"

export const Header: FC<HeaderProps> = (props) => {
  const {
    currentUserRole,
    currentUserID,
    allowEditorOrViewerInvite,
    hasApp,
    updateTeamPermissionConfig,
    removeTeamMembers,
  } = props
  const { t } = useTranslation()

  console.log("USER_ROLE_ARRAY", USER_ROLE_ARRAY)
  console.log("getBiggerThenTargetRole", geSmallThenTargetRole(USER_ROLE.OWNER))

  const [showInviteMemberModal, setShowInviteMemberModal] = useState(false)

  const handleClickInvite = useCallback(() => {
    setShowInviteMemberModal(true)
  }, [])

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
          hasApp={hasApp}
        >
          <Button w="32px" colorScheme="grayBlue">
            <MoreIcon />
          </Button>
        </MoreAction>
        <Button w="200px" colorScheme="techPurple" onClick={handleClickInvite}>
          Invite
        </Button>
      </div>
      {showInviteMemberModal &&
        createPortal(
          <InviteMemberModal
            handleCloseModal={() => {
              setShowInviteMemberModal(false)
            }}
          />,
          document.body,
        )}
    </div>
  )
}
