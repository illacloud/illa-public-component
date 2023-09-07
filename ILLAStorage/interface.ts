export type Storage_Type = "localStorage" | "sessionStorage"

export interface StorageDataShape {
  value: unknown
  time: number
  expire: number
}
