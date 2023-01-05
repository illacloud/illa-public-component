import {
  Avatar,
  Button,
  CloseIcon,
  Divider,
  DropList,
  Dropdown,
  ExpandIcon,
  Input,
  InputTag,
  Modal,
  Select,
  Trigger,
} from "@illa-design/react"
import { FC, MouseEvent, useCallback, useState } from "react"
import { ReactComponent as SettingIcon } from "@/illa-public-component/MemberList/assets/icon/setting.svg"
import {
  InviteListItemProps,
  InviteListProps,
  InviteMemberModalProps,
} from "@/illa-public-component/MemberList/components/Header/interface"
import {
  avatarAndNameWrapperStyle,
  closeIconHotSpotStyle,
  fakerInputStyle,
  fakerInputWithEmail,
  inviteEmailWrapperStyle,
  inviteLinkWrapperStyle,
  inviteListTitleWrapperStyle,
  inviteListWrapperStyle,
  maskStyle,
  modalBodyWrapperStyle,
  modalHeaderWrapperStyle,
  modalTitleStyle,
  modalWithMaskWrapperStyle,
  modalWrapperStyle,
  nicknameStyle,
  subBodyTitleWrapperStyle,
  subBodyWrapperStyle,
  subtitleStyle,
  urlAreaStyle,
} from "@/illa-public-component/MemberList/components/Header/style"

const DropListItem = DropList.Item

export const InviteListItem: FC<InviteListItemProps> = (props) => {
  const { email, userRole, userAvatar } = props
  return (
    <div css={inviteListTitleWrapperStyle}>
      <div css={avatarAndNameWrapperStyle}>
        <Avatar src={userAvatar} />
        <span css={nicknameStyle}>{email}</span>
      </div>
      <Select w="auto" value="editor" />
    </div>
  )
}

export const InviteList: FC<InviteListProps> = (props) => {
  const { inviteList } = props
  return (
    <div css={inviteListWrapperStyle}>
      {inviteList?.map((item) => (
        <InviteListItem
          key={item.email}
          email={item.email}
          emailStatus={item.emailStatus}
          userAvatar={item.userAvatar}
          userRole={item.userRole}
        />
      ))}
    </div>
  )
}

export const InviteMemberModal: FC<InviteMemberModalProps> = (props) => {
  const { handleCloseModal } = props
  const handleClickMask = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      console.log("xxxxx")
      e.stopPropagation()
      handleCloseModal()
    },
    [handleCloseModal],
  )
  return (
    <div css={modalWithMaskWrapperStyle}>
      <div css={modalWrapperStyle}>
        <header css={modalHeaderWrapperStyle}>
          <h3 css={modalTitleStyle}>Invite members</h3>
          <span css={closeIconHotSpotStyle} onClick={handleCloseModal}>
            <CloseIcon />
          </span>
        </header>
        <Divider />
        <InviteMemberModalContent />
      </div>
      <div css={maskStyle} onClick={handleClickMask} />
    </div>
  )
}

export const InviteMemberModalContent: FC = () => {
  return (
    <div css={modalBodyWrapperStyle}>
      <div css={subBodyWrapperStyle}>
        <div css={subBodyTitleWrapperStyle}>
          <h4 css={subtitleStyle}>Invite link</h4>
          <SettingIcon />
        </div>
        <div css={inviteLinkWrapperStyle}>
          <div css={fakerInputStyle}>
            <span css={urlAreaStyle}>111111</span>
            <Select
              w="auto"
              value="asdiasjdiajdiajsdijasidjasid"
              options={[1111, 2222, 333, 4444, 555]}
            />
          </div>
          <Button size="large" h="40px" colorScheme="black">
            Copy
          </Button>
        </div>
      </div>
      <div css={subBodyWrapperStyle}>
        <div css={subBodyTitleWrapperStyle}>
          <h4 css={subtitleStyle}>Invite by email</h4>
        </div>
        <div css={inviteEmailWrapperStyle}>
          <div css={fakerInputWithEmail}>
            <InputTag w="180px" flex="none" />
            <Select
              w="auto"
              value="asdiasjdiajdia"
              options={[1111, 2222, 333, 4444, 555]}
            />
          </div>
          <Button size="large" h="40px" colorScheme="black">
            Invite
          </Button>
        </div>
        <InviteList />
      </div>
    </div>
  )
}

InviteMemberModalContent.displayName = "InviteMemberModal"
