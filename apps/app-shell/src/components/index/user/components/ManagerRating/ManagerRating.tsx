import { Box, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import { GridCellParams, GridColDef } from 'nextjs-module-admin/DataGrid';
import { useEffect, useState } from 'react';

import { formatDate } from '@/lib/helpers';
import { RatingServices } from '@/lib/repo/rating.repo';
import { tokens } from '@/lib/theme/theme';
import { useAuthStore } from '@/lib/zustand/useAuthStore';
import { Rating } from '@/types/rating.type';

const Modal = dynamic(() => import('@/components/shared/Modal/Modal'), { ssr: false });
const ModalRating = dynamic(() => import('./ModalRating'), { ssr: false });
const DataGrid = dynamic(() => import('nextjs-module-admin/DataGrid'), { ssr: false });

const ManagerRating = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { auth } = useAuthStore(['auth']);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState<Rating | null>(null);

  useEffect(() => {
    if (!auth?._id) return;
    RatingServices.getRatingByIdAuth(auth?._id).then((res) => {
      if (res.code === 'SUCCESS') {
        return setRatings(res.data);
      }

      console.log('🚀 ~ file: ManagerRating.tsx ~ line 64 ~ res', res.error);
    });
  }, [auth?._id]);

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
          onClick={() => {
            setOpen(true);
            setSelectedRating(row.row);
          }}
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

      {open && selectedRating ? (
        <Modal handleClose={() => setOpen(false)} open={open}>
          <ModalRating selectedRating={selectedRating} />
        </Modal>
      ) : null}
    </>
  );
};

export default ManagerRating;
