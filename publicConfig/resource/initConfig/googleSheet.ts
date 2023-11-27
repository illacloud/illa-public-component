import {
  GoogleSheetAuthStatus,
  GoogleSheetResource,
} from "@illa-public/public-types"

export const GoogleSheetResourceInitial: GoogleSheetResource = {
  authentication: "serviceAccount",
  opts: {
    privateKey: "",
    status: GoogleSheetAuthStatus.Initial,
  },
}
