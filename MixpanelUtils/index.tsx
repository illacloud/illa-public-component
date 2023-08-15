/* eslint-disable import/no-named-as-default-member */
import mixpanel from "mixpanel-browser"
import { getEnvVar } from "../needReplaceUtils"
import {
  ILLAProperties,
  ILLA_MIXPANEL_EVENT_TYPE,
  ILLA_PAGE_NAME,
} from "./interface"
import { getBrowserLanguage, getDeviceUUID, getIllaLanguage } from "./utils"

export * from "./interface"
export * from "./mixpanelContext"
class ILLAMixpanelTools {
  private static instance: ILLAMixpanelTools | null = null
  private enable: boolean = false

  constructor() {
    this.enable =
      getEnvVar("ILLA_INSTANCE_ID") === "CLOUD" &&
      !!getEnvVar("ILLA_MIXPANEL_API_KEY")
    if (this.enable) {
      mixpanel.init(getEnvVar("ILLA_MIXPANEL_API_KEY") as string, {
        debug: getEnvVar("ILLA_APP_ENV") === "development",
        test: getEnvVar("ILLA_APP_ENV") !== "production",
        ignore_dnt: getEnvVar("ILLA_APP_ENV") === "development",
        loaded(mixpanelProto) {
          getDeviceUUID().then((deviceID) => {
            mixpanelProto.identify(deviceID)
            const originalTrack = mixpanelProto.track
            mixpanelProto.track = function (event, properties) {
              originalTrack.call(mixpanelProto, event, {
                ...properties,
                $device_id: deviceID,
                environment:
                  getEnvVar("ILLA_APP_ENV") === "development"
                    ? "development"
                    : getEnvVar("ILLA_APP_ENV"),
                browser_language: getBrowserLanguage(),
                illa_language: getIllaLanguage(),
                $user_id: properties?.user_id,
                fe_version_code: getEnvVar("ILLA_APP_VERSION"),
              })
            }
          })
        },
      })
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
    }
  }

  public setGroup(teamIdentifier: string | string[]) {
    if (this.enable) {
      mixpanel.set_group("team", teamIdentifier)
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
