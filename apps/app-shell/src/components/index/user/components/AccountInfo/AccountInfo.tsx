import { useAuthStore } from '@/lib/zustand/useAuthStore';

const AccountInfo = () => {
  const { auth } = useAuthStore(['auth']);

  return (
    <table className='table'>
      <tbody>
        <tr className='table__item'>
          <td>Tên</td>
          <td>{auth?.name}</td>
        </tr>
        <tr className='table__item'>
          <td>Email</td>
          <td>{auth?.email}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default AccountInfo;
