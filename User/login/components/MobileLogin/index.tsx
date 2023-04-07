import { FC } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { Button, Input, Password } from "@illa-design/react"
import { EMAIL_FORMAT } from "@/constants/regExp"
import { TextLink } from "@/illa-public-component/TextLink"
import { ReactComponent as GithubIcon } from "@/illa-public-component/User/assets/github.svg"
import { ReactComponent as GoogleIcon } from "@/illa-public-component/User/assets/google.svg"
import { openOAuthUrl } from "@/illa-public-component/User/constants/users"
import { MobileLoginProps } from "@/illa-public-component/User/login/components/MobileLogin/interface"
import {
  descriptionStyle,
  errorMsgStyle,
  forgotPwdStyle,
  formItemStyle,
  formStyle,
  formTitleStyle,
  headerStyle,
  mobileInputStyle,
  oAuthButtonGroupStyle,
  oAuthButtonStyle,
  oAuthIconStyle,
  singleSubmitButtonStyle,
  submitButtonStyle,
} from "@/illa-public-component/User/login/components/MobileLogin/style"
import { LoginFields } from "@/illa-public-component/User/login/interface"
import { isCloudVersion } from "@/utils/typeHelper"

const MobileLogin: FC<MobileLoginProps> = (props) => {
  const { onSubmit, errorMsg, loading, oAuthURI } = props
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { handleSubmit, control, formState } = useFormContext<LoginFields>()

  return (
    <form css={formStyle} onSubmit={handleSubmit(onSubmit)}>
      <header css={headerStyle}>
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
      <div css={formItemStyle}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              _css={mobileInputStyle}
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
                : t("page.user.sign_up.error_message.email.invalid_pattern")
            },
          }}
        />
        {(formState?.errors.email || errorMsg.email) && (
          <div css={errorMsgStyle}>
            {formState?.errors.email?.message || errorMsg.email}
          </div>
        )}
      </div>
      <div css={formItemStyle}>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Password
              {...field}
              _css={mobileInputStyle}
              size="large"
              error={!!formState?.errors.password || !!errorMsg.password}
              variant="fill"
              placeholder={t("page.user.password.placeholder")}
              colorScheme="techPurple"
            />
          )}
          rules={{
            required: t("page.user.sign_in.error_message.password.require"),
            minLength: {
              value: 6,
              message: t("page.user.sign_in.error_message.password.min_length"),
            },
          }}
        />
        {(formState?.errors.password || errorMsg.password) && (
          <div css={errorMsgStyle}>
            {formState?.errors.password?.message || errorMsg.password}
          </div>
        )}
      </div>
      <div css={forgotPwdStyle}>
        <TextLink
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
      <Button
        _css={isCloudVersion ? submitButtonStyle : singleSubmitButtonStyle}
        colorScheme="techPurple"
        size="large"
        loading={loading}
        fullWidth
      >
        {t("page.user.sign_in.actions.login")}
      </Button>
      {isCloudVersion && (
        <div css={oAuthButtonGroupStyle}>
          <Button
            style={{ display: "none" }}
            _css={oAuthButtonStyle}
            leftIcon={<GoogleIcon css={oAuthIconStyle} />}
            colorScheme="grayBlue"
            variant="outline"
            shape="round"
            type="button"
            onClick={() => {
              oAuthURI?.google && openOAuthUrl(oAuthURI.google)
            }}
          ></Button>
          <Button
            _css={oAuthButtonStyle}
            leftIcon={<GithubIcon css={oAuthIconStyle} />}
            colorScheme="grayBlue"
            variant="outline"
            shape="round"
            type="button"
            onClick={() => {
              oAuthURI?.github && openOAuthUrl(oAuthURI.github)
            }}
          ></Button>
        </div>
      )}
    </form>
  )
}

MobileLogin.displayName = "MobileLogin"

export default MobileLogin
