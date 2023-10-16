import { ResourceType } from "@illa-public/public-types"

export interface ResourceCardSelectorProps {
  resourceType: ResourceType
  onSelect?: (item: ResourceType) => void
}
