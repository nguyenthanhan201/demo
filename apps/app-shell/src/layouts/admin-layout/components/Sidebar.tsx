import 'react-pro-sidebar/dist/css/styles.css';

import AnalyticsIcon from '@mui/icons-material/Analytics';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
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
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const router = useRouter();

  return (
    <div className='flex justify-center items-center'>
      <div className='flex flex-col gap-4 h-fit'>
        {sidebars.map((sidebar, index) => {
          return (
            <div
              className={`${router.pathname === sidebar.to && 'pointer-events-none'}`}
              key={index}
              role='presentation'
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
