import { useIsMobile } from "@illa-public/utils"
import { FC, Suspense } from "react"
import { Button, PenIcon } from "@illa-design/react"
import { getIconFromResourceType } from "../../../utils"
import { ResourceMoreAction } from "../MoreAction"
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

  const handleEditResource = () => {
    onEditResource(resourceID)
  }

  const handleDeleteResource = () => {
    onDeleteResource(resourceID)
  }

  return (
    <div css={resourceCardContainerStyle}>
      <header css={headerContainerStyle}>
        <div css={resourceIconAndNameContainerStyle}>
          <Suspense>{getIconFromResourceType(resourceType, "24px")}</Suspense>
          <h6 css={resourceNameStyle}>{resourceName}</h6>
        </div>
        <ResourceMoreAction
          onEditResource={handleEditResource}
          onDeleteResource={handleDeleteResource}
        />
      </header>
      <p css={dbNameStyle(!!dbName)}>{dbName ?? "Null"}</p>
      <footer css={footerContainerStyle}>
        <p css={resourceTypeStyle}>{resourceType}</p>
        {!isMobile && (
          <Button
            leftIcon={<PenIcon />}
            colorScheme="grayBlue"
            className="editActionButton"
          >
            Edit
          </Button>
        )}
      </footer>
    </div>
  )
}
