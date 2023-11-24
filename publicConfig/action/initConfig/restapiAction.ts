import {
  Params,
  RestAPIRawBody,
  RestApiAction,
  RestApiBodyContent,
} from "@illa-public/public-types"

export const RestAPIRawBodyInitial: RestAPIRawBody = {
  type: "text",
  content: "",
}

export const RestApiActionInitial: RestApiAction<RestApiBodyContent> = {
  url: "",
  method: "GET",
  urlParams: [{ key: "", value: "" } as Params],
  headers: [{ key: "", value: "" } as Params],
  cookies: [{ key: "", value: "" } as Params],
  bodyType: "none",
  body: null,
}
