import { StyledEngineProvider, ThemeProvider, createTheme } from "@mui/material"
import {
  DataGridPremium,
  GridApi,
  GridColDef,
  GridRowId,
  GridRowModel,
  GridRowOrderChangeParams,
} from "@mui/x-data-grid-premium"
import { FC, MutableRefObject, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { TriggerProvider, getColor } from "@illa-design/react"
import { BIGGER_THAN_MODAL_SELECT } from "../constants"
import EditInput from "./EditLabel"
import EditSelect from "./EditSelect"
import ShowLabel from "./ShowLabel"
import { containerStyle } from "./style"

interface DatasetTableProps {
  rows: GridRowModel[]
  closeModal?: () => void
  dataGridRef: MutableRefObject<GridApi>
}
const DatasetTable: FC<DatasetTableProps> = ({ rows, dataGridRef }) => {
  const [rowsState, setRowsState] = useState(rows)
  const [selectRowIds, setSelectRowIds] = useState<GridRowId[]>([])
  const { t } = useTranslation()

  const handleRowOrderChange = async (params: GridRowOrderChangeParams) => {
    const rowsClone = [...rowsState]
    const row = rowsClone.splice(params.oldIndex, 1)[0]
    rowsClone.splice(params.targetIndex, 0, row)
    setRowsState(rowsClone)
  }

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: t("new_dashboard.create_from_resource.column_name"),
      type: "string",
      cellClassName: "uneditable-cell",
      width: 150,
    },
    {
      field: "type",
      headerName: t("new_dashboard.create_from_resource.data_type"),
      type: "string",
      cellClassName: "uneditable-cell",
      width: 150,
    },
    {
      field: "label",
      headerName: t("new_dashboard.create_from_resource.label"),
      type: "string",
      editable: true,
      flex: 1,
      cellClassName: "editable-cell",
      renderCell: (params) => <ShowLabel value={params.value} />,
      renderEditCell: (params) => <EditInput {...params} />,
    },
    {
      field: "inputType",
      headerName: t("new_dashboard.create_from_resource.input_type"),
      editable: true,
      cellClassName: "editable-cell",
      type: "string",
      flex: 1,
      renderCell: (params) => <ShowLabel value={params.value.label} />,
      renderEditCell: (params) => <EditSelect {...params} />,
    },
  ]

  useEffect(() => {
    setRowsState(rows)
  }, [rows])

  useEffect(() => {
    setSelectRowIds(rows.map((row) => row.name))
  }, [rows])

  return (
    <TriggerProvider zIndex={BIGGER_THAN_MODAL_SELECT}>
      <div css={containerStyle}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider
            theme={createTheme({
              palette: {
                primary: { main: getColor("techPurple", "03") },
              },
              typography: {
                fontSize: 14,
              },
            })}
          >
            <DataGridPremium
              apiRef={dataGridRef}
              rows={rowsState}
              pagination={false}
              checkboxSelection
              disableRowSelectionOnClick
              hideFooter
              disableColumnMenu
              disableColumnResize
              disableMultipleColumnsSorting
              disableColumnFilter
              disableColumnReorder
              disableMultipleColumnsFiltering
              rowReordering
              onRowOrderChange={handleRowOrderChange}
              getRowId={(row) => {
                return row.name
              }}
              onCellClick={(cell) => {
                if (!cell.isEditable || cell.cellMode === "edit") return
                dataGridRef.current.startCellEditMode({
                  id: cell.id,
                  field: cell.field,
                })
              }}
              rowSelectionModel={selectRowIds}
              onRowSelectionModelChange={setSelectRowIds}
              columns={columns}
            />
          </ThemeProvider>
        </StyledEngineProvider>
      </div>
    </TriggerProvider>
  )
}

export default DatasetTable
