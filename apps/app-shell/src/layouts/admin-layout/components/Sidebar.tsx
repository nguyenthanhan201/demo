import { AnalyticsOutlined as AnalyticsIcon } from '@repo/icons/src/AnalyticsOutlined';
import { HomeOutlined as HomeOutlinedIcon } from '@repo/icons/src/HomeOutlined';
import { ReceiptLong as ReceiptLongOutlinedIcon } from '@repo/icons/src/ReceiptLong';
import { RemoveRedEyeOutlined as RemoveRedEyeOutlinedIcon } from '@repo/icons/src/RemoveRedEyeOutlined';
import { VisibilityOffOutlined as VisibilityOffOutlinedIcon } from '@repo/icons/src/VisibilityOffOutlined';
import Link from 'next/link';
import { useRouter } from 'next/router';

const sidebars = [
  {
    name: 'Dashboard',
    icon: <HomeOutlinedIcon />,
    to: '/admin'
  },
  {
    name: 'Quản lí sản phẩm',
    icon: <RemoveRedEyeOutlinedIcon />,
    to: '/admin/products'
  },
  {
    name: 'Sản phẩm ẩn',
    icon: <VisibilityOffOutlinedIcon />,
    to: '/admin/hide-products'
  },
  {
    name: 'Quản lí đơn hàng',
    icon: <ReceiptLongOutlinedIcon />,
    to: '/admin/orders'
  },
  {
    name: 'Thống kê lượt xem',
    icon: <AnalyticsIcon />,
    to: '/admin/analytics'
  }
];

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className='flex justify-center items-center'>
      <div className='flex flex-col gap-4 h-fit'>
        {sidebars.map((sidebar, index) => {
          return (
            <div
              className={`${router.pathname === sidebar.to && 'pointer-events-none'}`}
              key={index}
            >
              <Link className='flex items-center gap-2' href={sidebar.to}>
                {sidebar.icon}
                <span>{sidebar.name}</span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
