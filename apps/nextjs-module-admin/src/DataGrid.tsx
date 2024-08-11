import {
  DataGrid as DataGridMUI,
  DataGridProps,
  GridCellParams,
  GridColDef,
  GridColumns
} from '@mui/x-data-grid';

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
      initialState={{
        pagination: {
          page: 0,
          pageSize: 5
        }
      }}
      rows={rows}
      rowsPerPageOptions={[5, 10]}
    />
  );
};

export default DataGrid;
