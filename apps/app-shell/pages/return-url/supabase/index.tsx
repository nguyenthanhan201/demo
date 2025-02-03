import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { setAccessTokenToCookie, setRefreshTokenToCookie } from '@/lib/helpers/auth';
import { getResultSupabaseSinginRedirectUrl } from '@/lib/helpers/string';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const handleLogin = async () => {
      const authUser = getResultSupabaseSinginRedirectUrl();

      if (!authUser) return router.push('/');

      try {
        const AuthServices = await import('@/lib/repo/auth.repo').then((res) => res.AuthServices);

        await AuthServices.login({
          providerToken: authUser.access_token,
          providerType: 'supabase'
        }).then(async (res) => {
          setAccessTokenToCookie(res.access_token, {
            // 2 day
            expires: new Date(Date.now() + 2 + 24 * 60 * 60 * 1000)
            // sameSite: 'None'
          });
          setRefreshTokenToCookie(res.refresh_token, {
            // 7 days
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          });

          window.location.replace('/');
        });
      } catch (err) {
        alert('Đăng nhập thất bại');
        console.log(err);
      }
    };

    handleLogin();
  }, []);

  return 'Đang xử lí...';
};

export default Page;
