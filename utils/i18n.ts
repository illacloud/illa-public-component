export const languageKeys = ["en-US", "zh-CN", "ja-JP", "de-DE"]

export const formatLanguage = (code: string) => {
  if (code) {
    if (languageKeys.includes(code)) {
      return code
    }
    const mainLanguage = code.slice(0, 2)
    for (let i = 0; i < languageKeys.length; i++) {
      if (languageKeys[i].slice(0, 2) === mainLanguage) {
        return languageKeys[i]
      }
    }
  }
  return "en-US"
}
