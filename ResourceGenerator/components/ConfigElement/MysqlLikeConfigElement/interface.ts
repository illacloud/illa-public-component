import { ResourceType } from "@illa-public/public-types"

export interface MysqlLikeConfigElementProps {
  resourceType: ResourceType
  resourceID?: string
  onBack: () => void
  onFinished: (resourceID: string) => void
}
