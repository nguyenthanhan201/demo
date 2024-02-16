import { getCookie } from '../hooks/useCookie';

export type Dict<T = any> = Record<string, T>;

export function isArray<T>(value: unknown): value is Array<T> {
  return Array.isArray(value);
}

export function isEmptyArray(value: unknown) {
  return isArray(value) && value.length === 0;
}

export function isObject(value: unknown): value is Dict {
  const type = typeof value;

  return value != null && (type === 'object' || type === 'function') && !isArray(value);
}

export function isEmptyObject(value: unknown) {
  return isObject(value) && Object.keys(value).length === 0;
}

export function isEmpty(value: unknown): boolean {
  if (isArray(value)) return isEmptyArray(value);
  if (isObject(value)) return isEmptyObject(value);
  if (value == null || value === '') return true;

  return false;
}

export function isEmptyToken(): boolean {
  return isEmpty(getCookie('token'));
}

export const isServer = () => typeof window === 'undefined';
