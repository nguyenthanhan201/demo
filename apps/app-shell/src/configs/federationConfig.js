const { dependencies } = require('../../package.json');

const NEXTJS_MODULE_ADMIN_URL = process.env.NEXTJS_MODULE_ADMIN_URL || 'http://localhost:3000';

const remotes = (isServer) => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    'nextjs-module-admin': `nextjs-module-admin@${NEXTJS_MODULE_ADMIN_URL}/_next/static/${location}/remoteEntry.js`
  };
};

const federationConfig = (isServer) => {
  return {
    name: 'app-shell',
    filename: 'static/chunks/remoteEntry.js',
    remotes: remotes(isServer),
    // remotes: {},
    exposes: {},
    shared: {
      // ...dependencies,
      // react: {
      //   // eager: true,
      //   singleton: true,
      //   requiredVersion: dependencies['react']
      // },
      // 'react-dom': {
      //   singleton: true,
      //   requiredVersion: dependencies['react-dom']
      // },
      // next: {
      //   // eager: true
      //   singleton: true,
      //   requiredVersion: dependencies['next']
      // }
      // 'next/router': {
      //   eager: false,
      //   singleton: true,
      //   requiredVersion: dependencies['next']
      // }
    }
    // extraOptions: {
    //   exposePages: true
    // }
  };
};

module.exports = federationConfig;
