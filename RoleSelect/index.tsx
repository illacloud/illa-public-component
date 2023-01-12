import { css } from "@emotion/react"
import { ExpandIcon, Trigger, zIndex } from "@illa-design/react"
import { FC, HTMLAttributes, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { ReactComponent as CheckmarkIcon } from "@/assets/icon/success.svg"
import {
  getSmallThanTargetRole,
  isSmallThanTargetRole,
  userRoleMapI18nString,
} from "@/illa-public-component/UserRoleUtils"
import { USER_ROLE } from "@/store/userInfo/userInfoState"
import {
  optionContentStyle,
  optionItemStyle,
  pointerStyle,
  valueLabelStyle,
} from "./style"

interface RoleSelectProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: USER_ROLE
  userRole: USER_ROLE
  notHasSelf?: boolean
  onChange?: (value: USER_ROLE) => void
}

const RoleSelect: FC<RoleSelectProps> = (props) => {
  const { className, value, userRole, notHasSelf, onChange } = props
  const { t } = useTranslation()
  const [popupVisible, setPopupVisible] = useState<boolean>()

  const canChange = useMemo(() => {
    return isSmallThanTargetRole(userRole, value)
  }, [value, userRole])

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
  }, [userRole, notHasSelf])

  const onVisibleChange = (visible: boolean) => {
    if (popupVisible !== visible) {
      setPopupVisible(visible)
    }
  }

  if (!canChange) {
    return (
      <div css={valueLabelStyle} className={className}>
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
      <div css={[valueLabelStyle, pointerStyle]} className={className}>
        {t(userRoleMapI18nString[value])}
        {popupVisible ? (
          <ExpandIcon css={css({ transform: "rotate(180deg)" })} />
        ) : (
          <ExpandIcon />
        )}
      </div>
    </Trigger>
  )
}

RoleSelect.displayName = "RoleSelect"

export default RoleSelect
