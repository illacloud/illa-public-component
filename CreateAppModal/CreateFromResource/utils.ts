import { LicenseInfo } from "@mui/x-data-grid-premium"
import { isString } from "@illa-design/react"
import { COLUMN_TYPE, RESOURCE_TYPE } from "./interface"

export const initMulDataGridLicense = (key: string) => {
  LicenseInfo.setLicenseKey(key)
}

export const formateLabel = (label: string) => {
  if (!label || !isString(label)) return ""
  const str = label.replace(/_/g, " ")
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const getColumType = (resourceType: RESOURCE_TYPE, type: string) => {
  let valueType = COLUMN_TYPE.TEXT
  switch (resourceType) {
    case RESOURCE_TYPE.CLICKHOUSE:
      valueType = getClickhouseType(type)
      break
    case RESOURCE_TYPE.POSTGRESQL:
    case RESOURCE_TYPE.SUPABASEDB:
    case RESOURCE_TYPE.NEON:
    case RESOURCE_TYPE.HYDRA:
      valueType = getPostgresqlLikeType(type)
      break
    case RESOURCE_TYPE.MYSQL:
    case RESOURCE_TYPE.TIDB:
      valueType = getMysqlLikeType(type)
      break
    case RESOURCE_TYPE.MARIADB:
      valueType = getMariaDBType(type)
      break
    case RESOURCE_TYPE.SNOWFLAKE:
      valueType = getSnowflakeType(type)
      break
    case RESOURCE_TYPE.MSSQL:
      valueType = getMsresourceType(type)
      break
  }
  return valueType
}

export const getClickhouseType = (type: string) => {
  switch (type) {
    case "Int":
    case "Float":
    case "UInt8":
    case "UInt16":
    case "UInt32":
    case "UInt64":
    case "Int8":
    case "Int16":
    case "Int32":
    case "Int64":
    case "Float32":
    case "Float64":
    case "Decimal":
    case "Decimal32":
    case "Decimal64":
      return COLUMN_TYPE.NUMBER
    case "Bool":
      return COLUMN_TYPE.BOOLEAN
    case "Date":
    case "Date32":
    case "DateTime":
    case "DateTime32":
    case "DateTime64":
      return COLUMN_TYPE.DATE
    case "Array":
      return COLUMN_TYPE.TAG
    default:
      return COLUMN_TYPE.TEXT
  }
}

// postgresql, subpabase, neon, hydra
export const getPostgresqlLikeType = (type: string) => {
  switch (type) {
    case "bigint":
    case "float":
    case "float8":
    case "integer":
    case "real":
    case "smallint":
    case "numeric":
    case "real":
    case "int":
    case "double precision":
      return COLUMN_TYPE.NUMBER
    case "boolean":
      return COLUMN_TYPE.BOOLEAN
    case "ARRAY":
      return COLUMN_TYPE.TAG
    case "date":
    case "timestamp":
    case "time":
    case "time with time zone":
    case "time without time zone":
    case "timestamp with time zone":
    case "timestamp without time zone":
      return COLUMN_TYPE.DATE
    default:
      return COLUMN_TYPE.TEXT
  }
}

// mysql, tidb
export const getMysqlLikeType = (type: string) => {
  switch (type) {
    case "bit":
    case "int":
    case "tinyint":
    case "smallint":
    case "mediumint":
    case "bigint":
    case "float":
    case "double":
    case "decimal":
    case "integer":
    case "dec":
    case "double precision":
      return COLUMN_TYPE.NUMBER
    case "date":
    case "datetime":
    case "timestamp":
    case "time":
    case "year":
      return COLUMN_TYPE.DATE
    case "ARRAY":
      return COLUMN_TYPE.TAG
    default:
      return COLUMN_TYPE.TEXT
  }
}

export const getMariaDBType = (type: string) => {
  switch (type) {
    case "tinyint":
    case "smallint":
    case "mediumint":
    case "int":
    case "integer":
    case "bigint":
    case "decimal":
    case "dec":
    case "fixed":
    case "numeric":
    case "number":
    case "float":
    case "double":
    case "double precision":
    case "bit":
    case "int1":
    case "int2":
    case "int3":
    case "int4":
    case "int8":
      return COLUMN_TYPE.NUMBER
    case "date":
    case "datetime":
    case "timestamp":
    case "time":
    case "year":
      return COLUMN_TYPE.DATE
    case "ARRAY":
      return COLUMN_TYPE.TAG
    default:
      return COLUMN_TYPE.TEXT
  }
}

export const getSnowflakeType = (type: string) => {
  switch (type) {
    case "number":
    case "decimal":
    case "numeric":
    case "int":
    case "integer":
    case "bigint":
    case "smallint":
    case "tinyint":
    case "byteint":
    case "float":
    case "float4":
    case "float8":
    case "double":
    case "double precision":
    case "real":
      return COLUMN_TYPE.NUMBER
    case "date":
    case "datetime":
    case "timestamp":
    case "time":
    case "timestamp_tz":
    case "timestamp_ltz":
    case "timestamp_ntz":
      return COLUMN_TYPE.DATE
    case "ARRAY":
    case "array":
      return COLUMN_TYPE.TAG
    default:
      return COLUMN_TYPE.TEXT
  }
}

export const getMsresourceType = (type: string) => {
  switch (type) {
    case "bigint":
    case "numeric":
    case "bit":
    case "smallint":
    case "decimal":
    case "smallmoney":
    case "int":
    case "tinyint":
    case "money":
    case "float":
    case "real":
      return COLUMN_TYPE.NUMBER
    case "date":
    case "datetimeoffset":
    case "datetime2":
    case "smalldatetime":
    case "datetime":
    case "time":
      return COLUMN_TYPE.DATE
    default:
      return COLUMN_TYPE.TEXT
  }
}
