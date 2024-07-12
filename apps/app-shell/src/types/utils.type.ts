import { AxiosError } from 'axios';

export type SuccessResponse<V> = {
  code: 'SUCCESS';
  data: V;
};

export type ErrorResponse<E = AxiosError> = {
  code: 'ERROR';
  error: E;
};

export type BaseResponse<V, E = AxiosError> = Promise<SuccessResponse<V> | ErrorResponse<E>>;

// Đây là cú pháp `-?` sẽ loại bỏ undefined của key optional
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>;
};

export type CustomAxiosError = AxiosError<{ message: string }>;

export type BaseResponseBE<T> = {
  message: string;
  statusCode: number;
  metadata: T;
};
