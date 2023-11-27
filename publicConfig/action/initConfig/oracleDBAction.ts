import { OracleDBAction, OracleDBActionType } from "@illa-public/public-types"

export const OracleDBActionSQLModeInitial = {
  raw: "",
}

export const OracleDBActionInitial: OracleDBAction<OracleDBActionType> = {
  mode: "sql-safe",
  opts: OracleDBActionSQLModeInitial,
}
