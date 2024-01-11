import { getIconFromResourceType } from "@illa-public/icon"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Button, PreviousIcon } from "@illa-design/react"
import { getResourceNameFromResourceType } from "../../utils"
import { CreateButton } from "../ConfigElements/ActionButtons/CreateButton"
import GoogleCreateButton from "../ConfigElements/ActionButtons/GoogleCreateButton"
import { TestConnectButton } from "../ConfigElements/ActionButtons/TestConnectButton"
import { ResourceHeaderProps } from "./interface"
import {
  buttonContainerStyle,
  headerContainerStyle,
  headerOuterContainerStyle,
  titleContainerStyle,
  titleNameContainerStyle,
  titleNameStyle,
} from "./style"

const NOT_NEED_TEST_CONNECT_RESOURCE_TYPE = [
  "restapi",
  "googlesheets",
  "airtable",
  "huggingface",
  "hfendpoint",
]

export const Header: FC<ResourceHeaderProps> = (props) => {
  const { t } = useTranslation()
  const { resourceType, onClickBack } = props

  return (
    <div css={headerOuterContainerStyle}>
      <div css={headerContainerStyle}>
        <div>
          <Button
            leftIcon={<PreviousIcon />}
            variant="text"
            colorScheme="gray"
            type="button"
            onClick={onClickBack}
          >
            {t("back")}
          </Button>
        </div>
        <div css={titleContainerStyle}>
          <div css={titleNameContainerStyle}>
            {getIconFromResourceType(resourceType, "24px")}
            <h1 css={titleNameStyle}>
              {getResourceNameFromResourceType(resourceType)}
            </h1>
          </div>
          <div css={buttonContainerStyle}>
            {!NOT_NEED_TEST_CONNECT_RESOURCE_TYPE.includes(resourceType) && (
              <TestConnectButton resourceType={resourceType} />
            )}
            {import.meta.env.ILLA_APP_ENV === "test" &&
            resourceType === "googlesheets" ? (
              <GoogleCreateButton />
            ) : (
              <CreateButton />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
