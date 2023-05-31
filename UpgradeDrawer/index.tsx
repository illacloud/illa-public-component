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
import { UpgradeSuccessModal } from "@/illa-public-component/UpgradeDrawer/component/UpgradeSuccessModal"
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
} from "@/illa-public-component/UpgradeDrawer/style"
import { pxToRem } from "@/style"
import { isMobileByWindowSize } from "@/utils/screen"

interface ProviderProps {
  children: ReactNode
}

interface Inject extends Omit<ProviderProps, "children"> {
  handleLicenseDrawerVisible: (visible: boolean) => void
  handleSuccessModalVisible: (visible: boolean) => void
}

export const UpgradeDrawerContext = createContext<Inject>({} as Inject)

export const UpgradeDrawerProvider: FC<ProviderProps> = (props) => {
  const { children } = props
  const { t } = useTranslation()
  const { width } = useWindowSize()
  const isMobile = isMobileByWindowSize(width)

  const [drawerVisible, setDrawerVisible] = useState(false)
  const [successModalVisible, setSuccessModalVisible] = useState(false)

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
    setDrawerVisible((prevState) => {
      if (prevState !== visible) {
        return visible
      }
      return prevState
    })
  }

  const handleCloseDrawer = () => {
    setDrawerVisible(false)
  }

  const handleSuccessModalVisible = (visible: boolean) => {
    setSuccessModalVisible((prevState) => {
      if (prevState !== visible) {
        return visible
      }
      return prevState
    })
  }

  const handleCloseSuccessModal = () => {
    setSuccessModalVisible(false)
  }

  const value = {
    ...props,
    handleLicenseDrawerVisible,
    handleSuccessModalVisible,
  }

  return (
    <UpgradeDrawerContext.Provider value={value}>
      {children}
      <Drawer
        css={drawerStyle}
        w={isMobile ? "100%" : "520px"}
        placement={isMobile ? "bottom" : "right"}
        maskStyle={drawerMaskStyle}
        visible={drawerVisible}
        // closable={false}
        footer={false}
        onCancel={handleCloseDrawer}
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
      <UpgradeSuccessModal
        visible={successModalVisible}
        onCancel={handleCloseSuccessModal}
      />
    </UpgradeDrawerContext.Provider>
  )
}

UpgradeDrawerProvider.displayName = "UpgradeDrawerProvider"
