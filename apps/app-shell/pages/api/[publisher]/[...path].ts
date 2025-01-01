import { createProxyMiddleware } from 'http-proxy-middleware';
import { NextApiRequest, NextApiResponse } from 'next';

const proxy = createProxyMiddleware({
  target: process.env.NEXT_PUBLIC_BE
  // secure: false
  // pathRewrite: { '^/api/proxy': '' } // remove `/api/proxy` prefix
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  proxy(req, res, (err) => {
    if (err) {
      throw err;
    }

    throw new Error(`Request '${req.url}' is not proxied! We should never reach here!`);
  });
};

export default handler;
