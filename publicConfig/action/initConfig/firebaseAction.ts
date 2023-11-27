import {
  FirebaseAction,
  FirebaseAppendDataToList,
  FirebaseAuthActionTypeValue,
  FirebaseCollectionType,
  FirebaseCreateUser,
  FirebaseDeleteDocument,
  FirebaseDeleteOneUser,
  FirebaseGetCollections,
  FirebaseGetDocumentByID,
  FirebaseGetUserByEmail,
  FirebaseGetUserByID,
  FirebaseGetUserByPhone,
  FirebaseInsertDocument,
  FirebaseListUsers,
  FirebaseQueryCollectionGroup,
  FirebaseQueryDatabase,
  FirebaseRealtimeActionTypeValue,
  FirebaseServiceTypeValue,
  FirebaseSetData,
  FirebaseStoreActionTypeValue,
  FirebaseUpdateData,
  FirebaseUpdateDocument,
  FirebaseUpdateOneUser,
  QueryFirebase,
} from "@illa-public/public-types"

export const FirebaseGetUserByIDInitial: FirebaseGetUserByID = {
  filter: "",
}

export const FirebaseGetUserByEmailInitial: FirebaseGetUserByEmail = {
  filter: "",
}

export const FirebaseGetUserByPhoneInitial: FirebaseGetUserByPhone = {
  filter: "",
}

export const FirebaseDeleteOneUserInitial: FirebaseDeleteOneUser = {
  filter: "",
}

export const FirebaseCreateUserInitial: FirebaseCreateUser = {
  object: "",
}

export const FirebaseUpdateOneUserInitial: FirebaseUpdateOneUser = {
  uid: "",
  object: "",
}

export const FirebaseListUsersInitial: FirebaseListUsers = {
  number: "",
  token: "",
}

export const FirebaseQueryFirebaseInitial: QueryFirebase = {
  collection: "",
  collectionType: FirebaseCollectionType.DROPDOWN,
  where: [
    {
      condition: "",
      field: "",
      value: "",
    },
  ],
  limit: "",
  orderBy: "",
  orderDirection: "",
  startAt: {
    trigger: false,
    value: "",
  },
  endAt: {
    trigger: false,
    value: "",
  },
}

export const FirebaseInsertDocumentInitial: FirebaseInsertDocument = {
  collection: "",
  collectionType: FirebaseCollectionType.DROPDOWN,
  id: "",
  value: "",
}

export const FirebaseUpdateDocumentInitial: FirebaseUpdateDocument = {
  collection: "",
  collectionType: FirebaseCollectionType.DROPDOWN,
  id: "",
  value: "",
}

export const FirebaseGetDocumentByIDInitial: FirebaseGetDocumentByID = {
  collection: "",
  collectionType: FirebaseCollectionType.DROPDOWN,
  id: "",
}

export const FirebaseDeleteDocumentInitial: FirebaseDeleteDocument = {
  collection: "",
  collectionType: FirebaseCollectionType.DROPDOWN,
  id: "",
}

export const FirebaseGetCollectionsInitial: FirebaseGetCollections = {
  parent: "",
}

export const FirebaseQueryCollectionGroupInitial: FirebaseQueryCollectionGroup =
  {
    collection: "",
    collectionType: FirebaseCollectionType.DROPDOWN,
    where: [
      {
        condition: "",
        field: "",
        value: "",
      },
    ],
    limit: "",
    orderBy: "",
    orderDirection: "",
    startAt: {
      trigger: false,
      value: "",
    },
    endAt: {
      trigger: false,
      value: "",
    },
  }

export const FirebaseQueryDatabaseInitial: FirebaseQueryDatabase = {
  ref: "",
}

export const FirebaseSetDataInitial: FirebaseSetData = {
  ref: "",
  object: "",
}

export const FirebaseUpdateDataInitial: FirebaseUpdateData = {
  ref: "",
  object: "",
}

export const FirebaseAppendDataToListInitial: FirebaseAppendDataToList = {
  ref: "",
  object: "",
}
export const FirebaseInitialValue = {
  [FirebaseAuthActionTypeValue.GET_USER_BY_UID]: FirebaseGetUserByIDInitial,
  [FirebaseAuthActionTypeValue.GET_USER_BY_EMAIL]:
    FirebaseGetUserByEmailInitial,
  [FirebaseAuthActionTypeValue.GET_USER_BY_PHONE]:
    FirebaseGetUserByPhoneInitial,
  [FirebaseAuthActionTypeValue.CREATE_ONE_USER]: FirebaseCreateUserInitial,
  // [AuthActionTypeValue.UPDATE_ONE_USER]: UpdateOneUserInitial, // TODO: fix this
  [FirebaseAuthActionTypeValue.DELETE_ONE_USER]: FirebaseDeleteOneUserInitial,
  [FirebaseAuthActionTypeValue.LIST_USERS]: FirebaseListUsersInitial,
  [FirebaseStoreActionTypeValue.QUERY_FIREBASE]: FirebaseQueryFirebaseInitial,
  [FirebaseStoreActionTypeValue.INSERT_DOCUMENT]: FirebaseInsertDocumentInitial,
  [FirebaseStoreActionTypeValue.UPDATE_DOCUMENT]: FirebaseUpdateDocumentInitial,
  [FirebaseStoreActionTypeValue.GET_DOCUMENT_BY_ID]:
    FirebaseGetDocumentByIDInitial,
  [FirebaseStoreActionTypeValue.DELETE_ONE_DOCUMENT]:
    FirebaseDeleteDocumentInitial,
  [FirebaseStoreActionTypeValue.GET_COLLECTIONS]: FirebaseGetCollectionsInitial,
  [FirebaseStoreActionTypeValue.QUERY_COLLECTION_GROUP]:
    FirebaseQueryCollectionGroupInitial,
  [FirebaseRealtimeActionTypeValue.QUERY_DATABASE]:
    FirebaseQueryDatabaseInitial,
  [FirebaseRealtimeActionTypeValue.SET_DATA]: FirebaseSetDataInitial,
  [FirebaseRealtimeActionTypeValue.UPDATE_DATA]: FirebaseUpdateDataInitial,
  [FirebaseRealtimeActionTypeValue.APPEND_DATA_TO_LIST]:
    FirebaseAppendDataToListInitial,
}

export const FirebaseServiceTypeInitialValue = {
  [FirebaseServiceTypeValue.AUTH]: FirebaseGetUserByIDInitial,
  [FirebaseServiceTypeValue.FIRESTORE]: FirebaseQueryFirebaseInitial,
  [FirebaseServiceTypeValue.REALTIME]: FirebaseQueryDatabaseInitial,
}

export const FirebaseActionInitial: FirebaseAction<FirebaseGetUserByID> = {
  service: FirebaseServiceTypeValue.AUTH,
  operation: FirebaseAuthActionTypeValue.GET_USER_BY_UID,
  options: FirebaseGetUserByIDInitial,
}
