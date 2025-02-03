import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import { GridColumns } from 'nextjs-module-admin/DataGrid';
import { useMemo } from 'react';

import Header from '@/components/index/admin/components/Header';
import AdminLayout from '@/layouts/admin-layout/AdminLayout';
import { setContext } from '@/lib/axios/http';
import { useToast } from '@/lib/providers/toast-provider';
import { ProductServices } from '@/lib/repo/product.repo';
import { colors } from '@/lib/theme/theme';
import { NextPageWithLayout } from '@/types/index';
import { Product } from '@/types/product.type';

const DataGrid = dynamic(() => import('nextjs-module-admin/DataGrid'));

const Page: NextPageWithLayout<{
  hideProducts: Array<Product>;
}> = ({ hideProducts }) => {
  const toast = useToast();

  const columns: GridColumns<Product> = useMemo(() => {
    return [
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
        renderCell: (row: any) => (
          <Box display='flex' justifyContent='center'>
            <Button
              onClick={() => {
                handleShowProduct(row.row._id);
              }}
              style={{ backgroundColor: '#70d8bd' }}
              variant='contained'
            >
              Hiện
            </Button>
            <Button
              onClick={() => {
                const result = confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?');
                if (result) {
                  handleDeleteProduct(row.row._id);
                }
              }}
              style={{ backgroundColor: '#70d8bd' }}
              variant='contained'
            >
              Xóa
            </Button>
          </Box>
        )
      }
    ];
  }, []);

  const handleShowProduct = async (id: string) => {
    const ProductServices = await import('@/lib/repo/product.repo').then(
      (mod) => mod.ProductServices
    );

    toast.promise(
      'Hiện sản phẩm thành công',
      ProductServices.unhideProduct(id).then(() => window.location.reload()),
      'Hiện sản phẩm thất bại'
    );
  };

  const handleDeleteProduct = async (id: string) => {
    const ProductServices = await import('@/lib/repo/product.repo').then(
      (mod) => mod.ProductServices
    );

    toast.promise(
      'Xóa sản phẩm thành công',
      ProductServices.deleteProduct(id).then(() => window.location.reload()),
      'Xóa sản phẩm thất bại'
    );
  };

  return (
    <Box m='20px'>
      <Box
        sx={{
          justifyContent: 'space-between',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Header subtitle='Chào mừng tới quản lí sản phẩm ẩn' title='Sản phẩm ẩn' />
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
          rows={hideProducts}
        />
      </Box>
    </Box>
  );
};

export default Page;
Page.Layout = AdminLayout;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  setContext(ctx);

  const hideProducts = await ProductServices.getHideProducts().then((res) => {
    if (res.code === 'ERROR') {
      return {
        redirect: {
          permanent: false,
          destination: '/'
        }
      };
    }

    return res.data.metadata;
  });

  return {
    props: {
      hideProducts
    }
  };
}
