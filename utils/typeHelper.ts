export const isCloudVersion = process.env.ILLA_INSTANCE_ID === "CLOUD"

export function isURL(str: string) {
  const pattern = new RegExp(
    /^(((ht|f)tps?):\/\/)?(([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})\/?/,
  ) // fragment locator
  return !!pattern.test(str)
}

export function isBlobURLOrUrl(url: string): boolean {
  if (!url) return false
  return url.startsWith("blob:") || isURL(url)
}

export const isServerRender = (function () {
  try {
    return !(typeof window !== "undefined" && document !== undefined)
  } catch (e) {
    return true
  }
})()

export const isInt = (val: string | number): boolean => {
  return Number.isInteger(val) || (typeof val === "string" && /^\d+$/.test(val))
}
