import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import { GridColumns } from 'nextjs-module-admin/DataGrid';
import { useState } from 'react';

import Header from '@/components/index/admin/components/Header';
import AdminLayout from '@/layouts/admin-layout/AdminLayout';
import { setContext } from '@/lib/axios/requests';
import { useToast } from '@/lib/providers/toast-provider';
import { ProductServices } from '@/lib/repo/product.repo';
import { colors } from '@/lib/theme/theme';
import { NextPageWithLayout } from '@/types/index';
import { Product } from '@/types/product.type';

const DataGrid = dynamic(() => import('nextjs-module-admin/DataGrid'));

const ModalAddProduct = dynamic(import('@/components/index/admin/products/ModalAddProduct'), {
  ssr: false
});
const DynamicModal = dynamic(() => import('@/components/shared/Modal/Modal'), { ssr: false });

const Page: NextPageWithLayout<{
  products: Array<Product>;
}> = ({ products }) => {
  const toast = useToast();
  // const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);

  const columns: GridColumns<Product> = [
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell'
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell'
    },
    {
      field: 'slug',
      headerName: 'slug',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell'
    },
    {
      field: 'categorySlug',
      headerName: 'categorySlug',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell'
    },
    {
      field: 'description',
      headerName: 'description',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell'
    },
    {
      field: 'size',
      headerName: 'size',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell'
    },
    {
      field: 'colors',
      headerName: 'colors',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell'
    },
    {
      field: 'actions',
      headerName: 'Hoạt động',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (row: any) => {
        // console.log("👌 ~ row", row.row);
        return (
          <Box display='flex' justifyContent='center'>
            <Button
              onClick={() => {
                setSelectedProduct(row.row);
                setOpen(!open);
              }}
              style={{ backgroundColor: '#70d8bd' }}
              variant='contained'
            >
              sửa
            </Button>
            <Button
              onClick={() => {
                hideProduct(row.row._id);
              }}
              style={{ backgroundColor: '#70d8bd' }}
              variant='contained'
            >
              Ẩn
            </Button>
          </Box>
        );
      }
    }
  ];

  const hideProduct = (id: string) => {
    toast.promise(
      'Ẩn sản phẩm thành công',
      ProductServices.hideProduct(id),
      'Ẩn sản phẩm thất bại'
    );
  };

  return (
    <>
      <Box m='20px'>
        <Box
          sx={{
            justifyContent: 'space-between',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Header subtitle='Chào mừng tới quản lí sản phẩm' title='Sản phẩm' />
          <Box>
            <Button
              onClick={() => {
                setOpen(!open);
              }}
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '10px 20px'
              }}
            >
              Thêm sản phẩm
            </Button>
          </Box>
        </Box>
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
            getRowId={(row: any) => row._id}
            rows={products}
          />
        </Box>
      </Box>

      {open ? (
        <DynamicModal
          handleClose={() => {
            setOpen(!open);
            setSelectedProduct(undefined);
          }}
          open={open}
        >
          <ModalAddProduct product={selectedProduct} />
        </DynamicModal>
      ) : null}
    </>
  );
};

export default Page;
Page.Layout = AdminLayout;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  setContext(ctx);

  const products = await ProductServices.getAll();

  return {
    props: {
      products
    }
  };
}
