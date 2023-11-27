import { Avatar } from "@illa-public/avatar"
import { getCurrentUser } from "@illa-public/user-data"
import { FC } from "react"
import { useSelector } from "react-redux"
import { Drawer } from "@illa-design/react"
import MenuIcon from "../assets/menu.svg?react"
import { MobileDashBoardLayoutProps } from "./interface"
import {
  childrenContainerStyle,
  drawContainerStyle,
  dynamicMenuContainerStyle,
  headerContainerStyle,
  leftBottomContainerStyle,
  menuContainerStyle,
  menuIconHotSpot,
  mobileLayoutContainerStyle,
  navigationContainerStyle,
  navigationMenuStyle,
  tipsContainerStyle,
} from "./style"

export const MobileCloudDashboardLayout: FC<MobileDashBoardLayoutProps> = (
  props,
) => {
  const {
    children,
    dynamicMenu,
    tipsComponent,
    drawerVisible,
    bottomComponent,
    setDrawerVisible,
  } = props
  const userInfo = useSelector(getCurrentUser)

  return (
    <div css={mobileLayoutContainerStyle}>
      <header css={headerContainerStyle}>
        <div css={menuIconHotSpot} onClick={() => setDrawerVisible(true)}>
          <MenuIcon />
        </div>
        <Avatar
          size={40}
          id={userInfo.userID}
          name={userInfo.nickname}
          avatarUrl={userInfo.avatar}
        />
      </header>
      <aside css={childrenContainerStyle}>{children}</aside>
      <Drawer
        w="300px"
        visible={drawerVisible}
        placement={"left"}
        closable={false}
        footer={false}
        onCancel={() => setDrawerVisible(false)}
      >
        <aside css={drawContainerStyle}>
          <div css={navigationContainerStyle}>
            <div css={navigationMenuStyle}>
              <MenuIcon />
            </div>
          </div>
          <div css={menuContainerStyle}>
            <div css={dynamicMenuContainerStyle}>{dynamicMenu}</div>
            <div css={leftBottomContainerStyle}>
              {tipsComponent && (
                <div css={tipsContainerStyle}>{tipsComponent}</div>
              )}
              {!!bottomComponent && bottomComponent}
            </div>
          </div>
        </aside>
      </Drawer>
    </div>
  )
}
