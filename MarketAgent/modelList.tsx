import { ReactComponent as OpenAIIcon } from "./assets/openai.svg"
import { AI_AGENT_MODEL, LLM } from "./interface"


export const getLLM = (type: AI_AGENT_MODEL): LLM | undefined => {
  return allModelList.find((item) => item.value === type)
}

export const isPremiumModel = (type: AI_AGENT_MODEL): boolean => {
  return premiumModelList.some((item) => item.value === type)
}

export const freeModelList: LLM[] = [
  {
    name: "GPT-3.5-turbo",
    value: AI_AGENT_MODEL.GPT_3_5_TURBO,
    logo: <OpenAIIcon />,
  },
  {
    name: "LLAMA_2_7B",
    value: AI_AGENT_MODEL.LLAMA_2_7B,
    logo: <OpenAIIcon />,
  },
]

export const premiumModelList: LLM[] = [
  {
    name: "GPT-3.5-turbo-16k",
    value: AI_AGENT_MODEL.GPT_3_5_TURBO_16K,
    logo: <OpenAIIcon />,
  },
  {
    name: "GPT-3.5-turbo",
    value: AI_AGENT_MODEL.GPT_4,
    logo: <OpenAIIcon />,
  },
  {
    name: "LLAMA_2_70B",
    value: AI_AGENT_MODEL.LLAMA_2_70B,
    logo: <OpenAIIcon />,
  },
]

export const allModelList: LLM[] = [...freeModelList, ...premiumModelList]