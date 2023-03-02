import { FC } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { Button, Input, Password, WarningCircleIcon } from "@illa-design/react"
import { EMAIL_FORMAT } from "@/constants/regExp"
import { TextLink } from "@/illa-public-component/TextLink"
import {
  descriptionStyle,
  errorIconStyle,
  errorMsgStyle,
  formLabelStyle,
  formTitleStyle,
  gridFormFieldStyle,
  gridFormStyle,
  gridItemStyle,
  gridValidStyle,
} from "@/illa-public-component/User/login/components/Login/style"
import { EmailCode } from "@/illa-public-component/User/register/components/EmailCode"
import { RegisterProps } from "@/illa-public-component/User/register/components/Register/interface"
import { RegisterFields } from "@/illa-public-component/User/register/interface"
import { isCloudVersion } from "@/utils/typeHelper"

const Register: FC<RegisterProps> = (props) => {
  const { t } = useTranslation()
  const {
    lockedEmail,
    onSubmit,
    errorMsg,
    loading,
    showCountDown,
    onCountDownChange,
    sendEmail,
  } = props
  const navigate = useNavigate()
  const { handleSubmit, control, formState } = useFormContext<RegisterFields>()

  return (
    <form
      css={gridFormStyle}
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <header css={gridItemStyle}>
        <div css={formTitleStyle}>{t("page.user.sign_up.title")}</div>
        <div css={descriptionStyle}>
          <Trans
            i18nKey="page.user.sign_up.description.login"
            t={t}
            components={[
              <TextLink
                key="go-to-login"
                onClick={() => {
                  navigate({ pathname: "/login", search: location.search })
                }}
              />,
            ]}
          />
        </div>
      </header>
      <section css={gridFormFieldStyle}>
        <section css={gridItemStyle}>
          <label css={formLabelStyle}>
            {t("page.user.sign_up.fields.username")}
          </label>
          <div css={gridValidStyle}>
            <Controller
              name="nickname"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  colorScheme="techPurple"
                  size="large"
                  error={!!formState?.errors.nickname}
                  variant="fill"
                  placeholder={t("page.user.sign_up.placeholder.username")}
                />
              )}
              rules={{
                required: t("page.user.sign_up.error_message.username.require"),
                maxLength: {
                  value: 15,
                  message: t("page.user.sign_up.error_message.username.length"),
                },
                minLength: {
                  value: 3,
                  message: t("page.user.sign_up.error_message.username.length"),
                },
              }}
            />
            {formState?.errors.nickname && (
              <div css={errorMsgStyle}>
                <WarningCircleIcon css={errorIconStyle} />
                {formState?.errors.nickname.message}
              </div>
            )}
          </div>
        </section>
        <section css={gridItemStyle}>
          <label css={formLabelStyle}>
            {t("page.user.sign_up.fields.email")}
          </label>
          <div css={gridValidStyle}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  colorScheme="techPurple"
                  size="large"
                  error={!!formState?.errors.email || !!errorMsg.email}
                  variant="fill"
                  placeholder={t("page.user.sign_up.placeholder.email")}
                  {...(lockedEmail && { value: lockedEmail, disabled: true })}
                />
              )}
              rules={{
                required: t("page.user.sign_up.error_message.email.require"),
                pattern: {
                  value: EMAIL_FORMAT,
                  message: t(
                    "page.user.sign_up.error_message.email.invalid_pattern",
                  ),
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

        {isCloudVersion && (
          <section css={gridItemStyle}>
            <label css={formLabelStyle}>
              {t("page.user.sign_up.fields.verification_code")}
            </label>
            <div css={gridValidStyle}>
              <Controller
                name="verificationCode"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    colorScheme="techPurple"
                    maxLength={6}
                    size="large"
                    type="number"
                    autoComplete="off"
                    error={
                      !!formState?.errors.verificationCode ||
                      !!errorMsg.verificationCode
                    }
                    variant="fill"
                    suffix={
                      <EmailCode
                        usage="signup"
                        showCountDown={showCountDown}
                        onCountDownChange={onCountDownChange}
                        sendEmail={sendEmail}
                      />
                    }
                    placeholder={t(
                      "page.user.sign_up.placeholder.verification_code",
                    )}
                  />
                )}
                rules={{
                  required: t(
                    "page.user.sign_up.error_message.verification_code.require",
                  ),
                }}
              />
              {(formState?.errors.verificationCode ||
                errorMsg.verificationCode) && (
                <div css={errorMsgStyle}>
                  <WarningCircleIcon css={errorIconStyle} />
                  {formState?.errors.verificationCode?.message ||
                    errorMsg.verificationCode}
                </div>
              )}
            </div>
          </section>
        )}

        <section css={gridItemStyle}>
          <label css={formLabelStyle}>
            {t("page.user.sign_up.fields.password")}
          </label>
          <div css={gridValidStyle}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Password
                  {...field}
                  autoComplete="new-password"
                  colorScheme="techPurple"
                  size="large"
                  error={!!formState?.errors.password}
                  variant="fill"
                  placeholder={t("page.user.password.placeholder")}
                />
              )}
              rules={{
                required: t("page.user.sign_up.error_message.password.require"),
                minLength: {
                  value: 6,
                  message: t(
                    "page.user.sign_in.error_message.password.min_length",
                  ),
                },
                validate: (value) => {
                  return value.includes(" ")
                    ? t("setting.password.error_password_has_empty")
                    : true
                },
              }}
            />
            {formState?.errors.password && (
              <div css={errorMsgStyle}>
                <WarningCircleIcon css={errorIconStyle} />
                {formState?.errors.password.message}
              </div>
            )}
          </div>
        </section>
      </section>
      <Button colorScheme="techPurple" size="large" loading={loading} fullWidth>
        {t("page.user.sign_up.actions.create")}
      </Button>
    </form>
  )
}

Register.displayName = "Register"

export default Register
