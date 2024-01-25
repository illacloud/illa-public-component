export interface IIllaErrorInterface {
  errorCode: string | number
  errorFlag: string
  errorMessage: string
}

export const isIllaErrorInterface = (e: unknown): e is IIllaErrorInterface => {
  return (
    typeof e === "object" &&
    e !== null &&
    "errorCode" in e &&
    "errorFlag" in e &&
    "errorMessage" in e &&
    typeof e.errorMessage === "string"
  )
}
