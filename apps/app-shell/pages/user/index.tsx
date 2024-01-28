import { useRouter } from 'next/router';
import { useEffect } from 'react';

import UserPage from '@/components/index/user/UserPage';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/user/account');
  }, []);

  return <UserPage />;
};

export default Page;
