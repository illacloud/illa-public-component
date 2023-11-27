import {
  MongoDbAction,
  MongoDbActionTypeContent,
  MongoDbAggregateContent,
  MongoDbBulkWriteContent,
  MongoDbCommandContent,
  MongoDbCountContent,
  MongoDbDeleteManyContent,
  MongoDbDeleteOneContent,
  MongoDbDistinctContent,
  MongoDbFindContent,
  MongoDbFindOneAndUpdateContent,
  MongoDbFindOneContent,
  MongoDbInsertManyContent,
  MongoDbInsertOneContent,
  MongoDbListCollectionsContent,
  MongoDbUpdateManyContent,
  MongoDbUpdateOneContent,
} from "@illa-public/public-types"

export const MongoDbAggregateContentInitial: MongoDbAggregateContent = {
  aggregation: "",
  options: "",
}

export const MongoDbBulkWriteContentInitial: MongoDbBulkWriteContent = {
  operations: "",
  options: "",
}

export const MongoDbCountContentInitial: MongoDbCountContent = {
  query: "",
}

export const MongoDbDeleteManyContentInitial: MongoDbDeleteManyContent = {
  filter: "",
}

export const MongoDbDeleteOneContentInitial: MongoDbDeleteOneContent = {
  filter: "",
}

export const MongoDbDistinctContentInitial: MongoDbDistinctContent = {
  query: "",
  field: "",
  options: "",
}

export const MongoDbFindContentInitial: MongoDbFindContent = {
  query: "",
  projection: "",
  sortBy: "",
  limit: "",
  skip: "",
}

export const MongoDbFindOneContentInitial: MongoDbFindOneContent = {
  query: "",
  projection: "",
  skip: "",
}

export const MongoDbFindOneAndUpdateContentInitial: MongoDbFindOneAndUpdateContent =
  {
    filter: "",
    update: "",
    options: "",
  }

export const MongoDbInsertOneContentInitial: MongoDbInsertOneContent = {
  document: "",
}

export const MongoDbInsertManyContentInitial: MongoDbInsertManyContent = {
  document: "",
}

export const MongoDbListCollectionsContentInitial: MongoDbListCollectionsContent =
  {
    query: "",
  }

export const MongoDbUpdateManyContentInitial: MongoDbUpdateManyContent = {
  filter: "",
  update: "",
  options: "",
}

export const MongoDbUpdateOneContentInitial: MongoDbUpdateOneContent = {
  filter: "",
  update: "",
  options: "",
}

export const MongoDbCommandContentInitial: MongoDbCommandContent = {
  document: "",
}

export const MongoDbActionInitial: MongoDbAction<MongoDbActionTypeContent> = {
  actionType: "aggregate",
  collection: "",
  typeContent: MongoDbAggregateContentInitial,
}
