export type MysqlLikeActionMode = "gui" | "sql" | "sql-safe"

export interface MysqlLikeAction {
  mode: MysqlLikeActionMode
  query: string
}
