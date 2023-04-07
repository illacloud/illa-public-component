/* eslint-disable import/no-named-as-default-member */
import mixpanel from "mixpanel-browser"
import { ILLAProperties, ILLA_MIXPANEL_EVENT_TYPE } from "./interface"
import { getDeviceUUID } from "./utils"

class ILLAMixpanelTools {
  private static instance: ILLAMixpanelTools | null = null

  constructor() {
    const deviceID = getDeviceUUID()
    mixpanel.init(import.meta.env.ILLA_MIXPANEL_API_KEY, {
      debug: import.meta.env.DEV,
      test:
        import.meta.env.DEV ||
        import.meta.env.ILLA_BUILDER_ENV !== "production" ||
        import.meta.env.ILLA_CLOUD_ENV !== "production",
      ignore_dnt: import.meta.env.DEV,
      loaded(mixpanelProto) {
        mixpanelProto.identify(deviceID)
        const originalTrack = mixpanelProto.track
        mixpanelProto.track = function (event, properties) {
          originalTrack.call(mixpanelProto, event, {
            ...properties,
            $device_id: deviceID,
            environment: import.meta.env.DEV
              ? "development"
              : import.meta.env.ILLA_BUILDER_ENV ||
                import.meta.env.ILLA_CLOUD_ENV,
          })
        }
      },
    })
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new ILLAMixpanelTools()
    }

    return this.instance
  }

  public track(event: ILLA_MIXPANEL_EVENT_TYPE, properties: ILLAProperties) {
    mixpanel.track(event, {
      ...properties,
    })
  }
}

export const ILLAMixpanel = ILLAMixpanelTools.getInstance()
