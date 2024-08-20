import { setupWorker } from 'msw/browser';

import { testHttp } from '@/lib/msw/testHttp';

export const worker = setupWorker(...testHttp.getHandlers());
