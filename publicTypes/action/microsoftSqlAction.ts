export type MicrosoftSqlActionMode = "gui" | "sql" | "sql-safe"

export type MicrosoftSqlActionSqlMode = {
  sql: string
}

export type MicrosoftSqlActionGUIMode = {
  table: string
  type: string
  records: string
}

export type MicrosoftSqlActionType =
  | MicrosoftSqlActionSqlMode
  | MicrosoftSqlActionGUIMode

export interface MicrosoftSqlAction<T extends MicrosoftSqlActionType> {
  mode: MicrosoftSqlActionMode
  query: T
}
