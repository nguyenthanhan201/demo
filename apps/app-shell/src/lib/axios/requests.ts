import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { GetServerSidePropsContext } from 'next';

import { BaseResponse, CustomAxiosError } from '@/types/utils.type';

import { isAxiosExpiredTokenError, isEmpty, isServer } from '../helpers/assertion';
import {
  clearCookie,
  getAccessTokenFromCookie,
  getRefreshTokenFromCookie,
  setAccessTokenToCookie
} from '../helpers/auth';
import { decodedToken } from '../helpers/cookie';

const ERROR_MAX_RETRY = 2;
let context = <GetServerSidePropsContext>{};

export const setContext = (_context: GetServerSidePropsContext) => {
  context = _context;
};

class Http {
  instance: AxiosInstance;
  private accessToken: string;
  private refreshToken: string;
  private refreshTokenRequest: Promise<string> | null;

  constructor() {
    this.accessToken = getAccessTokenFromCookie();
    // this.accessToken =
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGIyNmI1MDE4YzYwZjMyNjdjMzk3MTgiLCJlbWFpbCI6ImZ4YW5uZ3V5ZW4yMDFAZ21haWwuY29tIiwibmFtZSI6InRow6BuaCBhbiBuZ3V54buFbiIsImNyZWF0ZWRBdCI6IjIwMjMtMDctMTVUMDk6NDg6MDAuMTkzWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDctMTVUMDk6NDg6MDAuMTkzWiIsIl9fdiI6MCwicmVmZXNoVG9rZW4iOiIiLCJpYXQiOjE3MTE0MzkxMzIsImV4cCI6MTcxMTQzOTE0Mn0.xCae6UXrsnPB8EMU-MkC6fBJbrzS_8jYQtJeGxLRICw';
    this.refreshToken = getRefreshTokenFromCookie();
    // this.refreshToken =
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGIyNmI1MDE4YzYwZjMyNjdjMzk3MTgiLCJlbWFpbCI6ImZ4YW5uZ3V5ZW4yMDFAZ21haWwuY29tIiwibmFtZSI6InRow6BuaCBhbiBuZ3V54buFbiIsImNyZWF0ZWRBdCI6IjIwMjMtMDctMTVUMDk6NDg6MDAuMTkzWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDctMTVUMDk6NDg6MDAuMTkzWiIsIl9fdiI6MCwicmVmZXNoVG9rZW4iOiIiLCJpYXQiOjE3MTE0MzkxMzIsImV4cCI6MTcxMTQzOTE0Mn0.xCae6UXrsnPB8EMU-MkC6fBJbrzS_8jYQtJeGxLRICw';
    this.refreshTokenRequest = null;
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BE,
      withCredentials: true,
      timeout: 60000, // 60s
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.instance.interceptors.request.use((config) => {
      if (!isEmpty(this.accessToken)) {
        config.headers.Authorization = `Bearer ${this.accessToken}`;
        return config;
      }

      if (isServer() && context?.req?.headers.cookie) {
        const token = decodedToken(
          context.req.headers.cookie?.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')
        );

        config.headers.Authorization = `Bearer ${token}`;
        return config;
      }

      return config;
    });

    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (errorResponse: CustomAxiosError) => {
        const config: AxiosRequestConfig = errorResponse.response?.config || {};

        // Lỗi Unauthorized (401) có rất nhiều trường hợp
        // - Token không đúng
        // - Không truyền token
        // - Token hết hạn*

        // retry if error is not expired token
        if (!isAxiosExpiredTokenError(errorResponse)) {
          return this.handleRetryRequest(0, errorResponse);
        } else {
          // Trường hợp Token hết hạn và request đó không phải là của request refresh token
          // thì chúng ta mới tiến hành gọi refresh token

          // Hạn chế gọi 2 lần handleRefreshToken
          this.refreshTokenRequest = this.refreshTokenRequest
            ? this.refreshTokenRequest
            : this.handleRefreshToken().finally(() => {
                // Giữ refreshTokenRequest trong 10s cho những request tiếp theo nếu có 401 thì dùng
                setTimeout(() => {
                  this.refreshTokenRequest = null;
                }, 10000);
              });

          return this.refreshTokenRequest.then((accessToken) => {
            // Nghĩa là chúng ta tiếp tục gọi lại request cũ vừa bị lỗi
            return this.instance({
              ...config,
              headers: {
                ...config.headers,
                authorization: accessToken
              }
            });
          });
        }
      }
    );
  }

  private handleRetryRequest(errorCount: number = 0, errorResponse: CustomAxiosError) {
    // Create a new instance with updated headers
    const newRequestInstance = axios.create({
      ...this.instance.defaults,
      headers: {
        ...this.instance.defaults.headers
      }
    });

    // Copy headers from original request
    const request = newRequestInstance.request({
      ...errorResponse.config,
      headers: {
        ...errorResponse.config?.headers
      }
    });
    const randomTime = Math.pow(2, errorCount) * 3000 + Math.random() * 1000;

    if (errorCount < ERROR_MAX_RETRY) {
      return setTimeout(async () => {
        await request
          .then((res) => {
            return res;
          })
          .catch(async () => {
            await this.handleRetryRequest(errorCount + 1, errorResponse);
          });
      }, randomTime);
    } else {
      // console.log('🚀 ~ file: crud-axios.ts error', errorResponse);
      return Promise.reject(errorResponse);
    }
  }

  private async handleRefreshToken(): Promise<string> {
    const AuthServices = await import('../repo/auth.repo').then((rs) => rs.AuthServices);

    return await AuthServices.refreshToken(this.refreshToken)
      .then(async (rs) => {
        const { access_token: newToken } = rs;
        setAccessTokenToCookie(newToken);
        this.accessToken = newToken;
        return newToken;
      })
      .catch((error) => {
        console.log('🚀 ~ handleRefreshError', error);
        clearCookie();
        this.accessToken = '';
        this.refreshToken = '';
        throw error;
      });
  }
}

const http = new Http().instance;

export const get = async <V, E = AxiosError>(
  path: string,
  config?: AxiosRequestConfig
): BaseResponse<V, E> => {
  try {
    const response = await http.get(path, config);
    return {
      code: 'SUCCESS',
      data: response.data
    };
  } catch (error) {
    return {
      code: 'ERROR',
      error: error as E
    };
  }
};

export const post = async (path: string, data: object = {}, config?: AxiosRequestConfig) => {
  const response: AxiosResponse = await http.post(path, data, config);
  return response.data;
};

export const put = async (path: string, data: object = {}, config?: AxiosRequestConfig) => {
  const response: AxiosResponse = await http.put(path, data, config);
  return response.data;
};

export const deleteReq = async (path: string, config?: AxiosRequestConfig) => {
  const response: AxiosResponse = await http.delete(path, config);
  return response.data;
};
