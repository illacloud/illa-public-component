import { ReactNode } from "react"
import { ReactComponent as FacebookIcon } from "../../asset/Facebook.svg"
import { ReactComponent as HackerNewsIcon } from "../../asset/Hackernews.svg"
import { ReactComponent as LinkedInIcon } from "../../asset/Linkedin.svg"
import { ReactComponent as RedditIcon } from "../../asset/Reddit.svg"
import { ReactComponent as WhatsAppIcon } from "../../asset/Whatsapp.svg"
import { ReactComponent as XIcon } from "../../asset/X.svg"


export interface ShareBlockProps {
  shareUrl: string
  title: string
  onShare: (platform: PlatformType) => void
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