export enum CONTAINER_TYPE {
  "EDITOR_DOT_PANEL" = "EDITOR_DOT_PANEL",
  "EDITOR_SCALE_SQUARE" = "EDITOR_SCALE_SQUARE",
  "EDITOR_PAGE_SQUARE" = "EDITOR_PAGE_SQUARE",
  "EDITOR_LAYOUT_SQUARE" = "EDITOR_LAYOUT_SQUARE",
}

interface BaseComponentNode {
  version: number
  displayName: string
  parentNode: string | null
  showName: string
  type: string
  containerType: CONTAINER_TYPE
  h: number
  w: number
  minH: number
  minW: number
  // default -1
  x: number
  // default -1
  y: number
  // default 0
  z: number
  props: {
    [key: string]: any
  } | null
}

export interface ComponentMapNode extends BaseComponentNode {
  childrenNode: string[]
}

export interface ComponentTreeNode extends BaseComponentNode {
  childrenNode: ComponentTreeNode[]
}

export interface SectionViewShape {
  viewDisplayName: string
  key: string
  id: string
  path: string
}

export interface BaseSectionNodeProps {
  currentViewIndex: number
  viewSortedKey: string[]
  sectionViewConfigs: SectionViewShape[]
  defaultViewKey: string
  style?: {
    dividerColor?: string
    background?: string
    shadowSize?: "none" | "small" | "medium" | "large"
    padding?: {
      mode: PADDING_MODE
      size: string
    }
  }
}

export interface LeftOrRightSectionNodeProps extends BaseSectionNodeProps {
  showFoldIcon: boolean
}

export type SectionNodeProps =
  | LeftOrRightSectionNodeProps
  | BaseSectionNodeProps

export interface SectionTreeNode extends ComponentTreeNode {
  type: "SECTION_NODE"
  props: SectionNodeProps
}

export interface SectionMapNode extends ComponentMapNode {
  type: "SECTION_NODE"
  props: SectionNodeProps
}

export enum PADDING_MODE {
  ALL = "all",
  PARTIAL = "partial",
}

export interface ModalSectionNodeProps {
  sortedKey?: string[]
  currentIndex?: number
}

export interface ModalSectionNode extends ComponentTreeNode {
  type: "MODAL_SECTION_NODE"
  props: ModalSectionNodeProps
}

export enum SECTION_POSITION {
  "TOP" = "TOP",
  "BOTTOM" = "BOTTOM",
  "CENTER" = "CENTER",
  "FULL" = "FULL",
  "NONE" = "NONE",
}
