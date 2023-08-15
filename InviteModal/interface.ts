import { ReactNode } from "react"
import { ReactComponent as FacebookIcon } from "./asset/Facebook.svg"
import { ReactComponent as HackerNewsIcon } from "./asset/HackerNews.svg"
import { ReactComponent as LinkedInIcon } from "./asset/LinkedIn.svg"
import { ReactComponent as RedditIcon } from "./asset/Reddit.svg"
import { ReactComponent as TwitterIcon } from "./asset/Twitter.svg"
import { ReactComponent as WhatsAppIcon } from "./asset/WhatsApp.svg"


export enum INVITE_FROM {
  CLOUD_DASHBOARD = "cloud_dashboard",
  CLOUD_MEMBER = "cloud_member",
  BUILDER_IDE = "builder_ide",
  BUILDER_DASHBOARD = "builder_dashboard",
  BUILDER_MEMBER = "builder_member",
  AGENT_DASHBOARD = "agent_dashboard",
  AGENT_EDIT = "agent_edit",
  AGENT_RUN = "agent_run",
}

export enum PlatformType {
  TWITTER = "twitter",
  REDDIT = "reddit",
  LINKEDIN = "linkedin",
  HACKER_NEWS = "hacker_news",
  FACEBOOK = "facebook",
  WHATSAPP = "whatsapp",
}

export interface InviteModalProps {
  from: INVITE_FROM
  onAppPublic?: (isPublic: boolean) => void
  onAgentContribute?: (isContributed: boolean) => void
  onAppContribute?: (isContributed: boolean) => void
  onClose?: () => void
}

export interface SocialMediaPlatform {
  platform: PlatformType
  platformName: string
  icon: ReactNode
}

export const SocialMediaList = [
  {
    platform: PlatformType.TWITTER,
    platformName: "x",
    icon: TwitterIcon,
  },
  {
    platform: PlatformType.REDDIT,
    platformName: "Reddit",
    icon: RedditIcon,
  },
  {
    platform: PlatformType.LINKEDIN,
    platformName: "LinkedIn",
    icon: LinkedInIcon,
  },
  {
    platform: PlatformType.HACKER_NEWS,
    platformName: "Hacker News",
    icon: HackerNewsIcon,
  },
  {
    platform: PlatformType.FACEBOOK,
    platformName: "Facebook",
    icon: FacebookIcon,
  },
  {
    platform: PlatformType.WHATSAPP,
    platformName: "WhatsApp",
    icon: WhatsAppIcon,
  },
]