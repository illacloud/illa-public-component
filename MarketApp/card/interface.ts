import { MarketplaceInfo, ProductAppDetail } from "../interface"

export interface MarketAppCardProps {
  onClick?: (appID: string) => void
  app: ProductAppDetail
  marketplace: MarketplaceInfo
  fallbackDescription?: string
}
