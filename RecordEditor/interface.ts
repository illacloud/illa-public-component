export interface Params {
  key: string
  value: string
  [key: string]: string
}
export interface RecordEditorProps {
  readOnly?: boolean
  label: string
  subLabel?: string
  onSubLabelClick?: () => void
  name?: string
  fillOnly?: boolean
  records: Params[] | null
  onAdd?: (name?: string) => void
  onDelete?: (index: number, record: Params, name?: string) => void
  onChangeKey?: (
    index: number,
    key: string,
    value: string,
    name?: string,
  ) => void
  onChangeValue?: (
    index: number,
    key: string,
    value: string,
    name?: string,
  ) => void
}
