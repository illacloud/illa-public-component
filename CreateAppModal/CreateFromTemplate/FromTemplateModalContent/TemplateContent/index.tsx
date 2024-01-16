import { ProductMarketApp } from "@illa-public/market-app"
import { FC } from "react"
import { Empty } from "@illa-design/react"
import { CreateLoading } from "../../../Loading"
import AppTemplateCard from "../../AppTemplateCard"
import CreateOptions from "../../CreateOptions"
import { CreateFromTemplateProps } from "../../interface"
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
  handleCreateFromResource,
  handleForkApp,
  closeModal,
}) => {
  return (
    <div css={templateContentContainerStyle}>
      {!hiddenCreateBlank && (
        <div css={baseContentContainerStyle}>
          <span css={contentTitleStyle}>Create a app</span>
          <CreateOptions
            isInModal
            handleCreateBlankApp={handleCreateBlankApp}
            handleCreateFromResource={handleCreateFromResource}
            closeModal={closeModal}
          />
        </div>
      )}
      <div css={contentContainerStyle}>
        {!hiddenCreateBlank && (
          <span css={contentTitleStyle}>Get started with a template</span>
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
                cover={app?.config?.cover}
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
