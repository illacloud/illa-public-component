import { FC, useState } from "react"
import { menuContainerStyle, menuItemStyle } from "./style"

interface TemplateMenuProps {
  menuItems: string[]
  onMenuClick: (key?: string) => void
}

const TemplateMenu: FC<TemplateMenuProps> = ({ menuItems, onMenuClick }) => {
  const [activeKey, setActiveKey] = useState<string | undefined>()
  const handleClick = (key: string | undefined) => {
    onMenuClick(key)
    setActiveKey(key)
  }

  return (
    <div css={menuContainerStyle}>
      <div
        css={menuItemStyle(!activeKey)}
        onClick={() => handleClick(undefined)}
      >
        {"All Template"}
      </div>
      {menuItems.map((item) => (
        <div
          key={item}
          css={menuItemStyle(activeKey === item)}
          onClick={() => handleClick(item)}
        >
          {item}
        </div>
      ))}
    </div>
  )
}

export default TemplateMenu
