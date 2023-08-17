import { v4 } from "uuid"
import { DrawerShowProps, DrawerStore, DrawerStoreHandler, ModalShowProps, ModalStore, ModalStoreHandler, SubListener } from "./interface"

// drawer
const drawerState = {
  listener: [],
  drawers: [],
} as DrawerStore

function createDrawerStore(): DrawerStoreHandler {
  return {
    getDrawers: () => {
      return drawerState.drawers
    },
    setDrawers: (drawers: DrawerShowProps[]) => {
      drawerState.drawers = drawers
      drawerState.listener.forEach((listener) => {
        listener.onStoreChange()
      })
    },
    subscribe: (change) => {
      const listener = {
        listenerId: v4(),
        onStoreChange: change,
      } as SubListener
      drawerState.listener.push(listener)
      listener.onStoreChange()
      return listener
    },
    unSubscribe: (listenerId) => {
      drawerState.listener.splice(
        drawerState.listener.findIndex(
          (listener) => listener.listenerId === listenerId,
        ),
        1,
      )
    },
    update: (drawerId, drawer) => {
      const index = drawerState.drawers.findIndex((drawer) => drawer.id === drawerId)
      if (index != -1) {
        drawerState.drawers[index] = drawer
        drawerState.listener.forEach((listener) => {
          listener.onStoreChange()
        })
      }
    },
    add: (drawer) => {
      drawerState.drawers.push(drawer)
      drawerState.listener.forEach((listener) => {
        listener.onStoreChange()
      })
    },
    remove: (drawerId) => {
      const index = drawerState.drawers.findIndex((drawer) => drawer?.id === drawerId)
      if (index != -1) {
        drawerState.drawers.splice(index, 1)
        drawerState.listener.forEach((listener) => {
          listener.onStoreChange()
        })
      }
    },
  } as DrawerStoreHandler
}

export const drawerStore = createDrawerStore()

// modal
const modalState = {
  listener: [],
  modals: [],
} as ModalStore

function createModalStore(): ModalStoreHandler {
  return {
    getModals: () => {
      return modalState.modals
    },
    setModals: (modals: ModalShowProps[]) => {
      modalState.modals = modals
      modalState.listener.forEach((listener) => {
        listener.onStoreChange()
      })
    },
    subscribe: (change) => {
      const listener = {
        listenerId: v4(),
        onStoreChange: change,
      } as SubListener
      modalState.listener.push(listener)
      listener.onStoreChange()
      return listener
    },
    unSubscribe: (listenerId) => {
      modalState.listener.splice(
        modalState.listener.findIndex(
          (listener) => listener.listenerId === listenerId,
        ),
        1,
      )
    },
    update: (modalId, modal) => {
      const index = modalState.modals.findIndex((modal) => modal.id === modalId)
      if (index != -1) {
        modalState.modals[index] = modal
        modalState.listener.forEach((listener) => {
          listener.onStoreChange()
        })
      }
    },
    add: (modal) => {
      modalState.modals.push(modal)
      modalState.listener.forEach((listener) => {
        listener.onStoreChange()
      })
    },
    remove: (modalId) => {
      const index = modalState.modals.findIndex((modal) => modal?.id === modalId)
      if (index != -1) {
        modalState.modals.splice(index, 1)
        modalState.listener.forEach((listener) => {
          listener.onStoreChange()
        })
      }
    },
  } as ModalStoreHandler
}

export const modalStore = createModalStore()