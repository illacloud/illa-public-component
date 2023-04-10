import ILLAStorage from "@illa-fe-utils/storage"
import { DeviceUUID } from "device-uuid"

export const ILLAPublicStorage = new ILLAStorage("illa-public", -1)

export const getDeviceUUID = () => {
  const deviceID = new DeviceUUID().get()

  if (!ILLAPublicStorage.getLocalStorage("deviceID")) {
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
