import { USER_ROLE } from "@illa-public/public-types"

export interface AttributeConfigListShape {
  [key: number]: {
    [key: number]: {
      [key: number]: {
        [key: number]: boolean
      }
    }
  }
}

export type ValidUserRole = Extract<
  USER_ROLE,
  USER_ROLE.OWNER | USER_ROLE.ADMIN | USER_ROLE.EDITOR | USER_ROLE.VIEWER
>

export enum ATTRIBUTE_GROUP {
  TEAM = 1, // cloud team
  TEAM_MEMBER, // cloud team member
  USER, // cloud user
  INVITE, // cloud invite
  DOMAIN, // cloud domain
  BILLING, // cloud billing
  BUILDER_DASHBOARD, // builder dashboard
  APP, // builder app
  COMPONENTS, // builder component
  RESOURCE, // builder resource
  ACTION, // builder hub
  TRANSFORMER,
  JOB,
  TREE_STATES,
  KV_STATES,
  SET_STATES,
  PROMOTE_CODES,
  PROMOTE_CODE_USAGES,
  ROLES,
  USER_ROLE_RELATIONS,
  UNIT_ROLE_RELATIONS,
  COMPENSATING_TRANSACTIONS,
  TRANSACTION_SERIALS,
  CAPACITIES,
  DRIVE,
  PERIPHERAL_SERVICE,
  AUDIT_LOG,
  MARKETPLACE,
  AI_AGENT,
  WORKFLOW,
  FLOW_NODE,
  FLOW_ACTION,
}

export enum ATTRIBUTE_CATEGORY {
  ACCESS = 1,
  DELETE,
  MANAGE,
  SPECIAL,
}

export enum ACTION_ACCESS {
  // Basic Attribute
  VIEW = 1, // 访问 Attribute
  // Invite Attribute
  INVITE_BY_LINK, // 使用链接邀请用户
  INVITE_BY_EMAIL, // 使用邮件邀请用户
  INVITE_OWNER,
  INVITE_ADMIN,
  INVITE_EDITOR,
  INVITE_VIEWER,
}

export enum ACTION_MANAGE {
  TEAM_NAME = 1,
  TEAM_ICON,
  TEAM_CONFIG,
  UPDATE_TEAM_DOMAIN,
  REMOVE_MEMBER,
  ROLE,
  ROLE_FROM_OWNER,
  ROLE_FROM_ADMIN,
  ROLE_FROM_EDITOR,
  ROLE_FROM_VIEWER,
  ROLE_TO_OWNER,
  ROLE_TO_ADMIN,
  ROLE_TO_EDITOR,
  ROLE_TO_VIEWER,
  RENAME_USER,
  UPDATE_USER_AVATAR,
  CONFIG_INVITE,
  INVITE_LINK,
  TEAM_DOMAIN,
  APP_DOMAIN,
  PAYMENT,
  PAYMENT_INFO,
  DASHBOARD_BROADCAST,
  CREATE_APP,
  EDIT_APP,
  CREATE_RESOURCE,
  EDIT_RESOURCE,
  CREATE_ACTION, // create action
  EDIT_ACTION, // edit action
  PREVIEW_ACTION, // preview action
  RUN_ACTION, // run action
  CREATE_FILE, // create file
  EDIT_FILE, // edit file
  CREATE_SHARELINK, // create sharelink
  CONTRIBUTE_MARKETPLACE, // contribute marketplace
  UNLIST_MARKETPLACE, // contribute marketplace
  CREATE_AI_AGENT, // create AI-Agent
  EDIT_AI_AGENT, // edit AI-Agent
  FORK_AI_AGENT, // fork AI-Agent
  RUN_AI_AGENT, // run ai-agent
  FORK_APP,
  CREATE_WORKFLOW,
  EDIT_WORKFLOW,
  CREATE_FLOW_ACTION,
  EDIT_FLOW_ACTION,
  PREVIEW_FLOW_ACTION,
  RUN_FLOW_ACTION,
}

export enum ACTION_DELETE {
  DELETE = 1, // 删除 Attribute
  TEAM_DOMAIN, // 删除 Team Domain
  APP_DOMAIN, // 删除 App Domain
}

export enum ACTION_SPECIAL {
  // Team Attribute
  EDITOR_AND_VIEWER_CAN_INVITE_BY_LINK_SW = 1, // editor 和 viewer 可以使用链接邀请的 Attribute
  // Team Member Attribute
  TRANSFER_OWNER, // 转移 owner 的 Attribute
  // Invite Attribute
  INVITE_LINK_RENEW, // 更新邀请链接
  RELEASE_APP, // release APP
  GENERATE_SQL, //  paid functions, generate sql
  TAKE_SNAPSHOT, //  paid functions
  RECOVER_SNAPSHOT, //  paid functions
  RUN_SPECIAL_AI_AGENT_MODEL, //  paid functions, AI-Agent Run special AI-Agent model like GPT-4
  RELEASE_PUBLIC_APP, //  paid functions, release public APP
  RELEASE_WORKFLOW,
}
