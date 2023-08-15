import FacebookIcon from "./assets/facebook.svg"
import HackerNewsIcon from "./assets/hackerNews.svg"
import LinkedInIcon from "./assets/linkedin.svg"
import RedditIcon from "./assets/reddit.svg"
import TwitterIcon from "./assets/twitter.svg"
import WhatsAppIcon from "./assets/whatsApp.svg"

export const getMediaLink = (
  media: string,
  defaultText: string,
  agentName: string,
  agentLink: string,
) => {
  switch (media) {
    case "Twitter":
      return `https://twitter.com/intent/tweet?text=${defaultText} ${agentName}:${agentLink}`
    case "Reddit":
      return `https://reddit.com/submit?url=${agentLink}&title=${defaultText} ${agentName}`
    case "LinkedIn":
      return `https://www.linkedin.com/shareArticle?url=${agentLink}&title=${defaultText} ${agentName}`
    case "Hacker News":
      return `https://news.ycombinator.com/submitlink?u=${agentLink}&t=${defaultText} ${agentName}`
    case "Facebook":
      return `https://www.facebook.com/dialog/share?app_id=<your_app_id>&href=${agentLink}&quote=${defaultText} ${agentName}`
    case "WhatsApp":
      return `https://web.whatsapp.com/send?text=${encodeURIComponent(
        defaultText,
      )}%20${encodeURIComponent(agentName)}:%20${encodeURIComponent(agentLink)}`
  }
}

export const MediaConfig = [
  {
    name: "Twitter",
    icon: TwitterIcon,
    defaultTextKey: "new_share.default-text.social-media.twitter",
  },
  {
    name: "Reddit",
    icon: RedditIcon,
    defaultTextKey: "new_share.default-text.social-media.reddit",
  },
  {
    name: "LinkedIn",
    icon: LinkedInIcon,
    defaultTextKey: "new_share.default-text.social-media.linkedin",
  },

  {
    name: "Hacker News",
    icon: HackerNewsIcon,
    defaultTextKey: "new_share.default-text.social-media.hackernews",
  },
  {
    name: "Facebook",
    icon: FacebookIcon,
    defaultTextKey: "new_share.default-text.social-media.facebook",
  },
  {
    name: "WhatsApp",
    icon: WhatsAppIcon,
    defaultTextKey: "new_share.default-text.social-media.whatsapp",
  },
]
