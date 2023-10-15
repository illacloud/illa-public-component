import { notNeedAuthRequest } from "@illa-public/illa-net"

interface IWhiteListIPResponse {
  resources: string[]
}

export const fetchWhiteListIP = async () => {
  return await notNeedAuthRequest<IWhiteListIPResponse>({
    url: "https://peripheral-api.illasoft.com/v1/meta",
    method: "GET",
  })
}
