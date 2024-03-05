import { AI_AGENT_MODEL } from "@illa-public/public-types"
import ClaudeIcon from "./assets/claude.svg?react"
import MistralIcon from "./assets/mistral.svg?react"
import MoonshotIcon from "./assets/moonshot.svg?react"
import OpenAIIcon from "./assets/openai.svg?react"
import ZhipuIcon from "./assets/zhipu.svg?react"
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
  {
    name: "Mistral",
    value: AI_AGENT_MODEL.MISTRAL,
    logo: <MistralIcon title="Mistral" />,
  },
  {
    name: "GLM-4",
    value: AI_AGENT_MODEL.GLM_4,
    logo: <ZhipuIcon title="GLM-4" />,
  },
  {
    name: "Claude",
    value: AI_AGENT_MODEL.CLAUDE,
    logo: <ClaudeIcon title="Claude" />,
  },
  {
    name: "Moonshot",
    value: AI_AGENT_MODEL.MOONSHOT,
    logo: <MoonshotIcon title="Moonshot" />,
  },
]

export const allModelList: LLM[] = [...freeModelList, ...premiumModelList]
