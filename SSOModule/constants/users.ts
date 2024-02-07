import { getILLACloudURL } from "@illa-public/utils"

export const GITHUB_CLIENT_ID = "171a5a900ac20f970f56"

export const GITHUB_AUTHORIZE_URL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`

export const OAUTH_REDIRECT_URL = `${getILLACloudURL(
  window.customDomain,
)}/oauth`

export const openOAuthUrl = (url?: string) => {
  window.open(url, "_self")
}

export const openGithubOAuthUrl = (redirectURL?: string) => {
  const url = `${GITHUB_AUTHORIZE_URL}&redirect_uri=${redirectURL}`
  window.open(url, "_self")
}

export const openGithubOAuthFormLogin = () => {
  openGithubOAuthUrl(`${getILLACloudURL(window.customDomain)}/login`)
}
