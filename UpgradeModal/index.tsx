import { UpgradeCollarDrawer } from "./collaPop/drawer"
import { UpgradeCollarModal } from "./collaPop/modal"
import { UpgradeLicenseDrawer } from "./licensePop/drawer"
import { UpgradeLicenseModal } from "./licensePop/modal"
import { TeamLimitPop } from "./licensePop/teamLimit"
import { StoragePop } from "./storagePop/index"

export const UpgradeModalGroup = () => {
  return (
    <>
      <UpgradeLicenseModal />
      <UpgradeLicenseDrawer />
      <UpgradeCollarDrawer />
      <UpgradeCollarModal />
      <TeamLimitPop />
      <StoragePop />
    </>
  )
}
export * from "./hook"
export * from "./service/interface"
export * from "./interface"
export { handleCollaPurchaseError, handleFreeTeamLimitError } from "./utils"
