import {
  getStringSnippets,
  isDynamicStringSnippet,
} from "@illa-public/dynamic-string"
import { debounce } from "lodash-es"
import { forwardRef, useMemo } from "react"
import { ILLACodeMirrorCore } from "./CodeMirror/core"
import { IExpressionShape } from "./CodeMirror/extensions/interface"
import { illaCodeMirrorTooltipStyle } from "./CodeMirror/theme"
import { fixedValue } from "./CodeMirror/utils"
import { CodeEditorProps } from "./interface"
import { ILLACodeMirrorWrapperStyle } from "./style"

export const CodeEditor = forwardRef<HTMLDivElement, CodeEditorProps>(
  (props) => {
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
        css={[
          ILLACodeMirrorWrapperStyle,
          wrapperCss,
          illaCodeMirrorTooltipStyle,
        ]}
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
  },
)

CodeEditor.displayName = "CodeEditor"
