import { FC } from "react"
import { useTranslation } from "react-i18next"
import {
  UNIT_COLLA_CONVERSION_STORAGE,
  UNIT_COLLA_CONVERSION_TOKEN,
  UNIT_COLLA_CONVERSION_TRAFFIC,
} from "../../service/interface"
import {
  calculatorStyle,
  calculatorTitleStyle,
  goodsStyle,
  orStyle,
} from "./style"

interface CalculatorProps {
  changeNum: number
  unitCollaByCycle: number
}

export const Calculator: FC<CalculatorProps> = ({
  changeNum,
  unitCollaByCycle,
}) => {
  const { t } = useTranslation()
  return (
    <div css={calculatorStyle}>
      <span css={calculatorTitleStyle}>
        {t("billing.payment_sidebar.colla.1", {
          purchaseNum: `${changeNum * unitCollaByCycle}k`,
        })}
        &nbsp; ≈
      </span>
      <div css={goodsStyle}>
        <span>{`${t("billing.payment_sidebar.colla.2", {
          storageNum: `${
            changeNum * unitCollaByCycle * UNIT_COLLA_CONVERSION_STORAGE
          }GB`,
        })}`}</span>
        <span css={orStyle}>{t("or")}</span>
        <span>
          {`${t("billing.payment_sidebar.colla.3", {
            trafficNum: `${
              changeNum * unitCollaByCycle * UNIT_COLLA_CONVERSION_TRAFFIC
            }GB`,
          })}`}
        </span>
        <span css={orStyle}>{t("or")}</span>
        <span>
          {`${t("billing.payment_sidebar.colla.4", {
            tokenNum: `${
              changeNum * unitCollaByCycle * UNIT_COLLA_CONVERSION_TOKEN
            }k`,
          })}`}
        </span>
      </div>
    </div>
  )
}
