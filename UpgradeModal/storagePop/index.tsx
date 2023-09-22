import { FC, useEffect, useState } from "react"
import { StorageDrawer } from "../component/StorageDrawer"
import { StorageDrawerShowProps } from "./interface"
import { drawerStore } from "./store"

export const StoragePop: FC = () => {
  const [storageDrawer, setStorageDrawer] =
    useState<StorageDrawerShowProps | null>()

  useEffect(() => {
    const listener = drawerStore.subscribe(() => {
      setStorageDrawer(drawerStore.getModal())
    })
    return () => {
      drawerStore.unSubscribe(listener.listenerId)
    }
  }, [])

  if (!storageDrawer) return null

  return (
    <StorageDrawer
      visible={storageDrawer.visible}
      config={storageDrawer.config ?? {}}
      onCancel={() => {
        if (storageDrawer.id) {
          drawerStore.update({
            ...storageDrawer,
            visible: false,
          })
        }
      }}
      afterClose={() => {
        drawerStore.remove()
      }}
    />
  )
}
