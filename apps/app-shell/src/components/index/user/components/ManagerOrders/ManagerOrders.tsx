import Box from '@mui/material/Box';
import dynamic from 'next/dynamic';

import Img from '@/components/shared/Img/Img';
import { getSalePrice, numberWithCommans } from '@/lib/helpers/numbers';
import { formatDate } from '@/lib/helpers/time';
import useTheme from '@/lib/hooks/useTheme';
import { tokens } from '@/lib/theme/theme';

const DataGrid = dynamic(() => import('nextjs-module-admin/DataGrid'));

const columns: any = [
  {
    field: 'actions1',
    headerName: 'Title',
    flex: 1,
    headerAlign: 'center',
    align: 'left',
    renderCell: (row: any) => {
      return (
        <div className='flex flex-col gap-2'>
          {Object.values(row.row.order).map((item: any, index: number) => {
            // console.log("👌  item:", item[0]);
            const { size, color, product } = item[0];
            return (
              <div className='flex items-center gap-2' key={index}>
                <Img
                  alt={product.image01}
                  className='rounded-full'
                  hasNotplaceholder
                  height={30}
                  src={product.image01}
                  width={30}
                />
                <p style={{ whiteSpace: 'break-spaces' }}>{`${product.title}-${size}-${color}`}</p>
              </div>
            );
          })}
        </div>
      );
    }
  },
  {
    field: 'createdAt',
    headerName: 'createdAt',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    renderCell: (row: any) => formatDate(row.row.createdAt, 'date')
  },
  {
    field: 'actions2',
    headerName: 'Price',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    renderCell: (row: any) => {
      return (
        <div className='flex flex-col gap-2'>
          {Object.values(row.row.order).map((item: any, index: number) => {
            const { quantity, price, product } = item[0];
            return (
              <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                {product.discount
                  ? numberWithCommans(getSalePrice(product.price, product.discount) * quantity)
                  : numberWithCommans(price * quantity)}
              </div>
            );
          })}
        </div>
      );
    }
  },
  {
    field: 'actions3',
    headerName: 'actions',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    renderCell: () => {
      return <> Hoàn thành</>;
    }
  }
];

type ManagerOrdersProps = {
  orders: any[];
};

const ManagerOrders = ({ orders }: ManagerOrdersProps) => {
  const { themeLocal } = useTheme();
  const colors = tokens(themeLocal || 'dark');

  return (
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
        rows={orders}
      />
    </Box>
  );
};

export default ManagerOrders;
