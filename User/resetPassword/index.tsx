import { LayoutAutoChange } from "@illa-public/layout-auto-change"
import { FC, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { UserLayout } from "../layout/desktopLayout"
import { MobileUserLayout } from "../layout/mobileLayout"
import MobileReset from "./components/MobileReset"
import Reset from "./components/Reset"
import { ResetPasswordPageProps, ResetPwdFields } from "./interface"

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
        }
        mobilePage={
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
        }
      />
    </FormProvider>
  )
}

export default ResetPasswordPage
