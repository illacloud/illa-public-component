import { CSSProperties } from "react"

export interface MarketAgentCardProps {
  style?: CSSProperties
  onClick?: (aiAgentID: string) => void
  aiAgent: {
    aiAgentID: string
    icon: string
    name: string
    description: string
  }
  marketplace: {
    contributorTeam: {
      icon: string
      name: string
      teamID: string
    }
    numForks: number
    numStars: number
    numRuns: number
  }
}
