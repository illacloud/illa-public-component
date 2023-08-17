import { FC, HTMLAttributes, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { DownIcon, Trigger, UpIcon, zIndex } from "@illa-design/react"
import {
  hiddenStyle,
  optionContentStyle,
  optionItemStyle,
  valueLabelStyle,
} from "@/illa-public-component/MobileMember/UserRoleSelect/style"
import { ReactComponent as CheckmarkIcon } from "@/illa-public-component/RoleSelect/assets/success.svg"
import {
  getSmallThanTargetRole,
  isSmallThanTargetRole,
  userRoleMapI18nString,
} from "@/illa-public-component/UserRoleUtils"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"

interface UserRoleSelectProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: USER_ROLE
  userRole: USER_ROLE
  notHasSelf?: boolean
  disabled?: boolean
  onChange?: (value: USER_ROLE) => void
}

const UserRoleSelect: FC<UserRoleSelectProps> = (props) => {
  const { className, value, userRole, disabled, onChange } = props
  const { t } = useTranslation()
  const [popupVisible, setPopupVisible] = useState<boolean>()

  const canChange = useMemo(() => {
    return (
      isSmallThanTargetRole(userRole, value) &&
      value !== USER_ROLE.OWNER &&
      !disabled
    )
  }, [value, userRole, disabled])

  const options: { label: string; value: USER_ROLE }[] = useMemo(() => {
    return getSmallThanTargetRole(userRole, false, [
      USER_ROLE.OWNER,
      USER_ROLE.CUSTOM,
    ]).map((role) => {
      const labelI18nKey = userRoleMapI18nString[role]
      return {
        label: t(labelI18nKey),
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
      <div css={valueLabelStyle} className={className}>
        {t(userRoleMapI18nString[value])}
        <DownIcon css={hiddenStyle} />
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
        <div css={optionContentStyle}>
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
                {option.label}
                {option.value === value && <CheckmarkIcon />}
              </div>
            )
          })}
        </div>
      }
    >
      <div css={valueLabelStyle} className={className}>
        {t(userRoleMapI18nString[value])}
        {popupVisible ? <UpIcon /> : <DownIcon />}
      </div>
    </Trigger>
  )
}

UserRoleSelect.displayName = "UserRoleSelect"

export default UserRoleSelect
