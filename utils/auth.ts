import ILLAStorage from "@illa-public/illa-storage"

export const ILLAPublicStorage = new ILLAStorage(`ILLAPublic`, -1)

export const setAuthToken = (token: string) => {
  ILLAPublicStorage.setLocalStorage("token", token, -1)
}

export const getAuthToken = () => {
  return ILLAPublicStorage.getLocalStorage("token") as string
}

export const removeAuthToken = () => {
  return ILLAPublicStorage.removeLocalStorage("token")
}
