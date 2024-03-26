import { getCookie, removeCookie, setCookie } from 'my-package/dist/useCookie';

export const getAccessTokenFromCookie = () => {
  return getCookie('token') || '';
};

export const getRefreshTokenFromCookie = () => {
  return getCookie('refreshToken') || '';
};

export const setAccessTokenToCookie = (token: string) => {
  return setCookie('token', token);
};

export const setRefreshTokenToCookie = (refreshToken: string) => {
  return setCookie('refreshToken', refreshToken);
};

export const removeAccessTokenFromCookie = () => {
  return removeCookie('token');
};

export const removeRefreshTokenFromCookie = () => {
  return removeCookie('refreshToken');
};

export const clearCookie = () => {
  removeAccessTokenFromCookie();
  removeRefreshTokenFromCookie();
};
