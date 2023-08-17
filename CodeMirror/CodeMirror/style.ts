import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const applyEditorWrapperStyle = css`
  width: 100%;
  height: 100%;
  .cm-editor {
    border: 1px solid ${getColor("grayBlue", "08")};
    border-radius: 8px;
    transition: 0.2s ease-in-out;
    transition-property: border;
    &.cm-focused {
      z-index: 1;
      border: 1px solid ${getColor("techPurple", "01")} !important;
    }
    :hover {
      border: 1px solid ${getColor("techPurple", "06")};
    }
  }
`
