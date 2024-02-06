import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { DOC_PREFIX } from "@illa-public/public-configs"
import { USER_ROLE } from "@illa-public/public-types"
import { getCurrentTeamInfo } from "@illa-public/user-data"
import {
  getAuthToken,
  getILLABuilderURL,
  useIsMobile,
} from "@illa-public/utils"
import { FC, useContext, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Divider } from "@illa-design/react"
import ChangeLogIcon from "../../assets/changeLog.svg?react"
import DiscordIcon from "../../assets/discord.svg?react"
import FileIcon from "../../assets/file.svg?react"
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
  const { track } = useContext(MixpanelTrackContext)
  const showTutorial =
    !isMobile &&
    teamIdentifier &&
    [USER_ROLE.ADMIN, USER_ROLE.EDITOR, USER_ROLE.OWNER].includes(
      currentTeamInfo?.myRole ?? USER_ROLE.VIEWER,
    )

  const bottomList: MenuItemShape[] = [
    {
      labelName: t("page.left.menu.discord"),
      labelKey: "discord",
      href: "https://discord.com/invite/illacloud",
      icon: <DiscordIcon />,
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
      href: `${getILLABuilderURL(
        window.customDomain,
      )}/${teamIdentifier}/guide?token=${getAuthToken()}`,
      icon: <TutorialIcon />,
      hidden: !showTutorial,
      onClickCallback: onClickMenuItemCallback,
    },
    {
      labelName: t("page.left.menu.changelog"),
      labelKey: "change-log",
      icon: <ChangeLogIcon />,
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

  useEffect(() => {
    if (showTutorial) {
      track?.(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        {
          element: "menu_tutorial",
        },
        "both",
      )
    }
  }, [showTutorial, track])
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
