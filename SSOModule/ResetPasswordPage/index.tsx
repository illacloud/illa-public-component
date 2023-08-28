import { LayoutAutoChange } from "@illa-public/layout-auto-change"
import { FC, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useParams, useSearchParams } from "react-router-dom"
import { UserLayout } from "../layout/desktopLayout"
import { MobileUserLayout } from "../layout/mobileLayout"
import { ResetPasswordPageProps, ResetPwdFields } from "./interface"
import { MobileReset } from "./mobile"
import { PCReset } from "./pc"

export const ResetPasswordPage: FC<ResetPasswordPageProps> = (props) => {
  const [showCountDown, setShowCountDown] = useState(false)
  const { email } = useParams()
  const [searchParams] = useSearchParams()

  const formProps = useForm<ResetPwdFields>({
    mode: "onSubmit",
    criteriaMode: "firstError",
    defaultValues: {
      email: email ?? searchParams.get("email") ?? "",
    },
  })
  return (
    <FormProvider {...formProps}>
      <LayoutAutoChange
        desktopPage={
          <UserLayout>
            <PCReset
              {...props}
              lockedEmail={email ?? searchParams.get("email") ?? ""}
              showCountDown={showCountDown}
              onCountDownChange={setShowCountDown}
            />
          </UserLayout>
        }
        mobilePage={
          <MobileUserLayout>
            <MobileReset
              {...props}
              lockedEmail={email ?? searchParams.get("email") ?? ""}
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
