import {
  GridRenderEditCellParams,
  GridValidRowModel,
  useGridApiContext,
} from "@mui/x-data-grid-premium"
import { FC, useCallback, useMemo, useState } from "react"
import {
  Select,
  SelectOptionObject,
  SelectValue,
  isString,
} from "@illa-design/react"
import { useSelectOptions } from "../../hooks/useSelectOptions"
import { COLUMN_TYPE } from "../../interface"
import { editInputStyle } from "./style"

interface EditSelectProps {
  valueType: COLUMN_TYPE
  value: string
}

const EditSelect: FC<
  GridRenderEditCellParams<GridValidRowModel, EditSelectProps, string>
> = (props) => {
  const { id, field, value: propsValue } = props
  const [valueState, setValueState] = useState(propsValue?.value)
  const { getSelectValue } = useSelectOptions()
  const apiRef = useGridApiContext()

  const options = useMemo(
    () => getSelectValue(propsValue?.valueType)?.options || [],
    [getSelectValue, propsValue?.valueType],
  )

  const handleChange = useCallback(
    (v?: SelectValue) => {
      if (!isString(v)) return
      setValueState(v)
      const label = options.find((item) => item.value === v)?.label
      apiRef.current.setEditCellValue({
        id,
        field,
        value: { ...propsValue, label, value: v },
        debounceMs: 200,
      })
    },
    [apiRef, field, id, options, propsValue],
  )

  if (!valueState) return
  return (
    <Select
      _css={editInputStyle}
      size="large"
      colorScheme="techPurple"
      value={valueState}
      options={options as SelectOptionObject[]}
      onChange={handleChange}
    />
  )
}

export default EditSelect
