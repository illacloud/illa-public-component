import { UpgradeCollarDrawer } from "./collaPop/drawer"
import { PayErrorModalPop } from "./collaPop/errorModal"
import { UpgradeCollarModal } from "./collaPop/modal"
import { UpgradeLicenseDrawer } from "./licensePop/drawer"
import { UpgradeLicenseModal } from "./licensePop/modal"
import { StoragePop } from "./storagePop/index"

export const UpgradeModalGroup = () => {
  return (
    <>
      <UpgradeLicenseModal />
      <UpgradeLicenseDrawer />
      <UpgradeCollarDrawer />
      <UpgradeCollarModal />
      <PayErrorModalPop />
      <StoragePop />
    </>
  )
}
export * from "./hook"
export * from "./service/interface"
export * from "./interface"
