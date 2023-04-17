import { FC, ReactNode, createContext, useCallback, useMemo } from "react"
import {
  ILLAProperties,
  ILLA_MIXPANEL_EVENT_TYPE,
  ILLA_PAGE_NAME,
} from "./interface"

interface IInject {
  track: (
    event: ILLA_MIXPANEL_EVENT_TYPE,
    properties: Omit<ILLAProperties, "page">,
    extendProperty?: "userRole" | "team_id" | "both",
  ) => void
}

export const MixpanelTrackContext = createContext<IInject>({} as IInject)

interface MixpanelTrackProviderProps {
  basicTrack: (
    event: ILLA_MIXPANEL_EVENT_TYPE,
    pageName: ILLA_PAGE_NAME,
    properties: Omit<ILLAProperties, "page">,
    extendProperty?: "userRole" | "team_id" | "both",
  ) => void
  pageName: ILLA_PAGE_NAME
  children: ReactNode
  parameter1?: string
}

export const MixpanelTrackProvider: FC<MixpanelTrackProviderProps> = (
  props,
) => {
  const { children, basicTrack, pageName, parameter1 } = props

  const track = useCallback(
    (
      event: ILLA_MIXPANEL_EVENT_TYPE,
      properties: Omit<ILLAProperties, "page">,
      extendProperty?: "userRole" | "team_id" | "both",
    ) => {
      const mergeParam = parameter1 ? {...properties, parameter1} : properties
      basicTrack(event, pageName, mergeParam, extendProperty)
    },
    [basicTrack, pageName, parameter1],
  )

  const injectValue = useMemo(() => {
    return {
      track,
    }
  }, [track])

  return (
    <MixpanelTrackContext.Provider value={injectValue}>
      {children}
    </MixpanelTrackContext.Provider>
  )
}

MixpanelTrackProvider.displayName = "MixpanelTrackProvider"
