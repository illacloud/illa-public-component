import { v4 } from "uuid"
import { CollarDrawerShowProps } from "./interface"
import { collarDrawerStore } from "./store"

// collar
const showCollarDrawerImpl = (
  from: string,
  config?: Pick<CollarDrawerShowProps, "onSuccessCallback">,
) => {
  let drawer: CollarDrawerShowProps = {
    id: v4(),
    from,
    onSuccessCallback: config?.onSuccessCallback,
  }

  if (!drawer.visible) {
    drawer.visible = true
  }
  collarDrawerStore.setModal(drawer)
  return drawer.id
}

const collarDrawerHandler = (
  from: string,
  config?: Pick<CollarDrawerShowProps, "onSuccessCallback">,
) => {
  return showCollarDrawerImpl(from, config)
}

export function useCollarDrawer() {
  return collarDrawerHandler
}

export const createCollarDrawer = useCollarDrawer
