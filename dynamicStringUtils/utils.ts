import { get } from "lodash-es"
import { getSnippets } from "./converter"

export const getDynamicAttrPaths = (
  widgetOrAction: Record<string, any>,
): string[] => {
  if (Array.isArray(widgetOrAction.$dynamicAttrPaths)) {
    return [...widgetOrAction.$dynamicAttrPaths]
  }
  return []
}

export function getDependencyFromEntityPath(
  propertyPath: string,
  entity: Record<string, any>,
) {
  const unevalPropValue = get(entity, propertyPath, "").toString()
  const { jsSnippets } = getSnippets(unevalPropValue)
  const validJSSnippets = jsSnippets.filter((jsSnippet) => !!jsSnippet)

  return validJSSnippets
}

export function getValidJSSnippetsFromCode(code: string) {
  const { jsSnippets } = getSnippets(code)
  const validJSSnippets = jsSnippets.filter((jsSnippet) => !!jsSnippet)

  return validJSSnippets
}
