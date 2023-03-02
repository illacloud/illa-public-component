import { FC } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { LayoutAutoChange } from "@/illa-public-component/LayoutAutoChange"
import { UserLayout } from "@/illa-public-component/User/layout"
import { MobileUserLayout } from "@/illa-public-component/User/layout/mobileLayout"
import Login from "@/illa-public-component/User/login/components/Login"
import MobileLogin from "@/illa-public-component/User/login/components/MobileLogin"
import { LoginFields } from "@/illa-public-component/User/login/interface"

export type LoginErrorMsg = Record<keyof LoginFields, string>

interface LoginPageProps {
  loading: boolean
  errorMsg: LoginErrorMsg
  onSubmit: SubmitHandler<LoginFields>
}

const LoginPage: FC<LoginPageProps> = (props) => {
  const { loading, errorMsg, onSubmit } = props
  const formProps = useForm<LoginFields>({
    mode: "onSubmit",
    criteriaMode: "firstError",
  })

  return (
    <FormProvider {...formProps}>
      <LayoutAutoChange
        desktopPage={
          <UserLayout>
            <Login onSubmit={onSubmit} errorMsg={errorMsg} loading={loading} />
          </UserLayout>
        }
        mobilePage={
          <MobileUserLayout>
            <MobileLogin
              onSubmit={onSubmit}
              errorMsg={errorMsg}
              loading={loading}
            />
          </MobileUserLayout>
        }
      />
    </FormProvider>
  )
}

export default LoginPage
