import { ResourceType } from "@illa-public/public-types"

export interface ResourceGeneratorProps {
  visible: boolean
  onClose: () => void
  filterResourceType?: (resourceType: ResourceType) => boolean
  defaultConfig?: {
    defaultStep: ResourceCreatorPage
    defaultResourceType: ResourceType
  }
}

export type ResourceCreatorPage = "select" | "createResource"
