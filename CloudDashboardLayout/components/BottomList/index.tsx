import { DOC_PREFIX } from "@illa-public/public-configs"
import { USER_ROLE, getCurrentTeamInfo } from "@illa-public/user-data"
import {
  getAuthToken,
  getILLABuilderURL,
  useIsMobile,
} from "@illa-public/utils"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Divider } from "@illa-design/react"
import DiscordIcon from "../../assets/discord.svg?react"
import FileIcon from "../../assets/file.svg?react"
import IssueIcon from "../../assets/issue.svg?react"
import SettingIcon from "../../assets/setting.svg?react"
import TutorialIcon from "../../assets/tutorial.svg?react"
import { DynamicMenu, MenuItemShape } from "../Menu"
import { BottomListProps } from "./interface"

export const BottomList: FC<BottomListProps> = (props) => {
  const { onClickMenuItemCallback, extBottomComponent } = props
  const { t } = useTranslation()
  const { teamIdentifier } = useParams()
  const currentTeamInfo = useSelector(getCurrentTeamInfo)
  const isMobile = useIsMobile()

  const bottomList: MenuItemShape[] = [
    {
      labelName: t("page.left.menu.discord"),
      labelKey: "discord",
      href: "https://discord.com/invite/illacloud",
      icon: <DiscordIcon />,
      onClickCallback: onClickMenuItemCallback,
    },
    {
      labelName: t("page.left.menu.issue"),
      labelKey: "issue",
      href: "https://github.com/illacloud/illa-builder/issues",
      icon: <IssueIcon />,
      onClickCallback: onClickMenuItemCallback,
    },
    {
      labelName: t("page.left.menu.documentation"),
      labelKey: "documentation",
      href: DOC_PREFIX,
      icon: <FileIcon />,
      onClickCallback: onClickMenuItemCallback,
    },
    {
      labelName: t("page.left.menu.tutorial"),
      labelKey: "tutorial",
      href: `${getILLABuilderURL()}/${teamIdentifier}/guide?token=${getAuthToken()}`,
      icon: <TutorialIcon />,
      hidden:
        isMobile ||
        !teamIdentifier ||
        ![USER_ROLE.ADMIN, USER_ROLE.EDITOR, USER_ROLE.OWNER].includes(
          currentTeamInfo?.myRole ?? USER_ROLE.VIEWER,
        ),
      onClickCallback: onClickMenuItemCallback,
    },
    {
      labelName: t("page.left.menu.setting"),
      labelKey: "setting",
      href: "/setting",
      icon: <SettingIcon />,
      inStation: true,
      onClickCallback: onClickMenuItemCallback,
    },
  ]

  return (
    <>
      <DynamicMenu config={bottomList} />
      {!!extBottomComponent && (
        <>
          <Divider />
          {extBottomComponent}
        </>
      )}
    </>
  )
}
