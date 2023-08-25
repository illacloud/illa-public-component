import { LayoutAutoChange } from "@illa-public/layout-auto-change"
import { FC } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { UserLayout } from "../layout/desktopLayout"
import { MobileUserLayout } from "../layout/mobileLayout"
import { LoginFields, LoginPageProps } from "./interface"
import { MobileLogin } from "./mobile"
import { PCLogin } from "./pc"

export const LoginPage: FC<LoginPageProps> = (props) => {
  const formProps = useForm<LoginFields>({
    mode: "onSubmit",
    criteriaMode: "firstError",
  })
  return (
    <FormProvider {...formProps}>
      <LayoutAutoChange
        desktopPage={
          <UserLayout>
            <PCLogin {...props} />
          </UserLayout>
        }
        mobilePage={
          <MobileUserLayout>
            <MobileLogin {...props} />
          </MobileUserLayout>
        }
      />
    </FormProvider>
  )
}
