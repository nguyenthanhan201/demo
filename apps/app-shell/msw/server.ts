import { setupServer } from 'msw/node';

import { testHttp } from '@/lib/msw/testHttp';

export const server = setupServer(...testHttp.getHandlers());
