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
import { HeaderProps } from "./interface"

export const Header: FC<HeaderProps> = (props) => {
  const {
    currentUserRole,
    currentUserID,
    allowEditorOrViewerInvite,
    hasApp,
    allowInviteByLink,
    updateTeamPermissionConfig,
    removeTeamMembers,
    changeTeamMembersRole,
    inviteByEmail,
    renewInviteLink,
    fetchInviteLink,
    configInviteLink,
  } = props
  const { t } = useTranslation()

  const [showInviteMemberModal, setShowInviteMemberModal] = useState(false)

  const handleClickInvite = useCallback(() => {
    setShowInviteMemberModal(true)
  }, [])

  return (
    <div css={headerWrapperStyle}>
      <h1 css={titleStyle}>{t("user_management.page.member")}</h1>
      <div css={buttonGroup}>
        <MoreAction
          currentUserRole={currentUserRole}
          currentUserID={currentUserID}
          hasApp={hasApp}
          removeTeamMembers={removeTeamMembers}
          updateTeamPermissionConfig={updateTeamPermissionConfig}
        >
          <Button w="32px" colorScheme="grayBlue">
            <MoreIcon />
          </Button>
        </MoreAction>
        <Button w="200px" colorScheme="techPurple" onClick={handleClickInvite}>
          {t("user_management.page.invite")}
        </Button>
      </div>
      {showInviteMemberModal &&
        createPortal(
          <InviteMemberModal
            handleCloseModal={() => {
              setShowInviteMemberModal(false)
            }}
            changeTeamMembersRole={changeTeamMembersRole}
            currentUserRole={currentUserRole}
            inviteByEmail={inviteByEmail}
            renewInviteLink={renewInviteLink}
            fetchInviteLink={fetchInviteLink}
            configInviteLink={configInviteLink}
            allowInviteByLink={allowInviteByLink}
          />,
          document.body,
        )}
    </div>
  )
}
