import { ComponentTreeNode } from "@illa-public/public-types"

export function searchDSLFromTree(
  componentTree: ComponentTreeNode,
  findDisplayName: string,
) {
  const queue = [componentTree]
  while (queue.length > 0) {
    const head = queue[0]
    if (head.displayName === findDisplayName) {
      return head
    }
    queue.shift()
    if (head.childrenNode) {
      head.childrenNode.forEach((child) => {
        queue.push(child)
      })
    }
  }
}
