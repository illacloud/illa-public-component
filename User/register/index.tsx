import { FC, useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import { LayoutAutoChange } from "@/illa-public-component/LayoutAutoChange"
import { UserLayout } from "@/illa-public-component/User/layout"
import { MobileUserLayout } from "@/illa-public-component/User/layout/mobileLayout"
import MobileRegister from "@/illa-public-component/User/register/components/MobileRegister"
import Register from "@/illa-public-component/User/register/components/Register"
import {
  RegisterFields,
  RegisterPageProps,
} from "@/illa-public-component/User/register/interface"

const RegisterPage: FC<RegisterPageProps> = (props) => {
  const { loading, errorMsg, onSubmit, sendEmail } = props
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
          <UserLayout>
            <Register
              onSubmit={onSubmit}
              lockedEmail={email}
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
            <MobileRegister
              onSubmit={onSubmit}
              lockedEmail={email}
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

export default RegisterPage
