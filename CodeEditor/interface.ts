import { SerializedStyles } from "@emotion/react"
import { ILLACodeMirrorProps } from "./CodeMirror/interface"

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
