import { Auth } from '@/types/auth.type';

import { get, post } from '../axios/requests';

export class AuthRepository {
  async getUserByEmail(name: string, email: string) {
    const res = await post(`api/v1/auth/getUserByEmail`, { name, email });
    return res;
  }

  async login(email: string, name: string) {
    const res = await post(`api/v1/auth/login`, { email, name });
    return res;
  }

  async token(email: string) {
    const res = await post(`api/v1/auth/token`, { email });
    return res;
  }

  async logout(email: string) {
    const res = await post(`api/v1/auth/logout`, { email });
    return res;
  }

  async refreshToken(refreshToken: string): Promise<{ access_token: string }> {
    const res = await post(`api/v1/auth/refresh-token`, {
      refreshToken
    });
    return res;
  }

  async getProfile() {
    const res = await get<Auth>(`api/v1/auth/profile`);

    if (res.code === 'SUCCESS') {
      return res.data;
    }

    return null;
  }
}
export const AuthServices = new AuthRepository();
