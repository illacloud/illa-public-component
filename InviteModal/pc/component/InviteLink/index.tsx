import { FC } from "react"
import { DropList, DropListItem, Dropdown, SortIcon } from "@illa-design/react"
import { InviteModalProps } from "../../../interface"
import {
  inviteLinkContainer,
  inviteLinkCopyContainer,
  inviteLinkLabelStyle,
  inviteLinkMenuButtonStyle,
  inviteLinkMenuContainer,
} from "./style"

export const InviteLink: FC<InviteModalProps> = (props) => {
  const { allowInviteLink } = props

  return (
    <div css={inviteLinkContainer}>
      <div css={inviteLinkMenuContainer}>
        <div css={inviteLinkLabelStyle}>InviteLink</div>
        <Dropdown
          trigger="click"
          position="bottom-end"
          dropList={
            <DropList>
              <DropListItem
                key="Reset invite links"
                value="Reset invite links"
                title="Reset invite links"
                onClick={() => {}}
              />
              <DropListItem
                key="Turn off invite links"
                value="Turn off invite links"
                title="Turn off invite links"
                onClick={() => {}}
              />
            </DropList>
          }
        >
          <div css={inviteLinkMenuButtonStyle}>
            <SortIcon />
          </div>
        </Dropdown>
      </div>
      <div css={inviteLinkCopyContainer}></div>
    </div>
  )
}

InviteLink.displayName = "InviteLink"