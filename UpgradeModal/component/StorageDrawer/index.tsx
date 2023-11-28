import { SUBSCRIBE_PLAN, SUBSCRIPTION_CYCLE } from "@illa-public/public-types"
import { TextLink } from "@illa-public/text-link"
import { getCurrentId } from "@illa-public/user-data"
import { isMobileByWindowSize } from "@illa-public/utils"
import { FC, useMemo, useState } from "react"
import { Trans, useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useWindowSize } from "react-use"
import {
  Button,
  CloseIcon,
  Divider,
  Drawer,
  InputNumber,
  useMessage,
} from "@illa-design/react"
import { CollarModalType } from "../../interface"
import { modifySubscribe, subscribe } from "../../service"
import { UNIT_COLLA_BY_STORAGE } from "../../service/interface"
import { handleCollaPurchaseError, isSubscribeForDrawer } from "../../utils"
import { LEARN_MORE_LINK } from "./constants"
import { StorageDrawerProps } from "./interface"
import {
  closeIconStyle,
  descriptionStyle,
  drawerContentStyle,
  drawerMaskStyle,
  drawerPaddingStyle,
  drawerStyle,
  manageContentStyle,
  manageItemStyle,
  priceStyle,
  priceTotalLabelStyle,
  priceTotalStyle,
  subTotalStyle,
  titleStyle,
} from "./style"
import { geButtonText, getDescText } from "./utils"

export const StorageDrawer: FC<StorageDrawerProps> = (props) => {
  const { visible, config, onCancel, afterClose } = props
  const { driveVolume, successCallBack } = config
  const { volumeConverted = 0, balanceConverted = 0 } = driveVolume || {}

  const { t } = useTranslation()

  const { width } = useWindowSize()
  const isMobile = isMobileByWindowSize(width)
  const message = useMessage()
  const teamID = useSelector(getCurrentId)
  const used = Math.ceil(volumeConverted - balanceConverted)

  const [quantity, setQuantity] = useState<number>(driveVolume?.quantity || 1)
  const [loading, setLoading] = useState<boolean>(false)

  const actionDisabled = useMemo(() => {
    return driveVolume?.quantity === quantity
  }, [driveVolume, quantity])

  const description = useMemo(() => {
    const desc = getDescText(quantity, driveVolume)
    const changeQuantity = Math.abs(quantity - (driveVolume?.quantity ?? 0))
    const changeNum = changeQuantity
    return t(desc, { changeNum }) ?? ""
  }, [driveVolume, quantity, t])

  const actionButtonText = useMemo(() => {
    const btnText = geButtonText(quantity, driveVolume)
    const changeQuantity = Math.abs(quantity - (driveVolume?.quantity ?? 0))
    const changeNum = changeQuantity
    return t(btnText, { changeNum }) ?? ""
  }, [driveVolume, quantity, t])

  const handleSubscribe = async () => {
    if (loading || !teamID) return
    setLoading(true)
    try {
      if (driveVolume?.plan && isSubscribeForDrawer(driveVolume?.plan)) {
        await modifySubscribe(teamID, {
          plan: driveVolume?.plan ?? SUBSCRIBE_PLAN.DRIVE_VOLUME_PAID,
          quantity,
          cycle: SUBSCRIPTION_CYCLE.MONTHLY,
        })
        message.success({
          content: t("billing.message.successfully_changed"),
        })
      } else {
        await subscribe(teamID, {
          plan: SUBSCRIBE_PLAN.DRIVE_VOLUME_PAID,
          quantity,
          cycle: SUBSCRIPTION_CYCLE.MONTHLY,
        })
        message.success({
          content: t("billing.message.successfully_changed"),
        })
      }
      successCallBack?.(teamID)
    } catch (error) {
      const res = handleCollaPurchaseError(
        error,
        CollarModalType.STORAGE,
        "billing_storage_balance_manage",
      )
      if (res) return
      if (driveVolume?.plan && isSubscribeForDrawer(driveVolume?.plan)) {
        message.error({
          content: t("billing.message.failed_to_change"),
        })
      } else {
        message.error({
          content: t("billing.message.error_subscribe"),
        })
      }
    } finally {
      setLoading(false)
      onCancel?.()
    }
  }

  const handleNumberChange = (value?: number) => {
    if (quantity < used) return
    setQuantity(value ?? 0)
  }

  return (
    <Drawer
      z={2100}
      visible={visible}
      css={drawerStyle}
      w={isMobile ? "100%" : "520px"}
      placement={isMobile ? "bottom" : "right"}
      maskStyle={drawerMaskStyle}
      closable={false}
      footer={false}
      autoFocus={false}
      onCancel={onCancel}
      afterClose={afterClose}
    >
      <div css={drawerContentStyle}>
        <div>
          <div css={drawerPaddingStyle}>
            <CloseIcon containerStyle={closeIconStyle} onClick={onCancel} />
            <div css={titleStyle}>
              {t("billing.payment_sidebar.title.manage_storage")}
            </div>
            <div css={manageContentStyle}>
              <label>{t("billing.payment_sidebar.plan_label.Storage")}</label>
              <div css={manageItemStyle}>
                <InputNumber
                  mode="button"
                  colorScheme="techPurple"
                  value={quantity}
                  onChange={handleNumberChange}
                  min={used || 1}
                />
              </div>
            </div>
          </div>
          <Divider />
          <div css={drawerPaddingStyle}>
            <div css={subTotalStyle}>
              <div>{t("billing.payment_sidebar.price_label.total")}</div>
              <div css={priceStyle}>
                <div css={priceTotalStyle}>
                  {UNIT_COLLA_BY_STORAGE * quantity}K Colla
                </div>
                <div css={priceTotalLabelStyle}>
                  {t(
                    "billing.payment_sidebar.price_cal.next_period_monthly_remove_storage",
                    {
                      unitPrice: `${UNIT_COLLA_BY_STORAGE}K Colla`,
                      storageNum: quantity,
                    },
                  )}
                </div>
              </div>
            </div>
            <Button
              w="100%"
              size="large"
              colorScheme="blackAlpha"
              disabled={actionDisabled}
              loading={loading}
              mt={"16px"}
              onClick={handleSubscribe}
            >
              {actionButtonText}
            </Button>
          </div>
        </div>
        <div css={drawerPaddingStyle}>
          <div css={descriptionStyle}>
            <Trans
              i18nKey={description}
              t={t}
              components={[
                <TextLink
                  key="text-link"
                  onClick={() => {
                    window.open(LEARN_MORE_LINK, "_blank")
                  }}
                />,
              ]}
            />
          </div>
        </div>
      </div>
    </Drawer>
  )
}

StorageDrawer.displayName = "StorageDrawer"
