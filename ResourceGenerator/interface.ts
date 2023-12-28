import { ResourceType } from "@illa-public/public-types"

export interface ResourceGeneratorProps {
  visible: boolean
  onClose: () => void
  filterResourceType?: (resourceType: ResourceType) => boolean
}

export type ResourceCreatorPage = "select" | "createResource"
