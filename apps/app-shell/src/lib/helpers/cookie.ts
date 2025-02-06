// type ParsedCookie = {
//   [key: string]: string;

import { GetServerSidePropsContext, NextPageContext } from 'next';

// };
type ParsedCookie = {
  token: string;
  refreshToken: string;
};

const parseCookie = <T extends ParsedCookie>(cookieString: string): T => {
  return cookieString.split(';').reduce((acc, curr) => {
    const [key, value] = curr.trim().split('='); // trim() removes whitespace from both ends of a string
    if (!value || !key) return acc;
    acc[key] = value;
    return acc;
  }, {} as { [key: string]: string }) as T;
};

const decodedToken = (token: string): string => decodeURIComponent(token.replace(/%22/g, ''));

const getAccessTokenFromServerSidePropsContext = (
  context: NextPageContext | GetServerSidePropsContext
): string => {
  const token = decodedToken(
    context.req?.headers.cookie?.replace(
      /(?:(?:^|.*;\s*)90s_access_token\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    ) || ''
  );

  return token;
};

export { decodedToken, getAccessTokenFromServerSidePropsContext, parseCookie };
