import ILLAStorage from "@illa-fe-utils/storage"
import { DeviceUUID } from "device-uuid"

const generateUUID = () => {
  const du = new DeviceUUID().parse()
  const dua = [
    du.language,
    du.os,
    du.platform,
    du.browser,
    du.version,
    du.cpuCores,
    du.isAuthoritative,
    du.silkAccelerated,
    du.isKindleFire,
    du.isDesktop,
    du.isMobile,
    du.isTablet,
    du.isWindows,
    du.isLinux,
    du.isLinux64,
    du.isMac,
    du.isiPad,
    du.isiPhone,
    du.isiPod,
    du.isSmartTV,
    du.pixelDepth,
    du.isTouchScreen,
    du.colorDepth,
    du.pixelDepth,
    performance.now(),
  ]
  return du.hashMD5(dua.join(":"))
}

export const ILLAPublicStorage = new ILLAStorage("illa-public", -1)

export const getDeviceUUID = () => {
  if (!ILLAPublicStorage.getLocalStorage("deviceID")) {
    const deviceID = generateUUID()
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
