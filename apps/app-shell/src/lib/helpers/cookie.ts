// type ParsedCookie = {
//   [key: string]: string;
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

export { decodedToken, parseCookie };
