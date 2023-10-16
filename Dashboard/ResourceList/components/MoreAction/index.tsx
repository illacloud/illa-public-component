import { FC } from "react"
import { useTranslation } from "react-i18next"
import { DropList, DropListItem, Dropdown, MoreIcon } from "@illa-design/react"
import { ResourceMoreActionProps } from "./interface"
import { moreIconStyle } from "./style"

export const ResourceMoreAction: FC<ResourceMoreActionProps> = (props) => {
  const { t } = useTranslation()
  const { onDeleteResource, onEditResource } = props

  return (
    <Dropdown
      position="bottom-end"
      trigger="click"
      triggerProps={{ closeDelay: 0, openDelay: 0 }}
      dropList={
        <DropList w="184px">
          <DropListItem
            value="edit"
            key="edit"
            title={t("dashboard.common.edit")}
            onClick={onEditResource}
          />
          <DropListItem
            value="delete"
            key={"delete"}
            title={t("dashboard.common.delete")}
            deleted
            onClick={onDeleteResource}
          />
        </DropList>
      }
    >
      <MoreIcon w="16px" h="16px" css={moreIconStyle} />
    </Dropdown>
  )
}
