export interface ResourceMoreActionProps {
  resourceID: string
  onEditResource: (resourceID: string) => void
  onDeleteResource: (resourceID: string) => Promise<unknown>
}
