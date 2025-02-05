import dynamic from 'next/dynamic';

const DefaultFooter = dynamic(() => import('../default-footer/DefaultFooter'));
const DefaultHeader = dynamic(() => import('../default-header/DefaultHeader'));

const DefaultLayout = ({ ...props }: any) => {
  return (
    <>
      <DefaultHeader />
      <div className='app'>
        <div className='main'>
          {props.children}
          <DefaultFooter />
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
