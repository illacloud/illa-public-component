import unescapeJS from "unescape-js"

const beginsWithLineBreakRegex = /^\s+|\s+$/

export function sanitizeScript(js: string) {
  // We remove any line breaks from the beginning of the script because that
  // makes the final function invalid. We also unescape any escaped characters
  // so that eval can happen
  const trimmedJS = js.replace(beginsWithLineBreakRegex, "")
  return unescapeJS(trimmedJS)
}
