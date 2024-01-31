import * as amplitude from "@amplitude/analytics-browser"
import { isServerRender } from "@illa-public/utils"
import mixpanel from "mixpanel-browser"
import {
  ILLAProperties,
  ILLA_MIXPANEL_EVENT_TYPE,
  ILLA_PAGE_NAME,
} from "./interface"
import { getDeviceUUID } from "./utils"

export * from "./interface"
export * from "./mixpanelContext"

class ILLAMixpanelTools {
  private static instance: ILLAMixpanelTools | null = null
  private enable: boolean = false

  constructor() {
    this.enable =
      process.env.ILLA_INSTANCE_ID === "CLOUD" &&
      !!process.env.ILLA_MIXPANEL_API_KEY &&
      !!process.env.ILLA_AMPLITUDE_API_KEY &&
      !isServerRender
    if (this.enable) {
      mixpanel.init(process.env.ILLA_MIXPANEL_API_KEY as string, {
        debug: process.env.ILLA_APP_ENV === "development",
        test: process.env.ILLA_APP_ENV !== "production",
        ignore_dnt: process.env.ILLA_APP_ENV === "development",
        loaded(mixpanelProto) {
          const originalTrack = mixpanelProto.track
          mixpanelProto.track = function (event, properties) {
            originalTrack.call(mixpanelProto, event, {
              ...properties,
              environment: process.env.ILLA_APP_ENV,
              fe_version_code: process.env.ILLA_APP_VERSION,
            })
          }
        },
      })
      amplitude.init(process.env.ILLA_AMPLITUDE_API_KEY as string, undefined, {
        logLevel:
          process.env.ILLA_APP_ENV === "development"
            ? amplitude.Types.LogLevel.Debug
            : amplitude.Types.LogLevel.None,
      })
    }
  }

  public async setDeviceID() {
    if (this.enable) {
      const deviceID = await getDeviceUUID()
      mixpanel.register({
        ILLA_device_ID: deviceID,
      })
      amplitude.setDeviceId(deviceID)
    }
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new ILLAMixpanelTools()
    }
    return this.instance
  }

  public track(event: ILLA_MIXPANEL_EVENT_TYPE, properties: ILLAProperties) {
    if (this.enable) {
      mixpanel.track(event, {
        ...properties,
      })
      amplitude.track(event, {
        ...properties,
        environment: process.env.ILLA_APP_ENV,
        fe_version_code: process.env.ILLA_APP_VERSION,
      })
    }
  }

  public setGroup(teamIdentifier: string | string[]) {
    if (this.enable) {
      mixpanel.set_group("team", teamIdentifier)
      amplitude.setGroup("team", teamIdentifier)
    }
  }

  public setUserID(userID: string) {
    if (this.enable) {
      mixpanel.identify(userID)
      amplitude.setUserId(userID)
    }
  }

  public setUserProperties(properties: Record<string, any>) {
    if (this.enable) {
      mixpanel.people.set(properties)
      const identifyEvent = new amplitude.Identify()
      for (let propertiesKey in properties) {
        identifyEvent.set(propertiesKey, properties[propertiesKey])
      }
      amplitude.identify(identifyEvent)
    }
  }

  public reset() {
    if (this.enable) {
      mixpanel.reset()
      amplitude.reset()
    }
  }

  public pageTimeEvent() {
    if (this.enable) {
      mixpanel.time_event("page_duration")
    }
  }

  public trackTimeEvent(pageName: ILLA_PAGE_NAME, teamIdentifier: string) {
    if (this.enable) {
      mixpanel.track("page_duration", {
        page: pageName,
        team_id: teamIdentifier,
      })
    }
  }
}

export const ILLAMixpanel = ILLAMixpanelTools.getInstance()
