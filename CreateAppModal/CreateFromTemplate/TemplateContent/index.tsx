import { ProductMarketApp } from "@illa-public/market-app"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Empty } from "@illa-design/react"
import { CreateLoading } from "../../Loading"
import AppTemplateCard from "../AppTemplateCard"
import CreateOptions from "../CreateOptions"
import { CreateFromTemplateProps } from "../interface"
import {
  baseContentContainerStyle,
  contentContainerStyle,
  contentTitleStyle,
  emptyStyle,
  templateContentContainerStyle,
  templateListContainerStyle,
} from "./style"

interface TemplateContentProps extends CreateFromTemplateProps {
  loading: boolean
  templateList: ProductMarketApp[]
}

const TemplateContent: FC<TemplateContentProps> = ({
  hiddenCreateBlank = false,
  loading,
  templateList = [],
  handleCreateBlankApp,
  handleOpenCreateFromResource,
  handleForkApp,
  closeModal,
}) => {
  const { t } = useTranslation()
  return (
    <div css={templateContentContainerStyle}>
      {!hiddenCreateBlank && (
        <div css={baseContentContainerStyle}>
          <span css={contentTitleStyle}>
            {t("new_dashboard.create_new.create_an_app")}
          </span>
          <CreateOptions
            isInModal
            handleCreateBlankApp={handleCreateBlankApp}
            closeModal={closeModal}
            handleOpenCreateFromResource={handleOpenCreateFromResource}
          />
        </div>
      )}
      <div css={contentContainerStyle}>
        {!hiddenCreateBlank && (
          <span css={contentTitleStyle}>
            {t("new_dashboard.create_new.get_started_with_a_t")}
          </span>
        )}
        {loading && <CreateLoading />}
        {!loading && templateList.length === 0 && (
          <div css={emptyStyle}>
            <Empty />
          </div>
        )}
        <div css={templateListContainerStyle}>
          {!loading &&
            templateList.map(({ app, marketplace }) => (
              <AppTemplateCard
                key={app?.appId}
                showAppDescription
                handleForkApp={handleForkApp}
                closeModal={closeModal}
                appID={app?.appId}
                appName={app?.appName}
                cover={marketplace?.config?.cover}
                teamIdentifier={marketplace?.contributorTeam?.teamIdentifier}
                appDescription={app?.config?.description}
              />
            ))}
        </div>
      </div>
    </div>
  )
}
export default TemplateContent
