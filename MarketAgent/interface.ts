import { Params } from "@illa-public/record-editor"
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
  updatedBy: string
  updatedAt: string
  isStarredByCurrentUser: boolean
}

export interface MarketAIAgent {
  aiAgent: Agent
  marketplace: MarketplaceInfo
}

export interface AgentEditor {
  userID: string
  nickname: string
  avatar: string
  email: string
  editedAt: string
}

export enum AI_AGENT_TYPE {
  CHAT = 1,
  TEXT_GENERATION = 2,
}

export enum AI_AGENT_MODEL {
  GPT_3_5_TURBO = 1,
  GPT_3_5_TURBO_16K = 2,
  GPT_4 = 3,
  GPT_4_32K,
  LLAMA_2_CHAT_7B = 9,
  LLAMA_2_CHAT_13B = 10,
}

export interface AgentAdvanceConfig {
  temperature: number
  maxTokens: number
  stream: boolean
}

export interface AgentRaw {
  name: string
  agentType: AI_AGENT_TYPE
  model: AI_AGENT_MODEL
  variables: Params[]
  prompt: string
  modelConfig: AgentAdvanceConfig
  icon: string
  description: string
}

export interface Agent extends AgentRaw {
  aiAgentID: string
  teamIdentifier: string
  teamID: string
  teamIcon: string
  teamName: string
  publishedToMarketplace: boolean
  createdAt: string
  createdBy: string
  updatedBy: string
  updatedAt: string
  editedBy: AgentEditor[]
}

export interface LLM {
  name: string
  logo: ReactNode
  value: AI_AGENT_MODEL
  limit: number
  temperatureRange: [number, number]
}
