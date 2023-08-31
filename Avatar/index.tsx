import { getColorByString } from "@illa-public/utils"
import { FC, useMemo } from "react"
import { AvatarProps } from "./interface"
import { applyAvatarStyle, avatarImgStyle } from "./style"

export * from "./interface"
const getFirstChar = (str: string | undefined) => {
  if (!str) return "U"
  const trimStr = str.trim()
  const regex = /^./u
  const match = trimStr.match(regex)
  return match ? match[0].toUpperCase() : "U"
}

export const Avatar: FC<AvatarProps> = (props) => {
  const { avatarUrl, id, name, className, size = 40, ...otherProps } = props

  const { avatarBgColor, avatarText, emptyStatus } = useMemo(() => {
    return {
      avatarBgColor: avatarUrl ? "#ffffff" : getColorByString(id || ""),
      avatarText: getFirstChar(name),
      emptyStatus: !avatarUrl && !name,
    }
  }, [id, name, avatarUrl])

  return (
    <div
      className={className}
      css={applyAvatarStyle(avatarBgColor, emptyStatus, size)}
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
