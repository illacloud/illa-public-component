import {
  Button,
  Divider,
  Drawer,
  InputNumber,
  Select,
  zIndex,
} from "@illa-design/react"
import { FC, ReactNode, createContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { useWindowSize } from "react-use"
import {
  descriptionStyle,
  drawerContentStyle,
  manageContentStyle,
  manageItemStyle,
  subTotalStyle,
  titleStyle,
} from "@/illa-public-component/UpgradeDrawer/style"
import { pxToRem } from "@/style"
import { isMobileByWindowSize } from "@/utils/screen"

interface ProviderProps {
  children: ReactNode
}

interface Inject extends Omit<ProviderProps, "children"> {
  handleLicenseDrawerVisible: (visible: boolean) => void
}

export const UpgradeDrawerContext = createContext<Inject>({} as Inject)

export const UpgradeDrawerProvider: FC<ProviderProps> = (props) => {
  const { children } = props
  const { t } = useTranslation()
  const { width } = useWindowSize()
  const isMobile = isMobileByWindowSize(width)

  const [visible, setVisible] = useState<boolean>(false)

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

  const handleLicenseDrawerVisible = (visible: boolean) => {
    setVisible((prevState) => {
      if (prevState !== visible) {
        return visible
      }
      return prevState
    })
  }

  const handleCloseDrawer = () => {
    setVisible(false)
  }

  const value = {
    ...props,
    handleLicenseDrawerVisible,
  }

  return (
    <UpgradeDrawerContext.Provider value={value}>
      <Drawer
        w={isMobile ? "100%" : "520px"}
        placement={isMobile ? "bottom" : "right"}
        visible={visible}
        // closable={false}
        footer={false}
        onCancel={handleCloseDrawer}
      >
        <div css={drawerContentStyle}>
          <div>
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
            <Divider />
            <div css={subTotalStyle}>
              <div>{t("billing.payment_sidebar.price_label.total")}</div>
              <div></div>
            </div>
            <Button
              w="100%"
              size="large"
              colorScheme="blackAlpha"
              mt={isMobile ? pxToRem(32) : "16px"}
            >
              Subscribe
            </Button>
          </div>
          <div>
            <div>
              {t("billing.payment_sidebar.description_title.add_license")}
            </div>
            <div css={descriptionStyle}>
              {t("billing.payment_sidebar.description.add_license")}
            </div>
          </div>
        </div>
      </Drawer>
      {children}
    </UpgradeDrawerContext.Provider>
  )
}

UpgradeDrawerProvider.displayName = "UpgradeDrawerProvider"
