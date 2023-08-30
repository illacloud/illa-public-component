import { HTMLAttributes } from "react"
import { TriggerProps } from "@illa-design/react"

export interface SelectProps<Value = unknown>
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  disabled?: boolean
  readOnly?: boolean
  fontWeight?: number
  value: Value
  options: { label: string; value: Value; hidden?: boolean }[]
  onChange?: (value: Value) => void
  triggerPosition?: TriggerProps["position"]
}
