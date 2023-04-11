import { load } from "@fingerprintjs/fingerprintjs"
import ILLAStorage from "@illa-fe-utils/storage"

const generateUUID = async () => {
  const fp = await load()
  const result = await fp.get()
  return result.visitorId
}

export const ILLAPublicStorage = new ILLAStorage("illa-public", -1)

export const getDeviceUUID = async () => {
  if (!ILLAPublicStorage.getLocalStorage("deviceID")) {
    const deviceID = await generateUUID()
    ILLAPublicStorage.setLocalStorage("deviceID", deviceID)
  }
  return ILLAPublicStorage.getLocalStorage("deviceID") as string
}

export const getBrowserLanguage = () => {
  return navigator.language || ""
}

export const getIllaLanguage = () => {
  return localStorage.getItem("i18nextLng") || ""
}
