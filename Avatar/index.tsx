import { getColorByString } from "@illa-public/utils"
import { FC, HTMLAttributes, useEffect, useMemo } from "react"
import { applyAvatarStyle, avatarImgStyle } from "./style"

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  avatarUrl?: string
  id?: string
  name?: string
  onMount?: () => void
}

const getFirstChar = (str: string | undefined) => {
  if (!str) return "U"
  const trimStr = str.trim()
  const regex = /^./u
  const match = trimStr.match(regex)
  return match ? match[0].toUpperCase() : "U"
}

export const Avatar: FC<AvatarProps> = (props) => {
  const { avatarUrl, id, name, className, onMount, ...otherProps } = props

  const { avatarBgColor, avatarText, emptyStatus } = useMemo(() => {
    return {
      avatarBgColor: avatarUrl ? "#ffffff" : getColorByString(id || ""),
      avatarText: getFirstChar(name),
      emptyStatus: !avatarUrl && !name,
    }
  }, [id, name, avatarUrl])

  useEffect(() => {
    onMount?.()
  }, [onMount])

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
