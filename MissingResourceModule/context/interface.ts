import {
  ActionContent,
  ActionItem,
  Agent,
  Resource,
  ResourceContent,
} from "@illa-public/public-types"
import { ReactNode } from "react"

export type IMissingActionMap = Record<
  string,
  {
    actionIDs: string[]
    resourceType: string
    tutorialHref: string
    hasLink: boolean
  }
>

export interface IMissingResourcesContext {
  missingActionsMap: IMissingActionMap
  resourceList: Resource<ResourceContent>[]
  aiAgentList: Agent[]
  actionIDMapAction: Record<string, ActionItem<ActionContent>>
  resourceIDMapResource: Record<string, Resource<ResourceContent>>
  agentIDMapAgent: Record<string, Agent>
  updateActions: (actionList: ActionItem<ActionContent>[]) => Promise<void>
  addResourceCallback: (resource: Resource<ResourceContent>) => void
}

export interface IMissingResourcesProviderProps
  extends IMissingResourcesContext {
  children: ReactNode
}
