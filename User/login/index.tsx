import { FC } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { LayoutAutoChange } from "@/illa-public-component/LayoutAutoChange"
import { ILLA_MIXPANEL_PUBLIC_PAGE_NAME } from "@/illa-public-component/MixpanelUtils/interface"
import { MixpanelTrackProvider } from "@/illa-public-component/MixpanelUtils/mixpanelContext"
import { UserLayout } from "@/illa-public-component/User/layout"
import { MobileUserLayout } from "@/illa-public-component/User/layout/mobileLayout"
import Login from "@/illa-public-component/User/login/components/Login"
import MobileLogin from "@/illa-public-component/User/login/components/MobileLogin"
import {
  LoginFields,
  LoginPageProps,
} from "@/illa-public-component/User/login/interface"
import { track } from "@/utils/mixpanelHelper"

const LoginPage: FC<LoginPageProps> = (props) => {
  const { loading, errorMsg, oAuthURI, onSubmit } = props
  const formProps = useForm<LoginFields>({
    mode: "onSubmit",
    criteriaMode: "firstError",
  })

  return (
    <FormProvider {...formProps}>
      <LayoutAutoChange
        desktopPage={
          <MixpanelTrackProvider
            basicTrack={track}
            pageName={ILLA_MIXPANEL_PUBLIC_PAGE_NAME.LOGIN}
          >
            <UserLayout>
              <Login
                onSubmit={onSubmit}
                errorMsg={errorMsg}
                loading={loading}
                oAuthURI={oAuthURI}
              />
            </UserLayout>
          </MixpanelTrackProvider>
        }
        mobilePage={
          <MixpanelTrackProvider
            basicTrack={track}
            pageName={ILLA_MIXPANEL_PUBLIC_PAGE_NAME.LOGIN}
          >
            <MobileUserLayout>
              <MobileLogin
                onSubmit={onSubmit}
                errorMsg={errorMsg}
                loading={loading}
                oAuthURI={oAuthURI}
              />
            </MobileUserLayout>
          </MixpanelTrackProvider>
        }
      />
    </FormProvider>
  )
}

export default LoginPage
