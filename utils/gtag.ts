import { isCloudVersion } from "./typeHelper"

export const sendTagEvent = (action: string, userID: string | undefined) => {
  if (typeof window !== "undefined" && "gtag" in window && isCloudVersion) {
    window.gtag("event", action, {
      user_id: userID,
    })
  }
}

export const sendConfigEvent = (userID: string | undefined) => {
  if (typeof window !== "undefined" && "gtag" in window && isCloudVersion) {
    window.gtag("config", "G-QW745VE33W", {
      user_id: userID,
    })
  }
}
