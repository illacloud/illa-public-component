import { ResourceType } from "@illa-public/public-types"

export interface CardProps {
  resourceType: ResourceType
  resourceName: string
  dbName?: string
  onEditResource?: (resourceID: string) => void
  onDeleteResource?: (resourceID: string) => Promise<unknown>
  resourceID: string
}
