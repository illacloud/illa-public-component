export const GITHUB_CLIENT_ID = "171a5a900ac20f970f56"

export const GITHUB_AUTHORIZE_URL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`

export const LOGIN_REDIRECT_URL = `${location.protocol}//${
  import.meta.env.VITE_CLOUD_URL
}/login`
export const REGISTER_REDIRECT_URL = "https://192.168.50.170:5173/register"
export const CONNECT_REDIRECT_URL = "https://192.168.50.170:5173/register"

export const GITHUB_OAUTH_URL = `${GITHUB_AUTHORIZE_URL}&redirect_uri=${LOGIN_REDIRECT_URL}`

export const openOAuthUrl = (url?: string) => {
  window.open(url, "_self")
}

export const openGithubOAuthUrl = (redirectUrl?: string) => {
  const url = `${GITHUB_AUTHORIZE_URL}&redirect_uri=${redirectUrl}`
  window.open(url, "_self")
}

export const openGithubOAuthFormLogin = () => {
  openGithubOAuthUrl(
    `${location.protocol}//${import.meta.env.VITE_CLOUD_URL}/login`,
  )
}
