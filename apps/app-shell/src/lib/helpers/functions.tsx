import { CartItem } from '@/types/cartItem.type';
import { Comment } from '@/types/comment.type';

import { CartServices } from '../repo/cart.repo';
import { CommentServices } from '../repo/comment.repo';

export function getUniqueID(prefix: string) {
  return `${prefix}-${Math.floor(Math.random() * 1000000)}`;
}

/**
 * This function removes all event handlers from an object.
 */
export function removeEvents(input: { [key: string]: any }) {
  for (const key in input) {
    if (key.startsWith('on')) {
      delete input[key];
    }
  }

  return input;
}

// 3. Here we loop through the array's type and map it to make the expected array type
type ComponentsWithProps<TComponents extends readonly React.JSXElementConstructor<any>[]> = {
  [key in keyof TComponents]: keyof React.ComponentProps<TComponents[key]> extends never
    ? readonly [TComponents[key]]
    : readonly [TComponents[key], React.ComponentProps<TComponents[key]>];
} & { length: TComponents['length'] };

// 2. I added a generic type here to be able to get the entered argument's type
export const buildProvidersTree = <T extends readonly React.JSXElementConstructor<any>[]>(
  componentsWithProps: ComponentsWithProps<T>
) => {
  // 4. I also added this type to make the errors about `children` go away
  const initialComponent: React.FC<React.PropsWithChildren> = ({ children }) => <>{children}</>;

  return componentsWithProps.reduce((AccumulatedComponents, [Provider, props = {}]) => {
    // eslint-disable-next-line react/display-name
    return function ({ children }) {
      return (
        <AccumulatedComponents>
          <Provider {...props}>{children}</Provider>
        </AccumulatedComponents>
      );
    };
  }, initialComponent);
};

// https://dev.to/arianhamdi/react-query-v4-ssr-in-next-js-2ojj
export const withCSR = (next: any) => async (ctx: any) => {
  // check is it a client side navigation
  const isCSR = ctx.req.url?.startsWith('/_next');

  if (isCSR) {
    return {
      props: {}
    };
  }

  return next?.(ctx);
};

export const refetchCart = async (authId: string, CbSuccess: (cartItems: CartItem) => void) => {
  const cartItems = await CartServices.getCartItemsByIdAuth();
  CbSuccess(cartItems as unknown as CartItem);
};

export type CommentTree = Comment & { childComments: CommentTree[] };

export function buildCommentTree(comments: Comment[]): CommentTree[] {
  const map: any = {};

  // Initialize the map with each comment
  comments.forEach((comment) => {
    map[comment.slug] = { ...comment, childComments: [] };
  });

  // console.log('👌  map:', map);

  const roots: CommentTree[] = [];

  comments.forEach((comment) => {
    const parts = comment.slug.split('/');
    if (parts.length === 1) {
      // Root comment
      roots.push(map[comment.slug]);
    } else {
      // Child comment
      const parentSlug = parts.slice(0, -1).join('/');
      // console.log('👌  parentSlug:', parentSlug);
      if (map[parentSlug]) {
        // console.log('👌  map[parentSlug]:', map[parentSlug]);
        map[parentSlug].childComments.push(map[comment.slug]);
      }
    }
  });

  return roots;
}

export const handleFetchComments = async ({ blogId }: { blogId: string }): Promise<Comment[]> => {
  const res = await CommentServices.getAllComments({
    discuss_id: blogId
  });

  return res;
};
