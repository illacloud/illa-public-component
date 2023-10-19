import { useIsMobile } from "@illa-public/utils"
import { FC, Suspense } from "react"
import { useTranslation } from "react-i18next"
import { Button, PenIcon } from "@illa-design/react"
import { getIconFromResourceType } from "../utils"
import { ResourceMoreAction } from "./components/MoreAction"
import { CardProps } from "./interface"
import {
  dbNameStyle,
  footerContainerStyle,
  headerContainerStyle,
  resourceCardContainerStyle,
  resourceIconAndNameContainerStyle,
  resourceNameStyle,
  resourceTypeStyle,
} from "./style"

export const ResourceCard: FC<CardProps> = (props) => {
  const {
    resourceType,
    resourceName,
    dbName,
    resourceID,
    onEditResource,
    onDeleteResource,
  } = props

  const isMobile = useIsMobile()
  const { t } = useTranslation()

  const handleEditResource = () => {
    onEditResource?.(resourceID)
  }

  return (
    <div css={resourceCardContainerStyle}>
      <header css={headerContainerStyle}>
        <div css={resourceIconAndNameContainerStyle}>
          <Suspense>{getIconFromResourceType(resourceType, "24px")}</Suspense>
          <h6 css={resourceNameStyle}>{resourceName}</h6>
        </div>
        {!isMobile && (
          <ResourceMoreAction
            resourceID={resourceID}
            onEditResource={handleEditResource}
            onDeleteResource={onDeleteResource!}
          />
        )}
      </header>
      <p css={dbNameStyle(!!dbName)}>{dbName ?? "Null"}</p>
      <footer css={footerContainerStyle}>
        <p css={resourceTypeStyle}>{resourceType}</p>
        {!isMobile && (
          <Button
            leftIcon={<PenIcon />}
            colorScheme="grayBlue"
            variant="text"
            className="editActionButton"
            onClick={handleEditResource}
          >
            {t("dashboard.common.edit")}
          </Button>
        )}
      </footer>
    </div>
  )
}
