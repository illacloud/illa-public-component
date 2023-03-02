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

const ResetPasswordPage: FC<ResetPasswordPageProps> = (props) => {
  const { loading, errorMsg, onSubmit } = props

  const formProps = useForm<ResetPwdFields>({
    mode: "onSubmit",
    criteriaMode: "firstError",
  })

  const [showCountDown, setShowCountDown] = useState(false)

  return (
    <FormProvider {...formProps}>
      <LayoutAutoChange
        desktopPage={
          <UserLayout>
            <Reset
              onSubmit={onSubmit}
              loading={loading}
              errorMsg={errorMsg}
              showCountDown={showCountDown}
              onCountDownChange={setShowCountDown}
            />
          </UserLayout>
        }
        mobilePage={
          <MobileUserLayout>
            <MobileReset
              onSubmit={onSubmit}
              loading={loading}
              errorMsg={errorMsg}
              showCountDown={showCountDown}
              onCountDownChange={setShowCountDown}
            />
          </MobileUserLayout>
        }
      />
    </FormProvider>
  )
}

export default ResetPasswordPage
