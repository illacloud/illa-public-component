import { useMessage } from "@illa-design/react"
import { FC, useState } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { ERROR_FLAG } from "@/api/errorFlag"
import { LayoutAutoChange } from "@/illa-public-component/LayoutAutoChange"
import { UserLayout } from "@/illa-public-component/User/layout"
import { MobileUserLayout } from "@/illa-public-component/User/layout/mobileLayout"
import Login from "@/illa-public-component/User/login/components/Login"
import MobileLogin from "@/illa-public-component/User/login/components/MobileLogin"
import { LoginFields } from "@/illa-public-component/User/login/interface"
import { teamActions } from "@/store/team/teamSlice"
import { TeamInfo } from "@/store/team/teamState"
import { userInfoActions } from "@/store/userInfo/userInfoSlice"
import { CurrentUser } from "@/store/userInfo/userInfoState"
import { setAuthToken } from "@/utils/auth"
import { CloudApi } from "@/utils/http-request"
import { openBuilderAppLink } from "@/utils/navigate"

export type LoginErrorMsg = Record<keyof LoginFields, string>

const LoginPage: FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const formProps = useForm<LoginFields>({
    mode: "onSubmit",
    criteriaMode: "firstError",
  })

  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<LoginErrorMsg>({
    email: "",
    password: "",
  })
  const message = useMessage()
  const [searchParams] = useSearchParams()
  const inviteToken = searchParams.get("inviteToken")
  const email = searchParams.get("email")

  const joinTeamByInviteToken = async (inviteToken?: string) => {
    const appID = searchParams.get("appID")
    const identifier = searchParams.get("teamIdentifier")

    await CloudApi.asyncRequest<TeamInfo>({
      method: "PUT",
      url: `/join/${inviteToken}`,
    })
      .then((response) => {
        const currentTeam = response.data
        if (currentTeam?.identifier) {
          dispatch(teamActions.addTeamItemReducer(currentTeam))
          dispatch(teamActions.updateCurrentIdReducer(currentTeam.id))
          if (appID) {
            openBuilderAppLink(currentTeam.identifier, appID)
          }
          navigate(`/workspace/${currentTeam.identifier}`)
        }
      })
      .catch(({ res, request }) => {
        if (res) {
          if (
            res.data?.errorFlag ===
            ERROR_FLAG.ERROR_FLAG_USER_ALREADY_JOINED_TEAM
          ) {
            // if user already joined team, params have appID and identifier, redirect to app
            appID && identifier && openBuilderAppLink(identifier, appID)
            return
          }
          message.error({
            content: t("homepage.message.join_failed_other_error"),
          })
        } else if (res == undefined && request != undefined) {
          message.warning({
            content: t("network_error"),
          })
        }
      })
  }

  const onSubmit: SubmitHandler<LoginFields> = (data) => {
    CloudApi.request<CurrentUser>(
      { method: "POST", url: "/auth/signin", data },
      async (res) => {
        const token = res.headers["illa-token"]
        if (!token) return
        setAuthToken(token)
        dispatch(
          userInfoActions.updateUserReducer({
            ...res.data,
            language: res.data.language || "en-US",
          }),
        )
        message.success({
          content: t("page.user.sign_in.tips.success"),
        })
        if (inviteToken) {
          if (email && email !== res.data.email) {
            message.error({
              content: t("homepage.message.join_failed"),
            })
          } else {
            await joinTeamByInviteToken(inviteToken)
          }
        }
        const form = location.state?.form
        const path = form
          ? form?.includes("/login")
            ? "/workspace"
            : form
          : "/workspace"
        navigate(path, {
          replace: true,
        })
      },
      (res) => {
        switch (res?.data?.errorFlag) {
          case ERROR_FLAG.ERROR_FLAG_PASSWORD_INVALIED:
          case ERROR_FLAG.ERROR_FLAG_SIGN_IN_FAILED:
            message.error({
              content: t("page.user.sign_in.tips.fail_account"),
            })
            break
          default:
            message.error({
              content: t("page.user.sign_in.tips.fail"),
            })
            break
        }
        switch (res.data.errorMessage) {
          case "no such user":
            setErrorMsg({
              ...errorMsg,
              email: t("page.user.sign_in.error_message.email.registered"),
            })
            break
          case "invalid password":
            setErrorMsg({
              ...errorMsg,
              password: t("page.user.sign_in.error_message.password.incorrect"),
            })
            break
          default:
        }
      },
      () => {
        message.warning({
          content: t("network_error"),
        })
      },
      (loading) => {
        setLoading(loading)
      },
    )
  }

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
