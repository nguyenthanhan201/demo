import dynamic from 'next/dynamic';

import DefaultHeader from '@/layouts/default-header/DefaultHeader';

import SiderBar from './components/SiderBar';

const DefaultFooter = dynamic(() => import('@/layouts/default-footer/DefaultFooter'));

const UserPlayout = ({ ...props }: any) => {
  return (
    <>
      <DefaultHeader />
      <div className='container'>
        <div className='main user-layout'>
          <SiderBar />
          <div className='context'>{props.children}</div>
        </div>
        <DefaultFooter />
      </div>
    </>
  );
};

export default UserPlayout;
