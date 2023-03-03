import { FC } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Countdown, Link, getColor, useMessage } from "@illa-design/react"
import { LoginFields } from "@/illa-public-component/User/login/interface"

interface EmailCodeProps {
  showCountDown: boolean
  usage: "signup" | "forgetpwd"
  onCountDownChange: (showCountDown: boolean) => void
  sendEmail: (email: string, usage: "signup" | "forgetpwd") => Promise<string>
}

export const EmailCode: FC<EmailCodeProps> = (props) => {
  const { usage, showCountDown, onCountDownChange, sendEmail } = props
  const { getValues, trigger } = useFormContext<LoginFields>()
  const { t } = useTranslation()
  const message = useMessage()

  const sendEmailCode = async () => {
    onCountDownChange(true)
    try {
      const verificationToken = await sendEmail(getValues("email"), usage)
      message.success({
        content: t("page.user.sign_up.tips.verification_code"),
      })
    } catch (error: any) {
      onCountDownChange(false)
      if (error?.response) {
        message.error({
          content: t("page.user.sign_up.tips.fail_sent"),
        })
      }
      if (error?.response == undefined && error?.request != undefined) {
        message.warning({
          content: t("network_error"),
        })
      }
    }
  }
  if (showCountDown) {
    return (
      <Countdown
        value={Date.now() + 1000 * 60}
        now={Date.now()}
        format="ss"
        fs="inherit"
        valueStyle={{
          fontSize: "inherit",
          lineHeight: "inherit",
          color: getColor("techPurple", "01"),
        }}
        onFinish={() => {
          onCountDownChange(false)
        }}
      />
    )
  }
  return (
    <Link
      fs="inherit"
      colorScheme="techPurple"
      hoverable={false}
      onClick={async () => {
        const canSend = await trigger("email")
        if (canSend) {
          sendEmailCode()
        }
      }}
    >
      {t("page.user.sign_up.actions.send")}
    </Link>
  )
}

EmailCode.displayName = "EmailCode"
