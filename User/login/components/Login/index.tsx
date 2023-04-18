import { FC, useEffect, useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import {
  Button,
  Divider,
  Input,
  Password,
  WarningCircleIcon,
} from "@illa-design/react"
import { EMAIL_FORMAT } from "@/constants/regExp"
import {
  ILLA_MIXPANEL_EVENT_TYPE,
  ILLA_MIXPANEL_PUBLIC_PAGE_NAME,
} from "@/illa-public-component/MixpanelUtils/interface"
import { TextLink } from "@/illa-public-component/TextLink"
import { ReactComponent as GithubIcon } from "@/illa-public-component/User/assets/github.svg"
import { ReactComponent as GoogleIcon } from "@/illa-public-component/User/assets/google.svg"
import { openOAuthUrl } from "@/illa-public-component/User/constants/users"
import { LoginProps } from "@/illa-public-component/User/login/components/Login/interface"
import {
  descriptionStyle,
  errorIconStyle,
  errorMsgStyle,
  forgotPwdContainerStyle,
  forgotPwdStyle,
  formLabelStyle,
  formTitleStyle,
  gridFormFieldStyle,
  gridFormStyle,
  gridItemStyle,
  gridValidStyle,
  oAuthButtonGroupStyle,
  oAuthIconStyle,
} from "@/illa-public-component/User/login/components/Login/style"
import { LoginFields } from "@/illa-public-component/User/login/interface"
import { validateReport } from "@/illa-public-component/User/utils/reportUtils"
import { track } from "@/utils/mixpanelHelper"
import { isCloudVersion } from "@/utils/typeHelper"

const Login: FC<LoginProps> = (props) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { onSubmit, errorMsg, loading, oAuthURI } = props
  const { handleSubmit, control, formState, getValues, trigger } =
    useFormContext<LoginFields>()
  const {errors} = formState
  const [asyncValid, setAsyncValid] = useState<{ isValid: boolean } | undefined>()

  const validReport = async () => {
    track(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      ILLA_MIXPANEL_PUBLIC_PAGE_NAME.LOGIN,
      {
        element: "sign_in",
      },
    )
    let isValid = await trigger()
    if(isValid) {
      validateReport(
        ILLA_MIXPANEL_PUBLIC_PAGE_NAME.LOGIN,
        "sign_in",
        true,
        {},
      )
    }
    setAsyncValid({ isValid })
  }

  useEffect(() => {
    if (asyncValid && !asyncValid.isValid) {
      validateReport(
        ILLA_MIXPANEL_PUBLIC_PAGE_NAME.LOGIN,
        "sign_in",
        false,
        errors,
      )
    }
  }, [asyncValid, errors])

  return (
    <div>
      <form css={gridFormStyle} onSubmit={handleSubmit(onSubmit)}>
        <header css={gridItemStyle}>
          <div css={formTitleStyle}>{t("page.user.sign_in.title")}</div>
          <div css={descriptionStyle}>
            <Trans
              i18nKey="page.user.sign_in.description.register"
              t={t}
              components={[
                <TextLink
                  key="text-link"
                  onClick={() => {
                    track(
                      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                      ILLA_MIXPANEL_PUBLIC_PAGE_NAME.LOGIN,
                      { element: "create_account" },
                    )
                    navigate({ pathname: "/register", search: location.search })
                  }}
                />,
              ]}
            />
          </div>
        </header>
        <section css={gridFormFieldStyle}>
          <section css={gridItemStyle}>
            <label css={formLabelStyle}>
              {t("page.user.sign_in.fields.email")}
            </label>
            <div css={gridValidStyle}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    size="large"
                    error={!!formState?.errors.email || !!errorMsg.email}
                    variant="fill"
                    placeholder={t("page.user.sign_in.placeholder.email")}
                    colorScheme="techPurple"
                    onFocus={() => {
                      track(ILLA_MIXPANEL_EVENT_TYPE.FOCUS, ILLA_MIXPANEL_PUBLIC_PAGE_NAME.LOGIN, {element: 'email_input', parameter3: getValues().email?.length ?? 0})
                    }}
                    onBlur={() => {
                      track(ILLA_MIXPANEL_EVENT_TYPE.BLUR, ILLA_MIXPANEL_PUBLIC_PAGE_NAME.LOGIN, {element: 'email_input', parameter3: getValues().email?.length ?? 0})
                    }}
                  />
                )}
                rules={{
                  required: t("page.user.sign_in.error_message.email.require"),
                  validate: (value: string) => {
                    if (isCloudVersion && !EMAIL_FORMAT.test(value)) {
                      return t(
                        "page.user.sign_up.error_message.email.invalid_pattern",
                      )
                    }
                    return value === "root"
                      ? true
                      : EMAIL_FORMAT.test(value)
                      ? true
                      : t(
                          "page.user.sign_up.error_message.email.invalid_pattern",
                        )
                  },
                }}
              />
              {(formState?.errors.email || errorMsg.email) && (
                <div css={errorMsgStyle}>
                  <WarningCircleIcon css={errorIconStyle} />
                  {formState?.errors.email?.message || errorMsg.email}
                </div>
              )}
            </div>
          </section>
          <section css={gridItemStyle}>
            <div css={forgotPwdContainerStyle}>
              <label css={formLabelStyle}>
                {t("page.user.sign_in.fields.password")}
              </label>
              <TextLink
                css={forgotPwdStyle}
                onClick={() => {
                  track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, ILLA_MIXPANEL_PUBLIC_PAGE_NAME.LOGIN, {element: 'forget_password'})
                  navigate({
                    pathname: "/forgotPassword",
                    search: location.search,
                  })
                }}
              >
                {t("page.user.sign_in.description.forgot_password")}
              </TextLink>
            </div>
            <div css={gridValidStyle}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Password
                    {...field}
                    size="large"
                    error={!!formState?.errors.password || !!errorMsg.password}
                    variant="fill"
                    placeholder={t("page.user.password.placeholder")}
                    colorScheme="techPurple"
                    onFocus={() => {
                      track(ILLA_MIXPANEL_EVENT_TYPE.FOCUS, ILLA_MIXPANEL_PUBLIC_PAGE_NAME.LOGIN, {element: 'password_input', parameter3: getValues().password?.length ?? 0})
                    }}
                    onBlur={() => {
                      track(ILLA_MIXPANEL_EVENT_TYPE.BLUR, ILLA_MIXPANEL_PUBLIC_PAGE_NAME.LOGIN, {element: 'password_input', parameter3: getValues().password?.length ?? 0})
                    }}
                  />
                )}
                rules={{
                  required: t(
                    "page.user.sign_in.error_message.password.require",
                  ),
                  minLength: {
                    value: 6,
                    message: t(
                      "page.user.sign_in.error_message.password.min_length",
                    ),
                  },
                }}
              />
              {(formState?.errors.password || errorMsg.password) && (
                <div css={errorMsgStyle}>
                  <WarningCircleIcon css={errorIconStyle} />
                  {formState?.errors.password?.message || errorMsg.password}
                </div>
              )}
            </div>
          </section>
        </section>
        <Button
          colorScheme="techPurple"
          size="large"
          loading={loading}
          fullWidth
          onClick={validReport}
        >
          {t("page.user.sign_in.actions.login")}
        </Button>
      </form>
      {isCloudVersion && (
        <div>
          <Divider
            mg="24px 0"
            colorScheme="grayBlue"
            text={t("page.user.sign_in.option.or")}
          />
          <div css={oAuthButtonGroupStyle}>
            <Button
              style={{ display: "none" }}
              leftIcon={<GoogleIcon css={oAuthIconStyle} />}
              colorScheme="grayBlue"
              variant="outline"
              size="large"
              fullWidth
              onClick={() => {
                oAuthURI?.google && openOAuthUrl(oAuthURI.google)
              }}
            >
              {t("page.user.sign_in.option.google")}
            </Button>
            <Button
              leftIcon={<GithubIcon css={oAuthIconStyle} />}
              colorScheme="grayBlue"
              variant="outline"
              size="large"
              fullWidth
              onClick={() => {
                track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, ILLA_MIXPANEL_PUBLIC_PAGE_NAME.LOGIN, {element: 'github_sign_in'})
                oAuthURI?.github && openOAuthUrl(oAuthURI.github)
              }}
            >
              {t("page.user.sign_in.option.github")}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

Login.displayName = "Login"

export default Login
