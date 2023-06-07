import {
  Button,
  Divider,
  Drawer,
  DrawerProps,
  InputNumber,
  Select,
  zIndex,
} from "@illa-design/react"
import { FC } from "react"
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

interface UpgradeDrawerProps extends DrawerProps {}

export const UpgradeDrawer: FC<UpgradeDrawerProps> = (props) => {
  const { onCancel, ...otherProps } = props
  const { t } = useTranslation()

  const { width } = useWindowSize()
  const isMobile = isMobileByWindowSize(width)

  const config = {
    title: t("billing.payment_sidebar.title.manage_licenses"),
    manageLabel: t("billing.payment_sidebar.plan_label.License"),
    inputUnit: t("billing.payment_sidebar.plan_number_input_label.License"),
  }

  const paymentOptions = [
    {
      label: t("billing.payment_sidebar.select_option.Yearly"),
      value: "yearly",
    },
    {
      label: t("billing.payment_sidebar.select_option.Monthly"),
      value: "monthly",
    },
  ]

  const handleSubscribe = () => {
    // purchase({
    //   item: PurchaseItem.DRIVE_TRAFFIC_1GB,
    //   quantity: 1,
    //   successRedirect: window.location.href,
    //   cancelRedirect: window.location.href,
    // }).then((res) => {
    //   console.log(res, "purchase res")
    // })

    subscribe({
      plan: SUBSCRIBE_PLAN.TEAM_LICENSE_PLUS,
      quantity: 1,
      cycle: SUBSCRIPTION_CYCLE.YEARLY,
      successRedirect: window.location.href,
      cancelRedirect: window.location.href,
    }).then((res) => {
      console.log(res, "subscribe res")
    })
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
                  options={paymentOptions}
                  dropdownProps={{ triggerProps: { zIndex: zIndex.drawer } }}
                />
                <InputNumber mode="button" colorScheme="techPurple" />
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
          <div>
            {t("billing.payment_sidebar.description_title.add_license")}
          </div>
          <div css={descriptionStyle}>
            {t("billing.payment_sidebar.description.add_license")}
          </div>
        </div>
      </div>
    </Drawer>
  )
}

UpgradeDrawer.displayName = "UpgradeDrawer"
