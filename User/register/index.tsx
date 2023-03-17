import { FC, useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useNavigate, useSearchParams } from "react-router-dom"
import { exchangeToken } from "@/api/auth"
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
  const { loading, errorMsg, onSubmit, sendEmail, oAuthURI } = props
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const email = searchParams.get("email")
  const state = searchParams.get("state")
  const code = searchParams.get("code")

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

  useEffect(() => {
    if (code) {
      exchangeToken("github", code, state).then(() => {
        navigate("/")
      })
    }
  }, [state, code])

  return (
    <FormProvider {...formProps}>
      <LayoutAutoChange
        desktopPage={
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
        }
        mobilePage={
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
        }
      />
    </FormProvider>
  )
}

export default RegisterPage
