import { UpgradeIcon } from "@illa-public/icon"
import { SUBSCRIPTION_CYCLE } from "@illa-public/user-data"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Button, CloseIcon, Modal } from "@illa-design/react"
import { useCollarDrawer } from "../../hook"
import { CollarModalType } from "../../interface"
import { COLLAR_UNIT_PRICE } from "../../service/interface"
import { ReactComponent as CollarBg } from "./assets/collarBg.svg"
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
    modalType = CollarModalType.TOKEN,
    onCancel,
    afterClose,
  } = props
  const { t } = useTranslation()
  const collarDrawer = useCollarDrawer()

  const { title, desc } = getUnitDetailByPrice(modalType)

  const handleClick = () => {
    onCancel?.()
    collarDrawer()
  }

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
