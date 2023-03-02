import { Countdown, Link, getColor, useMessage } from "@illa-design/react"
import { FC } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { LoginFields } from "@/illa-public-component/User/login/interface"
import { CloudApi } from "@/utils/http-request"
import { ILLACloudStorage } from "@/utils/storage"

interface EmailCodeProps {
  showCountDown: boolean
  usage: "signup" | "forgetpwd"
  onCountDownChange: (showCountDown: boolean) => void
}

export const EmailCode: FC<EmailCodeProps> = (props) => {
  const { usage, showCountDown, onCountDownChange } = props
  const { getValues, trigger } = useFormContext<LoginFields>()
  const { t } = useTranslation()
  const message = useMessage()

  const sendEmailCode = () => {
    onCountDownChange(true)
    CloudApi.request<{ verificationToken: string }>(
      {
        method: "POST",
        url: "/auth/verification",
        data: {
          email: getValues("email"),
          usage,
        },
      },
      (res) => {
        message.success({
          content: t("page.user.sign_up.tips.verification_code"),
        })
        ILLACloudStorage.setSessionStorage(
          "verificationToken",
          res.data.verificationToken,
        )
      },
      () => {
        message.error({
          content: t("page.user.sign_up.tips.fail_sent"),
        })
        onCountDownChange(false)
      },
      () => {
        message.warning({
          content: t("network_error"),
        })
        onCountDownChange(false)
      },
      () => {},
    )
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
