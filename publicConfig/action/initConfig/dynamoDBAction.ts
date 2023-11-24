import {
  DynamoActionMethods,
  DynamoDBAction,
  DynamoDeleteItemStructParams,
  DynamoGetItemStructParams,
  DynamoPutItemStructParams,
  DynamoQueryStructParams,
  DynamoScanStructParams,
  DynamoStructParams,
  DynamoUpdateItemStructParams,
} from "@illa-public/public-types"

export const DynamoScanStructParamsInitial: DynamoScanStructParams = {
  indexName: "",
  projectionExpression: "",
  filterExpression: "",
  expressionAttributeNames: "",
  expressionAttributeValues: "",
  limit: "",
  select: "",
}

export const DynamoQueryStructParamsInitial: DynamoQueryStructParams = {
  indexName: "",
  projectionExpression: "",
  filterExpression: "",
  keyConditionExpression: "",
  expressionAttributeNames: "",
  expressionAttributeValues: "",
  limit: "",
  select: "",
}

export const DynamoGetItemStructParamsInitial: DynamoGetItemStructParams = {
  key: "",
  projectionExpression: "",
  expressionAttributeNames: "",
}

export const DynamoPutItemStructParamsInitial: DynamoPutItemStructParams = {
  item: "",
  conditionExpression: "",
  expressionAttributeNames: "",
  expressionAttributeValues: "",
}

export const DynamoUpdateItemStructParamsInitial: DynamoUpdateItemStructParams =
  {
    key: "",
    updateExpression: "",
    conditionExpression: "",
    expressionAttributeNames: "",
    expressionAttributeValues: "",
  }

export const DynamoDeleteItemStructParamsInitial: DynamoDeleteItemStructParams =
  {
    key: "",
    conditionExpression: "",
    expressionAttributeNames: "",
    expressionAttributeValues: "",
  }

export const DynamoDBActionInitial: DynamoDBAction<DynamoQueryStructParams> = {
  method: "query",
  table: "",
  parameters: "",
  useJson: false,
  structParams: DynamoQueryStructParamsInitial,
}

export const DynamoDBInitialMap: Record<
  DynamoActionMethods,
  DynamoStructParams
> = {
  query: DynamoQueryStructParamsInitial,
  scan: DynamoScanStructParamsInitial,
  getItem: DynamoGetItemStructParamsInitial,
  putItem: DynamoPutItemStructParamsInitial,
  updateItem: DynamoUpdateItemStructParamsInitial,
  deleteItem: DynamoDeleteItemStructParamsInitial,
}

export const DynamoActionStructParamsDataTransferType: Record<
  string,
  object | number
> = {
  expressionAttributeNames: {},
  expressionAttributeValues: {},
  key: {},
  item: {},
  limit: 0,
}
