import { ComponentPropsWithRef } from 'react';

export type InfinityListProps = ComponentPropsWithRef<'div'> & {
  dataLength: number;
  hasMore: boolean;
  loader: JSX.Element;
  next: () => Promise<void>;
};
