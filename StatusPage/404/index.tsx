import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { Button, Result404Icon } from "@illa-design/react"
import { ErrorPage } from "../Layout"
import { buttonStyle, iconStyle } from "../Layout/style"

export const Page404: FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <ErrorPage
      title="404"
      des={t("status.404.des")}
      img={<Result404Icon css={iconStyle} />}
    >
      <div css={buttonStyle}>
        <Button onClick={() => navigate(0)} colorScheme={"gray"}>
          {t("status.404.again")}
        </Button>
        <Button onClick={() => navigate("/")}>{t("status.back")}</Button>
      </div>
    </ErrorPage>
  )
}

export default Page404
