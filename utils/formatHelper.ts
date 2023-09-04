export const formatNumForAgent = (num: number) => {
  if (typeof num !== "number") return "0"
  if (num < 1000) return `${num}`
  return `${(num / 1000).toFixed(1)}k`
}

export const EMAIL_FORMAT =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/