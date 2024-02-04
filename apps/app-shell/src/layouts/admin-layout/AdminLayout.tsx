import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

const AdminLayout = ({ ...props }: any) => {
  // useAuth();
  // const theme = useTheme();
  // const _colors = tokens(theme.palette.mode);

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
