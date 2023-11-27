import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import {
  SUBSCRIBE_PLAN,
  SUBSCRIPTION_CYCLE,
  USER_ROLE,
} from "@illa-public/public-types"
import { TextLink } from "@illa-public/text-link"
import {
  getCurrentId,
  getCurrentTeamInfo,
  getCurrentUserID,
} from "@illa-public/user-data"
import { isMobileByWindowSize } from "@illa-public/utils"
import { FC, useEffect, useMemo, useState } from "react"
import { Trans, useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useWindowSize } from "react-use"
import {
  Button,
  CloseIcon,
  Divider,
  Drawer,
  InputNumber,
  Link,
  Select,
  useMessage,
  zIndex,
} from "@illa-design/react"
import { PURCHASE_TYPE } from "../../interface"
import { cancelSubscribe, modifySubscribe, subscribe } from "../../service"
import { LICENSE_UNIT_PRICE } from "../../service/interface"
import {
  getSuccessRedirectWithParams,
  isSubscribeForDrawer,
  track,
} from "../../utils"
import { LEARN_MORE_LINK } from "./constants"
import { UpgradeDrawerProps } from "./interface"
import {
  appSumoLinkStyle,
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
  textCenterStyle,
  titleStyle,
} from "./style"
import { getSubscriptionStatus } from "./utils"

export const UpgradeDrawer: FC<UpgradeDrawerProps> = (props) => {
  const { defaultConfig, onCancel, visible, afterClose, from } = props
  const { t } = useTranslation()

  const { width } = useWindowSize()
  const isMobile = isMobileByWindowSize(width)
  const message = useMessage()
  const teamID = useSelector(getCurrentId)
  const userID = useSelector(getCurrentUserID)
  const currentTeamInfo = useSelector(getCurrentTeamInfo)!

  const [cycle, setCycle] = useState<SUBSCRIPTION_CYCLE>(
    defaultConfig?.subscribeInfo?.cycle || SUBSCRIPTION_CYCLE.MONTHLY,
  )
  const [quantity, setQuantity] = useState<number>(
    defaultConfig?.subscribeInfo?.quantity || 1,
  )
  const [loading, setLoading] = useState<boolean>(false)

  const unitPrice = useMemo(() => {
    return LICENSE_UNIT_PRICE[cycle ?? SUBSCRIPTION_CYCLE.MONTHLY]
  }, [cycle])

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

  const reportElement = isSubscribeForDrawer(defaultConfig?.subscribeInfo?.plan)
    ? "license_manage"
    : "colla_subscrlicense_subscribeibe"

  const priceLabel = useMemo(() => {
    const translateKey = {
      unitPrice: "$" + unitPrice,
      licenseNum: quantity,
    }
    return cycle === SUBSCRIPTION_CYCLE.YEARLY
      ? t("billing.payment_sidebar.price_cal.next_period_yearly", translateKey)
      : t("billing.payment_sidebar.price_cal.next_period_monthly", translateKey)
  }, [cycle, quantity, t, unitPrice])

  const actionDisabled = useMemo(() => {
    const subscribeInfo = defaultConfig.subscribeInfo
    if (
      !isSubscribeForDrawer(subscribeInfo?.plan) ||
      subscribeInfo?.cancelAtPeriodEnd
    ) {
      return quantity === 0
    }
    return (
      subscribeInfo?.quantity === quantity && subscribeInfo?.cycle === cycle
    )
  }, [cycle, defaultConfig.subscribeInfo, quantity])

  const description = useMemo(() => {
    const { subscribeInfo } = defaultConfig
    const statusLabelKeys = {
      unknown: "",
      un_changed: "",
      subscribed_cancelled: `billing.payment_sidebar.description_title.unsubscribe_license`,
      subscribed_plan_decreased_with_update: `billing.payment_sidebar.description_title.update_plan_remove_license`,
      subscribed_plan_increased_with_update: `billing.payment_sidebar.description_title.update_plan_increase_license`,
      subscribed_quantity_decreased: `billing.payment_sidebar.description_title.remove_license`,
      subscribed_quantity_increased: `billing.payment_sidebar.description_title.add_license`,
      subscribed_yearly: `billing.payment_sidebar.description_title.subscribe_license_yearly`,
      subscribed_monthly: `billing.payment_sidebar.description_title.subscribe_license_monthly`,
    }
    const status = getSubscriptionStatus(defaultConfig, quantity, cycle)
    const changeQuantity = Math.abs(quantity - (subscribeInfo?.quantity ?? 0))
    const changeNum = changeQuantity
    return t(statusLabelKeys[status], { changeNum }) ?? ""
  }, [defaultConfig, quantity, cycle, t])

  const actionButtonText = useMemo(() => {
    const { subscribeInfo } = defaultConfig
    const statusLabelKeys = {
      unknown: "billing.payment_sidebar.button.subscribe",
      un_changed: "billing.payment_sidebar.button.subscribe",
      subscribed_cancelled: "billing.payment_sidebar.button.unsubscribe",
      subscribed_plan_decreased_with_update:
        "billing.payment_sidebar.button.change_plan",
      subscribed_plan_increased_with_update:
        "billing.payment_sidebar.button.change_plan",
      subscribed_quantity_decreased: `billing.payment_sidebar.button.license_remove`,
      subscribed_quantity_increased: `billing.payment_sidebar.button.license_increase`,
      subscribed_yearly: "billing.payment_sidebar.button.subscribe",
      subscribed_monthly: "billing.payment_sidebar.button.subscribe",
    }
    const status = getSubscriptionStatus(defaultConfig, quantity, cycle)
    const changeQuantity = Math.abs(quantity - (subscribeInfo?.quantity ?? 0))
    const changeNum = changeQuantity
    return t(statusLabelKeys[status], { changeNum }) ?? ""
  }, [defaultConfig, quantity, cycle, t])

  const handleNumberChange = (value?: number) => {
    setQuantity(value ?? 0)
  }

  const handleOnClose = () => {
    onCancel?.()
    afterClose?.()
  }

  const handleSubscribe = async () => {
    const { subscribeInfo } = defaultConfig
    if (loading || !teamID) return
    setLoading(true)
    track(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      {
        element: "billing_side_bar_upgrade_or_manage_button",
        parameter1: from,
        parameter2: reportElement,
      },
      USER_ROLE[currentTeamInfo?.myRole],
      currentTeamInfo?.id,
      userID,
    )
    const successRedirect = getSuccessRedirectWithParams({
      returnTo: window.location.href,
      purchaseStatus: "success",
      purchaseType: PURCHASE_TYPE.LICENSE,
      userID,
    })
    const cancelRedirect = window.location.href
    try {
      if (subscribeInfo?.plan && isSubscribeForDrawer(subscribeInfo?.plan)) {
        if (quantity === 0) {
          await cancelSubscribe(teamID, subscribeInfo?.plan)
          message.success({
            content: t("billing.message.unsubscription_suc"),
          })
          defaultConfig?.onSubscribeCallback?.(teamID)
        } else {
          await modifySubscribe(teamID, {
            plan: subscribeInfo?.plan ?? SUBSCRIBE_PLAN.TEAM_LICENSE_PREMIUM,
            quantity,
            cycle,
          })
          message.success({
            content: t("billing.message.successfully_changed"),
          })
          defaultConfig?.onSubscribeCallback?.(teamID)
        }
      } else {
        const res = await subscribe(teamID, {
          plan: SUBSCRIBE_PLAN.TEAM_LICENSE_PREMIUM,
          quantity,
          cycle,
          successRedirect,
          cancelRedirect,
        })
        if (res.data.url) {
          window.open(res.data.url, "_self")
        }
      }
    } catch (error) {
      if (subscribeInfo?.plan && isSubscribeForDrawer(subscribeInfo?.plan)) {
        if (quantity === 0) {
          message.error({
            content: t("billing.message.failed_to_unsubscrib"),
          })
        } else {
          message.error({
            content: t("billing.message.failed_to_change"),
          })
        }
      } else {
        message.error({
          content: t("billing.message.error_subscribe"),
        })
      }
    } finally {
      setLoading(false)
      handleOnClose()
    }
  }

  useEffect(() => {
    visible &&
      from &&
      track(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        {
          element: "billing_side_bar",
          parameter1: from,
          parameter2: reportElement,
        },
        USER_ROLE[currentTeamInfo?.myRole],
        currentTeamInfo?.id,
        userID,
      )
  }, [
    currentTeamInfo?.id,
    currentTeamInfo?.myRole,
    from,
    reportElement,
    userID,
    visible,
  ])

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
      onCancel={handleOnClose}
      afterClose={afterClose}
    >
      <div css={drawerContentStyle}>
        <div>
          <div css={drawerPaddingStyle}>
            <CloseIcon
              containerStyle={closeIconStyle}
              onClick={handleOnClose}
            />
            <div css={titleStyle}>
              {t("billing.payment_sidebar.title.manage_licenses")}
            </div>
            <div css={manageContentStyle}>
              <label>{t("billing.payment_sidebar.plan_label.License")}</label>
              <div css={manageItemStyle}>
                <Select
                  w="auto"
                  colorScheme="techPurple"
                  value={cycle}
                  options={paymentOptions}
                  dropdownProps={{ triggerProps: { zIndex: zIndex.drawer } }}
                  onChange={(value) => {
                    setCycle(value as SUBSCRIPTION_CYCLE)
                  }}
                />

                <InputNumber
                  mode="button"
                  colorScheme="techPurple"
                  value={quantity}
                  onChange={handleNumberChange}
                  min={
                    isSubscribeForDrawer(defaultConfig?.subscribeInfo?.plan)
                      ? 0
                      : 1
                  }
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
                  ${(unitPrice * quantity).toFixed(2)}
                </div>
                <div css={priceTotalLabelStyle}>{priceLabel}</div>
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
          {defaultConfig?.appSumoInvoiceURL ? (
            <div css={textCenterStyle}>
              <Link
                _css={appSumoLinkStyle}
                colorScheme="techPurple"
                href={defaultConfig?.appSumoInvoiceURL}
              >
                {t("billing.appsumo.update")}
              </Link>
            </div>
          ) : null}
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

UpgradeDrawer.displayName = "UpgradeDrawer"
