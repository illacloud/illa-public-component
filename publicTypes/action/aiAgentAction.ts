import { Params } from ".."
import { AI_AGENT_MODEL, AI_AGENT_TYPE, Agent } from "../agent"

export interface BaseAiAgentActionContent {
  agentType: AI_AGENT_TYPE
  model: AI_AGENT_MODEL
  variables: Params[]
  input: string
  modelConfig: {
    stream: boolean
  }
}

export interface AiAgentActionContent extends BaseAiAgentActionContent {
  virtualResource?: Agent
}
