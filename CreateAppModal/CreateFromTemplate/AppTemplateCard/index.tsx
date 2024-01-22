import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { Button, Loading, applyBoxStyle } from "@illa-design/react"
import { AppTemplateCardProps } from "./interface"
import {
  appDescriptionStyle,
  appNameStyle,
  cardContainerStyle,
  cardContentContainerStyle,
  cardImageContainerStyle,
  cardImageStyle,
  cardMaskStyle,
} from "./style"

export const AppTemplateCard: FC<AppTemplateCardProps> = ({
  appID,
  appName,
  cover,
  teamIdentifier,
  size = "normal",
  appDescription,
  showAppDescription,
  handleForkApp,
  closeModal,
  ...otherStyleProps
}) => {
  const [showMask, setShowMask] = useState(false)
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()
  const forkApp = async () => {
    setLoading(true)
    try {
      await handleForkApp?.(appID, teamIdentifier)
    } catch (e) {
    } finally {
      setLoading(false)
      closeModal?.()
    }
  }
  const handleShowMask = (show: boolean) => {
    setShowMask(show)
  }
  return (
    <div
      css={[cardContainerStyle(size), applyBoxStyle(otherStyleProps)]}
      onMouseEnter={() => {
        handleShowMask(true)
      }}
      onMouseLeave={() => {
        handleShowMask(false)
      }}
    >
      <div css={cardImageContainerStyle(size)}>
        <img src={cover} alt="" css={cardImageStyle} />
        <div css={cardMaskStyle(showMask)} onClick={forkApp}>
          {loading ? (
            <Loading colorScheme="techPurple" />
          ) : (
            <Button colorScheme="techPurple">
              {t("new_dashboard.create_new.use_this_template")}
            </Button>
          )}
        </div>
      </div>
      <div css={cardContentContainerStyle}>
        <span css={appNameStyle(size)}>{appName}</span>
        {showAppDescription && (
          <span css={appDescriptionStyle}>{appDescription}</span>
        )}
      </div>
    </div>
  )
}

export default AppTemplateCard
