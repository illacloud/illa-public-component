export type DynamoActionMethods =
  | "query"
  | "scan"
  | "putItem"
  | "getItem"
  | "updateItem"
  | "deleteItem"

export interface DynamoScanStructParams {
  indexName: string
  projectionExpression: string
  filterExpression: string
  expressionAttributeNames: string
  expressionAttributeValues: string
  limit: string
  select: string
}

export interface DynamoQueryStructParams extends DynamoScanStructParams {
  keyConditionExpression: string
}

export interface DynamoGetItemStructParams {
  key: string
  projectionExpression: string
  expressionAttributeNames: string
}

export interface DynamoPutItemStructParams {
  item: string
  conditionExpression: string
  expressionAttributeNames: string
  expressionAttributeValues: string
}

export interface DynamoUpdateItemStructParams
  extends Omit<DynamoPutItemStructParams, "item"> {
  key: string
  updateExpression: string
}

export interface DynamoDeleteItemStructParams
  extends Omit<DynamoUpdateItemStructParams, "updateExpression"> {}

export type DynamoStructParams =
  | DynamoQueryStructParams
  | DynamoScanStructParams
  | DynamoGetItemStructParams
  | DynamoPutItemStructParams
  | DynamoUpdateItemStructParams
  | DynamoDeleteItemStructParams

export interface DynamoDBAction<T extends DynamoStructParams> {
  method: DynamoActionMethods
  table: string
  useJson: boolean
  parameters: string
  structParams: T
}
