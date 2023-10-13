import { FC, ReactNode, createContext } from "react"
import { AppListContextInject } from "./interface"

export const AppListContext = createContext<AppListContextInject>(
  {} as AppListContextInject,
)

interface AppListContextProviderProps extends AppListContextInject {
  children: ReactNode
}

export const AppListContextProvider: FC<AppListContextProviderProps> = (
  props,
) => {
  const { children, updateAppConfig, copyApp, deleteApp } = props

  return (
    <AppListContext.Provider
      value={{
        updateAppConfig,
        copyApp,
        deleteApp,
      }}
    >
      {children}
    </AppListContext.Provider>
  )
}
