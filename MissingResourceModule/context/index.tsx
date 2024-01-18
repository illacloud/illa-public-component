import { FC, createContext } from "react"
import {
  IMissingResourcesContext,
  IMissingResourcesProviderProps,
} from "./interface"

export const MissingResourceContext = createContext<IMissingResourcesContext>(
  {} as IMissingResourcesContext,
)

export const MissingResourcesProvider: FC<IMissingResourcesProviderProps> = (
  props,
) => {
  const { children, ...others } = props
  return (
    <MissingResourceContext.Provider value={others}>
      {children}
    </MissingResourceContext.Provider>
  )
}
