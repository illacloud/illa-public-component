import { ResourceType } from "@illa-public/public-types"

export interface ResourceCreatePanelProps {
  resourceType: ResourceType
  resourceID?: string
  handleOnClickBack: () => void
}
