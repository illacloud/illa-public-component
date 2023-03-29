import {
  Button,
  Divider,
  Input,
  Password,
  WarningCircleIcon,
} from "@illa-design/react"
import { FC } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { EMAIL_FORMAT } from "@/constants/regExp"
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
import { toForgotPassword } from "@/utils/navigate"
import { isCloudVersion } from "@/utils/typeHelper"

const Login: FC<LoginProps> = (props) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { onSubmit, errorMsg, loading, oAuthURI } = props
  const { handleSubmit, control, formState } = useFormContext<LoginFields>()

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
                oAuthURI.google && openOAuthUrl(oAuthURI.google)
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
                oAuthURI.github && openOAuthUrl(oAuthURI.github)
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
