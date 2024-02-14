import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

const AdminLayout = ({ ...props }: any) => {
  return (
    <div className='app !h-screen'>
      <Sidebar />
      <main className='h-full w-full'>
        <Topbar />
        {props.children}
      </main>
    </div>
  );
};

export default AdminLayout;
