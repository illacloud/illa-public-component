export interface AppSettingModalProps {
  appID: string
  appName: string
  appDesc?: string
  visible: boolean
  onVisibleChange: (visible: boolean) => void
  onSaveEvent: () => void
  onCloseEvent: () => void
}
