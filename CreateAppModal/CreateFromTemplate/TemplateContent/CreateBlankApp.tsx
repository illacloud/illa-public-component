import { FC } from "react"
import { useTranslation } from "react-i18next"
import CreateOptions from "../CreateOptions"
import { ICreateBlankAppProps } from "./interface"
import { baseContentContainerStyle, contentTitleStyle } from "./style"

export const CreateBlankAPP: FC<ICreateBlankAppProps> = (props) => {
  const {
    isInModal,
    handleCreateBlankApp,
    closeModal,
    handleOpenCreateFromResource,
  } = props
  const { t } = useTranslation()
  return (
    <div css={baseContentContainerStyle}>
      <span css={contentTitleStyle}>
        {t("new_dashboard.create_new.create_an_app")}
      </span>
      <CreateOptions
        isInModal={isInModal}
        handleCreateBlankApp={handleCreateBlankApp}
        closeModal={closeModal}
        handleOpenCreateFromResource={handleOpenCreateFromResource}
      />
    </div>
  )
}
