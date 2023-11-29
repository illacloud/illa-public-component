export interface S3Resource {
  bucketName: string
  region: string
  endpoint: boolean
  baseURL: string
  accessKeyID: string
  secretAccessKey: string
  acl: string
}

export enum S3ACL {
  "blank" = "-",
  "private" = "private",
  "public_read" = "public-read",
  "public_read_write" = "public-read-write",
  "aws_exec_read" = "aws-exec-read",
  "auth" = "authenticated-read",
  "bucket_owner_read" = "bucket-owner-read",
  "bucket_owner_full_control" = "bucket-owner-full-control",
}
