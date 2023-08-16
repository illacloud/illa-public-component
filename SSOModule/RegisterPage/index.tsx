import { LayoutAutoChange } from "@illa-public/layout-auto-change"
import { FC, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { UserLayout } from "../layout/desktopLayout"
import { MobileUserLayout } from "../layout/mobileLayout"
import { RegisterFields, RegisterPageProps } from "./interface"
import { MobileRegister } from "./mobile"
import { PCRegister } from "./pc"

export const RegisterPage: FC<RegisterPageProps> = (props) => {
  const [showCountDown, setShowCountDown] = useState(false)
  const formProps = useForm<RegisterFields>({
    mode: "onSubmit",
    criteriaMode: "firstError",
    defaultValues: {
      isSubscribed: true,
    },
  })
  return (
    <FormProvider {...formProps}>
      <LayoutAutoChange
        desktopPage={
          <UserLayout>
            <PCRegister
              {...props}
              showCountDown={showCountDown}
              onCountDownChange={setShowCountDown}
            />
          </UserLayout>
        }
        mobilePage={
          <MobileUserLayout>
            <MobileRegister
              {...props}
              showCountDown={showCountDown}
              onCountDownChange={setShowCountDown}
            />
          </MobileUserLayout>
        }
      />
    </FormProvider>
  )
}
