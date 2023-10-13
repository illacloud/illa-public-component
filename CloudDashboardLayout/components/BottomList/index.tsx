import { useIsMobile } from "@illa-public/utils"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { Divider } from "@illa-design/react"
import { ReactComponent as DiscordIcon } from "../../assets/discord.svg"
import { ReactComponent as FileIcon } from "../../assets/file.svg"
import { ReactComponent as IssueIcon } from "../../assets/issue.svg"
import { ReactComponent as SettingIcon } from "../../assets/setting.svg"
import { ReactComponent as TutorialIcon } from "../../assets/tutorial.svg"
import { DynamicMenu, MenuItemShape } from "../Menu"
import { BottomListProps } from "./interface"

export const BottomList: FC<BottomListProps> = (props) => {
  const { onClickMenuItemCallback, extBottomComponent } = props
  const { t } = useTranslation()
  const { teamIdentifier } = useParams()
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
      href: "https://www.illacloud.com/docs/about-illa",
      icon: <FileIcon />,
      onClickCallback: onClickMenuItemCallback,
    },
    {
      labelName: t("page.left.menu.tutorial"),
      labelKey: "tutorial",
      href: `${
        import.meta.env.ILLA_BUILDER_URL
      }/${teamIdentifier}/dashboard/tutorial`,
      icon: <TutorialIcon />,
      hidden: isMobile,
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
