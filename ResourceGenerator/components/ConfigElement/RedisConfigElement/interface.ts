import { ConfigElementProps } from "../interface"

export interface RedisLikeConfigElementProps extends ConfigElementProps {
  type: "redis" | "upstash"
}
