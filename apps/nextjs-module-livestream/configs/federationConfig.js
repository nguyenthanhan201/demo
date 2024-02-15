/* eslint-disable @typescript-eslint/no-var-requires */
const { dependencies } = require('../package.json');

// const CONTENT_APP_URL = process.env.CONTENT_APP_URL || "http://localhost:3001";

// const _remotes = (isServer) => {
//   const location = isServer ? "ssr" : "chunks";
//   return {
//     content: `content@${CONTENT_APP_URL}/_next/static/${location}/remoteEntry.js`,
//   };
// };

const federationConfig = (_isServer) => {
  return {
    name: 'nextjs-module-livestream',
    filename: 'static/chunks/remoteEntry.js',
    // remotes: remotes(isServer),
    remotes: {},
    exposes: {
      // "./ReactAppLoader": "./src/ReactAppLoader.tsx",
      './Hls': './src/Hls.tsx',
      './100mslive': './src/100mslive.tsx'
      // './Nav': './src/Nav.tsx',
      // './Line': './src/Line.tsx'
    },
    shared: {
      // ...dependencies,
      // react: {
      //   // eager: true,
      //   singleton: true,
      //   requiredVersion: dependencies["react"],
      // },
      // "react-dom": {
      //   singleton: true,
      //   requiredVersion: dependencies["react-dom"],
      // },
      // next: {
      //   // eager: true
      //   singleton: true,
      //   requiredV ersion: dependencies["next"],
      // },
      // "next/router": {
      //   eager: false,
      //   singleton: true,
      //   requiredVersion: dependencies["next"],
      // },
    }
    // extraOptions: {
    //   exposePages: true,
    // },
  };
};

module.exports = federationConfig;
