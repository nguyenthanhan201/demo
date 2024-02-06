import dynamic from 'next/dynamic';

import useAuth from '@/lib/hooks/useAuth';

const DefaultFooter = dynamic(() => import('../default-footer/DefaultFooter'));
const DefaultHeader = dynamic(() => import('../default-header/DefaultHeader'));

const DefaultLayout = ({ ...props }: any) => {
  useAuth();

  return (
    <>
      <DefaultHeader />
      <div className='app container'>
        <div className='main'>
          {props.children}
          <DefaultFooter />
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
