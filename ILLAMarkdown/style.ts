import { css } from "@emotion/react"

export const applyMarkdownPStyle = (textColorScheme: string) => css`
  color: ${textColorScheme};
  font-size: 14px;
  white-space: break-spaces;
  word-break: break-all;
`
