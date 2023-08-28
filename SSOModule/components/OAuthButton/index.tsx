import {
  ILLAMixpanel,
  ILLA_MIXPANEL_EVENT_TYPE,
  ILLA_MIXPANEL_PUBLIC_PAGE_NAME,
} from "@illa-public/mixpanel-utils"
import { FC, useState } from "react"
import { Button } from "@illa-design/react"
import { fetchOAuthURI } from "../../LoginPage/services"
import { openOAuthUrl } from "../../constants/users"
import { OAuthButtonProps } from "./interface"
import { oAuthButtonStyle } from "./style"

export const OAuthButton: FC<OAuthButtonProps> = (props) => {
  const [loading, setLoading] = useState(false)
  const onClickButton = async () => {
    ILLAMixpanel.track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      page: ILLA_MIXPANEL_PUBLIC_PAGE_NAME.LOGIN,
      element: `${props.type}_sign_in`,
    })

    try {
      setLoading(true)
      const response = await fetchOAuthURI(props.type, props.landing)
      openOAuthUrl(response.data.uri)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(true)
    }
  }

  return (
    <Button
      leftIcon={props.icon}
      css={props.isMobile ? oAuthButtonStyle : undefined}
      colorScheme="grayBlue"
      variant="outline"
      shape={props.isMobile ? "round" : "square"}
      size="large"
      fullWidth={props.isMobile ? false : true}
      onClick={onClickButton}
      loading={loading}
    >
      {props.children}
    </Button>
  )
}
