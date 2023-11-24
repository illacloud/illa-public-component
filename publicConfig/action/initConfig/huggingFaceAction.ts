import {
  HuggingFaceAction,
  HuggingFaceBodyContent,
  HuggingFaceRawBody,
} from "@illa-public/public-types"

export const HuggingFacePairsBodyInitital = [
  {
    key: "",
    value: "",
  },
]

export const HuggingFaceInputInitial = ""

export const HuggingFaceRawBodyInitial: HuggingFaceRawBody<string> = {
  type: "text",
  content: "",
}

export const HuggingFaceBooleanTypes = ["useCache", "waitForModel"]
export const HuggingFaceBooleanValueMap = {
  false: false,
  true: true,
}

export const HuggingFaceActionInitial: HuggingFaceAction<HuggingFaceBodyContent> =
  {
    modelID: "",
    inputs: HuggingFaceRawBodyInitial,
    withDetailParams: false,
    detailParams: {
      useCache: "",
      waitForModel: "",
      minLength: "",
      maxLength: "",
      topK: "",
      topP: "",
      temperature: "",
      repetitionPenalty: "",
      maxTime: "",
    },
  }
