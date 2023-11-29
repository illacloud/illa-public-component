import {
  AppwriteAction,
  AppwriteDocumentOperations,
  AppwriteListDocuments,
} from "@illa-public/public-types"

export const AppwriteDocumentOperationsInitial: AppwriteDocumentOperations = {
  collectionID: "",
  documentID: "",
  data: "",
}

export const AppwriteListDocumentsInitial: AppwriteListDocuments = {
  collectionID: "",
  filter: [
    {
      key: "",
      operator: "equal",
      value: "",
    },
  ],
  orderBy: [
    {
      key: "",
      value: "asc",
    },
  ],
  limit: "{{100}}",
}

export const AppwriteActionInitial: AppwriteAction<AppwriteListDocuments> = {
  method: "list",
  opts: AppwriteListDocumentsInitial,
}
