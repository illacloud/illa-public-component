export type MongoDbActionType =
  | "aggregate"
  | "bulkWrite"
  | "count"
  | "deleteMany"
  | "deleteOne"
  | "distinct"
  | "find"
  | "findOne"
  | "findOneAndUpdate"
  | "insertOne"
  | "insertMany"
  | "listCollections"
  | "updateMany"
  | "updateOne"
  | "command"

export interface MongoDbAggregateContent {
  aggregation: string
  options: string
}

export interface MongoDbBulkWriteContent {
  operations: string
  options: string
}

export interface MongoDbCountContent {
  query: string
}

export interface MongoDbDeleteManyContent {
  filter: string
}

export interface MongoDbDeleteOneContent {
  filter: string
}

export interface MongoDbDistinctContent {
  query: string
  field: string
  options: string
}

export interface MongoDbFindContent {
  query: string
  projection: string
  sortBy: string
  limit: string
  skip: string
}

export interface MongoDbFindOneContent {
  query: string
  projection: string
  skip: string
}

export interface MongoDbFindOneAndUpdateContent {
  filter: string
  update: string
  options: string
}

export interface MongoDbInsertOneContent {
  document: string
}

export interface MongoDbInsertManyContent {
  document: string
}

export interface MongoDbListCollectionsContent {
  query: string
}

export interface MongoDbUpdateManyContent {
  filter: string
  update: string
  options: string
}

export interface MongoDbUpdateOneContent {
  filter: string
  update: string
  options: string
}

export interface MongoDbCommandContent {
  document: string
}

export type MongoDbActionTypeContent =
  | MongoDbAggregateContent
  | MongoDbBulkWriteContent
  | MongoDbCountContent
  | MongoDbDeleteManyContent
  | MongoDbDeleteOneContent
  | MongoDbDistinctContent
  | MongoDbFindContent
  | MongoDbFindOneContent
  | MongoDbFindOneAndUpdateContent
  | MongoDbInsertOneContent
  | MongoDbInsertManyContent
  | MongoDbListCollectionsContent
  | MongoDbUpdateManyContent
  | MongoDbUpdateOneContent
  | MongoDbCommandContent

export interface MongoDbAction<T extends MongoDbActionTypeContent> {
  actionType: MongoDbActionType
  collection: string
  typeContent: T
}
