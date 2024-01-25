import { MongoDbActionType } from "@illa-public/public-types"
import {
  MongoDbAggregateContentInitial,
  MongoDbBulkWriteContentInitial,
  MongoDbCommandContentInitial,
  MongoDbCountContentInitial,
  MongoDbDeleteManyContentInitial,
  MongoDbDeleteOneContentInitial,
  MongoDbDistinctContentInitial,
  MongoDbFindContentInitial,
  MongoDbFindOneAndUpdateContentInitial,
  MongoDbInsertManyContentInitial,
  MongoDbInsertOneContentInitial,
  MongoDbListCollectionsContentInitial,
  MongoDbUpdateManyContentInitial,
  MongoDbUpdateOneContentInitial,
} from ".."

export function generateMongoDBActionTypeContent(
  actionType: MongoDbActionType,
) {
  switch (actionType) {
    case "aggregate": {
      return MongoDbAggregateContentInitial
    }
    case "bulkWrite": {
      return MongoDbBulkWriteContentInitial
    }
    case "count": {
      return MongoDbCountContentInitial
    }
    case "deleteMany": {
      return MongoDbDeleteManyContentInitial
    }
    case "deleteOne": {
      return MongoDbDeleteOneContentInitial
    }
    case "distinct": {
      return MongoDbDistinctContentInitial
    }
    case "find": {
      return MongoDbFindContentInitial
    }
    case "findOne": {
      return MongoDbFindContentInitial
    }
    case "findOneAndUpdate": {
      return MongoDbFindOneAndUpdateContentInitial
    }
    case "insertOne": {
      return MongoDbInsertOneContentInitial
    }
    case "insertMany": {
      return MongoDbInsertManyContentInitial
    }
    case "listCollections": {
      return MongoDbListCollectionsContentInitial
    }
    case "updateMany": {
      return MongoDbUpdateManyContentInitial
    }
    case "updateOne": {
      return MongoDbUpdateOneContentInitial
    }
    case "command": {
      return MongoDbCommandContentInitial
    }
  }
}
