import { AxiosRequestConfig } from 'axios';

import { get } from '../axios/http';

enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC'
}

type BaseResponseList<T> = {
  data: T[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
};

type GenericFilter = {
  page: number;

  pageSize: number;

  orderBy?: string;

  sortOrder?: SortOrder;
};

export abstract class CrudRepository<T> {
  abstract apiName: string;
  abstract displayName: string;

  async getAll(filter?: GenericFilter, config?: AxiosRequestConfig): Promise<BaseResponseList<T>> {
    const res = await get<BaseResponseList<T>>(`api/v1/${this.apiName}`, {
      params: {
        ...filter
      },
      ...config
    });
    console.log('👌  res:', res);

    if (res.code === 'ERROR') {
      console.log(`Lấy danh sách ${this.apiName} thất  bại.`);
      throw new Error(res.error.message);
    }

    return res.data.metadata;
  }
}
