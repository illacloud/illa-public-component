import { Params } from ".."

export type HuggingFaceParametesType = "text" | "json" | "pairs" | "binary"

export type HuggingFaceBodyContent = Params[] | string

export interface HuggingFaceRawBody<T extends HuggingFaceBodyContent> {
  type: HuggingFaceParametesType
  content: T
}

export interface HuggingFaceAction<T extends HuggingFaceBodyContent> {
  modelID?: string
  inputs: HuggingFaceRawBody<T>
  withDetailParams: boolean
  detailParams: {
    useCache: string
    waitForModel: string
    minLength: string
    maxLength: string
    topK: string
    topP: string
    temperature: string
    repetitionPenalty: string
    maxTime: string
  }
}
