import {
  ActionContent,
  ActionItem,
  ComponentTreeNode,
  Resource,
} from "@illa-public/public-types"

export interface CreateWithResourceProps {
  closeModal?: () => void
  getResourceLoading?: boolean
  resourceList: Resource[]
  createCallBack: (
    appInfo: ComponentTreeNode,
    actionsInfo: BuildActionInfo[],
  ) => void
  updateResourceList: (resource: Resource) => void
}

export interface DatasetTableRows {
  isSelected: boolean
  name: string
  type: string
  label: string
  inputType: {
    valueType: COLUMN_TYPE
    value: FORM_WIDGET_TYPE
  }
}

export enum RESOURCE_TYPE {
  CLICKHOUSE = "clickhouse",
  SUPABASEDB = "supabasedb",
  MYSQL = "mysql",
  TIDB = "tidb",
  MARIADB = "mariadb",
  POSTGRESQL = "postgresql",
  SNOWFLAKE = "snowflake",
  NEON = "neon",
  HYDRA = "hydra",
  MSSQL = "mssql",
}

export enum COLUMN_TYPE {
  NUMBER = "number",
  TEXT = "text",
  BOOLEAN = "boolean",
  DATE = "date",
  TAG = "tag",
}

export enum FORM_WIDGET_TYPE {
  NUMBER_INPUT = "number_input",
  SLIDER = "slider",
  RATE = "rate",
  SELECT = "select",
  RADIO_BUTTON = "radio_button",
  RADIO = "radio",
  DATE = "date",
  DATE_TIME = "date_time",
  TIME = "time",
  INPUT = "input",
  TEXT_AREA = "text_area",
  EDITABLE_TEXT = "editable_text",
  CASCADER = "cascader",
  PASSWORD = "password",
  EMAIL = "email",
  URL = "url",
  SWITCH = "switch",
  CHECKBOX = "checkbox",
  MULTI_SELECT = "multi_select",
  SWITCH_GROUP = "switch_group",
}

export interface ISchema {
  data_type: string
}

export interface IResourceMeta {
  Success: boolean
  Schema: Record<string, unknown>
}

export type ISchemaData = Record<string, ISchema>

export enum FORM_VIEW {
  EDIT = "edit",
  ADD = "add",
}

export interface BuildAppInfo {
  appInfo: ComponentTreeNode
  editInputDisplayNames: string[]
  addInputDisplayNames: string[]
}

export interface ActionEvent {
  successEvent?: Record<string, string>[]
  failedEvent?: Record<string, string>[]
}
export type BuildActionInfo = Omit<
  ActionItem<ActionContent & ActionEvent>,
  "actionID"
>
