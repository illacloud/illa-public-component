import { UpgradeIcon } from "@illa-public/icon"
import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { SUBSCRIPTION_CYCLE, USER_ROLE } from "@illa-public/public-types"
import { getCurrentTeamInfo, getCurrentUserID } from "@illa-public/user-data"
import { FC, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Button, CloseIcon, Modal } from "@illa-design/react"
import { useCollarDrawer } from "../../hook"
import { CollarModalType } from "../../interface"
import { COLLAR_UNIT_PRICE } from "../../service/interface"
import { isSubscribeForDrawer, track } from "../../utils"
import CollarBg from "./assets/collarBg.svg?react"
import { CollarModalProps } from "./interface"
import {
  decorateStyle,
  descriptionStyle,
  footerStyle,
  headerStyle,
  modalCloseIconStyle,
  modalMaskStyle,
  modalStyle,
  priceContentStyle,
  priceStyle,
  titleStyle,
  upgradeButtonStyle,
} from "./style"
import { getUnitDetailByPrice } from "./utils"

export const CollarModal: FC<CollarModalProps> = (props) => {
  const {
    visible,
    from,
    modalType = CollarModalType.TOKEN,
    onCancel,
    afterClose,
  } = props
  const { t } = useTranslation()
  const collarDrawer = useCollarDrawer()

  const { title, desc } = getUnitDetailByPrice(modalType)
  const teamInfo = useSelector(getCurrentTeamInfo)
  const userID = useSelector(getCurrentUserID)
  const isSubscribe = isSubscribeForDrawer(teamInfo?.colla?.plan)

  const reportElement = isSubscribe
    ? "colla_increase_modal"
    : "colla_subscribe_modal"

  const handleClick = () => {
    onCancel?.()
    collarDrawer(from)
  }

  useEffect(() => {
    teamInfo?.myRole &&
      visible &&
      from &&
      track?.(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        { element: reportElement, parameter1: from },
        USER_ROLE[teamInfo?.myRole],
        teamInfo?.id,
        userID,
      )
  }, [from, reportElement, teamInfo?.id, teamInfo?.myRole, userID, visible])

  return (
    <Modal
      z={2000}
      visible={visible}
      _css={modalStyle}
      withoutPadding
      maskClosable={false}
      footer={false}
      onCancel={onCancel}
      maskStyle={modalMaskStyle}
      afterClose={afterClose}
    >
      <div css={modalCloseIconStyle} onClick={onCancel}>
        <CloseIcon size="12px" />
      </div>
      <CollarBg css={decorateStyle} />
      <div css={headerStyle}>
        <div css={titleStyle}>{t(title)}</div>
        <div css={descriptionStyle}>
          {desc.map((detail) => (
            <p key={detail}>{t(detail)}</p>
          ))}
        </div>
      </div>
      <div>
        <div css={footerStyle}>
          <div>
            <div css={priceStyle}>
              {`$${COLLAR_UNIT_PRICE[SUBSCRIPTION_CYCLE.MONTHLY]}`}
            </div>
            <div css={priceContentStyle}>
              {t("billing.modal.colla_insufficient_modal.cycle")}
            </div>
          </div>
          <Button
            css={upgradeButtonStyle}
            leftIcon={<UpgradeIcon />}
            colorScheme="techPurple"
            onClick={handleClick}
          >
            {t("billing.modal.colla_insufficient_modal.button")}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

CollarModal.displayName = "CollarModal"
