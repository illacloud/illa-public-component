import { LayoutAutoChange } from "@illa-public/layout-auto-change"
import { FC } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { UserLayout } from "../layout"
import { MobileUserLayout } from "../layout/mobileLayout"
import Login from "./components/Login"
import MobileLogin from "./components/MobileLogin"
import { LoginFields, LoginPageProps } from "./interface"

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
          <UserLayout>
            <Login
              onSubmit={onSubmit}
              errorMsg={errorMsg}
              loading={loading}
              oAuthURI={oAuthURI}
            />
          </UserLayout>
        }
        mobilePage={
          <MobileUserLayout>
            <MobileLogin
              onSubmit={onSubmit}
              errorMsg={errorMsg}
              loading={loading}
              oAuthURI={oAuthURI}
            />
          </MobileUserLayout>
        }
      />
    </FormProvider>
  )
}

export default LoginPage
