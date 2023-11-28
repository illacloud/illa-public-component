import { FC, useEffect, useState } from "react"
import { UpgradeDrawer } from "../../component/UpgradeDrawer"
import { DrawerShowProps } from "./interface"
import { drawerStore } from "./store"

export const UpgradeLicenseDrawer: FC = () => {
  const [drawer, setDrawer] = useState<DrawerShowProps | null>()

  useEffect(() => {
    const listener = drawerStore.subscribe(() => {
      setDrawer(drawerStore.getModal())
    })
    return () => {
      drawerStore.unSubscribe(listener.listenerId)
    }
  }, [])

  if (!drawer) return null

  return (
    <UpgradeDrawer
      visible={drawer.visible}
      from={drawer.from}
      defaultConfig={drawer.defaultConfig || {}}
      onCancel={() => {
        if (drawer.id) {
          drawerStore.update({
            ...drawer,
            visible: false,
          })
        }
      }}
      afterClose={() => drawerStore.remove()}
    />
  )
}
