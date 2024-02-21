import { AI_AGENT_MODEL, Agent } from "@illa-public/public-types"
import { ReactNode } from "react"

export interface ContributorTeam {
  teamID: string
  icon: string
  name: string
  teamIdentifier: string
}

export interface MarketplaceInfo {
  marketplaceID: string
  numStars: number
  numForks: number
  numRuns: number
  contributorTeam: ContributorTeam
  createdBy: string
  createdAt: string
  hashtags: string[]
  updatedBy: string
  updatedAt: string
  isStarredByCurrentUser: boolean
}

export interface MarketAIAgent {
  aiAgent: Agent
  marketplace: MarketplaceInfo
}

export interface LLM {
  name: string
  logo: ReactNode
  value: AI_AGENT_MODEL
}
