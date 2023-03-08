export const GITHUB_CLIENT_ID = "171a5a900ac20f970f56"

export const GITHUB_AUTHORIZE_URL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`

export const REDIRECT_URL = "/oauth/redirect"

export const GITHUB_OAUTH_URL = `${GITHUB_AUTHORIZE_URL}&redirect_uri=${REDIRECT_URL}`

export const openGithubOAuthUrl = (redirectUrl?: string) => {
  const url = `${GITHUB_AUTHORIZE_URL}&redirect_uri=${redirectUrl}`
  window.open(url, "_self")
}

export const openGithubOAuthFormLogin = () => {
  openGithubOAuthUrl(
    `${location.protocol}//${import.meta.env.VITE_CLOUD_URL}/login`,
  )
}
