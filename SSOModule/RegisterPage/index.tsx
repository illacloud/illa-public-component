import { LayoutAutoChange } from "@illa-public/layout-auto-change"
import { FC } from "react"
import { UserLayout } from "../layout/desktopLayout"
import { MobileUserLayout } from "../layout/mobileLayout"
// import { LoginPageProps } from "./interface"
import { MobileLogin } from "./mobile"
import { PCLogin } from "./pc"

export const RegisterPage: FC = () => {
  // const { loading, errorMsg, oAuthURI, onSubmit } = props

  return (
    <LayoutAutoChange
      desktopPage={
        <UserLayout>
          <PCLogin />
        </UserLayout>
      }
      mobilePage={
        <MobileUserLayout>
          <MobileLogin />
        </MobileUserLayout>
      }
    />
  )
}
