import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const containerStyle = css`
  width: 100%;
  height: 100%;
  font-size: 16px;
  & .MuiDataGrid-root {
    border-width: 0px;
  }
  & .MuiDataGrid-columnHeaderTitle {
    font-weight: 500;
    /* background-color: ${getColor("grayBlue", "08")}; */
  }
  & .MuiDataGrid-cell {
    color: ${getColor("grayBlue", "02")};
  }
  & .uneditable-cell {
    color: ${getColor("grayBlue", "05")};
  }

  & .editable-cell,
  & .MuiDataGrid-row.Mui-selected,
  & .MuiDataGrid-row:hover,
  & .MuiDataGrid-row.Mui-selected:hover {
    background-color: transparent;
  }
  & .MuiDataGrid-cell--editing {
    background-color: transparent;
    border: 1px solid ${getColor("techPurple", "03")};
  }
`

export const headerStyle = css`
  font-weight: 600;
`
