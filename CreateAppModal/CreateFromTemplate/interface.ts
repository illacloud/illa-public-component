import { ReactNode } from "react"

export interface CreateFromTemplateProps {
  hiddenCreateBlank?: boolean
  handleForkApp: (appID: string, teamIdentifier?: string) => Promise<void>
  closeModal?: () => void
  prevContentNode?: ReactNode
}
