import { generateBaseActionItem } from "@illa-public/public-configs"
import { ACTION_RUN_TIME, ActionType } from "@illa-public/public-types"
import { v4 } from "uuid"
import { BuildActionInfo, COLUMN_TYPE, DatasetTableRows } from "../interface"

const getBaseActionConfig = (
  actionType: ActionType,
  query: string,
  resourceID: string,
  displayName: string,
): BuildActionInfo => {
  const baseActionItem = generateBaseActionItem(displayName, resourceID)
  return {
    ...baseActionItem,
    actionType,
    content: {
      mode: "sql-safe",
      query,
      successEvent: [
        {
          actionType: "datasource",
          eventType: "success",
          id: v4(),
          queryID: "listData",
        },
      ],
    },
  }
}

const buildListDataAction = (
  actionType: ActionType,
  resourceID: string,
  modelName: string,
  rows: DatasetTableRows[],
): BuildActionInfo => {
  const baseActionItem = generateBaseActionItem("listData", resourceID)
  let query = `select * from ${modelName}\nwhere {{!input1.value}}`
  rows.forEach(({ name, inputType: { valueType } }) => {
    if (valueType === COLUMN_TYPE.TEXT) {
      query += ` or ${name} like '%{{input1.value}}%'`
    }
  })
  return {
    ...baseActionItem,
    actionType,
    config: {
      public: false,
      advancedConfig: {
        runtime: ACTION_RUN_TIME.APP_LOADED,
        pages: [],
        delayWhenLoaded: "",
        displayLoadingPage: false,
        isPeriodically: false,
        periodInterval: "",
      },
    },
    content: {
      mode: "sql-safe",
      query,
    },
    triggerMode: "automate",
  }
}

const buildDeleteRowAction = (
  actionType: ActionType,
  resourceID: string,
  modelName: string,
  rows: DatasetTableRows[],
): BuildActionInfo => {
  let query = `DELETE FROM ${modelName} WHERE`
  if (rows.some(({ name }) => name === "id")) {
    query += " id = {{dataGrid1.selectedRows[0].id}}"
  } else {
    const name = rows[0].name
    query += ` ${name} = {{dataGrid1.selectedRows[0].${name}}}`
  }

  return getBaseActionConfig(actionType, query, resourceID, "deleteRow")
}

const buildUpdateRowAction = (
  actionType: ActionType,
  resourceID: string,
  modelName: string,
  rows: DatasetTableRows[],
  editInputDisplayNames: string[],
): BuildActionInfo => {
  let query = `UPDATE ${modelName} SET ${rows
    .map(({ name, inputType: { valueType } }, index) =>
      valueType === COLUMN_TYPE.TEXT || valueType === COLUMN_TYPE.DATE
        ? `${name} = '{{${editInputDisplayNames[index]}.value}}'`
        : `${name} = {{${editInputDisplayNames[index]}.value}}`,
    )
    .join(",")}`

  if (rows.some(({ name }) => name === "id")) {
    query += " WHERE id = {{dataGrid1.selectedRows[0].id}}"
  } else {
    const name = rows[0].name
    query += ` WHERE ${name} = {{dataGrid1.selectedRows[0].${name}}}`
  }
  return getBaseActionConfig(actionType, query, resourceID, "updateRow")
}

const buildAddRowAction = (
  actionType: ActionType,
  resourceID: string,
  modelName: string,
  rows: DatasetTableRows[],
  addInputDisplayNames: string[],
): BuildActionInfo => {
  const inputQuery = rows
    .map(({ inputType: { valueType } }, index) =>
      valueType === COLUMN_TYPE.TEXT || valueType === COLUMN_TYPE.DATE
        ? `'{{${addInputDisplayNames[index]}.value}}'`
        : `{{${addInputDisplayNames[index]}.value}}`,
    )
    .join(",")
  let query = `INSERT INTO ${modelName} (${rows
    .map(({ name }) => name)
    .join(",")}) values (${inputQuery})`

  return getBaseActionConfig(actionType, query, resourceID, "addRow")
}

export const buildActionInfo = (
  actionType: ActionType,
  resourceID: string,
  modelName: string,
  rows: DatasetTableRows[],
  editInputDisplayNames: string[],
  addInputDisplayNames: string[],
) => {
  const showRows = rows.filter(({ isSelected }) => isSelected)
  const listDataAction = buildListDataAction(
    actionType,
    resourceID,
    modelName,
    showRows,
  )
  const deleteRowAction = buildDeleteRowAction(
    actionType,
    resourceID,
    modelName,
    showRows,
  )
  const updateRowAction = buildUpdateRowAction(
    actionType,
    resourceID,
    modelName,
    showRows,
    editInputDisplayNames,
  )

  const addRowAction = buildAddRowAction(
    actionType,
    resourceID,
    modelName,
    showRows,
    addInputDisplayNames,
  )

  return [listDataAction, deleteRowAction, updateRowAction, addRowAction]
}
