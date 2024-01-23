import {
  DataGrid as DataGridMUI,
  DataGridProps,
  GridCellParams,
  GridColDef,
  GridColumns,
} from "@mui/x-data-grid";

export type { GridCellParams, GridColDef, GridColumns };

const DataGrid = (props: DataGridProps) => {
  const { columns, rows, checkboxSelection } = props;

  if (!columns || !rows) return <>Data Grid is not ready</>;

  return (
    <DataGridMUI
      {...props}
      checkboxSelection={checkboxSelection}
      columns={columns}
      getRowId={(row) => row._id}
      rows={rows}
    />
  );
};

export default DataGrid;
