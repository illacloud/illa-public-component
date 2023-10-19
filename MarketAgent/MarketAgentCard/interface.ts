import { HTMLAttributes } from "react"
import { MarketAIAgent } from "../interface"

export interface MarketAgentCardProps extends HTMLAttributes<HTMLDivElement> {
  marketAIAgent: MarketAIAgent
}
