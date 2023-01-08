export enum USER_ROLE {
  "GUEST" = -1,
  "OWNER" = 1,
  "ADMIN",
  "EDITOR",
  "VIEWER",
  "CUSTOM",
}

export type ValidUserRole = Extract<
  USER_ROLE,
  USER_ROLE.OWNER | USER_ROLE.ADMIN | USER_ROLE.EDITOR | USER_ROLE.VIEWER
>

export enum USER_STATUS {
  "OK" = 1,
  "PENDING" = 2,
}

export enum ATTRIBUTE_GROUP {
  TEAM = 1, // cloud team
  TEAM_MEMBER, // cloud team member
  USER, // cloud user
  INVITE, // cloud invite
  DOMAIN, // cloud domain
  BILLING, // cloud billing
  APP, // builder app
  RESOURCE, // builder resource
  HUB, // builder hub
}

export enum ATTRIBUTE_CATEGORY {
  ACCESS = 1,
  DELETE,
  MANAGE,
  SPECIAL,
}

export enum ACTION_ACCESS {
  // Basic Attribute
  VIEW = 0, // 访问 Attribute
  // Invite Attribute
  INVITE_BY_LINK, // 使用链接邀请用户
  INVITE_BY_EMAIL, // 使用邮件邀请用户
  INVITE_OWNER,
  INVITE_ADMIN,
  INVITE_EDITOR,
  INVITE_VIEWER,
}

export enum ACTION_MANAGE {
  // Team Attribute
  TEAM_NAME = 0, // 重命名 Team Attribute
  TEAM_ICON, // 更新 icon
  TEAM_CONFIG, // 更新 team 设置
  UPDATE_TEAM_DOMAIN, // 更新 team domain
  // Team Member Attribute
  REMOVE_MEMBER, // 移除团队成员的 Attribute
  ROLE, // 修改团队成员角色的 Attribute
  ROLE_FROM_OWNER, // 将用户角色修改为 owner
  ROLE_FROM_ADMIN, // 将用户角色修改为 admin
  ROLE_FROM_EDITOR, // 将用户角色修改为 editor
  ROLE_FROM_VIEWER, // 将用户角色修改为 viewer
  ROLE_TO_OWNER, // 将用户角色修改为 owner
  ROLE_TO_ADMIN, // 将用户角色修改为 admin
  ROLE_TO_EDITOR, // 将用户角色修改为 editor
  ROLE_TO_VIEWER, // 将用户角色修改为 viewer
  // User Attribute
  RENAME_USER, // 重命名用户
  UPDATE_USER_AVATAR, // 更新 avatar
  // Invite Attribute
  CONFIG_INVITE, // 配置邀请选项和参数
  INVITE_LINK, // 配置 invite link
  // Domain Attribute
  TEAM_DOMAIN, // 更新 Team Domain
  APP_DOMAIN, // 更新 App domain
  // Billing Attribute
  PAYMENT_INFO, // 编辑付款信息
  // App Attribute
  CREATE_APP, // 创建 APP
  EDIT_APP, // 编辑 APP
  // Resource Attribute
  CREATE_RESOURCE, // 创建 Resource
  EDIT_RESOURCE, // 编辑 Resource
}

export enum ACTION_DELETE {
  DELETE = 0, // 删除 Attribute
  // Domain Attribute
  TEAM_DOMAIN, // 删除 Team Domain
  APP_DOMAIN, // 删除 App Domain
}

export enum ACTION_SPECIAL {
  // Team Attribute
  EDITOR_AND_VIEWER_CAN_INVITE_BY_LINK_SW = 0, // editor 和 viewer 可以使用链接邀请的 Attribute
  // Team Member Attribute
  TRANSFER_OWNER, // 转移 owner 的 Attribute
  // Invite Attribute
  INVITE_LINK_RENEW, // 更新邀请链接
}
