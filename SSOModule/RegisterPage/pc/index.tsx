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
import {
  Button,
  Divider,
  Input,
  Password,
  WarningCircleIcon,
} from "@illa-design/react"
import { EmailCode } from "../../components/EmailCode"
import { OAuthButton } from "../../components/OAuthButton"
import { EMAIL_FORMAT } from "../../constants/regExp"
import { validateReport } from "../../utils/reportUtils"
import { RegisterFields, RegisterProps } from "../interface"
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
  inputDisabledStyle,
  oAuthButtonGroupStyle,
  oAuthIconStyle,
} from "./style"

export const PCRegister: FC<RegisterProps> = (props) => {
  const { t } = useTranslation()
  const {
    lockedEmail,
    onSubmit,
    errorMsg,
    loading,
    showCountDown,
    onCountDownChange,
    sendEmail,
    hideOAuth,
  } = props
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
    <div>
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
                  required: t(
                    "page.user.sign_up.error_message.username.require",
                  ),
                  maxLength: {
                    value: 15,
                    message: t(
                      "page.user.sign_up.error_message.username.length",
                    ),
                  },
                  minLength: {
                    value: 3,
                    message: t(
                      "page.user.sign_up.error_message.username.length",
                    ),
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
                    css={inputDisabledStyle}
                    colorScheme="techPurple"
                    size="large"
                    error={!!formState?.errors.email || !!errorMsg.email}
                    variant="fill"
                    placeholder={t("page.user.sign_up.placeholder.email")}
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
                  required: t(
                    "page.user.sign_up.error_message.password.require",
                  ),
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
        <Button
          colorScheme="techPurple"
          size="large"
          loading={loading}
          fullWidth
          onClick={validReport}
        >
          {t("page.user.sign_up.actions.create")}
        </Button>
      </form>
      {isCloudVersion && !hideOAuth && (
        <div>
          <Divider
            mg="24px 0"
            colorScheme="grayBlue"
            text={t("page.user.sign_in.option.or")}
          />
          <div css={oAuthButtonGroupStyle}>
            <OAuthButton
              icon={<GithubIcon css={oAuthIconStyle} />}
              type="github"
              isMobile={false}
              landing="signup"
            >
              {t("page.user.sign_in.option.github")}
            </OAuthButton>
          </div>
        </div>
      )}
    </div>
  )
}

PCRegister.displayName = "Register"
