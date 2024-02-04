import { CONTAINER_TYPE, ComponentTreeNode } from "@illa-public/public-types"
import { v4 } from "uuid"
import { FORM_VIEW, FORM_WIDGET_TYPE, RESOURCE_TYPE } from "../interface"
import { DatasetTableRows } from "../interface"
import { getColumType } from "../utils"

const NODE_START_POSITION_Y = 10
const NODE_SPACE_STEP = 9
const DIVIDER_H = 5

const buildNumberInput = (
  valueKey: string,
  index: number,
  view: FORM_VIEW,
  labelKey: string,
): ComponentTreeNode => {
  const displayName = `numberInput_${view}_${index}`
  return {
    w: 32,
    h: 5,
    minW: 1,
    minH: 3,
    x: 0,
    y: NODE_START_POSITION_Y + index * NODE_SPACE_STEP,
    z: 0,
    showName: "numberInput",
    type: "NUMBER_INPUT_WIDGET",
    displayName: `${displayName}`,
    containerType: CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
    parentNode: view === FORM_VIEW.EDIT ? "canvas4" : "canvas5",
    childrenNode: [],
    props: {
      value:
        view === FORM_VIEW.EDIT
          ? `{{dataGrid1.selectedRows[0].${valueKey}}}`
          : "{{1}}",
      label: labelKey,
      labelAlign: "left",
      labelPosition: "top",
      labelWidth: "{{33}}",
      colorScheme: "blue",
      hidden: false,
      formDataKey: `{{${displayName}.displayName}}`,
      $dynamicAttrPaths: ["labelWidth", "formDataKey", "value"],
    },
    version: 0,
  }
}

const buildSlider = (
  valueKey: string,
  index: number,
  view: FORM_VIEW,
  labelKey: string,
): ComponentTreeNode => {
  const displayName = `slider_${view}_${index}`
  return {
    w: 32,
    h: 6,
    minW: 1,
    minH: 3,
    x: 0,
    y: NODE_START_POSITION_Y + index * NODE_SPACE_STEP,
    z: 0,
    showName: "slider",
    type: "SLIDER_WIDGET",
    displayName: `${displayName}`,
    containerType: CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
    parentNode: view === FORM_VIEW.EDIT ? "canvas4" : "canvas5",
    childrenNode: [],
    props: {
      value:
        view === FORM_VIEW.EDIT
          ? `{{dataGrid1.selectedRows[0].${valueKey}}}`
          : "{{0}}",
      min: "{{0}}",
      max: "{{10}}",
      step: "{{1}}",
      label: labelKey,
      labelAlign: "left",
      labelPosition: "top",
      labelWidth: "{{33}}",
      hideOutput: false,
      disabled: false,
      colorScheme: "blue",
      hidden: false,
      formDataKey: `{{${displayName}.displayName}}`,
      $dynamicAttrPaths: [
        "value",
        "min",
        "max",
        "step",
        "labelWidth",
        "formDataKey",
      ],
    },
    version: 0,
  }
}

const buildRate = (
  valueKey: string,
  index: number,
  view: FORM_VIEW,
  labelKey: string,
): ComponentTreeNode => {
  const displayName = `rate_${view}_${index}`
  return {
    w: 32,
    h: 5,
    minW: 1,
    minH: 3,
    x: 0,
    y: NODE_START_POSITION_Y + index * NODE_SPACE_STEP,
    z: 0,
    showName: "rate",
    type: "RATE_WIDGET",
    displayName: `${displayName}`,
    containerType: CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
    parentNode: view === FORM_VIEW.EDIT ? "canvas4" : "canvas5",
    childrenNode: [],
    props: {
      value:
        view === FORM_VIEW.EDIT
          ? `{{dataGrid1.selectedRows[0].${valueKey}}}`
          : "{{1}}",
      label: labelKey,
      allowHalf: true,
      maxCount: "{{5}}",
      icon: "star",
      labelAlign: "left",
      labelPosition: "top",
      labelWidth: "{{33}}",
      hidden: false,
      $dynamicAttrPaths: ["value", "maxCount", "labelWidth"],
    },
    version: 0,
  }
}

const buildSelect = (
  valueKey: string,
  index: number,
  view: FORM_VIEW,
  labelKey: string,
): ComponentTreeNode => {
  const displayName = `select_${view}_${index}`
  return {
    w: 32,
    h: 8,
    minW: 1,
    minH: 3,
    x: 0,
    y: NODE_START_POSITION_Y + index * NODE_SPACE_STEP,
    z: 0,
    showName: "select",
    type: "SELECT_WIDGET",
    displayName: `${displayName}`,
    containerType: CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
    parentNode: view === FORM_VIEW.EDIT ? "canvas4" : "canvas5",
    childrenNode: [],
    props: {
      optionConfigureMode: "static",
      value:
        view === FORM_VIEW.EDIT
          ? `{{dataGrid1.selectedRows[0].${valueKey}}}`
          : "{{1}}",
      label: labelKey,
      labelAlign: "left",
      labelPosition: "top",
      labelWidth: "{{33}}",
      manualOptions: [],
      dataSources: "{{[]}}",
      colorScheme: "blue",
      hidden: false,
      formDataKey: `{{${displayName}.displayName}}`,
      $dynamicAttrPaths: ["labelWidth", "dataSources", "formDataKey", "value"],
    },
    version: 0,
  }
}

const buildRadioButton = (
  valueKey: string,
  index: number,
  view: FORM_VIEW,
  labelKey: string,
): ComponentTreeNode => {
  const displayName = `radioButton_${view}_${index}`
  const manualOptions =
    view === FORM_VIEW.EDIT
      ? [
          {
            id: v4(),
            label: `{{dataGrid1.selectedRows[0].${valueKey}}}`,
            value: `{{dataGrid1.selectedRows[0].${valueKey}}}`,
          },
        ]
      : []
  return {
    w: 32,
    h: 8,
    minW: 1,
    minH: 3,
    x: 0,
    y: NODE_START_POSITION_Y + index * NODE_SPACE_STEP,
    z: 0,
    showName: "radioButton",
    type: "RADIO_BUTTON_WIDGET",
    displayName: `${displayName}`,
    containerType: CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
    parentNode: view === FORM_VIEW.EDIT ? "canvas4" : "canvas5",
    childrenNode: [],
    props: {
      optionConfigureMode: "static",
      label: labelKey,
      labelAlign: "left",
      labelPosition: "top",
      labelWidth: "{{33}}",
      manualOptions,
      dataSources: "{{[]}}",
      colorScheme: "blue",
      value:
        view === FORM_VIEW.EDIT
          ? `{{dataGrid1.selectedRows[0].${valueKey}}}`
          : "",
      hidden: false,
      formDataKey: `{{${displayName}.displayName}}`,
      $dynamicAttrPaths: ["labelWidth", "dataSources", "formDataKey", "value"],
    },
    version: 0,
  }
}

const buildRadio = (
  valueKey: string,
  index: number,
  view: FORM_VIEW,
  labelKey: string,
): ComponentTreeNode => {
  const displayName = `radioGroup_${view}_${index}`
  const manualOptions =
    view === FORM_VIEW.EDIT
      ? [
          {
            id: v4(),
            label: `{{dataGrid1.selectedRows[0].${valueKey}}}`,
            value: `{{dataGrid1.selectedRows[0].${valueKey}}}`,
          },
        ]
      : []
  return {
    w: 32,
    h: 8,
    minW: 1,
    minH: 3,
    x: 0,
    y: NODE_START_POSITION_Y + index * NODE_SPACE_STEP,
    z: 0,
    showName: "radioGroup",
    type: "RADIO_GROUP_WIDGET",
    displayName: `${displayName}`,
    containerType: CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
    parentNode: view === FORM_VIEW.EDIT ? "canvas4" : "canvas5",
    childrenNode: [],
    props: {
      optionConfigureMode: "static",
      label: labelKey,
      labelAlign: "left",
      labelPosition: "top",
      labelWidth: "{{33}}",
      manualOptions: manualOptions,
      value:
        view === FORM_VIEW.EDIT
          ? `{{dataGrid1.selectedRows[0].${valueKey}}}`
          : "",
      hidden: false,
      formDataKey: `{{${displayName}.displayName}}`,
      direction: "horizontal",
      dataSources: "{{[]}}",
      colorScheme: "blue",
      $dynamicAttrPaths: ["labelWidth", "dataSources", "formDataKey", "value"],
    },
    version: 0,
  }
}

const buildDate = (
  valueKey: string,
  index: number,
  view: FORM_VIEW,
  labelKey: string,
): ComponentTreeNode => {
  const displayName = `date_${view}_${index}`
  return {
    w: 32,
    h: 8,
    minW: 1,
    minH: 3,
    x: 0,
    y: NODE_START_POSITION_Y + index * NODE_SPACE_STEP,
    z: 0,
    showName: "date",
    type: "DATE_WIDGET",
    displayName: `${displayName}`,
    containerType: CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
    parentNode: view === FORM_VIEW.EDIT ? "canvas4" : "canvas5",
    childrenNode: [],
    props: {
      value:
        view === FORM_VIEW.EDIT
          ? `{{dataGrid1.selectedRows[0].${valueKey}}}`
          : undefined,
      dateFormat: "YYYY-MM-DD",
      colorScheme: "blue",
      label: labelKey,
      labelAlign: "left",
      labelPosition: "top",
      labelWidth: "{{33}}",
      hidden: false,
      formDataKey: `{{${displayName}.displayName}}`,
      $dynamicAttrPaths: ["labelWidth", "formDataKey", "value"],
    },
    version: 0,
  }
}

const buildDateTime = (
  valueKey: string,
  index: number,
  view: FORM_VIEW,
  labelKey: string,
): ComponentTreeNode => {
  const displayName = `dateTime_${view}_${index}`
  return {
    w: 32,
    h: 5,
    minW: 1,
    minH: 3,
    x: 0,
    y: NODE_START_POSITION_Y + index * NODE_SPACE_STEP,
    z: 0,
    showName: "dateTime",
    type: "DATE_TIME_WIDGET",
    displayName: `${displayName}`,
    containerType: CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
    parentNode: view === FORM_VIEW.EDIT ? "canvas4" : "canvas5",
    childrenNode: [],
    props: {
      value:
        view === FORM_VIEW.EDIT
          ? `{{dataGrid1.selectedRows[0].${valueKey}}}`
          : undefined,
      placeholder: "Select time",
      format: "YYYY-MM-DD HH:mm:ss",
      minuteStep: "{{1}}",
      colorScheme: "blue",
      label: labelKey,
      labelAlign: "left",
      labelPosition: "top",
      labelWidth: "{{33}}",
      hidden: false,
      formDataKey: `{{${displayName}.displayName}}`,
      $dynamicAttrPaths: ["minuteStep", "labelWidth", "formDataKey", "value"],
    },
    version: 0,
  }
}

const buildTime = (
  valueKey: string,
  index: number,
  view: FORM_VIEW,
  labelKey: string,
): ComponentTreeNode => {
  const displayName = `timePicker_${view}_${index}`
  return {
    w: 32,
    h: 5,
    minW: 1,
    minH: 3,
    x: 0,
    y: NODE_START_POSITION_Y + index * NODE_SPACE_STEP,
    z: 0,
    showName: "timePicker",
    type: "TIME_PICKER_WIDGET",
    displayName: `${displayName}`,
    containerType: CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
    parentNode: view === FORM_VIEW.EDIT ? "canvas4" : "canvas5",
    childrenNode: [],
    props: {
      placeholder: "Select time",
      format: "HH:mm:ss",
      value:
        view === FORM_VIEW.EDIT
          ? `{{dataGrid1.selectedRows[0].${valueKey}}}`
          : undefined,
      minuteStep: "{{15}}",
      colorScheme: "blue",
      label: labelKey,
      labelAlign: "left",
      labelPosition: "top",
      labelWidth: "{{33}}",
      hidden: false,
      showClear: true,
      formDataKey: `{{${displayName}.displayName}}`,
      $dynamicAttrPaths: ["minuteStep", "labelWidth", "formDataKey", "value"],
    },
    version: 0,
  }
}

const buildInput = (
  valueKey: string,
  index: number,
  type: FORM_WIDGET_TYPE,
  view: FORM_VIEW,
  labelKey: string,
): ComponentTreeNode => {
  let inputType = "input",
    pattern
  switch (type) {
    case FORM_WIDGET_TYPE.INPUT:
      inputType = "input"
      break
    case FORM_WIDGET_TYPE.EMAIL:
      inputType = "input"
      pattern = "Email"
      break
    case FORM_WIDGET_TYPE.URL:
      inputType = "input"
      pattern = "URL"
      break
    case FORM_WIDGET_TYPE.PASSWORD:
      inputType = "password"
      break
  }
  const displayName = `input_${view}_${index}`
  return {
    w: 32,
    h: 8,
    minW: 1,
    minH: 3,
    x: 0,
    y: NODE_START_POSITION_Y + index * NODE_SPACE_STEP,
    z: 0,
    showName: "input",
    type: "INPUT_WIDGET",
    displayName: `${displayName}`,
    containerType: CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
    parentNode: view === FORM_VIEW.EDIT ? "canvas4" : "canvas5",
    childrenNode: [],
    props: {
      value:
        view === FORM_VIEW.EDIT
          ? `{{dataGrid1.selectedRows[0].${valueKey}}}`
          : "",
      label: labelKey,
      labelAlign: "left",
      labelPosition: "top",
      labelWidth: "{{33}}",
      colorScheme: "blue",
      hidden: false,
      formDataKey: `{{${displayName}.displayName}}`,
      placeholder: "input sth",
      $dynamicAttrPaths: [
        "labelWidth",
        "formDataKey",
        "showVisibleButton",
        "value",
      ],
      type: inputType,
      pattern,
      showVisibleButton: "{{true}}",
    },
    version: 0,
  }
}

const buildTextArea = (
  valueKey: string,
  index: number,
  view: FORM_VIEW,
  labelKey: string,
): ComponentTreeNode => {
  const displayName = `textarea_${view}_${index}`
  return {
    w: 32,
    h: 8,
    minW: 1,
    minH: 3,
    x: 0,
    y: NODE_START_POSITION_Y + index * NODE_SPACE_STEP,
    z: 0,
    showName: "textarea",
    type: "TEXTAREA_INPUT_WIDGET",
    displayName: `${displayName}`,
    containerType: CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
    parentNode: view === FORM_VIEW.EDIT ? "canvas4" : "canvas5",
    childrenNode: [],
    props: {
      value:
        view === FORM_VIEW.EDIT
          ? `{{dataGrid1.selectedRows[0].${valueKey}}}`
          : "",
      label: labelKey,
      labelAlign: "left",
      labelPosition: "top",
      labelWidth: "{{33}}",
      colorScheme: "blue",
      hidden: false,
      formDataKey: `{{${displayName}.displayName}}`,
      placeholder: "enter sth",
      dynamicHeight: "fixed",
      resizeDirection: "ALL",
      $dynamicAttrPaths: ["labelWidth", "formDataKey", "value"],
    },
    version: 0,
  }
}

const buildEditableText = (
  valueKey: string,
  index: number,
  view: FORM_VIEW,
  labelKey: string,
): ComponentTreeNode => {
  const displayName = `editable_text_${view}_${index}`
  return {
    w: 32,
    h: 8,
    minW: 1,
    minH: 3,
    x: 0,
    y: NODE_START_POSITION_Y + index * NODE_SPACE_STEP,
    z: 0,
    showName: "editable_text",
    type: "EDITABLE_TEXT_WIDGET",
    displayName: `${displayName}`,
    containerType: CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
    parentNode: view === FORM_VIEW.EDIT ? "canvas4" : "canvas5",
    childrenNode: [],
    props: {
      value:
        view === FORM_VIEW.EDIT
          ? `{{dataGrid1.selectedRows[0].${valueKey}}}`
          : "",
      label: labelKey,
      labelAlign: "left",
      labelPosition: "top",
      labelWidth: "{{33}}",
      colorScheme: "blue",
      hidden: false,
      $dynamicAttrPaths: ["labelWidth", "value"],
    },
    version: 0,
  }
}

const buildCascader = (
  valueKey: string,
  index: number,
  view: FORM_VIEW,
  labelKey: string,
): ComponentTreeNode => {
  const displayName = `cascader_${view}_${index}`
  const dataSourceJS = `{{[\n  {\n    label: dataGrid1.selectedRows[0].${valueKey},\n    value: dataGrid1.selectedRows[0].${valueKey},\n  }\n]}}`
  return {
    w: 32,
    h: 8,
    minW: 1,
    minH: 3,
    x: 0,
    y: NODE_START_POSITION_Y + index * NODE_SPACE_STEP,
    z: 0,
    showName: "cascader",
    type: "CASCADER_WIDGET",
    displayName: `${displayName}`,
    containerType: CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
    parentNode: view === FORM_VIEW.EDIT ? "canvas4" : "canvas5",
    childrenNode: [],
    props: {
      dataSourceJS: view === FORM_VIEW.EDIT ? dataSourceJS : "",
      value:
        view === FORM_VIEW.EDIT
          ? `{{dataGrid1.selectedRows[0].${valueKey}}}`
          : "",
      placeholder: "",
      label: labelKey,
      labelAlign: "left",
      labelPosition: "top",
      labelWidth: "{{33}}",
      dataSourceMode: "dynamic",
      expandTrigger: "click",
      $dynamicAttrPaths: ["dataSourceJS", "value", "labelWidth", "value"],
    },
    version: 0,
  }
}

const buildSwitch = (
  valueKey: string,
  index: number,
  view: FORM_VIEW,
  labelKey: string,
): ComponentTreeNode => {
  const displayName = `switch_${view}_${index}`
  return {
    w: 32,
    h: 3,
    minW: 1,
    minH: 3,
    x: 0,
    y: NODE_START_POSITION_Y + index * NODE_SPACE_STEP,
    z: 0,
    showName: "switch",
    type: "SWITCH_WIDGET",
    displayName: `${displayName}`,
    containerType: CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
    parentNode: view === FORM_VIEW.EDIT ? "canvas4" : "canvas5",
    childrenNode: [],
    props: {
      label: labelKey,
      value:
        view === FORM_VIEW.EDIT
          ? `{{dataGrid1.selectedRows[0].${valueKey}}}`
          : undefined,
      labelAlign: "left",
      labelPosition: "left",
      labelWidth: "{{33}}",
      labelFull: "{{true}}",
      colorScheme: "blue",
      hidden: "{{false}}",
      $dynamicAttrPaths: ["labelWidth", "labelFull", "hidden", "value"],
    },
    version: 0,
  }
}

const buildCheckbox = (
  valueKey: string,
  index: number,
  view: FORM_VIEW,
  labelKey: string,
): ComponentTreeNode => {
  const displayName = `checkboxGroup_${view}_${index}`
  const manualOptions =
    view === FORM_VIEW.EDIT
      ? [
          {
            id: v4(),
            label: `{{dataGrid1.selectedRows[0].${valueKey}}}`,
            value: `{{dataGrid1.selectedRows[0].${valueKey}}}`,
          },
        ]
      : []
  return {
    w: 32,
    h: 8,
    minW: 1,
    minH: 3,
    x: 0,
    y: NODE_START_POSITION_Y + index * NODE_SPACE_STEP,
    z: 0,
    showName: "checkboxGroup",
    type: "CHECKBOX_GROUP_WIDGET",
    displayName: `${displayName}`,
    containerType: CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
    parentNode: view === FORM_VIEW.EDIT ? "canvas4" : "canvas5",
    childrenNode: [],
    props: {
      optionConfigureMode: "static",
      label: labelKey,
      labelAlign: "left",
      labelPosition: "top",
      labelWidth: "{{33}}",
      value:
        view === FORM_VIEW.EDIT
          ? `{{dataGrid1.selectedRows[0].${valueKey}}}`
          : undefined,
      manualOptions,
      dataSources: "{{[]}}",
      direction: "horizontal",
      colorScheme: "blue",
      formDataKey: `{{${displayName}.displayName}}`,
      $dynamicAttrPaths: ["labelWidth", "dataSources", "formDataKey", "value"],
    },
    version: 0,
  }
}

const buildMultiSelect = (
  valueKey: string,
  index: number,
  view: FORM_VIEW,
  labelKey: string,
): ComponentTreeNode => {
  const displayName = `multiselect_${view}_${index}`
  const manualOptions =
    view === FORM_VIEW.EDIT
      ? [
          {
            id: v4(),
            label: `{{dataGrid1.selectedRows[0].${valueKey}}}`,
            value: `{{dataGrid1.selectedRows[0].${valueKey}}}`,
          },
        ]
      : []
  return {
    w: 32,
    h: 5,
    minW: 1,
    minH: 3,
    x: 0,
    y: NODE_START_POSITION_Y + index * NODE_SPACE_STEP,
    z: 0,
    showName: "multiselect",
    type: "MULTISELECT_WIDGET",
    displayName: `${displayName}`,
    containerType: CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
    parentNode: view === FORM_VIEW.EDIT ? "canvas4" : "canvas5",
    childrenNode: [],
    props: {
      label: labelKey,
      value:
        view === FORM_VIEW.EDIT
          ? `{{dataGrid1.selectedRows[0].${valueKey}}}`
          : undefined,
      optionConfigureMode: "static",
      labelAlign: "left",
      labelPosition: "top",
      labelWidth: "{{33}}",
      dataSources: "{{[]}}",
      colorScheme: "blue",
      hidden: false,
      manualOptions,
      dynamicHeight: "auto",
      formDataKey: `{{${displayName}.displayName}}`,
      resizeDirection: "HORIZONTAL",
      $dynamicAttrPaths: ["labelWidth", "dataSources", "formDataKey", "value"],
    },
    version: 0,
  }
}

const buildSwitchGroup = (
  valueKey: string,
  index: number,
  view: FORM_VIEW,
  labelKey: string,
): ComponentTreeNode => {
  const displayName = `switchGroup_${view}_${index}`
  const manualOptions =
    view === FORM_VIEW.EDIT
      ? [
          {
            id: v4(),
            label: `{{dataGrid1.selectedRows[0].${valueKey}}}`,
            value: `{{dataGrid1.selectedRows[0].${valueKey}}}`,
          },
        ]
      : []
  return {
    w: 32,
    h: 6,
    minW: 1,
    minH: 3,
    x: 0,
    y: NODE_START_POSITION_Y + index * NODE_SPACE_STEP,
    z: 0,
    showName: "switchGroup",
    type: "SWITCH_GROUP_WIDGET",
    displayName: `${displayName}`,
    containerType: CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
    parentNode: view === FORM_VIEW.EDIT ? "canvas4" : "canvas5",
    childrenNode: [],
    props: {
      optionConfigureMode: "static",
      value:
        view === FORM_VIEW.EDIT
          ? `{{dataGrid1.selectedRows[0].${valueKey}}}`
          : undefined,
      label: labelKey,
      labelAlign: "left",
      labelPosition: "top",
      labelWidth: "{{33}}",
      manualOptions,
      dataSources: "{{[]}}",
      colorScheme: "blue",
      hidden: false,
      formDataKey: `{{${displayName}.displayName}}`,
      layoutPosition: "left",
      $dynamicAttrPaths: ["labelWidth", "dataSources", "formDataKey", "value"],
    },
    version: 0,
  }
}

export const getNodesAboutForm = (rows: DatasetTableRows[]) => {
  const editInputs: ComponentTreeNode[] = [],
    addInputs: ComponentTreeNode[] = []
  rows.forEach((row, index) => {
    const { inputType, name, label } = row
    let addInput: ComponentTreeNode, editInput: ComponentTreeNode
    switch (inputType.value) {
      case FORM_WIDGET_TYPE.NUMBER_INPUT:
        addInput = buildNumberInput(name, index, FORM_VIEW.ADD, label)
        editInput = buildNumberInput(name, index, FORM_VIEW.EDIT, label)
        break
      case FORM_WIDGET_TYPE.SLIDER:
        addInput = buildSlider(name, index, FORM_VIEW.ADD, label)
        editInput = buildSlider(name, index, FORM_VIEW.EDIT, label)
        break
      case FORM_WIDGET_TYPE.RATE:
        addInput = buildRate(name, index, FORM_VIEW.ADD, label)
        editInput = buildRate(name, index, FORM_VIEW.EDIT, label)
        break
      case FORM_WIDGET_TYPE.SELECT:
        addInput = buildSelect(name, index, FORM_VIEW.ADD, label)
        editInput = buildSelect(name, index, FORM_VIEW.EDIT, label)
        break
      case FORM_WIDGET_TYPE.RADIO_BUTTON:
        addInput = buildRadioButton(name, index, FORM_VIEW.ADD, label)
        editInput = buildRadioButton(name, index, FORM_VIEW.EDIT, label)
        break
      case FORM_WIDGET_TYPE.DATE:
        addInput = buildDate(name, index, FORM_VIEW.ADD, label)
        editInput = buildDate(name, index, FORM_VIEW.EDIT, label)
        break
      case FORM_WIDGET_TYPE.DATE_TIME:
        addInput = buildDateTime(name, index, FORM_VIEW.ADD, label)
        editInput = buildDateTime(name, index, FORM_VIEW.EDIT, label)
        break
      case FORM_WIDGET_TYPE.TIME:
        addInput = buildTime(name, index, FORM_VIEW.ADD, label)
        editInput = buildTime(name, index, FORM_VIEW.EDIT, label)
        break
      case FORM_WIDGET_TYPE.TEXT_AREA:
        addInput = buildTextArea(name, index, FORM_VIEW.ADD, label)
        editInput = buildTextArea(name, index, FORM_VIEW.EDIT, label)
        break
      case FORM_WIDGET_TYPE.EDITABLE_TEXT:
        addInput = buildEditableText(name, index, FORM_VIEW.ADD, label)
        editInput = buildEditableText(name, index, FORM_VIEW.EDIT, label)
        break
      case FORM_WIDGET_TYPE.CASCADER:
        addInput = buildCascader(name, index, FORM_VIEW.ADD, label)
        editInput = buildCascader(name, index, FORM_VIEW.EDIT, label)
        break
      case FORM_WIDGET_TYPE.SWITCH:
        addInput = buildSwitch(name, index, FORM_VIEW.ADD, label)
        editInput = buildSwitch(name, index, FORM_VIEW.EDIT, label)
        break
      case FORM_WIDGET_TYPE.CHECKBOX:
        addInput = buildCheckbox(name, index, FORM_VIEW.ADD, label)
        editInput = buildCheckbox(name, index, FORM_VIEW.EDIT, label)
        break
      case FORM_WIDGET_TYPE.MULTI_SELECT:
        addInput = buildMultiSelect(name, index, FORM_VIEW.ADD, label)
        editInput = buildMultiSelect(name, index, FORM_VIEW.EDIT, label)
        break
      case FORM_WIDGET_TYPE.RADIO:
        addInput = buildRadio(name, index, FORM_VIEW.ADD, label)
        editInput = buildRadio(name, index, FORM_VIEW.EDIT, label)
        break
      case FORM_WIDGET_TYPE.SWITCH_GROUP:
        addInput = buildSwitchGroup(name, index, FORM_VIEW.ADD, label)
        editInput = buildSwitchGroup(name, index, FORM_VIEW.EDIT, label)
        break
      case FORM_WIDGET_TYPE.INPUT:
      case FORM_WIDGET_TYPE.EMAIL:
      case FORM_WIDGET_TYPE.URL:
      case FORM_WIDGET_TYPE.PASSWORD:
        addInput = buildInput(
          name,
          index,
          inputType.value,
          FORM_VIEW.ADD,
          label,
        )
        editInput = buildInput(
          name,
          index,
          inputType.value,
          FORM_VIEW.EDIT,
          label,
        )
        break
    }
    addInputs.push(addInput)
    editInputs.push(editInput)
  })
  return {
    addInputs,
    editInputs,
  }
}

export const buildDivider = (
  view: FORM_VIEW,
  index: number,
): ComponentTreeNode => {
  const displayName = `divider_${view}`
  return {
    version: 0,
    displayName,
    parentNode: view === FORM_VIEW.EDIT ? "canvas4" : "canvas5",
    showName: "divider",
    childrenNode: [],
    type: "DIVIDER_WIDGET",
    containerType: CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
    h: 5,
    w: 32,
    minH: 3,
    minW: 1,
    x: 0,
    y: NODE_START_POSITION_Y + index * NODE_SPACE_STEP,
    z: 0,
    props: {
      $dynamicAttrPaths: [],
      colorScheme: "grayBlue",
      fs: "14px",
      hidden: false,
    },
  }
}

export const buildAddButton = (index: number): ComponentTreeNode => {
  return {
    version: 0,
    displayName: "button5",
    parentNode: "canvas5",
    showName: "button",
    childrenNode: [],
    type: "BUTTON_WIDGET",
    containerType: CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
    h: 5,
    w: 32,
    minH: 3,
    minW: 1,
    x: 0,
    y: NODE_START_POSITION_Y + DIVIDER_H + index * NODE_SPACE_STEP,
    z: 0,
    props: {
      $dynamicAttrPaths: ["loading"],
      colorScheme: "blue",
      events: [
        {
          actionType: "datasource",
          eventType: "click",
          id: v4(),
          queryID: "addRow",
        },
      ],
      hidden: false,
      loading: "{{addRow.isRunning}}",
      text: "Save changes",
      variant: "fill",
    },
  }
}

export const buildEditSaveButton = (index: number): ComponentTreeNode => {
  return {
    version: 0,
    displayName: "button1",
    parentNode: "canvas4",
    showName: "button",
    childrenNode: [],
    type: "BUTTON_WIDGET",
    containerType: CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
    h: 5,
    w: 16,
    minH: 3,
    minW: 1,
    x: 16,
    y: NODE_START_POSITION_Y + DIVIDER_H + index * NODE_SPACE_STEP,
    z: 0,
    props: {
      $dynamicAttrPaths: ["loading"],
      colorScheme: "blue",
      events: [
        {
          actionType: "datasource",
          eventType: "click",
          id: v4(),
          queryID: "updateRow",
        },
      ],
      hidden: false,
      loading: "{{updateRow.isRunning}}",
      text: "Save changes",
      variant: "fill",
    },
  }
}

export const buildEditDelButton = (index: number): ComponentTreeNode => {
  return {
    version: 0,
    displayName: "button2",
    parentNode: "canvas4",
    showName: "button",
    childrenNode: [],
    type: "BUTTON_WIDGET",
    containerType: CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
    h: 5,
    w: 15,
    minH: 3,
    minW: 1,
    x: 0,
    y: NODE_START_POSITION_Y + DIVIDER_H + index * NODE_SPACE_STEP,
    z: 0,
    props: {
      $dynamicAttrPaths: ["loading"],
      colorScheme: "red",
      events: [
        {
          actionType: "datasource",
          eventType: "click",
          id: v4(),
          queryID: "deleteRow",
        },
      ],
      hidden: false,
      loading: "{{deleteRow.isRunning}}",
      text: "Delete",
      variant: "fill",
    },
  }
}

export const buildDataGrid = (
  sqlType: RESOURCE_TYPE,
  rows: DatasetTableRows[],
): ComponentTreeNode => {
  const columns = rows.map(({ name, type }) => {
    return {
      aggregable: true,
      columnType: getColumType(sqlType, type),
      description: "",
      disableReorder: false,
      field: name,
      filterable: true,
      groupable: true,
      headerAlign: "left",
      headerName: name,
      hideable: true,
      isCalc: true,
      pinnable: true,
      resizable: true,
      sortable: true,
      width: 170,
    }
  })
  return {
    version: 0,
    displayName: "dataGrid1",
    parentNode: "canvas1",
    showName: "dataGrid",
    childrenNode: [],
    type: "DATA_GRID_WIDGET",
    containerType: CONTAINER_TYPE.EDITOR_SCALE_SQUARE,
    h: 71,
    w: 32,
    minH: 3,
    minW: 1,
    x: 0,
    y: 0,
    z: 0,
    props: {
      $dynamicAttrPaths: ["dataSourceJS", "loading"],
      columns,
      dataSource: [],
      dataSourceJS: "{{listData.data}}",
      dataSourceMode: "dynamic",
      enablePagination: false,
      events: [
        {
          actionType: "widget",
          eventType: "onRowSelectionModelChange",
          id: v4(),
          key: "View 1",
          widgetID: "container2",
          widgetMethod: "setCurrentViewKey",
        },
      ],
      excludeHiddenColumns: true,
      loading: "{{listData.isRunning}}",
      loadingDynamic: true,
      primaryKey: undefined,
      rowSelection: true,
      sortOrder: "default",
    },
  }
}
