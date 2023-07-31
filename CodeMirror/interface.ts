import { SerializedStyles } from "@emotion/react"
import { ILLACodeMirrorProps } from "@/illa-public-component/CodeMirror/CodeMirror/interface"

export interface CodeEditorProps
  extends Omit<
    ILLACodeMirrorProps,
    | "hasError"
    | "resultType"
    | "result"
    | "executionResult"
    | "expressions"
    | "canShowResultRealtime"
  > {
  wrapperCss?: SerializedStyles
}
