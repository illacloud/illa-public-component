import { DashBoardLayoutProps } from "../interface"

export interface MobileDashBoardLayoutProps extends DashBoardLayoutProps {
  drawerVisible: boolean
  setDrawerVisible: (visible: boolean) => void
}
