import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { Button, Result403Icon } from "@illa-design/react"
import { ErrorPage } from "../Layout"
import { buttonStyle, iconStyle } from "../Layout/style"

export const Page403: FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <ErrorPage
      title="403"
      des={t("status.403.des")}
      img={<Result403Icon css={iconStyle} />}
    >
      <div css={buttonStyle}>
        <Button onClick={() => navigate("/")}>{t("status.back")}</Button>
      </div>
    </ErrorPage>
  )
}

export default Page403
