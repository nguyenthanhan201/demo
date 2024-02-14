import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';

import { isEmpty } from '@/lib/helpers/assertion';
import { getCookie } from '@/lib/hooks/useCookie';

const RetrictedAuth = ({ ...props }: any): JSX.Element => {
  const router = useRouter();
  const isLogined = !isEmpty(getCookie('token'));

  const layoutProps = props ? props : {};
  const { ChildLayout, ...restProps } = layoutProps;
  const Layout = ChildLayout ? ChildLayout : Fragment;

  useEffect(() => {
    if (isLogined) {
      router.replace('/');
      // window.location.href = '/';
    }
  }, [isLogined]);

  return <Layout {...restProps}>{props.children}</Layout>;
};

export default RetrictedAuth;
