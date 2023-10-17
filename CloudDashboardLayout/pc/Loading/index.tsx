import { FC } from "react"
import { leftContainerStyle, pcLayoutContainerStyle } from "../style"
import { rightAnimationStyle } from "./style"

export const PCDashboardLoading: FC = () => {
  return (
    <div css={pcLayoutContainerStyle}>
      <aside css={leftContainerStyle}></aside>
      <aside css={rightAnimationStyle}></aside>
    </div>
  )
}
