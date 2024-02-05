import {
  GridRenderEditCellParams,
  useGridApiContext,
} from "@mui/x-data-grid-premium"
import { FC, useCallback, useState } from "react"
import { Input } from "@illa-design/react"
import { editInputStyle } from "./style"

const EditInput: FC<GridRenderEditCellParams<any, string>> = (props) => {
  const { id, field, value } = props
  const [valueState, setValueState] = useState(value)
  const apiRef = useGridApiContext()

  const handleChange = useCallback(
    (v: string) => {
      setValueState(v)
      apiRef.current.setEditCellValue({ id, field, value: v, debounceMs: 200 })
    },
    [apiRef, field, id],
  )

  return (
    <Input
      _css={editInputStyle}
      colorScheme="techPurple"
      autoFocus
      size="large"
      value={valueState}
      onChange={handleChange}
    />
  )
}

export default EditInput
