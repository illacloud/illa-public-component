import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { ResourceContent } from "@illa-public/public-types"
import { getCurrentId } from "@illa-public/user-data"
import { FC, useCallback, useContext, useState } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Button } from "@illa-design/react"
import { onActionConfigElementTest } from "../../../../formUtils"
import { TestConnectButtonProps } from "./interface"
import { formatTestConnectValues } from "./utils"

export const TestConnectButton: FC<TestConnectButtonProps> = (props) => {
  const { resourceType } = props
  const [isTestLoading, setIsTestLoading] = useState(false)
  const { formState, getValues } = useFormContext()
  const { track } = useContext(MixpanelTrackContext)
  const { t } = useTranslation()
  const currentTeamID = useSelector(getCurrentId)!

  const handleConnectionTest = useCallback(async () => {
    track?.(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "resource_configure_test",
      parameter5: resourceType,
    })

    const data = getValues()
    const requestBody = {
      resourceID: data.resourceID,
      resourceName: data.resourceName,
      resourceType,
      content: formatTestConnectValues(data, resourceType) as ResourceContent,
    }
    onActionConfigElementTest(currentTeamID, requestBody, setIsTestLoading)
  }, [track, resourceType, getValues, currentTeamID])

  return (
    <Button
      colorScheme="gray"
      loading={isTestLoading}
      disabled={!formState.isValid}
      type="button"
      onClick={handleConnectionTest}
    >
      {t("editor.action.form.btn.test_connection")}
    </Button>
  )
}
