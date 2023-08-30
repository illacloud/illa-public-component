export const fixedValue = (value: unknown) => {
  if (value == undefined) return ""
  if (typeof value === "string") return value
  return `{{${JSON.stringify(value)}}}`
}

export const getStringSnippets = (dynamicString: string): string[] => {
  let stringSnippets: string[] = []
  const indexOfDoubleParenStart = dynamicString.indexOf("{{")
  if (indexOfDoubleParenStart === -1) {
    return [dynamicString]
  }
  const firstString = dynamicString.substring(0, indexOfDoubleParenStart)
  if (firstString) stringSnippets.push(firstString)
  let rest = dynamicString.substring(
    indexOfDoubleParenStart,
    dynamicString.length,
  )
  let sum = 0
  for (let i = 0; i <= rest.length - 1; i++) {
    const char = rest[i]
    const prevChar = rest[i - 1]

    if (char === "{") {
      sum++
    } else if (char === "}") {
      sum--
      if (prevChar === "}" && sum === 0) {
        stringSnippets.push(rest.substring(0, i + 1))
        rest = rest.substring(i + 1, rest.length)
        if (rest) {
          stringSnippets = stringSnippets.concat(getStringSnippets(rest))
          break
        }
      }
    }
  }
  if (sum !== 0 && dynamicString !== "") {
    return [dynamicString]
  }
  return stringSnippets
}

export const isDynamicStringSnippet = (value: unknown): boolean =>
  typeof value === "string" && value.endsWith("}}") && value.startsWith("{{")
