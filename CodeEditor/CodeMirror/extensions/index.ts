import {
  CompletionSource,
  acceptCompletion,
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  closeCompletion,
  moveCompletionSelection,
} from "@codemirror/autocomplete"
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands"
import { bracketMatching, indentOnInput } from "@codemirror/language"
import { Extension, Prec } from "@codemirror/state"
import { dropCursor, keymap } from "@codemirror/view"
import { useMemo } from "react"
import { buildIllaContextCompletionSource } from "./completionSources/illaContext"
import { getHighlightExpressionExtension } from "./heighLightJSExpression"
import { ICodeMirrorOptions } from "./interface"

export const basicExtension: Extension = [
  history(),
  dropCursor(),
  indentOnInput(),
  bracketMatching(),
  closeBrackets(),
  keymap.of([...closeBracketsKeymap, ...defaultKeymap, ...historyKeymap]),
]

const buildCompletionSources = (
  completionOptions: { key: string; value: any }[],
) => {
  const illaSources = buildIllaContextCompletionSource(completionOptions)
  const completionSources: CompletionSource[] = [illaSources]
  return completionSources
}
const keyMapExtensions = Prec.highest(
  keymap.of([
    { key: "Escape", run: closeCompletion },
    { key: "ArrowDown", run: moveCompletionSelection(true) },
    { key: "ArrowUp", run: moveCompletionSelection(false) },
    { key: "PageDown", run: moveCompletionSelection(true, "page") },
    { key: "PageUp", run: moveCompletionSelection(false, "page") },
    { key: "Tab", run: acceptCompletion },
    { key: "Enter", run: acceptCompletion },
  ]),
)

const getAutoCompletionExtension = (
  completionOptions: { key: string; value: any }[],
) => {
  const completionSources = buildCompletionSources(completionOptions)
  return [
    autocompletion({
      override: completionSources,
      defaultKeymap: false,
      closeOnBlur: false,
    }),
    keyMapExtensions,
  ]
}

export const useBasicSetup = (options: ICodeMirrorOptions) => {
  const { expressions = [], completionOptions } = options

  const autocompletionExtension = useMemo(
    () => getAutoCompletionExtension(completionOptions),
    [completionOptions],
  )

  const highlightJSExpressionExtension = useMemo(() => {
    return getHighlightExpressionExtension(expressions)
  }, [expressions])

  const extensions = useMemo(
    () => [
      basicExtension,
      autocompletionExtension,
      highlightJSExpressionExtension,
    ],
    [autocompletionExtension, highlightJSExpressionExtension],
  )

  return extensions
}
