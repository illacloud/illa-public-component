import {
  APP_TYPE,
  CONTAINER_TYPE,
  ComponentTreeNode,
  ModalSectionNode,
  PADDING_MODE,
  SECTION_POSITION,
  SectionTreeNode,
} from "@illa-public/public-types"
import { v4 } from "uuid"

export const DEFAULT_BODY_COLUMNS_NUMBER = 32
export const DEFAULT_ASIDE_COLUMNS_NUMBER = 8
export const DEFAULT_MOBILE_BODY_COLUMNS_NUMBER = 8

export const BASIC_BODY_SECTION_CONFIG: SectionTreeNode = {
  displayName: "bodySection1",
  parentNode: "page1",
  showName: "bodySection",
  type: "SECTION_NODE",
  containerType: CONTAINER_TYPE.EDITOR_LAYOUT_SQUARE,
  h: 0,
  w: 0,
  minH: 0,
  minW: 0,
  x: -1,
  y: -1,
  z: 0,
  version: 0,
  props: {
    currentViewIndex: 0,
    viewSortedKey: ["bodySection1-bodySectionContainer1"],
    defaultViewKey: "sub-page1",
    sectionViewConfigs: [
      {
        id: v4(),
        viewDisplayName: "bodySection1-bodySectionContainer1",
        key: "sub-page1",
        path: "sub-page1",
      },
    ],
    style: {
      padding: {
        mode: PADDING_MODE.ALL,
        size: "24",
      },
    },
  },
  childrenNode: [
    {
      displayName: "bodySection1-bodySectionContainer1",
      parentNode: "bodySection",
      showName: "bodySection1-bodySectionContainer1",
      type: "CONTAINER_NODE",
      containerType: CONTAINER_TYPE.EDITOR_DOT_PANEL,
      h: 0,
      w: 0,
      minH: 0,
      minW: 0,
      x: -1,
      y: -1,
      z: 0,
      version: 0,
      childrenNode: [],
      props: {},
    },
  ],
}

export const BASIC_MODAL_SECTION_CONFIG: ModalSectionNode = {
  displayName: "modalSection1",
  parentNode: "page1",
  showName: "modalSection",
  type: "MODAL_SECTION_NODE",
  containerType: CONTAINER_TYPE.EDITOR_LAYOUT_SQUARE,
  h: 0,
  w: 0,
  minH: 0,
  minW: 0,
  x: -1,
  y: -1,
  z: 0,
  version: 0,
  props: {},
  childrenNode: [],
}

export const BASIC_PAGE_CONFIG: ComponentTreeNode = {
  displayName: "page1",
  parentNode: "root",
  showName: "page",
  type: "PAGE_NODE",
  containerType: CONTAINER_TYPE.EDITOR_PAGE_SQUARE,
  h: 0,
  w: 0,
  minH: 0,
  minW: 0,
  x: -1,
  y: -1,
  z: 0,
  version: 0,
  props: {
    canvasSize: "auto",
    canvasWidth: 100,
    layout: "default",
    leftPosition: SECTION_POSITION.NONE,
    rightPosition: SECTION_POSITION.NONE,
    hasFooter: false,
    hasHeader: false,
    hasLeft: false,
    hasRight: false,
    leftWidth: 0,
    rightWidth: 0,
    topHeight: 0,
    bottomHeight: 0,
    isLeftFixed: true,
    isRightFixed: true,
    isHeaderFixed: true,
    isFooterFixed: true,
    showLeftFoldIcon: false,
    showRightFoldIcon: false,
    leftColumns: DEFAULT_ASIDE_COLUMNS_NUMBER,
    rightColumns: DEFAULT_ASIDE_COLUMNS_NUMBER,
    headerColumns: DEFAULT_BODY_COLUMNS_NUMBER,
    footerColumns: DEFAULT_BODY_COLUMNS_NUMBER,
    bodyColumns: DEFAULT_BODY_COLUMNS_NUMBER,
  },
  childrenNode: [BASIC_BODY_SECTION_CONFIG, BASIC_MODAL_SECTION_CONFIG],
}

export const BASIC_APP_CONFIG: ComponentTreeNode = {
  displayName: "root",
  parentNode: "",
  showName: "root",
  type: "DOT_PANEL",
  containerType: CONTAINER_TYPE.EDITOR_DOT_PANEL,
  h: 0,
  w: 0,
  minH: 0,
  minW: 0,
  x: -1,
  y: -1,
  z: 0,
  version: 0,
  props: {
    currentPageIndex: 0,
    pageSortedKey: ["page1"],
  },
  childrenNode: [BASIC_PAGE_CONFIG],
}

export const generateAPPConfig = (appType: APP_TYPE = APP_TYPE.PC) => {
  switch (appType) {
    case APP_TYPE.PC: {
      return BASIC_APP_CONFIG
    }
    case APP_TYPE.MOBILE: {
      return {
        ...BASIC_APP_CONFIG,
        childrenNode: [
          {
            ...BASIC_PAGE_CONFIG,
            props: {
              ...BASIC_PAGE_CONFIG.props,
              bodyColumns: DEFAULT_MOBILE_BODY_COLUMNS_NUMBER,
              headerColumns: DEFAULT_MOBILE_BODY_COLUMNS_NUMBER,
              footerColumns: DEFAULT_MOBILE_BODY_COLUMNS_NUMBER,
            },
          },
        ],
      }
    }
  }
}
