import { Box, Button, useTheme } from '@mui/material';
import { NextPageContext } from 'next';
import dynamic from 'next/dynamic';
import { GridColumns } from 'nextjs-module-admin/DataGrid';
import { useMemo } from 'react';
import { dehydrate } from 'react-query';

import Header from '@/components/index/admin/components/Header';
import AdminLayout from '@/layouts/admin-layout/AdminLayout';
import { decodedToken, parseCookie } from '@/lib/helpers/cookie';
import { useSEO } from '@/lib/hooks/useSEO';
import { useToast } from '@/lib/providers/toast-provider';
import { queryClient } from '@/lib/react-query/queryClient';
import { ProductServices } from '@/lib/repo/product.repo';
import { tokens } from '@/lib/theme/theme';
import { Product } from '@/types/product.type';

const DataGrid = dynamic(() => import('nextjs-module-admin/DataGrid'));

const Page = (pageProps: PageProps<{ products: Product[] }>) => {
  const { dehydratedState } = pageProps;
  const toast = useToast();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const products = dehydratedState.queries.at(0)?.state.data || [];

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
        renderCell: (row: any) => {
          return (
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
                  ProductServices.deleteProduct(row.row._id);
                }}
                style={{ backgroundColor: '#70d8bd' }}
                variant='contained'
              >
                Xóa
              </Button>
            </Box>
          );
        }
      }
    ];
  }, []);

  const handleShowProduct = (id: string) => {
    toast.promise(
      'Hiện sản phẩm thành công',
      ProductServices.unhideProduct(id),
      'Hiện sản phẩm thất bại'
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
          rows={products.data}
        />
      </Box>
    </Box>
  );
};

export default Page;
Page.Layout = AdminLayout;

export async function getServerSideProps(ctx: NextPageContext) {
  const cookies = ctx.req?.headers.cookie;

  const parsedCookies = parseCookie(cookies || '');

  await queryClient.prefetchQuery(
    'productsQuery',
    async () =>
      await ProductServices.getHideProducts({
        headers: {
          Authorization: `Bearer ${decodedToken(parsedCookies.token)}`
        }
      })
  );

  // const products = await ProductServices.getAll(true)
  //   .then((res) => {
  //     // console.log("👌 ~ res", res);
  //     return res;
  //   })
  //   .catch((err) => {
  //     // console.log("🚀 ~ err", err);
  //     return [];
  //   });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const seo = useSEO('Dịch vụ đặt sản phẩm trực tuyến và giao hàng tận nơi', {
    description: 'Dịch vụ đặt sản phẩm trực tuyến và giao hàng tận nơi',
    image: '/images/Logo-2.png',
    keyword: 'yolo'
  });

  return {
    props: JSON.parse(
      JSON.stringify({
        seo,
        dehydratedState: dehydrate(queryClient)
        // pageData: {
        //   products,
        // },
      })
    ) as PageProps<{ products: Product[] }>
  };
}
