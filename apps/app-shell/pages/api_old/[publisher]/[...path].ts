// import { createProxyMiddleware } from 'http-proxy-middleware';
// import { NextApiRequest, NextApiResponse } from 'next';

// const proxy = createProxyMiddleware({
//   target: process.env.NEXT_PUBLIC_BE
//   // secure: false
//   // pathRewrite: { '^/api/proxy': '' } // remove `/api/proxy` prefix
// });

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   proxy(req, res, (err) => {
//     if (err) {
//       throw err;
//     }

//     throw new Error(`Request '${req.url}' is not proxied! We should never reach here!`);
//   });
// };

// export default handler;

import httpProxy from 'http-proxy';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    // Enable `externalResolver` option in Next.js
    externalResolver: true,
    bodyParser: false
  }
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  new Promise((resolve, reject) => {
    const proxy: httpProxy = httpProxy.createProxy();
    proxy.once('proxyRes', resolve).once('error', reject).web(req, res, {
      changeOrigin: true,
      target: process.env.NEXT_PUBLIC_BE
    });
  });
