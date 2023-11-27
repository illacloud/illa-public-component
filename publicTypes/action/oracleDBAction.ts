export type OracleDBActionModeType = "sql" | "gui" | "sql-safe"

export interface OracleDBActionSQLMode {
  raw: string
}

export interface OracleDBActionGUIMode {}

export type OracleDBActionType = OracleDBActionGUIMode | OracleDBActionSQLMode

export interface OracleDBAction<T extends OracleDBActionType> {
  mode: OracleDBActionModeType
  opts: T
}
