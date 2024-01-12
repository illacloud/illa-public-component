import {
  Completion,
  CompletionContext,
  CompletionResult,
} from "@codemirror/autocomplete"
import { getStringSnippets } from "@illa-public/dynamic-string"

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

export function checkCursorInDynamicFlag(context: CompletionContext): boolean {
  const { state, pos } = context
  const doc = state.sliceDoc(0, pos)
  const stringSnippets = getStringSnippets(doc)
  let nextDynamicStringStartIndex = 0
  for (let i = 0; i < stringSnippets.length; i++) {
    const snippet = stringSnippets[i]
    const start = nextDynamicStringStartIndex
    const dynamicStringStartIndex = snippet.indexOf("{{")
    const stringStartIndex = dynamicStringStartIndex + start + 2
    const dynamicStringEndIndex = snippet.indexOf("}}")
    const stringEndIndex = dynamicStringEndIndex + start
    if (
      dynamicStringStartIndex > -1 &&
      stringStartIndex <= pos &&
      (dynamicStringEndIndex <= -1 || pos <= stringEndIndex)
    ) {
      return true
    }
    nextDynamicStringStartIndex += snippet.length
  }
  return false
}

export function getDataInfo(data: Record<string, unknown>, path: string) {
  let currentData: Record<string, unknown> = data
  let offset: number = 0
  for (let i = 0; i < path.length; i++) {
    switch (path[i]) {
      case ".":
      case "[":
      case "]":
        if (offset < i) {
          const currentPath = path.slice(offset, i).trim()
          currentData = currentData[currentPath] as Record<string, unknown>
          if (!currentData || !isObject(currentData)) {
            return null
          }
        }
        offset = i + 1
        if (path[i] === "." && Array.isArray(currentData)) {
          return null
        }
        if (path[i] === "[" && !Array.isArray(currentData)) {
          return null
        }
        break
    }
  }
  return {
    currentData,
    offset,
    prefix: path.slice(offset),
  }
}

export const buildIllaContextCompletionSource = (
  completeOptions: { key: string; value: any }[],
): ((
  context: CompletionContext,
) => CompletionResult | Promise<CompletionResult | null> | null) => {
  return (context: CompletionContext) => {
    const isCursorInDynamicFlag = checkCursorInDynamicFlag(context)
    if (!isCursorInDynamicFlag) {
      return null
    }
    const validString = context.matchBefore(/(\w+(\[\s*\d+\s*\])*\.)*\w*/)
    if (!validString) {
      return null
    }
    if (
      validString.text.length === 0 &&
      context.matchBefore(/\{\{\s*/) === null
    ) {
      return null
    }

    const completeOptionsObject = completeOptions.reduce(
      (result, value) => {
        const { key, value: valueValue } = value
        result[key] = valueValue
        return result
      },
      {} as Record<string, unknown>,
    )

    const dataInfo = getDataInfo(completeOptionsObject, validString.text)
    if (!dataInfo) {
      return null
    }

    const { currentData, offset, prefix } = dataInfo
    const keys = Object.keys(currentData).filter((key) =>
      key.startsWith(prefix),
    )

    const options = keys.map((key) => {
      const result: Completion = {
        type: "",
        label: key,
        detail: (currentData[key] as string) ?? "",
        boost: 1,
      }
      return result
    })

    return {
      from: validString.from + offset,
      validFor: /^\w*$/,
      options: options,
    }
  }
}
