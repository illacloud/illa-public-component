export interface AppSettingModalProps {
  appID: string
  appName: string
  appDesc?: string
  onVisibleChange: (visible: boolean) => void
  onSaveEvent: () => void
  onCloseEvent: () => void
}
