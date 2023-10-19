import { AppPublicProps } from "../component/AppPublic/interface"

export interface MarketShareAppProps
  extends Omit<AppPublicProps, "hidePublic" | "onAppInfoUpdate"> {
  onClose: () => void
}
