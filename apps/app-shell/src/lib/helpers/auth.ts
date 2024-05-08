import { CookieAttributes } from 'https://cdn.skypack.dev/js-cookie@^3.0.5';
import { getCookie, removeCookie, setCookie } from 'my-package/dist/useCookie';

export const getAccessTokenFromCookie = () => {
  return getCookie('90s_access_token') || '';
};

export const getRefreshTokenFromCookie = () => {
  return getCookie('90s_refresh_token') || '';
};

export const setAccessTokenToCookie = (token: string, options?: CookieAttributes) => {
  return setCookie('90s_access_token', token, options);
};

export const setRefreshTokenToCookie = (refreshToken: string, options?: CookieAttributes) => {
  return setCookie('90s_refresh_token', refreshToken, options);
};

export const removeAccessTokenFromCookie = () => {
  return removeCookie('90s_access_token');
};

export const removeRefreshTokenFromCookie = () => {
  return removeCookie('90s_refresh_token');
};

export const clearCookie = () => {
  removeAccessTokenFromCookie();
  removeRefreshTokenFromCookie();
};
