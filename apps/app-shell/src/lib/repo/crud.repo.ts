import { AxiosRequestConfig } from 'axios';

import { get } from '../axios/requests';

export abstract class CrudRepository<T> {
  abstract apiName: string;
  abstract displayName: string;

  async getAll(config?: AxiosRequestConfig): Promise<T[]> {
    const res = await get<T[]>(
      `api/v1/${this.apiName}/getAll${this.displayName}/${this.apiName}s`,
      config
    );

    if (res.code === 'ERROR') {
      console.log(`Lấy danh sách ${this.apiName} thất  bại.`);
      throw new Error(res.error.message);
    }

    return res.data.metadata;
  }
}
