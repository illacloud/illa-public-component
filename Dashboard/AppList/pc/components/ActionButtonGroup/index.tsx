import { getAuthToken } from "@illa-public/utils"
import { FC, MouseEvent, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { Button, Space } from "@illa-design/react"
import { ActionButtonGroupProps } from "./interface"
import { appActionButtonStyle } from "./style"

export const ActionButtonGroup: FC<ActionButtonGroupProps> = (props) => {
  const { t } = useTranslation()
  const { appID, appDeployed, canEditApp } = props
  const { teamIdentifier } = useParams()

  const toDeployedApp = useMemo(
    () => (e: MouseEvent) => {
      e.stopPropagation()
      // ILLAMixpanel.track(
      //   ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      //   ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
      //   {
      //     element: "app_launch",
      //     parameter5: appID,
      //   },
      // )
      window.open(
        `${
          import.meta.env.ILLA_BUILDER_URL
        }/${teamIdentifier}/deploy/app/${appID}?token=${getAuthToken()}`,
        "_blank",
      )
    },
    [appID, teamIdentifier],
  )

  const toEditApp = useMemo(
    () => (e: MouseEvent) => {
      e.stopPropagation()
      // ILLAMixpanel.track(
      //   ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      //   ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
      //   {
      //     element: "app_edit",
      //     parameter5: appID,
      //   },
      // )
      window.open(
        `${
          import.meta.env.ILLA_BUILDER_URL
        }/${teamIdentifier}/app/${appID}?token=${getAuthToken()}`,
        "_blank",
      )
    },
    [appID, teamIdentifier],
  )

  return (
    <Space
      direction="horizontal"
      w="100%"
      justifyContent="end"
      size="8px"
      alignItems="center"
    >
      {appDeployed ? (
        <Button
          css={appActionButtonStyle}
          className="dashboardAppEditButton"
          variant="text"
          colorScheme="grayBlue"
          onClick={toDeployedApp}
        >
          {t("dashboard.common.launch")}
        </Button>
      ) : null}
      {canEditApp ? (
        <Button
          css={appActionButtonStyle}
          className="dashboardAppLaunchButton"
          variant="text"
          colorScheme="grayBlue"
          onClick={toEditApp}
        >
          {t("dashboard.common.edit")}
        </Button>
      ) : null}
    </Space>
  )
}
