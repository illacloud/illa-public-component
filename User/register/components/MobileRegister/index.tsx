import {
  ILLA_MIXPANEL_EVENT_TYPE,
  ILLA_MIXPANEL_PUBLIC_PAGE_NAME,
} from "@illa-public/mixpanel-utils"
import { ILLAMixpanel } from "@illa-public/mixpanel-utils"
import { TextLink } from "@illa-public/text-link"
import { isCloudVersion } from "@illa-public/utils"
import { FC, useEffect, useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { Button, Input, Password } from "@illa-design/react"
import { ReactComponent as GithubIcon } from "@/illa-public-component/User/assets/github.svg"
import { ReactComponent as GoogleIcon } from "@/illa-public-component/User/assets/google.svg"
import { openOAuthUrl } from "@/illa-public-component/User/constants/users"
import { inputDisabledStyle } from "@/illa-public-component/User/login/components/Login/style"
import {
  descriptionStyle,
  errorMsgStyle,
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
import { EmailCode } from "@/illa-public-component/User/register/components/EmailCode"
import { MobileRegisterProps } from "@/illa-public-component/User/register/components/MobileRegister/interface"
import { RegisterFields } from "@/illa-public-component/User/register/interface"
import { validateReport } from "@/illa-public-component/User/utils/reportUtils"
import { EMAIL_FORMAT } from "../../../constants/regExp"

const MobileRegister: FC<MobileRegisterProps> = (props) => {
  const {
    oAuthURI,
    lockedEmail,
    onSubmit,
    errorMsg,
    loading,
    showCountDown,
    onCountDownChange,
    sendEmail,
  } = props
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { handleSubmit, control, formState, getValues, trigger } =
    useFormContext<RegisterFields>()
  const { errors } = formState
  const [asyncValid, setAsyncValid] = useState<
    { isValid: boolean } | undefined
  >()

  const validReport = async () => {
    ILLAMixpanel.track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      page: ILLA_MIXPANEL_PUBLIC_PAGE_NAME.SIGNUP,
      element: "create_account",
    })

    let isValid = await trigger()
    if (isValid) {
      validateReport(
        ILLA_MIXPANEL_PUBLIC_PAGE_NAME.SIGNUP,
        "create_account",
        true,
        {},
      )
    }
    setAsyncValid({ isValid })
  }

  useEffect(() => {
    if (asyncValid && !asyncValid.isValid) {
      validateReport(
        ILLA_MIXPANEL_PUBLIC_PAGE_NAME.SIGNUP,
        "create_account",
        false,
        errors,
      )
    }
  }, [errors, asyncValid])

  return (
    <form css={formStyle} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <header css={headerStyle}>
        <div css={formTitleStyle}>{t("page.user.sign_up.title")}</div>
        <div css={descriptionStyle}>
          <Trans
            i18nKey="page.user.sign_up.description.login"
            t={t}
            components={[
              <TextLink
                key="go-to-login"
                onClick={() => {
                  ILLAMixpanel.track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
                    page: ILLA_MIXPANEL_PUBLIC_PAGE_NAME.SIGNUP,
                    element: "sign_in",
                  })

                  navigate({ pathname: "/login", search: location.search })
                }}
              />,
            ]}
          />
        </div>
      </header>

      <div css={formItemStyle}>
        <Controller
          name="nickname"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              css={inputDisabledStyle}
              _css={mobileInputStyle}
              colorScheme="techPurple"
              size="large"
              error={!!formState?.errors.nickname}
              variant="fill"
              placeholder={t("page.user.sign_up.fields.username")}
              onFocus={() => {
                ILLAMixpanel.track(ILLA_MIXPANEL_EVENT_TYPE.FOCUS, {
                  page: ILLA_MIXPANEL_PUBLIC_PAGE_NAME.SIGNUP,
                  element: "username_input",
                  parameter3: getValues().nickname?.length ?? 0,
                })
              }}
              onBlur={() => {
                ILLAMixpanel.track(ILLA_MIXPANEL_EVENT_TYPE.BLUR, {
                  page: ILLA_MIXPANEL_PUBLIC_PAGE_NAME.SIGNUP,
                  element: "username_input",
                  parameter3: getValues().nickname?.length ?? 0,
                })
              }}
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
          <div css={errorMsgStyle}>{formState?.errors.nickname.message}</div>
        )}
      </div>
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
              type="email"
              error={!!formState?.errors.email || !!errorMsg.email}
              variant="fill"
              placeholder={t("page.user.sign_up.fields.email")}
              {...(lockedEmail && { value: lockedEmail, disabled: true })}
              onFocus={() => {
                ILLAMixpanel.track(ILLA_MIXPANEL_EVENT_TYPE.FOCUS, {
                  page: ILLA_MIXPANEL_PUBLIC_PAGE_NAME.SIGNUP,
                  element: "email_input",
                  parameter3: getValues().email?.length ?? 0,
                })
              }}
              onBlur={() => {
                ILLAMixpanel.track(ILLA_MIXPANEL_EVENT_TYPE.BLUR, {
                  page: ILLA_MIXPANEL_PUBLIC_PAGE_NAME.SIGNUP,
                  element: "email_input",
                  parameter3: getValues().email?.length ?? 0,
                })
              }}
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
            {formState?.errors.email?.message || errorMsg.email}
          </div>
        )}
      </div>
      {isCloudVersion && (
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
                type="number"
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
                placeholder={t("page.user.sign_up.fields.verification_code")}
                onFocus={() => {
                  ILLAMixpanel.track(ILLA_MIXPANEL_EVENT_TYPE.FOCUS, {
                    page: ILLA_MIXPANEL_PUBLIC_PAGE_NAME.SIGNUP,
                    element: "verification_code_input",
                    parameter3: getValues().verificationCode?.length ?? 0,
                  })
                }}
                onBlur={() => {
                  ILLAMixpanel.track(ILLA_MIXPANEL_EVENT_TYPE.BLUR, {
                    page: ILLA_MIXPANEL_PUBLIC_PAGE_NAME.SIGNUP,
                    element: "verification_code_input",
                    parameter3: getValues().verificationCode?.length ?? 0,
                  })
                }}
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
              {formState?.errors.verificationCode?.message ||
                errorMsg.verificationCode}
            </div>
          )}
        </div>
      )}
      <div css={formItemStyle}>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Password
              {...field}
              _css={mobileInputStyle}
              colorScheme="techPurple"
              size="large"
              error={!!formState?.errors.password}
              variant="fill"
              placeholder={t("page.user.sign_up.fields.password")}
              onFocus={() => {
                ILLAMixpanel.track(ILLA_MIXPANEL_EVENT_TYPE.FOCUS, {
                  page: ILLA_MIXPANEL_PUBLIC_PAGE_NAME.SIGNUP,
                  element: "password",
                  parameter3: getValues().password?.length ?? 0,
                })
              }}
              onBlur={() => {
                ILLAMixpanel.track(ILLA_MIXPANEL_EVENT_TYPE.BLUR, {
                  page: ILLA_MIXPANEL_PUBLIC_PAGE_NAME.SIGNUP,
                  element: "password",
                  parameter3: getValues().password?.length ?? 0,
                })
              }}
            />
          )}
          rules={{
            required: t("page.user.sign_up.error_message.password.require"),
            minLength: {
              value: 6,
              message: t("page.user.sign_in.error_message.password.min_length"),
            },
            validate: (value) => {
              return value.includes(" ")
                ? t("setting.password.error_password_has_empty")
                : true
            },
          }}
        />
        {formState?.errors.password && (
          <div css={errorMsgStyle}>{formState?.errors.password.message}</div>
        )}
      </div>

      <Button
        _css={isCloudVersion ? submitButtonStyle : singleSubmitButtonStyle}
        colorScheme="techPurple"
        size="large"
        loading={loading}
        fullWidth
        onClick={validReport}
      >
        {t("page.user.sign_up.actions.create")}
      </Button>
      {isCloudVersion && (
        <div css={[oAuthButtonGroupStyle]}>
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
              ILLAMixpanel.track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
                page: ILLA_MIXPANEL_PUBLIC_PAGE_NAME.SIGNUP,
                element: "github_sign_up",
              })
              oAuthURI?.github && openOAuthUrl(oAuthURI.github)
            }}
          ></Button>
        </div>
      )}
    </form>
  )
}

MobileRegister.displayName = "MobileRegister"

export default MobileRegister
