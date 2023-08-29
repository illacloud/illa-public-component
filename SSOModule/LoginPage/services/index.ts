import { notNeedAuthCloudRequest } from "@illa-public/illa-net"
import { OAUTH_REDIRECT_URL } from "../../constants/users"

export const fetchOAuthURI = async (
  oauthAgency: "github" | "google",
  landing: "signin" | "signup" | "connect",
  redirectURI?: string,
) => {
  return await notNeedAuthCloudRequest<{ uri: string }>({
    method: "GET",
    url: `/oauth/${oauthAgency}/uri/redirectTo/${encodeURIComponent(
      redirectURI ?? OAUTH_REDIRECT_URL,
    )}/landing/${landing}`,
  })
}
