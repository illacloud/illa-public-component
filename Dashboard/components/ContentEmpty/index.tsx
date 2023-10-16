import { FC } from "react"
import { useTranslation } from "react-i18next"
import {
  Button,
  Empty,
  EmptyIcon,
  PlusIcon,
  getColor,
} from "@illa-design/react"
import { ContentEmptyProps } from "./interface"
import { emptyStyle, emptyTextStyle } from "./style"

export const TeamContentEmpty: FC<ContentEmptyProps> = (props) => {
  const { onClickButton, loading, showCreate } = props
  const { t } = useTranslation()

  const handleClickButton = () => {
    onClickButton?.()
  }

  return (
    <Empty
      paddingVertical="120px"
      icon={<EmptyIcon size="48px" color={getColor("grayBlue", "02")} />}
      description={
        <div css={emptyStyle}>
          <div css={emptyTextStyle}>{t("new_dashboard.desc.blank")}</div>
          {showCreate && (
            <Button
              colorScheme="grayBlue"
              loading={loading}
              variant="outline"
              leftIcon={<PlusIcon size="10px" />}
              onClick={handleClickButton}
            >
              {t("new_dashboard.button.blank")}
            </Button>
          )}
        </div>
      }
    />
  )
}
