import { USER_ROLE } from "@illa-public/user-data"
import { FC, useState } from "react"
import {
  DoubtIcon,
  DownIcon,
  DropList,
  DropListItem,
  Dropdown,
  SuccessIcon,
  Trigger,
  UpIcon,
} from "@illa-design/react"
import { RoleSelectorProps, UserRoleItem } from "./interface"
import {
  doubtStyle,
  itemContainer,
  roleOuterIconStyle,
  roleOuterLabelStyle,
  roleSelectorRoleContainer,
  successStyle,
} from "./style"

export const RoleSelector: FC<RoleSelectorProps> = (props) => {
  const { onClickItem, value, currentUserRole } = props

  const [menuVisible, setMenuVisible] = useState(false)

  const userRoleItems: UserRoleItem[] = [
    {
      role: USER_ROLE.ADMIN,
      tips: "Admin",
      name: "Admin",
    },
    {
      role: USER_ROLE.EDITOR,
      tips: "Editor",
      name: "Editor",
    },
    {
      role: USER_ROLE.VIEWER,
      tips: "Viewer",
      name: "Viewer",
    },
  ]

  return (
    <Dropdown
      onVisibleChange={(visible) => {
        setMenuVisible(visible)
      }}
      dropList={
        <DropList
          onClickItem={(value) => {
            onClickItem?.(value as USER_ROLE)
          }}
        >
          {userRoleItems
            .filter((i) => i.role >= currentUserRole)
            .map((item) => (
              <DropListItem
                value={item.role}
                title={
                  <div css={itemContainer}>
                    <div>{item.name}</div>
                    <Trigger trigger="hover" position="top" content={item.tips}>
                      <div css={doubtStyle}>
                        <DoubtIcon />
                      </div>
                    </Trigger>
                    {value === item.role && (
                      <div css={successStyle}>
                        <SuccessIcon />
                      </div>
                    )}
                  </div>
                }
                key={item.role}
              />
            ))}
        </DropList>
      }
      position="bottom-end"
      trigger="click"
    >
      <div css={roleSelectorRoleContainer}>
        <div css={roleOuterLabelStyle}>
          {userRoleItems.find((item) => item.role === value)?.name}
        </div>
        <div css={roleOuterIconStyle}>
          {menuVisible ? <UpIcon /> : <DownIcon />}
        </div>
      </div>
    </Dropdown>
  )
}