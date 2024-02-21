import { AI_AGENT_MODEL } from "@illa-public/public-types"
import OpenAIIcon from "./assets/openai.svg?react"
import { LLM } from "./interface"

export const getLLM = (type: AI_AGENT_MODEL): LLM | undefined => {
  return allModelList.find((item) => item.value === type)
}

export const isPremiumModel = (type: AI_AGENT_MODEL): boolean => {
  return premiumModelList.some((item) => item.value === type)
}

export const freeModelList: LLM[] = [
  {
    name: "GPT-3.5",
    value: AI_AGENT_MODEL.GPT_3_5,
    logo: <OpenAIIcon title="GPT-3.5 Icon" />,
  },
]

export const premiumModelList: LLM[] = [
  {
    name: "GPT-4",
    value: AI_AGENT_MODEL.GPT_4,
    logo: <OpenAIIcon title="GPT-4 Icon" />,
  },
]

export const allModelList: LLM[] = [...freeModelList, ...premiumModelList]
