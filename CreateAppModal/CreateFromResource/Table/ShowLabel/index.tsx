import { FC } from "react"
import { PenIcon } from "@illa-design/react"
import { showLabelStyle } from "./style"

interface ShowLabelProps {
  value: string
}
const ShowLabel: FC<ShowLabelProps> = ({ value }) => {
  return (
    <div css={showLabelStyle}>
      <span>{value}</span>
      <PenIcon size="16px" />
    </div>
  )
}

export default ShowLabel
