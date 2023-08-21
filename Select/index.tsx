import { FC, HTMLAttributes, useMemo, useState } from "react"
import {
  DownIcon,
  Trigger,
  TriggerProps,
  UpIcon,
  zIndex,
} from "@illa-design/react"
import { ReactComponent as CheckmarkIcon } from "./assets/success.svg"
import { SelectProps } from "./interface"
import {
  applyFontWeightStyle,
  optionContentStyle,
  optionItemStyle,
  optionLabelStyle,
  pointerStyle,
  valueLabelStyle,
} from "./style"

const Select: FC<SelectProps> = (props) => {
  const {
    className,
    options,
    value,
    disabled,
    readOnly,
    fontWeight,
    onChange,
    triggerPosition = "bottom-start",
  } = props
  const [popupVisible, setPopupVisible] = useState<boolean>()

  const currentLabel = useMemo(() => {
    const selectedOption = options.find((option) => option.value === value)

    return selectedOption ? selectedOption.label : ""
  }, [value, options])

  const onVisibleChange = (visible: boolean) => {
    if (popupVisible !== visible) {
      setPopupVisible(visible)
    }
  }

  if (readOnly || disabled) {
    return (
      <div
        css={[valueLabelStyle, applyFontWeightStyle(fontWeight)]}
        className={className}
      >
        {currentLabel}
      </div>
    )
  }

  return (
    <Trigger
      trigger="click"
      colorScheme="white"
      position={triggerPosition}
      zIndex={zIndex.drawer + 1}
      withoutPadding
      showArrow={false}
      popupVisible={popupVisible}
      onVisibleChange={onVisibleChange}
      content={
        <div css={[optionContentStyle, applyFontWeightStyle(fontWeight)]}>
          {options.map((option) => {
            if (option.hidden) return null
            return (
              <div
                css={optionItemStyle}
                key={option.label}
                onClick={() => {
                  onVisibleChange(false)
                  onChange?.(option.value)
                }}
              >
                <span css={optionLabelStyle}>{option.label}</span>
                {option.value === value && <CheckmarkIcon />}
              </div>
            )
          })}
        </div>
      }
    >
      <div
        css={[valueLabelStyle, pointerStyle, applyFontWeightStyle(fontWeight)]}
        className={className}
      >
        {currentLabel}
        {popupVisible ? <UpIcon /> : <DownIcon />}
      </div>
    </Trigger>
  )
}

Select.displayName = "Select"

export default Select
