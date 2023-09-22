/* eslint-disable unused-imports/no-unused-imports */
import { TextLink } from "@illa-public/text-link"
import {
  CollarInfo,
  SUBSCRIBE_PLAN,
  SUBSCRIPTION_CYCLE,
  getCurrentTeamInfo,
  getCurrentUserID,
} from "@illa-public/user-data"
import {
  isMobileByWindowSize,
  isSubscribeForDrawer,
  sendTagEvent,
} from "@illa-public/utils"
import { FC, useRef, useState } from "react"
import { Trans, useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useWindowSize } from "react-use"
import {
  Button,
  CloseIcon,
  Divider,
  Drawer,
  InputNumber,
  Select,
  SelectValue,
  useMessage,
  zIndex,
} from "@illa-design/react"
import { COLLAR_TYPE } from "../../interface"
import { cancelSubscribe, modifySubscribe, subscribe } from "../../service"
import {
  COLLAR_UNIT_BY_CYCLE,
  COLLAR_UNIT_PRICE,
} from "../../service/interface"
import { getSuccessRedirectWithParams } from "../../utils"
import { Calculator } from "../Calculator"
import {
  COLLAR_BUTTON_TEXT,
  COLLAR_MORE_TEXT,
  LEARN_MORE_LINK,
} from "./constants"
import { CollarDrawerProps } from "./interface"
import {
  accountsStyle,
  closeIconContainerStyle,
  closeIconStyle,
  descriptionStyle,
  drawerContentStyle,
  drawerMaskStyle,
  drawerStyle,
  manageContentStyle,
  manageHeaderStyle,
  manageItemStyle,
  managePriceStyle,
  priceStyle,
  priceTotalLabelStyle,
  priceTotalStyle,
  subTotalStyle,
  titleContainerStyle,
  titleStyle,
} from "./style"
import { getBtnText, getCurrentCollarType, getDescription } from "./utils"

export const CollarDrawer: FC<CollarDrawerProps> = (props) => {
  const { onCancel, visible, afterClose, onSuccessCallback } = props
  const { t } = useTranslation()

  const { width } = useWindowSize()
  const isMobile = isMobileByWindowSize(width)

  const [loading, setLoading] = useState<boolean>(false)
  const message = useMessage()

  const paymentOptions = [
    {
      label: t("billing.payment_sidebar.select_option.Yearly"),
      value: SUBSCRIPTION_CYCLE.YEARLY,
    },
    {
      label: t("billing.payment_sidebar.select_option.Monthly"),
      value: SUBSCRIPTION_CYCLE.MONTHLY,
    },
  ]

  const currentTeamInfo = useSelector(getCurrentTeamInfo)
  const userID = useSelector(getCurrentUserID)

  const isSubScribe = isSubscribeForDrawer(currentTeamInfo?.colla?.plan)

  // 未订阅的话是不是0
  const teamQuantity = isSubScribe ? currentTeamInfo?.colla?.quantity ?? 0 : 0
  const [currentQuantity, setCurrentQuantity] = useState<number>(
    teamQuantity + 1,
  )
  const [cycle, setCycle] = useState<SUBSCRIPTION_CYCLE>(
    isSubScribe
      ? currentTeamInfo?.colla?.cycle ?? SUBSCRIPTION_CYCLE.MONTHLY
      : SUBSCRIPTION_CYCLE.MONTHLY,
  )

  const currentCollarType = useRef<COLLAR_TYPE>(
    getCurrentCollarType(teamQuantity, currentQuantity),
  )

  const disabledSubscribe =
    (currentQuantity === teamQuantity &&
      cycle === currentTeamInfo?.colla?.cycle) ||
    (currentQuantity === 0 && cycle !== currentTeamInfo?.colla?.cycle)

  const changeNum = Math.abs(teamQuantity - currentQuantity)

  const [description, setDescription] = useState(
    getDescription(currentCollarType.current),
  )

  const [btnText, setBtnText] = useState(getBtnText(currentCollarType.current))

  const unitPrice = COLLAR_UNIT_PRICE[cycle ?? SUBSCRIPTION_CYCLE.MONTHLY]
  const unitCollaByCycle =
    COLLAR_UNIT_BY_CYCLE[cycle ?? SUBSCRIPTION_CYCLE.MONTHLY]

  const handleNumChange = (value?: number) => {
    setCurrentQuantity(value ?? 1)
    if (currentTeamInfo?.colla?.cycle !== cycle && isSubScribe) {
      setBtnText(COLLAR_BUTTON_TEXT.MONTH_YEAR_UPDATE)
      setDescription(COLLAR_MORE_TEXT.MONTH_YEAR_UPDATE)
    } else {
      currentCollarType.current = getCurrentCollarType(teamQuantity, value ?? 1)
      setBtnText(getBtnText(currentCollarType.current))
      setDescription(getDescription(currentCollarType.current))
    }
  }

  const handleOnSelectChange = (value?: SelectValue) => {
    setCycle(value as SUBSCRIPTION_CYCLE)
    if (currentTeamInfo?.colla?.cycle !== value && isSubScribe) {
      setBtnText(COLLAR_BUTTON_TEXT.MONTH_YEAR_UPDATE)
      setDescription(COLLAR_MORE_TEXT.MONTH_YEAR_UPDATE)
    } else {
      setBtnText(getBtnText(currentCollarType.current))
      setDescription(getDescription(currentCollarType.current))
    }
  }

  const handleCancel = () => {
    setCurrentQuantity(teamQuantity + 1)
    onCancel?.()
  }

  const handleSubscribe = async () => {
    if (loading || !currentTeamInfo || !currentTeamInfo?.id) return
    setLoading(true)

    const successRedirect = getSuccessRedirectWithParams({
      returnTo: window.location.href,
      purchaseStatus: "success",
      userID,
    })
    const cancelRedirect = window.location.href
    try {
      switch (currentCollarType.current) {
        case COLLAR_TYPE.CANCEL_SUBSCRIPTION:
          await cancelSubscribe(
            currentTeamInfo.id,
            currentTeamInfo.colla?.plan || SUBSCRIBE_PLAN.COLLA_SUBSCRIBE_PAID,
          )
          onSuccessCallback?.(currentTeamInfo.id, currentCollarType.current)
          message.success({
            content: t("billing.message.unsubscription_suc"),
          })
          break
        case COLLAR_TYPE.ADD_COLLAR:
        case COLLAR_TYPE.REMOVE_COLLAR:
          await modifySubscribe(currentTeamInfo.id, {
            plan:
              currentTeamInfo.colla?.plan ??
              SUBSCRIBE_PLAN.COLLA_SUBSCRIBE_PAID,
            quantity: currentQuantity,
            cycle,
          })
          onSuccessCallback?.(currentTeamInfo.id, currentCollarType.current)
          message.success({
            content: t("billing.message.successfully_changed"),
          })
          break
        default:
        case COLLAR_TYPE.SUBSCRIBE:
          const res = await subscribe(currentTeamInfo.id, {
            plan: SUBSCRIBE_PLAN.COLLA_SUBSCRIBE_PAID,
            quantity: currentQuantity,
            cycle,
            successRedirect,
            cancelRedirect,
          })
          if (res.data.url) {
            window.open(res.data.url, "_self")
          }
      }
    } catch (error) {
      switch (currentCollarType.current) {
        case COLLAR_TYPE.CANCEL_SUBSCRIPTION:
          message.error({
            content: t("billing.message.failed_to_unsubscrib"),
          })
          break
        case COLLAR_TYPE.ADD_COLLAR:
        case COLLAR_TYPE.REMOVE_COLLAR:
          message.error({
            content: t("billing.message.failed_to_change"),
          })
          break
        case COLLAR_TYPE.SUBSCRIBE:
        default:
          message.error({
            content: t("billing.message.error_subscribe"),
          })
      }
    } finally {
      setLoading(false)
      onCancel?.()
    }
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
      onCancel={handleCancel}
      afterClose={afterClose}
    >
      <div css={drawerContentStyle}>
        <div>
          <div css={titleContainerStyle}>
            <div css={titleStyle}>
              {t("billing.payment_sidebar.title.colla")}
            </div>
            <div css={closeIconContainerStyle} onClick={onCancel}>
              <CloseIcon containerStyle={closeIconStyle} />
            </div>
          </div>
          <div css={manageContentStyle}>
            <div css={manageHeaderStyle}>
              <div>{t("billing.payment_sidebar.plan_label.colla")}</div>
              <div css={managePriceStyle}>
                <span>
                  {t("billing.payment_sidebar.price.colla_monthly", {
                    price: `$${COLLAR_UNIT_PRICE[SUBSCRIPTION_CYCLE.MONTHLY]}`,
                  })}
                </span>
                <span>
                  {t("billing.payment_sidebar.price.colla_yearly", {
                    price: `$${COLLAR_UNIT_PRICE[SUBSCRIPTION_CYCLE.YEARLY]}`,
                  })}
                </span>
              </div>
            </div>
            <div css={manageItemStyle}>
              <Select
                w="auto"
                colorScheme="techPurple"
                value={cycle}
                options={paymentOptions}
                dropdownProps={{ triggerProps: { zIndex: zIndex.drawer } }}
                onChange={handleOnSelectChange}
              />
              <InputNumber
                mode="button"
                colorScheme="techPurple"
                value={currentQuantity}
                onChange={handleNumChange}
                min={isSubScribe ? 0 : 1}
              />
            </div>
          </div>
          <Divider />
          <div css={accountsStyle}>
            <div css={subTotalStyle}>
              <div>{t("billing.payment_sidebar.price_label.total")}</div>
              <div css={priceStyle}>
                <div css={priceTotalStyle}>
                  ${(unitPrice * currentQuantity).toFixed(2)}
                </div>
                <div css={priceTotalLabelStyle}>
                  {t("billing.payment_sidebar.price_cal.colla", {
                    unitPrice: `$${unitPrice}`,
                    purchaseNum: currentQuantity,
                  })}
                </div>
              </div>
            </div>
            <Button
              w="100%"
              size="large"
              colorScheme="blackAlpha"
              disabled={disabledSubscribe}
              loading={loading}
              onClick={handleSubscribe}
            >
              {t(btnText, { changeNum: `${changeNum * unitCollaByCycle}k` })}
            </Button>
          </div>
          <Calculator
            changeNum={changeNum}
            unitCollaByCycle={unitCollaByCycle}
          />
        </div>
        <div css={descriptionStyle}>
          <Trans
            i18nKey={t(description, {
              changeNum: `${changeNum * unitCollaByCycle}k`,
            })}
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
    </Drawer>
  )
}

CollarDrawer.displayName = "CollarDrawer"
