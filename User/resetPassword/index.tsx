import { FC, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { LayoutAutoChange } from "@/illa-public-component/LayoutAutoChange"
import { UserLayout } from "@/illa-public-component/User/layout"
import { MobileUserLayout } from "@/illa-public-component/User/layout/mobileLayout"
import MobileReset from "@/illa-public-component/User/resetPassword/components/MobileReset"
import Reset from "@/illa-public-component/User/resetPassword/components/Reset"
import {
  ResetPasswordPageProps,
  ResetPwdFields,
} from "@/illa-public-component/User/resetPassword/interface"
import { MixpanelTrackProvider } from "@/illa-public-component/MixpanelUtils/mixpanelContext"
import { track } from "@/utils/mixpanelHelper"
import { ILLA_MIXPANEL_PUBLIC_PAGE_NAME } from "@/illa-public-component/MixpanelUtils/interface"

const ResetPasswordPage: FC<ResetPasswordPageProps> = (props) => {
  const { loading, errorMsg, onSubmit, sendEmail } = props

  const formProps = useForm<ResetPwdFields>({
    mode: "onSubmit",
    criteriaMode: "firstError",
  })

  const [showCountDown, setShowCountDown] = useState(false)

  return (
    <FormProvider {...formProps}>
      <LayoutAutoChange
        desktopPage={
          <MixpanelTrackProvider
          basicTrack={track}
          pageName={ILLA_MIXPANEL_PUBLIC_PAGE_NAME.FORGET_PASSWORD}
        >
          <UserLayout>
            <Reset
              onSubmit={onSubmit}
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
          pageName={ILLA_MIXPANEL_PUBLIC_PAGE_NAME.FORGET_PASSWORD}
        >
          <MobileUserLayout>
            <MobileReset
              onSubmit={onSubmit}
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

export default ResetPasswordPage
