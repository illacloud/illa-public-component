import { GithubIcon } from "@illa-public/icon"
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
import { OAuthButton } from "../../components/OAuthButton"
import { EMAIL_FORMAT } from "../../constants/regExp"
import { validateReport } from "../../utils/reportUtils"
import { LoginFields, loginProps } from "../interface"
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
  oAuthIconStyle,
  singleSubmitButtonStyle,
  submitButtonStyle,
} from "./style"

export const MobileLogin: FC<loginProps> = (props) => {
  const { onSubmit, errorMsg, loading, lockedEmail, hideOAuth, hideRegister } =
    props
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { handleSubmit, control, formState, getValues, trigger } =
    useFormContext<LoginFields>()
  const { errors } = formState
  const [asyncValid, setAsyncValid] = useState<
    { isValid: boolean } | undefined
  >()

  const validReport = async () => {
    ILLAMixpanel.track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      page: ILLA_MIXPANEL_PUBLIC_PAGE_NAME.LOGIN,
      element: "sign_in",
    })
    let isValid = await trigger()
    if (isValid) {
      validateReport(ILLA_MIXPANEL_PUBLIC_PAGE_NAME.LOGIN, "sign_in", true, {})
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
  }, [errors, asyncValid])

  return (
    <form css={formStyle} onSubmit={handleSubmit(onSubmit)}>
      <header css={headerStyle}>
        <div css={formTitleStyle}>{t("page.user.sign_in.title")}</div>
        {!hideRegister && isCloudVersion && (
          <div css={descriptionStyle}>
            <Trans
              i18nKey="page.user.sign_in.description.register"
              t={t}
              components={[
                <TextLink
                  key="text-link"
                  onClick={() => {
                    ILLAMixpanel.track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
                      page: ILLA_MIXPANEL_PUBLIC_PAGE_NAME.LOGIN,
                      element: "create_account",
                    })
                    navigate({ pathname: "/register", search: location.search })
                  }}
                />,
              ]}
            />
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
              size="large"
              error={!!formState?.errors.email || !!errorMsg.email}
              variant="fill"
              placeholder={t("page.user.sign_in.placeholder.email")}
              colorScheme="techPurple"
              {...(lockedEmail && { value: lockedEmail, disabled: true })}
              onFocus={() => {
                ILLAMixpanel.track(ILLA_MIXPANEL_EVENT_TYPE.FOCUS, {
                  page: ILLA_MIXPANEL_PUBLIC_PAGE_NAME.LOGIN,
                  element: "email_input",
                  parameter3: getValues().email?.length ?? 0,
                })
              }}
              onBlur={() => {
                ILLAMixpanel.track(ILLA_MIXPANEL_EVENT_TYPE.BLUR, {
                  page: ILLA_MIXPANEL_PUBLIC_PAGE_NAME.LOGIN,
                  element: "email_input",
                  parameter3: getValues().email?.length ?? 0,
                })
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
              onFocus={() => {
                ILLAMixpanel.track(ILLA_MIXPANEL_EVENT_TYPE.FOCUS, {
                  page: ILLA_MIXPANEL_PUBLIC_PAGE_NAME.LOGIN,
                  element: "password_input",
                  parameter3: getValues().password?.length ?? 0,
                })
              }}
              onBlur={() => {
                ILLAMixpanel.track(ILLA_MIXPANEL_EVENT_TYPE.BLUR, {
                  page: ILLA_MIXPANEL_PUBLIC_PAGE_NAME.LOGIN,
                  element: "password_input",
                  parameter3: getValues().password?.length ?? 0,
                })
              }}
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
            ILLAMixpanel.track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
              page: ILLA_MIXPANEL_PUBLIC_PAGE_NAME.LOGIN,
              element: "forget_password",
            })

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
        onClick={validReport}
      >
        {t("page.user.sign_in.actions.login")}
      </Button>
      {isCloudVersion && !hideOAuth && (
        <div css={oAuthButtonGroupStyle}>
          <OAuthButton
            icon={<GithubIcon css={oAuthIconStyle} />}
            type="github"
            isMobile
            landing="signin"
          />
        </div>
      )}
    </form>
  )
}

MobileLogin.displayName = "MobileLogin"
