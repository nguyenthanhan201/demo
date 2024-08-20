import Box from '@mui/material/Box';
import { GetServerSidePropsContext } from 'next';
import Line, {
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'nextjs-module-admin/Line';
import { useState } from 'react';

import Header from '@/components/index/admin/components/Header';
import AdminLayout from '@/layouts/admin-layout/AdminLayout';
import { setContext } from '@/lib/axios/http';
import { ProductServices } from '@/lib/repo/product.repo';
import { NextPageWithLayout } from '@/types/index';
import { Product } from '@/types/product.type';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Page: NextPageWithLayout<{
  mostViewProducts: Array<Product>;
}> = ({ mostViewProducts }) => {
  const [chartData] = useState<any>(() => {
    const nameProducts = mostViewProducts.map((item: Product) => item.title);
    const viewsProducts = mostViewProducts.map((item: Product) => item.views);

    return {
      labels: nameProducts,
      datasets: [
        {
          label: '',
          data: viewsProducts,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 0.5)',
          borderWidth: 1
        }
      ]
    };
  });

  const options: ChartOptions = {
    animation: false,
    interaction: {
      mode: 'index' as const,
      intersect: false
    },
    plugins: {
      title: {
        display: true,
        text: 'Thống kê lượt xem sản phẩm'
      },
      legend: {
        display: false // Remove Hide the Legend in Chart.js
      },
      tooltip: {
        callbacks: {
          title: (_context: any) => {
            // console.log("👌 ~ context", context[0].label.replaceAll(" ", ""));
            // return context[0].label.replaceAll(" ", ",");
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: false,
        ticks: {
          color: 'rgba(255, 99, 132, 0.5)',
          callback: function (value: any, index: any, _ticks: any) {
            // console.log(ticks);
            return chartData.labels[index].length > 20
              ? `${chartData.labels[index].substring(0, 20)}...`
              : chartData.labels[index];
          }
        },
        border: {
          color: 'rgba(255, 99, 132, 0.5)'
        }
      },
      y: {
        beginAtZero: false,
        // type: "linear" as const,
        // display: true,
        // position: "left" as const,
        ticks: {
          color: 'rgba(255, 99, 132, 0.5)'
          // callback: function (value: any, index: any, ticks: any) {
          //   console.log(value);
          //   return "$" + value;
          // },
        },
        afterTickToLabelConversion: function (data: any) {
          const xLabels = data.ticks;
          xLabels.forEach(function (label: any, i: any) {
            // check odd number
            if (xLabels[i].value % 1 !== 0) {
              xLabels[i] = { value: '12', label: '12' };
            }
          });
        },
        border: {
          color: 'rgba(255, 99, 132, 0.5)'
        }
      },
      y1: {
        beginAtZero: false,
        type: 'linear' as const,
        display: false,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false
        }
      }
    }
  };

  const data = {
    labels: chartData ? chartData.labels : [],
    datasets: chartData ? chartData.datasets : []
    // datasets: [
    //   {
    //     label: "Dataset 1",
    //     data: labels.map(() => Math.random() * 1000),
    //     borderColor: "rgb(255, 99, 132)",
    //     backgroundColor: "rgba(255, 99, 132, 0.5)",
    //     yAxisID: "y",
    //   },
    //   {
    //     label: "Dataset 2",
    //     data: labels.map(() => Math.random() * 1000),
    //     borderColor: "rgb(53, 162, 235)",
    //     backgroundColor: "rgba(53, 162, 235, 0.5)",
    //     yAxisID: "y1",
    //   },
    // ],
  };

  return (
    <>
      <Box m='20px'>
        {/* HEADER */}
        <Box alignItems='center' display='flex' justifyContent='space-between'>
          <Header subtitle='Chào mừng tới thống kê' title='Thống kê lượt xem' />
        </Box>
        {/* GRID & CHARTS */}
      </Box>
      {chartData ? <Line data={data} options={options as any} /> : null}
    </>
  );
};

export default Page;
Page.Layout = AdminLayout;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  setContext(ctx);

  const mostViewProducts = await ProductServices.getMostViewedProducts().then((res) => {
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
      mostViewProducts
    }
  };
}
