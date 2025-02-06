import dynamic from 'next/dynamic';

import SiderBar from './components/SiderBar';

const DefaultFooter = dynamic(() => import('@/layouts/default-footer/DefaultFooter'));
const DefaultHeader = dynamic(() => import('../default-header/DefaultHeader'));

const UserLayout = ({ ...props }: any) => {
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

export default UserLayout;
