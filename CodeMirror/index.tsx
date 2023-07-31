import { debounce } from "lodash"
import { FC, useMemo } from "react"
import { ILLACodeMirrorCore } from "@/illa-public-component/CodeMirror/CodeMirror/core"
import { IExpressionShape } from "@/illa-public-component/CodeMirror/CodeMirror/extensions/interface"
import { CodeEditorProps } from "@/illa-public-component/CodeMirror/interface"
import { ILLACodeMirrorWrapperStyle } from "@/illa-public-component/CodeMirror/style"
import { illaCodeMirrorTooltipStyle } from "./CodeMirror/theme"
import { fixedValue, getStringSnippets, isDynamicStringSnippet } from "./utils"

export const CodeEditor: FC<CodeEditorProps> = (props) => {
  const {
    value = "",
    onChange = () => {},
    placeholder,
    width,
    maxWidth,
    height,
    maxHeight,
    editable = true,
    readOnly,
    minWidth,
    minHeight,
    wrapperCss,
    completionOptions,
    onBlur = () => {},
    onFocus = () => {},
    className,
  } = props

  const stringSnippets = useMemo(() => {
    const result: IExpressionShape[] = []
    const dynamicStrings = getStringSnippets(value)
    dynamicStrings.forEach((stringSnippet) => {
      if (isDynamicStringSnippet(stringSnippet)) {
        const currentKey = stringSnippet.split("{{")[1].split("}}")[0].trim()
        if (
          !currentKey ||
          completionOptions.find((item) => item.key.trim() === currentKey)
        ) {
          result.push({ hasError: false, value: stringSnippet })
        } else {
          result.push({ hasError: true, value: stringSnippet })
        }
      }
    })
    return result
  }, [completionOptions, value])

  const debounceHandleChange = useMemo(() => {
    return debounce(onChange, 160)
  }, [onChange])

  return (
    <div
      css={[ILLACodeMirrorWrapperStyle, wrapperCss, illaCodeMirrorTooltipStyle]}
    >
      <ILLACodeMirrorCore
        className={className}
        placeholder={placeholder}
        value={fixedValue(value)}
        onChange={debounceHandleChange}
        expressions={stringSnippets}
        width={width}
        maxWidth={maxWidth}
        height={height}
        maxHeight={maxHeight}
        editable={editable}
        readOnly={readOnly}
        minWidth={minWidth}
        minHeight={minHeight}
        onBlur={onBlur}
        onFocus={onFocus}
        completionOptions={completionOptions}
      />
    </div>
  )
}
