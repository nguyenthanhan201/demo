import Box from '@mui/material/Box';
import dynamic from 'next/dynamic';
import { GridCellParams, GridColDef } from 'nextjs-module-admin/DataGrid';
import { useState } from 'react';

import { formatDate } from '@/lib/helpers/time';
import { colors } from '@/lib/theme/theme';
import { Rating } from '@/types/rating.type';

const ModalRating = dynamic(() => import('./ModalRating'), { ssr: false });
const DataGrid = dynamic(() => import('nextjs-module-admin/DataGrid'));

type ManagerRatingProps = {
  ratings: Rating[];
};

const ManagerRating = ({ ratings }: ManagerRatingProps) => {
  const [selectedRating, setSelectedRating] = useState<Rating | null>(null);

  const columns: GridColDef[] = [
    {
      field: 'actions1',
      headerName: 'Title',
      flex: 1,
      headerAlign: 'center',
      align: 'left',
      renderCell: (row: GridCellParams) => {
        // console.log("👌 ~ row", row.row);
        return <>{row.row.idProduct.title}</>;
      }
    },
    {
      field: 'createdAt',
      headerName: 'createdAt',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (row: GridCellParams) => formatDate(row.row.createdAt, 'date')
    },
    {
      field: 'actions2',
      headerName: 'rating',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (row: GridCellParams) => row.row.rating
    },
    {
      field: 'actions3',
      headerName: 'comment',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (row: GridCellParams) => row.row.comment
    },
    {
      field: 'actions4',
      headerName: 'actions',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (row: GridCellParams) => (
        <button
          className={`cursor-pointer rounded px-2 py-1 text-white ${
            !row.row.comment ? 'bg-green-500' : 'bg-gray-500'
          } border-none outline-none`}
          disabled={row.row.comment ? true : false}
          onClick={() => setSelectedRating(row.row)}
          type='button'
        >
          {row.row.comment ? 'Đã đánh giá' : 'Đánh giá'}
        </button>
      )
    }
  ];

  return (
    <>
      <Box
        height='75vh'
        m='40px 0 0 0'
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none'
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none'
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300],
            textAlign: 'center'
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none'
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400]
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700]
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`
          }
        }}
      >
        <DataGrid
          checkboxSelection
          columns={columns}
          getRowHeight={() => 'auto'}
          getRowId={(row: any) => row._id!}
          rows={ratings}
        />
      </Box>

      {selectedRating ? (
        <ModalRating
          onClose={() => setSelectedRating(null)}
          open={!!selectedRating}
          selectedRating={selectedRating}
        />
      ) : null}
    </>
  );
};

export default ManagerRating;
