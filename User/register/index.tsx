import { FC, useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import { LayoutAutoChange } from "@/illa-public-component/LayoutAutoChange"
import { ILLA_MIXPANEL_PUBLIC_PAGE_NAME } from "@/illa-public-component/MixpanelUtils/interface"
import { MixpanelTrackProvider } from "@/illa-public-component/MixpanelUtils/mixpanelContext"
import { UserLayout } from "@/illa-public-component/User/layout"
import { MobileUserLayout } from "@/illa-public-component/User/layout/mobileLayout"
import MobileRegister from "@/illa-public-component/User/register/components/MobileRegister"
import Register from "@/illa-public-component/User/register/components/Register"
import {
  RegisterFields,
  RegisterPageProps,
} from "@/illa-public-component/User/register/interface"
import { track } from "@/utils/mixpanelHelper"
import { validateReport } from "@/illa-public-component/User/utils/reportUtils"

const RegisterPage: FC<RegisterPageProps> = (props) => {
  const { loading, errorMsg, onSubmit, sendEmail, oAuthURI } = props
  const [searchParams] = useSearchParams()
  const email = searchParams.get("email")

  const formProps = useForm<RegisterFields>({
    mode: "onSubmit",
    criteriaMode: "firstError",
    defaultValues: {
      isSubscribed: true,
    },
  })

  const [showCountDown, setShowCountDown] = useState(false)

  useEffect(() => {
    if (email) {
      formProps.setValue("email", email)
    }
  }, [email])


  return (
    <FormProvider {...formProps}>
      <LayoutAutoChange
        desktopPage={
          <MixpanelTrackProvider
            basicTrack={track}
            pageName={ILLA_MIXPANEL_PUBLIC_PAGE_NAME.SIGNUP}
          >
            <UserLayout>
              <Register
                onSubmit={onSubmit}
                oAuthURI={oAuthURI}
                lockedEmail={email}
                loading={loading}
                errorMsg={errorMsg}
                showCountDown={showCountDown}
                onCountDownChange={setShowCountDown}
                sendEmail={sendEmail}
              />
            </UserLayout>
          </MixpanelTrackProvider>
        }
        mobilePage={
          <MixpanelTrackProvider
            basicTrack={track}
            pageName={ILLA_MIXPANEL_PUBLIC_PAGE_NAME.SIGNUP}
          >
            <MobileUserLayout>
              <MobileRegister
                onSubmit={onSubmit}
                oAuthURI={oAuthURI}
                lockedEmail={email}
                loading={loading}
                errorMsg={errorMsg}
                showCountDown={showCountDown}
                onCountDownChange={setShowCountDown}
                sendEmail={sendEmail}
              />
            </MobileUserLayout>
          </MixpanelTrackProvider>
        }
      />
    </FormProvider>
  )
}

export default RegisterPage
