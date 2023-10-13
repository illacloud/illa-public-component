export interface ConfigElementProps {
  resourceID?: string
  onBack: () => void
  onFinished: (resourceID: string) => void
}
