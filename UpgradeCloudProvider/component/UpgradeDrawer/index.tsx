import {
  Button,
  Divider,
  Drawer,
  DrawerProps,
  InputNumber,
  Select,
  zIndex,
} from "@illa-design/react"
import { FC, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { useWindowSize } from "react-use"
import { PurchaseItem, purchase, subscribe } from "@/api/billing"
import {
  SUBSCRIBE_PLAN,
  SUBSCRIPTION_CYCLE,
} from "@/illa-public-component/MemberList/interface"
import { pxToRem } from "@/style"
import { isMobileByWindowSize } from "@/utils/screen"
import {
  descriptionStyle,
  drawerContentStyle,
  drawerMaskStyle,
  drawerPaddingStyle,
  drawerStyle,
  manageContentStyle,
  manageItemStyle,
  subTotalStyle,
  titleStyle,
} from "./style"

export interface DrawerDefaultConfig {
  type: "license" | "drive" | "traffic"
  subscribeInfo?: {
    plan: SUBSCRIBE_PLAN
    cycle: SUBSCRIPTION_CYCLE
    quantity: number
  }
  purchaseInfo?: {
    item: PurchaseItem
    quantity: number
  }
}

interface UpgradeDrawerProps extends DrawerProps {
  defaultConfig?: DrawerDefaultConfig
}

export const UpgradeDrawer: FC<UpgradeDrawerProps> = (props) => {
  const { defaultConfig, onCancel, ...otherProps } = props
  const { t } = useTranslation()

  const { width } = useWindowSize()
  const isMobile = isMobileByWindowSize(width)

  const [cycle, setCycle] = useState<SUBSCRIPTION_CYCLE>(
    SUBSCRIPTION_CYCLE.MONTHLY,
  )
  const [quantity, setQuantity] = useState<number>(1)

  const config = {
    title: t("billing.payment_sidebar.title.manage_licenses"),
    manageLabel: t("billing.payment_sidebar.plan_label.License"),
    inputUnit: t("billing.payment_sidebar.plan_number_input_label.License"),
  }

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

  const quantityFormatter = useCallback(
    (value: number | string) => {
      switch (defaultConfig?.type) {
        case "license":
          return `${value} ${t(
            "billing.payment_sidebar.plan_number_input_label.License",
          )}`
        case "drive":
          return `${value} ${t(
            "billing.payment_sidebar.plan_number_input_label.Storage_traffic",
          )}`
        case "traffic":
          return `${value} ${t(
            "billing.payment_sidebar.plan_number_input_label.Storage_traffic",
          )}`
        default:
          return `${value}`
      }
    },
    [defaultConfig?.type, t],
  )

  const handleSubscribe = () => {
    if (defaultConfig?.type === "traffic") {
      purchase({
        item:
          defaultConfig?.purchaseInfo?.item ?? PurchaseItem.DRIVE_TRAFFIC_1GB,
        quantity,
        successRedirect: window.location.href,
        cancelRedirect: window.location.href,
      }).then((res) => {
        console.log(res, "purchase res")
      })
    } else {
      subscribe({
        plan:
          defaultConfig?.subscribeInfo?.plan ??
          SUBSCRIBE_PLAN.TEAM_LICENSE_PLUS,
        quantity,
        cycle,
        successRedirect: window.location.href,
        cancelRedirect: window.location.href,
      }).then((res) => {
        console.log(res, "subscribe res")
      })
    }
  }

  return (
    <Drawer
      css={drawerStyle}
      w={isMobile ? "100%" : "520px"}
      placement={isMobile ? "bottom" : "right"}
      maskStyle={drawerMaskStyle}
      // closable={false}
      footer={false}
      onCancel={onCancel}
      {...otherProps}
    >
      <div css={drawerContentStyle}>
        <div>
          <div css={drawerPaddingStyle}>
            <div css={titleStyle}>{config.title}</div>
            <div css={manageContentStyle}>
              <label>{config.manageLabel}</label>
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
                  onChange={setQuantity}
                  formatter={quantityFormatter}
                />
              </div>
            </div>
          </div>
          <Divider />
          <div css={drawerPaddingStyle}>
            <div css={subTotalStyle}>
              <div>{t("billing.payment_sidebar.price_label.total")}</div>
              <div></div>
            </div>
            <Button
              w="100%"
              size="large"
              colorScheme="blackAlpha"
              mt={isMobile ? pxToRem(32) : "16px"}
              onClick={handleSubscribe}
            >
              Subscribe
            </Button>
          </div>
        </div>
        <div css={drawerPaddingStyle}>
          <div css={descriptionStyle}>
            {t("billing.payment_sidebar.description.add_license")}
          </div>
        </div>
      </div>
    </Drawer>
  )
}

UpgradeDrawer.displayName = "UpgradeDrawer"
