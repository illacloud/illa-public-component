import { UpgradeIcon } from "@illa-public/icon"
import { APP_TYPE, SUBSCRIBE_PLAN } from "@illa-public/public-types"
import { getCurrentTeamInfo, getPlanUtils } from "@illa-public/user-data"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { AddIcon, Loading, getColor } from "@illa-design/react"
import {
  ICreateBlankAppProps,
  ICreateFromDatabaseProps,
  ICreateOptionsProps,
} from "./interface"
import {
  createOptionsContainerStyle,
  createOptionsStyle,
  iconStyle,
  upgradeIconStyle,
  upgradeTagStyle,
} from "./style"

const CreatePCBlankApp: FC<ICreateBlankAppProps> = ({
  isInModal = false,
  handleCreateBlankApp,
  closeModal,
}) => {
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()
  const createBlankApp = async () => {
    setLoading(true)
    try {
      await handleCreateBlankApp(APP_TYPE.PC)
    } catch (e) {
    } finally {
      setLoading(false)
    }
    closeModal?.()
  }
  return (
    <div
      css={createOptionsContainerStyle(
        isInModal,
        getColor("techPurple", "03"),
        loading,
      )}
      onClick={createBlankApp}
    >
      <div css={iconStyle}>
        {loading ? <Loading colorScheme="white" /> : <AddIcon size="16px" />}
      </div>
      <span>{t("new_dashboard.create_new.create_a_blank_app")}</span>
    </div>
  )
}

const CreateMobileBlankApp: FC<ICreateBlankAppProps> = ({
  isInModal = false,
  handleCreateBlankApp,
  closeModal,
}) => {
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()
  const createBlankApp = async () => {
    setLoading(true)
    try {
      await handleCreateBlankApp(APP_TYPE.MOBILE)
    } catch (e) {
    } finally {
      setLoading(false)
    }
    closeModal?.()
  }

  const currentTeamInfo = useSelector(getCurrentTeamInfo)

  const teamPlan = getPlanUtils(currentTeamInfo)
  const canUsePremium =
    teamPlan === SUBSCRIBE_PLAN.TEAM_LICENSE_PLUS ||
    teamPlan === SUBSCRIBE_PLAN.TEAM_LICENSE_PREMIUM
  return (
    <div
      css={createOptionsContainerStyle(
        isInModal,
        getColor("blue", "03"),
        loading,
      )}
      onClick={createBlankApp}
    >
      <div css={iconStyle}>
        {loading ? <Loading colorScheme="white" /> : <AddIcon size="16px" />}
      </div>
      {!canUsePremium && (
        <div css={upgradeTagStyle}>
          <UpgradeIcon css={upgradeIconStyle} />{" "}
          <span>{t("billing.new_pricing.upgrade")}</span>
        </div>
      )}
      <span>{t("new_dashboard.create_new.create_mobile_app")}</span>
    </div>
  )
}

const CreateFromDatabase: FC<ICreateFromDatabaseProps> = ({
  isInModal = false,
  handleOpenCreateFromResource,
  closeModal,
}) => {
  const { t } = useTranslation()
  const createFromDatabase = async () => {
    closeModal?.()
    handleOpenCreateFromResource()
  }
  return (
    <div
      css={createOptionsContainerStyle(isInModal, "#1AB0F1")}
      onClick={createFromDatabase}
    >
      <div css={iconStyle}>
        <AddIcon size="16px" />
      </div>
      <span>{t("new_dashboard.create_new.generate_crud_short")}</span>
    </div>
  )
}

export const CreateOptions: FC<ICreateOptionsProps> = (props) => {
  const {
    isInModal,
    handleCreateBlankApp,
    handleOpenCreateFromResource,
    closeModal,
  } = props
  return (
    <div css={createOptionsStyle}>
      <CreatePCBlankApp
        closeModal={closeModal}
        isInModal={isInModal}
        handleCreateBlankApp={handleCreateBlankApp}
      />
      {/* <CreateMobileBlankApp
        closeModal={closeModal}
        isInModal={isInModal}
        handleCreateBlankApp={handleCreateBlankApp}
      /> */}
      <CreateFromDatabase
        closeModal={closeModal}
        isInModal={isInModal}
        handleOpenCreateFromResource={handleOpenCreateFromResource}
      />
    </div>
  )
}

export default CreateOptions
