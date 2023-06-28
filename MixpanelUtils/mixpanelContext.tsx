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
  pageName: ILLA_PAGE_NAME
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
}

export const MixpanelTrackProvider: FC<MixpanelTrackProviderProps> = (
  props,
) => {
  const { children, basicTrack, pageName } = props

  const track = useCallback(
    (
      event: ILLA_MIXPANEL_EVENT_TYPE,
      properties: Omit<ILLAProperties, "page">,
      extendProperty?: "userRole" | "team_id" | "both",
    ) => {
      basicTrack(event, pageName, properties, extendProperty)
    },
    [basicTrack, pageName],
  )

  const injectValue = useMemo(() => {
    return {
      track,
      pageName,
    }
  }, [pageName, track])

  return (
    <MixpanelTrackContext.Provider value={injectValue}>
      {children}
    </MixpanelTrackContext.Provider>
  )
}

MixpanelTrackProvider.displayName = "MixpanelTrackProvider"
