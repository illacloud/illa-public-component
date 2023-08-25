import { FC, useEffect, useMemo, useState } from "react"
import { UpgradeDrawer } from "./component/UpgradeDrawer"
import { drawerStore } from "./store"
import { DrawerShowProps } from "./interface"

export const UpgradeDrawerGroup: FC = () => {
  const [drawerList, setDrawerList] = useState<DrawerShowProps[]>([])


  useEffect(() => {
    const listener = drawerStore.subscribe(() => {
      setDrawerList([...drawerStore.getDrawers()])
    })
    return () => {
      drawerStore.unSubscribe(listener.listenerId)
    }
  }, [])


  const drawers = useMemo(() => {
    return drawerList.map((drawer) => (
      <UpgradeDrawer
        key={drawer.id}
        visible={drawer.visible}
        defaultConfig={
          drawer.defaultConfig ?? {
            type: "license",
          }
        }
        onCancel={() => {
          if (drawer.id) {
            drawerStore.update(drawer.id, {
              ...drawer,
              visible: false,
            })
          }
        }}
      />
    ))
  }, [drawerList])

  return <>{drawers}</>
}
