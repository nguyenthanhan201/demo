/* eslint-disable @typescript-eslint/no-var-requires */
const { dependencies } = require("../package.json");

const CONTENT_APP_URL = process.env.CONTENT_APP_URL || "http://localhost:3001";

const remotes = (isServer) => {
  const location = isServer ? "ssr" : "chunks";
  return {
    content: `content@${CONTENT_APP_URL}/_next/static/${location}/remoteEntry.js`,
  };
};

const federationConfig = (isServer) => {
  return {
    name: "remote_nextjs_module",
    filename: "static/chunks/remoteEntry.js",
    // remotes: remotes(isServer),
    remotes: {},
    exposes: {
      "./ReactAppLoader": "./src/ReactAppLoader.tsx",
    },
    shared: {
      ...dependencies,
      react: {
        // eager: true,
        singleton: true,
        requiredVersion: dependencies["react"],
      },
      "react-dom": {
        singleton: true,
        requiredVersion: dependencies["react-dom"],
      },
    },
  };
};

module.exports = federationConfig;
