import { Params } from ".."

export enum AI_AGENT_MODEL {
  GPT_3_5 = 1,
  GPT_4 = 3,
  GLM_4 = 12,
  MISTRAL = 13,
  CLAUDE = 15,
  MOONSHOT = 16,
}

export enum AI_AGENT_TYPE {
  CHAT = 1,
  TEXT_GENERATION = 2,
}

export interface AgentAdvanceConfig {
  stream: boolean
}

export interface KnowledgeFile {
  name: string
  type: string
  value?: string
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
  knowledge: KnowledgeFile[]
}

export interface AgentEditor {
  userID: string
  nickname: string
  avatar: string
  email: string
  editedAt: string
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
