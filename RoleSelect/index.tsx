import { FC, HTMLAttributes, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { DownIcon, Trigger, UpIcon, zIndex } from "@illa-design/react"
import {
  getSmallThanTargetRole,
  isSmallThanTargetRole,
  userRoleMapI18nString,
  userRoleTipI18nString,
} from "@/illa-public-component/UserRoleUtils"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"
import { ReactComponent as DoubtIcon } from "./assets/doubt.svg"
import { ReactComponent as CheckmarkIcon } from "./assets/success.svg"
import {
  applyFontWeightStyle,
  doubtIconStyle,
  optionContentStyle,
  optionItemStyle,
  optionLabelStyle,
  pointerStyle,
  valueLabelStyle,
} from "./style"

interface RoleSelectProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: USER_ROLE
  userRole: USER_ROLE
  notHasSelf?: boolean
  disabled?: boolean
  onChange?: (value: USER_ROLE) => void
  fontWeight?: number
}

const RoleSelect: FC<RoleSelectProps> = (props) => {
  const { className, value, userRole, disabled, fontWeight, onChange } = props
  const { t } = useTranslation()
  const [popupVisible, setPopupVisible] = useState<boolean>()

  const canChange = useMemo(() => {
    return (
      isSmallThanTargetRole(userRole, value) &&
      value !== USER_ROLE.OWNER &&
      !disabled
    )
  }, [value, userRole, disabled])

  const options: { label: string; tip: string; value: USER_ROLE }[] =
    useMemo(() => {
      return getSmallThanTargetRole(userRole, false, [
        USER_ROLE.OWNER,
        USER_ROLE.CUSTOM,
      ]).map((role) => {
        const labelI18nKey = userRoleMapI18nString[role]
        const tipI18nKey = userRoleTipI18nString[role]
        return {
          label: t(labelI18nKey),
          tip: t(tipI18nKey),
          value: role,
        }
      })
    }, [userRole, t])

  const onVisibleChange = (visible: boolean) => {
    if (popupVisible !== visible) {
      setPopupVisible(visible)
    }
  }

  if (!canChange) {
    return (
      <div
        css={[valueLabelStyle, applyFontWeightStyle(fontWeight)]}
        className={className}
      >
        {t(userRoleMapI18nString[value])}
      </div>
    )
  }

  return (
    <Trigger
      trigger="click"
      colorScheme="white"
      position="bottom-start"
      zIndex={zIndex.drawer + 1}
      withoutPadding
      showArrow={false}
      popupVisible={popupVisible}
      onVisibleChange={onVisibleChange}
      content={
        <div css={[optionContentStyle, applyFontWeightStyle(fontWeight)]}>
          {options.map((option) => {
            return (
              <div
                css={optionItemStyle}
                key={option.label}
                onClick={() => {
                  onVisibleChange(false)
                  onChange?.(option.value)
                }}
              >
                <span css={optionLabelStyle}>
                  {option.label}
                  {option.tip ? (
                    <Trigger
                      trigger="hover"
                      colorScheme="grayBlue"
                      zIndex={zIndex.drawer + 1}
                      content={option.tip}
                    >
                      <span css={doubtIconStyle}>
                        <DoubtIcon />
                      </span>
                    </Trigger>
                  ) : null}
                </span>
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
        {t(userRoleMapI18nString[value])}
        {popupVisible ? <UpIcon /> : <DownIcon />}
      </div>
    </Trigger>
  )
}

RoleSelect.displayName = "RoleSelect"

export default RoleSelect
