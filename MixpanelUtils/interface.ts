type ILLAPropertiesPrefix<T extends string, U> = `${T}${string & U}`

type ILLAPrefixedPropertiesInterface<T extends string, U> = {
  [key in ILLAPropertiesPrefix<T, keyof U>]: unknown
}

interface ILLAExtendedProperties {
  [key: string]: unknown
}

interface ILLABaseProperties {
  page: ILLA_PAGE_NAME
  element?: string
  consume?: number
  team_id?: string
  user_id?: string
}

type ILLAPrefixedExtendProperties = ILLAPrefixedPropertiesInterface<
  "parameter",
  ILLAExtendedProperties
>

/**
 * page: 事件发生在哪个页面
 * element: 事件发生在哪个组件上
 * consume: 处理耗时相关数据
 * parameter1: 附加的状态或选项或不同的触发方式
 * parameter2: 附加的状态或选项等、成功或失败等
 * parameter3: 最终选的或填入的内容、成功或失败的详情
 * parameter4: 最终选的或填入的内容
 * parameter5: 最终选的或填入的内容，如app_id
 * parameter6: 编辑页上报预览尺寸等
 * parameter7: page的参数等
 * parameter8: app_type，应用是什么类型，onboarding app还是普通的app
 * parameter9: app是否部署了
 * parameter10: app是否公开
 * parameter11: user_type
 * 其他字段均为预留字段
 */
export type ILLAProperties = ILLABaseProperties & ILLAPrefixedExtendProperties

export enum ILLA_MIXPANEL_EVENT_TYPE {
  VISIT = "visit",
  SHOW = "show",
  CLICK = "click",
  INITIALIZE = "initialize",
  VALIDATE = "validate",
  REQUEST = "request",
  SELECT = "select",
  FOCUS = "focus",
  BLUR = "blur",
  KEYDOWN = "keydown",
  KEYUP = "keyup",
  ADD = "add",
  DRAG = "drag",
  DUPLICATE = "duplicate",
  RENAME = "rename",
  HOVER = "hover",
  CHANGE = "change",
  DELETE = "delete",
  ILLA_ACTIVE = "illa_active",
}

export enum ILLA_MIXPANEL_CLOUD_PAGE_NAME {
  HOMEPAGE = "cloud_homepage",
  WORKSPACE = "cloud_workspace",
  MEMBER = "cloud_member",
  PROFILE_SETTING = "profile_setting",
  TEAM_SETTING = "team_setting",
  TEAM_MEMBER = "team_member",
}

export enum ILLA_MIXPANEL_PUBLIC_PAGE_NAME {
  LOGIN = "login",
  SIGNUP = "sign_up",
  FORGET_PASSWORD = "forget_password",
  ERROR_PAGE = "error_page",
  MOBILE_FORBIDDEN = "mobile_forbidden",
  PLACEHOLDER = "illa",
}

export enum ILLA_MIXPANEL_BUILDER_PAGE_NAME {
  APP = "builder_app",
  RESOURCE = "builder_resource",
  TUTORIAL = "builder_tutorial",
  EDITOR = "builder_editor",
  PREVIEW = "app_preview",
  DEPLOY = "builder_deploy",
  BUILDER_TUTORIAL_PREVIEW = "builder_tutorial_preview",
}

export type ILLA_PAGE_NAME =
  | ILLA_MIXPANEL_CLOUD_PAGE_NAME
  | ILLA_MIXPANEL_PUBLIC_PAGE_NAME
  | ILLA_MIXPANEL_BUILDER_PAGE_NAME
