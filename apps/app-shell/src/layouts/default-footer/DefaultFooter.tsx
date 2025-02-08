import Link from 'next/link';
import { memo } from 'react';

import Grid from '../../components/shared/Grid';

const footerAboutLinks = [
  {
    display: 'Giới Thiệu',
    path: '/about'
  },
  {
    display: 'Liên Hệ',
    path: '/about'
  },
  {
    display: 'Tuyển Dụng',
    path: '/about'
  },
  {
    display: 'Tin Tức',
    path: '/about'
  },
  {
    display: 'Hệ Thống Của Hàng',
    path: '/about'
  }
];

const footerCustomerLinks = [
  {
    display: 'Chính Sách Đổi Trả',
    path: '/about'
  },
  {
    display: 'Chính Sách Bảo Hành',
    path: '/about'
  },
  {
    display: 'Chính Sách Hoàn Tiền',
    path: '/about'
  }
];

const DefaultFooter = () => {
  return (
    <footer className='flex flex-col gap-4'>
      <Link className='block relative w-[10%] h-10' href='/'>
        <img alt='yolo-logo' className='footer_logo object-contain' src='/images/Logo-2.png' />
      </Link>
      <Grid col={4} gap={10} mdCol={2} smCol={1}>
        <div className='flex flex-col gap-7'>
          <h3 className='font-bold !text-white text-lg'>Về Yolo</h3>
          <ul className='flex flex-col gap-2 text-sm'>
            {footerAboutLinks.map((item, index) => (
              <li key={index}>
                <a href='/#'>{item.display}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className='flex flex-col gap-7'>
          <h3 className='font-bold !text-white text-lg'>Chăm sóc khách hàng</h3>
          <ul className='flex flex-col gap-2 text-sm'>
            {footerCustomerLinks.map((item, index) => (
              <li key={index}>
                <a href='/#'>{item.display}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className='flex flex-col gap-7'>
          <h3 className='font-bold !text-white text-lg'>Team Solutions</h3>
          <div className='text-sm'>
            <a href='/#'>
              <i className='bx bxl-facebook-circle' />
            </a>
            <a href='/#'>
              <i className='bxl-instagram-alt bx' />
            </a>
            <a href='/#'>
              <i className='bx bxl-twitter' />
            </a>
            <a href='/#'>
              <i className='bx bxl-youtube' />
            </a>
          </div>
        </div>
      </Grid>
    </footer>
  );
};

export default memo(DefaultFooter);
