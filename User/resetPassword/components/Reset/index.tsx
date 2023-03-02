import {
  Button,
  Input,
  Password,
  PreviousIcon,
  WarningCircleIcon,
} from "@illa-design/react"
import { FC } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { EMAIL_FORMAT } from "@/constants/regExp"
import {
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
import { ResetProps } from "@/illa-public-component/User/resetPassword/components/Reset/interface"
import {
  hotspotWrapperStyle,
  prevIconStyle,
  resetPasswordSubtitleWrapperStyle,
} from "@/illa-public-component/User/resetPassword/components/Reset/style"
import { ResetPwdFields } from "@/illa-public-component/User/resetPassword/interface"

const Reset: FC<ResetProps> = (props) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const {
    onSubmit,
    errorMsg,
    loading,
    showCountDown,
    onCountDownChange,
    sendEmail,
  } = props
  const { handleSubmit, control, formState } = useFormContext<ResetPwdFields>()
  const backToLogin = () => {
    navigate("/login")
  }

  return (
    <form
      css={gridFormStyle}
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <header css={formTitleStyle}>
        {t("page.user.forgot_password.title")}
        <div css={resetPasswordSubtitleWrapperStyle} onClick={backToLogin}>
          <span css={hotspotWrapperStyle}>
            <PreviousIcon css={prevIconStyle} />
            {t("page.user.forgot_password.subtitle")}
          </span>
        </div>
      </header>
      <section css={gridFormFieldStyle}>
        <section css={gridItemStyle}>
          <label css={formLabelStyle}>
            {t("page.user.forgot_password.fields.email")}
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
                  placeholder={t("page.user.forgot_password.placeholder.email")}
                />
              )}
              rules={{
                required: t(
                  "page.user.forgot_password.error_message.email.require",
                ),
                pattern: {
                  value: EMAIL_FORMAT,
                  message: t(
                    "page.user.forgot_password.error_message.email.invalid_pattern",
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
        <section css={gridItemStyle}>
          <label css={formLabelStyle}>
            {t("page.user.forgot_password.fields.verification_code")}
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
                  error={
                    !!formState?.errors.verificationCode ||
                    !!errorMsg.verificationCode
                  }
                  variant="fill"
                  autoComplete="off"
                  suffix={
                    <EmailCode
                      usage="forgetpwd"
                      showCountDown={showCountDown}
                      onCountDownChange={onCountDownChange}
                      sendEmail={sendEmail}
                    />
                  }
                  placeholder={t(
                    "page.user.forgot_password.placeholder.verification_code",
                  )}
                />
              )}
              rules={{
                required: t(
                  "page.user.forgot_password.error_message.verification_code.require",
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
        <section css={gridItemStyle}>
          <label css={formLabelStyle}>
            {t("page.user.forgot_password.fields.newPassword")}
          </label>
          <div css={gridValidStyle}>
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <Password
                  {...field}
                  autoComplete="new-password"
                  colorScheme="techPurple"
                  size="large"
                  error={!!formState?.errors.newPassword}
                  variant="fill"
                  placeholder={t("page.user.password.placeholder")}
                />
              )}
              rules={{
                required: t(
                  "page.user.forgot_password.error_message.newPassword.require",
                ),
                minLength: {
                  value: 6,
                  message: t(
                    "page.user.sign_in.error_message.password.min_length",
                  ),
                },
              }}
            />
            {formState?.errors.newPassword && (
              <div css={errorMsgStyle}>
                <WarningCircleIcon css={errorIconStyle} />
                {formState?.errors.newPassword.message}
              </div>
            )}
          </div>
        </section>
      </section>
      <Button colorScheme="techPurple" size="large" loading={loading} fullWidth>
        {t("page.user.forgot_password.actions.reset")}
      </Button>
    </form>
  )
}

Reset.displayName = "Reset"

export default Reset
