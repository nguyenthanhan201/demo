import { Auth } from '@/types/auth.type';

import { get, post } from '../axios/requests';

export class AuthRepository {
  async getUserByEmail(name: string, email: string) {
    const res = await post(`api/v1/auth/getUserByEmail`, { name, email });
    return res;
  }

  async login({
    providerToken,
    providerType
  }: {
    providerToken: string;
    providerType: 'firebase' | 'supabase';
  }) {
    const res = await post(`api/v1/auth/login`, { providerToken, providerType });
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

    if (res.code === 'ERROR') {
      throw new Error(res.error.message);
    }

    return res.data;
  }
}
export const AuthServices = new AuthRepository();
