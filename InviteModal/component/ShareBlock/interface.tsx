import { ReactNode } from "react"
import FacebookIcon from "../../asset/Facebook.svg?react"
import HackerNewsIcon from "../../asset/Hackernews.svg?react"
import LinkedInIcon from "../../asset/Linkedin.svg?react"
import RedditIcon from "../../asset/Reddit.svg?react"
import WhatsAppIcon from "../../asset/Whatsapp.svg?react"
import XIcon from "../../asset/X.svg?react"

export interface ShareBlockProps {
  shareUrl: string
  title: string
  onShare?: (platform: PlatformType) => void
}

export enum PlatformType {
  X = "x",
  REDDIT = "reddit",
  LINKEDIN = "linkedin",
  HACKER_NEWS = "hacker_news",
  FACEBOOK = "facebook",
  WHATSAPP = "whatsapp",
}

export interface SocialMediaPlatform {
  platform: PlatformType
  platformName: string
  icon: ReactNode
}

export const SocialMediaList: SocialMediaPlatform[] = [
  {
    platform: PlatformType.X,
    platformName: "X",
    icon: <XIcon />,
  },
  {
    platform: PlatformType.REDDIT,
    platformName: "Reddit",
    icon: <RedditIcon />,
  },
  {
    platform: PlatformType.LINKEDIN,
    platformName: "LinkedIn",
    icon: <LinkedInIcon />,
  },
  {
    platform: PlatformType.HACKER_NEWS,
    platformName: "Hacker News",
    icon: <HackerNewsIcon />,
  },
  {
    platform: PlatformType.FACEBOOK,
    platformName: "Facebook",
    icon: <FacebookIcon />,
  },
  {
    platform: PlatformType.WHATSAPP,
    platformName: "WhatsApp",
    icon: <WhatsAppIcon />,
  },
]
