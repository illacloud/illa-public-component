import { ResourceType } from "@illa-public/public-types"

export interface ResourceTypeSelectorProps {
  onSelect: (item: ResourceType) => void
  filterResourceType?: (item: ResourceType) => boolean
}
