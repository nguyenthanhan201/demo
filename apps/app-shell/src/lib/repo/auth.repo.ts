import { Auth } from '@/types/auth.type';

import { get, post } from '../axios/requests';

export class AuthRepository {
  async getUserByEmail(name: string, email: string) {
    const res = await post(`/auth/getUserByEmail`, { name, email });
    return res;
  }

  async login(email: string, name: string) {
    const res = await post(`/auth/login`, { email, name });
    return res;
  }

  async token(email: string) {
    const res = await post(`/auth/token`, { email });
    return res;
  }

  async logout(email: string) {
    const res = await post(`auth/logout`, { email });
    return res;
  }

  async refreshToken() {
    const res = await get<{ access_token: string }>(`auth/refresh-token`);
    return res;
  }

  async getProfile() {
    const res = await get<Auth>(`/auth/profile`);

    if (res.code === 'SUCCESS') {
      return res.data;
    }

    return null;
  }
}
export const AuthServices = new AuthRepository();
