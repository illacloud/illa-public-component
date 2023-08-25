export interface MarketAppCardProps {
  onClick?: (appID: string) => void
  app: {
    appID: string
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
  }
}
