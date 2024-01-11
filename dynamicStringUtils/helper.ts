import { DYNAMIC_STRING_REG } from "./constants"
import { getStringSnippets } from "./converter"

export const isDynamicStringSnippet = (value: unknown): boolean =>
  typeof value === "string" && value.endsWith("}}") && value.startsWith("{{")

export const hasDynamicStringSnippet = (value: unknown): boolean => {
  if (typeof value !== "string") {
    return false
  }
  const dynamicStrings = getStringSnippets(value)
  return dynamicStrings.some((value) => isDynamicStringSnippet(value))
}

export const isDynamicStringReg = (value: unknown): boolean =>
  typeof value === "string" && DYNAMIC_STRING_REG.test(value)

export function isLikInt(val: string | number): boolean {
  return Number.isInteger(val) || (typeof val === "string" && /^\d+$/.test(val))
}

export const isChildPropertyPath = (
  parentPropertyPath: string,
  childPropertyPath: string,
  // In non-strict mode, an exact match is treated as a child path
  // Eg. "Api1" is a child property path of "Api1"
  strict = false,
): boolean => {
  return (
    (!strict && parentPropertyPath === childPropertyPath) ||
    childPropertyPath.startsWith(`${parentPropertyPath}.`) ||
    childPropertyPath.startsWith(`${parentPropertyPath}[`)
  )
}
