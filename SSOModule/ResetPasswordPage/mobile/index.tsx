import {
  ILLAMixpanel,
  ILLA_MIXPANEL_EVENT_TYPE,
  ILLA_MIXPANEL_PUBLIC_PAGE_NAME,
} from "@illa-public/mixpanel-utils"
import { FC, useEffect, useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import {
  Button,
  Input,
  Password,
  PreviousIcon,
  WarningCircleIcon,
} from "@illa-design/react"
import { EmailCode } from "../../components/EmailCode"
import { EMAIL_FORMAT } from "../../constants/regExp"
import { validateReport } from "../../utils/reportUtils"
import { ResetProps, ResetPwdFields } from "../interface"
import {
  errorIconStyle,
  errorMsgStyle,
  formItemStyle,
  formStyle,
  formTitleStyle,
  headerStyle,
  hotspotWrapperStyle,
  mobileInputStyle,
  prevIconStyle,
  resetPasswordSubtitleWrapperStyle,
  submitButtonStyle,
} from "./style"

export const MobileReset: FC<ResetProps> = (props) => {
  const {
    onSubmit,
    errorMsg,
    loading,
    hideNav,
    lockedEmail,
    resetLabel,
    showCountDown,
    onCountDownChange,
    sendEmail,
  } = props
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { handleSubmit, control, formState, getValues, trigger } =
    useFormContext<ResetPwdFields>()
  const backToLogin = () => {
    navigate({ pathname: "/login", search: location.search })
  }
  const { errors } = formState
  const [asyncValid, setAsyncValid] = useState<
    { isValid: boolean } | undefined
  >()

  const validReport = async () => {
    ILLAMixpanel.track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      page: ILLA_MIXPANEL_PUBLIC_PAGE_NAME.FORGET_PASSWORD,
      element: "reset_password",
    })
    let isValid = await trigger()
    if (isValid) {
      validateReport(
        ILLA_MIXPANEL_PUBLIC_PAGE_NAME.FORGET_PASSWORD,
        "reset_password",
        true,
        {},
      )
    }
    setAsyncValid({ isValid })
  }

  useEffect(() => {
    if (asyncValid && !asyncValid.isValid) {
      validateReport(
        ILLA_MIXPANEL_PUBLIC_PAGE_NAME.FORGET_PASSWORD,
        "reset_password",
        false,
        errors,
      )
    }
  }, [errors, asyncValid])

  return (
    <form css={formStyle} onSubmit={handleSubmit(onSubmit)}>
      <header css={headerStyle}>
        <span css={formTitleStyle}>
          {hideNav
            ? t("page.user.sign_in.title")
            : t("page.user.forgot_password.title")}
        </span>
        {hideNav ? null : (
          <div css={resetPasswordSubtitleWrapperStyle} onClick={backToLogin}>
            <span css={hotspotWrapperStyle}>
              <PreviousIcon css={prevIconStyle} />
              {t("page.user.forgot_password.subtitle")}
            </span>
          </div>
        )}
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
              {...(lockedEmail && { value: lockedEmail, disabled: true })}
              onFocus={() => {
                ILLAMixpanel.track(ILLA_MIXPANEL_EVENT_TYPE.FOCUS, {
                  page: ILLA_MIXPANEL_PUBLIC_PAGE_NAME.FORGET_PASSWORD,

                  element: "username_input",
                  parameter3: getValues().email?.length ?? 0,
                })
              }}
              onBlur={() => {
                ILLAMixpanel.track(ILLA_MIXPANEL_EVENT_TYPE.BLUR, {
                  page: ILLA_MIXPANEL_PUBLIC_PAGE_NAME.FORGET_PASSWORD,
                  element: "username_input",
                  parameter3: getValues().email?.length ?? 0,
                })
              }}
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
              onFocus={() => {
                ILLAMixpanel.track(ILLA_MIXPANEL_EVENT_TYPE.FOCUS, {
                  page: ILLA_MIXPANEL_PUBLIC_PAGE_NAME.FORGET_PASSWORD,

                  element: "verification_code_input",
                  parameter3: getValues().verificationCode?.length ?? 0,
                })
              }}
              onBlur={() => {
                ILLAMixpanel.track(ILLA_MIXPANEL_EVENT_TYPE.BLUR, {
                  page: ILLA_MIXPANEL_PUBLIC_PAGE_NAME.FORGET_PASSWORD,

                  element: "verification_code_input",
                  parameter3: getValues().verificationCode?.length ?? 0,
                })
              }}
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
              onFocus={() => {
                ILLAMixpanel.track(ILLA_MIXPANEL_EVENT_TYPE.FOCUS, {
                  page: ILLA_MIXPANEL_PUBLIC_PAGE_NAME.FORGET_PASSWORD,

                  element: "password_input",
                  parameter3: getValues().newPassword?.length ?? 0,
                })
              }}
              onBlur={() => {
                ILLAMixpanel.track(ILLA_MIXPANEL_EVENT_TYPE.BLUR, {
                  page: ILLA_MIXPANEL_PUBLIC_PAGE_NAME.FORGET_PASSWORD,

                  element: "password_input",
                  parameter3: getValues().newPassword?.length ?? 0,
                })
              }}
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
        onClick={validReport}
      >
        {resetLabel ? resetLabel : t("page.user.forgot_password.actions.reset")}
      </Button>
    </form>
  )
}

MobileReset.displayName = "MobileReset"
