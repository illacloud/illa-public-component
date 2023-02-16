import { FC, HTMLAttributes, useMemo } from "react"
import {
  applyAvatarStyle,
  avatarImgStyle,
} from "@/illa-public-component/Avatar/style"

interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  avatarUrl?: string
  id?: string
  name?: string
}

// Generate id from strings
const stringToColour = (str?: string) => {
  if (!str) return "#654aec"
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
    hash = hash & hash
  }
  return `hsl(${hash % 360}, ${100}%, ${70}%)`
}

export const Avatar: FC<AvatarProps> = (props) => {
  const { avatarUrl, id, name, className, ...otherProps } = props

  const { avatarBgColor, avatarText, emptyStatus } = useMemo(() => {
    return {
      avatarBgColor: avatarUrl ? "#ffffff" : stringToColour(id),
      avatarText: name?.substring?.(0, 1).toUpperCase() || "U",
      emptyStatus: !avatarUrl && !name,
    }
  }, [id, name, avatarUrl])

  return (
    <div
      className={className}
      css={applyAvatarStyle(avatarBgColor, emptyStatus)}
      {...otherProps}
    >
      {avatarUrl ? (
        <img css={avatarImgStyle} src={avatarUrl} alt="avatar" />
      ) : (
        avatarText
      )}
    </div>
  )
}

Avatar.displayName = "Avatar"
