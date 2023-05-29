import { Drawer } from "@illa-design/react"
import { FC, ReactNode, createContext, useState } from "react"
import { drawerStyle } from "@/page/workspace/layout/mobileLayout/style"
import { pxToRem } from "@/style"

interface ProviderProps {
  children: ReactNode
}

interface Inject extends Omit<ProviderProps, "children"> {
  handleDrawerVisible: (visible: boolean) => void
}

export const UpgradeDrawerContext = createContext<Inject>({} as Inject)

export const UpgradeDrawerProvider: FC<ProviderProps> = (props) => {
  const { children } = props
  const [visible, setVisible] = useState<boolean>(false)

  const handleDrawerVisible = (visible: boolean) => {
    setVisible((prevState) => {
      if (prevState !== visible) {
        return visible
      }
      return prevState
    })
  }

  const handleCloseDrawer = () => {
    setVisible(false)
  }

  const value = {
    ...props,
    handleDrawerVisible,
  }

  return (
    <UpgradeDrawerContext.Provider value={value}>
      <Drawer
        css={drawerStyle}
        w={pxToRem(600)}
        visible={visible}
        placement={"left"}
        closable={false}
        footer={false}
        onCancel={handleCloseDrawer}
      >
        <div>123</div>
        <div>456</div>
      </Drawer>
      {children}
    </UpgradeDrawerContext.Provider>
  )
}

UpgradeDrawerProvider.displayName = "UpgradeDrawerProvider"
