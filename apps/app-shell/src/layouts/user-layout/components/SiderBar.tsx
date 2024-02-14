/* eslint-disable simple-import-sort/imports */
import { Person as PersonIcon } from '@repo/icons/src/Person';
import { ReceiptLong as ReceiptLongIcon } from '@repo/icons/src/ReceiptLong';
import { StarsOutlined as StarsOutlinedIcon } from '@repo/icons/src/StarsOutlined';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';

const listSidebar = [
  {
    icon: <PersonIcon />,
    title: 'Thông tin tài khoản',
    path: '/user/account'
  },
  {
    icon: <ReceiptLongIcon />,
    title: 'Quản lí hóa đơn',
    path: '/user/orders'
  },
  {
    icon: <StarsOutlinedIcon />,
    title: 'Quản lí đánh giá',
    path: '/user/rating'
  }
];

const SiderBar = () => {
  const router = useRouter();
  return (
    <div className='side-bar'>
      <h2>Thông tin người dùng</h2>
      <ul className='side-bar__content'>
        {listSidebar.map((item) => {
          const isSelect = router.pathname === item.path;
          return (
            <li key={item.path}>
              <Link
                className={`side-bar__content__item ${isSelect && 'active'}`}
                href={item.path}
                prefetch={false}
              >
                <NextSeo title={isSelect ? item.title : ''} />
                {item.icon}
                <p>{item.title}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SiderBar;
