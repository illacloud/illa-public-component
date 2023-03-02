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
import { errorIconStyle } from "@/illa-public-component/User/login/components/Login/style"
import {
  errorMsgStyle,
  formItemStyle,
  formStyle,
  formTitleStyle,
  headerStyle,
  mobileInputStyle,
  submitButtonStyle,
} from "@/illa-public-component/User/login/components/MobileLogin/style"
import { EmailCode } from "@/illa-public-component/User/register/components/EmailCode"
import { MobileResetProps } from "@/illa-public-component/User/resetPassword/components/MobileReset/interface"
import {
  hotspotWrapperStyle,
  prevIconStyle,
  resetPasswordSubtitleWrapperStyle,
} from "@/illa-public-component/User/resetPassword/components/MobileReset/style"
import { ResetPwdFields } from "@/illa-public-component/User/resetPassword/interface"

const MobileReset: FC<MobileResetProps> = (props) => {
  const {
    onSubmit,
    errorMsg,
    loading,
    showCountDown,
    onCountDownChange,
    sendEmail,
  } = props
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { handleSubmit, control, formState } = useFormContext<ResetPwdFields>()
  const backToLogin = () => {
    navigate("/login")
  }

  return (
    <form css={formStyle} onSubmit={handleSubmit(onSubmit)}>
      <header css={headerStyle}>
        <span css={formTitleStyle}>{t("page.user.forgot_password.title")}</span>
        <div css={resetPasswordSubtitleWrapperStyle} onClick={backToLogin}>
          <span css={hotspotWrapperStyle}>
            <PreviousIcon css={prevIconStyle} />
            {t("page.user.forgot_password.subtitle")}
          </span>
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
              colorScheme="techPurple"
              size="large"
              error={!!formState?.errors.email || !!errorMsg.email}
              variant="fill"
              placeholder={t("page.user.forgot_password.fields.email")}
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
            {formState?.errors.email?.message || errorMsg.email}
          </div>
        )}
      </div>
      <div css={formItemStyle}>
        <Controller
          name="verificationCode"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              _css={mobileInputStyle}
              colorScheme="techPurple"
              maxLength={6}
              size="large"
              error={
                !!formState?.errors.verificationCode ||
                !!errorMsg.verificationCode
              }
              variant="fill"
              suffix={
                <EmailCode
                  usage="forgetpwd"
                  showCountDown={showCountDown}
                  onCountDownChange={onCountDownChange}
                  sendEmail={sendEmail}
                />
              }
              placeholder={t(
                "page.user.forgot_password.fields.verification_code",
              )}
            />
          )}
          rules={{
            required: t(
              "page.user.forgot_password.error_message.verification_code.require",
            ),
          }}
        />
        {(formState?.errors.verificationCode || errorMsg.verificationCode) && (
          <div css={errorMsgStyle}>
            <WarningCircleIcon css={errorIconStyle} />
            {formState?.errors.verificationCode?.message ||
              errorMsg.verificationCode}
          </div>
        )}
      </div>
      <div css={formItemStyle}>
        <Controller
          name="newPassword"
          control={control}
          render={({ field }) => (
            <Password
              {...field}
              _css={mobileInputStyle}
              colorScheme="techPurple"
              size="large"
              error={!!formState?.errors.newPassword}
              variant="fill"
              placeholder={t("page.user.forgot_password.fields.newPassword")}
            />
          )}
          rules={{
            required: t(
              "page.user.forgot_password.error_message.newPassword.require",
            ),
            minLength: {
              value: 6,
              message: t("page.user.sign_in.error_message.password.min_length"),
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

      <Button
        _css={submitButtonStyle}
        colorScheme="techPurple"
        size="large"
        loading={loading}
        fullWidth
      >
        {t("page.user.forgot_password.actions.reset")}
      </Button>
    </form>
  )
}

MobileReset.displayName = "MobileReset"

export default MobileReset
