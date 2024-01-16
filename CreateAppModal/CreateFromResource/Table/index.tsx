import { StyledEngineProvider, ThemeProvider, createTheme } from "@mui/material"
import {
  DataGridPremium,
  GridApi,
  GridCellEditStopReasons,
  GridColDef,
  GridRowId,
  GridRowModel,
  GridRowOrderChangeParams,
  LicenseInfo,
} from "@mui/x-data-grid-premium"
import { FC, MutableRefObject, useEffect, useState } from "react"
import { TriggerProvider, getColor } from "@illa-design/react"
import { BIGGER_THAN_MODAL } from "../constants"
import EditInput from "./EditLabel"
import EditSelect from "./EditSelect"
import { containerStyle } from "./style"

LicenseInfo.setLicenseKey(process.env.ILLA_MUI_LICENSE || "")

function isKeyboardEvent(event: any): event is KeyboardEvent {
  return !!event.key
}

interface DatasetTableProps {
  rows: GridRowModel[]
  closeModal?: () => void
  dataGridRef: MutableRefObject<GridApi>
}
const DatasetTable: FC<DatasetTableProps> = ({ rows, dataGridRef }) => {
  const [rowsState, setRowsState] = useState(rows)
  const [selectRowIds, setSelectRowIds] = useState<GridRowId[]>([])

  const handleRowOrderChange = async (params: GridRowOrderChangeParams) => {
    const rowsClone = [...rowsState]
    const row = rowsClone.splice(params.oldIndex, 1)[0]
    rowsClone.splice(params.targetIndex, 0, row)
    setRowsState(rowsClone)
  }

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Column name",
      type: "string",
      cellClassName: "uneditable-cell",
      width: 150,
    },
    {
      field: "type",
      headerName: "Column  type",
      type: "string",
      cellClassName: "uneditable-cell",
      width: 150,
    },
    {
      field: "label",
      headerName: "Label",
      type: "string",
      editable: true,
      flex: 1,
      cellClassName: "editable-cell",
      renderEditCell: (params) => <EditInput {...params} />,
    },
    {
      field: "inputType",
      headerName: "Input type",
      editable: true,
      cellClassName: "editable-cell",
      type: "string",
      flex: 1,
      renderCell: (params) => <div>{params.value.label}</div>,
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
    <TriggerProvider zIndex={BIGGER_THAN_MODAL}>
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
              rowSelectionModel={selectRowIds}
              onRowSelectionModelChange={setSelectRowIds}
              columns={columns}
              onCellEditStop={(params, event) => {
                if (params.reason !== GridCellEditStopReasons.enterKeyDown) {
                  return
                }
                if (
                  isKeyboardEvent(event) &&
                  !event.ctrlKey &&
                  !event.metaKey
                ) {
                  event.defaultMuiPrevented = true
                }
              }}
            />
          </ThemeProvider>
        </StyledEngineProvider>
      </div>
    </TriggerProvider>
  )
}

export default DatasetTable
