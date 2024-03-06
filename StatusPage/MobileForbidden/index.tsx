import { FC } from "react"
import { Helmet } from "react-helmet-async"
import { useTranslation } from "react-i18next"
import LaptopIcon from "../assets/laptop.svg?react"
import {
  contentStyle,
  contentWrapperStyle,
  iconWrapperStyle,
  wrapperStyle,
} from "./style"

export const MobileForbidden: FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t("status.mobile_forbidden")}</title>
      </Helmet>
      <div css={wrapperStyle}>
        <div css={contentWrapperStyle}>
          <div css={iconWrapperStyle}>
            <LaptopIcon />
          </div>
          <span css={contentStyle}>{t("status.mobile_forbidden")}</span>
        </div>
      </div>
    </>
  )
}

MobileForbidden.displayName = "MobileForbidden"

export default MobileForbidden
