export const getMarketLinkTemplate = (appID: string): string => {
  return `${process.env.ILLA_MARKET_URL}/apps/${appID}/deploy`
}

export const getPublicLinkTemplate = (teamIdentify: string, appID: string): string => {
  return `${process.env.ILLA_BUILDER_URL}/${teamIdentify}/deploy/app/${appID}`
}

export const getAgentPublicLink = (agentID: string): string  => {
  return `${process.env.ILLA_MARKET_URL}/ai-agent/${agentID}/detail`
}

export const EMAIL_FORMAT =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/