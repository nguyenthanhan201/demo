import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/user/account');
  });

  return <></>;
};

export default Page;
