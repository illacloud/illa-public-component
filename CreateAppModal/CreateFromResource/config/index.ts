import { klona } from "klona/json"
import {
  BuildAppInfo,
  DatasetTableRows,
  FORM_VIEW,
  RESOURCE_TYPE,
} from "../interface"
import {
  buildAddButton,
  buildDataGrid,
  buildDivider,
  buildEditDelButton,
  buildEditSaveButton,
  getNodesAboutForm,
} from "./buildComponents"
import { ROOT_NODE } from "./rootNode"
import { searchDSLFromTree } from "./utils"

export const buildAppWithResourceSchema = (
  resource: RESOURCE_TYPE,
  rows: DatasetTableRows[],
): BuildAppInfo => {
  const appInfo = klona(ROOT_NODE)
  const editNode = searchDSLFromTree(appInfo, "canvas4")!
  const addNode = searchDSLFromTree(appInfo, "canvas5")!
  const tableNode = searchDSLFromTree(appInfo, "canvas1")!

  const { editInputs, addInputs } = getNodesAboutForm(
    rows.filter(({ isSelected }) => isSelected),
  )

  const editInputNodes = editInputs.map((inputNode) => inputNode)
  const addInputNodes = addInputs.map((inputNode) => inputNode)

  // edit form
  const editDividerNode = buildDivider(FORM_VIEW.EDIT, editInputNodes.length)
  const editSaveButtonNode = buildEditSaveButton(editInputNodes.length)
  const editDelButtonNode = buildEditDelButton(editInputNodes.length)
  editNode.childrenNode.push(
    ...editInputNodes,
    editDividerNode,
    editSaveButtonNode,
    editDelButtonNode,
  )

  // add from
  const addDividerNode = buildDivider(FORM_VIEW.ADD, addInputNodes.length)
  const addButtonNode = buildAddButton(addInputNodes.length)
  addNode.childrenNode.push(...addInputNodes, addDividerNode, addButtonNode)

  const dataGridNode = buildDataGrid(resource, rows)
  tableNode.childrenNode.push(dataGridNode)

  const editInputDisplayNames = editInputs.map(
    (inputNode) => inputNode.displayName,
  )
  const addInputDisplayNames = addInputs.map(
    (inputNode) => inputNode.displayName,
  )

  return {
    appInfo,
    editInputDisplayNames,
    addInputDisplayNames,
  }
}
