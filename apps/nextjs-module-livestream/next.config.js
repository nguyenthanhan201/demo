/* eslint-disable @typescript-eslint/no-var-requires */
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
const { FederatedTypesPlugin } = require('@module-federation/typescript');
const federationConfig = require('./configs/federationConfig');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,
  // transpilePackages: ['@repo/ui'],
  /**
   *
   * @param {import('webpack').Configuration} config
   * @returns {import('webpack').Configuration}
   */
  webpack(config, { isServer }) {
    // config.optimization.sideEffects = true;

    // config.optimization = {
    //   moduleIds: "deterministic",
    //   chunkIds: "named",
    // };
    config.plugins.push(new NextFederationPlugin(federationConfig(isServer)));

    if (!isServer) {
      // config.resolve.alias["next/router"] = path.join(
      //   __dirname,
      //   "/node_modules/next/router.js"
      // );

      config.plugins.push(
        new FederatedTypesPlugin({
          federationConfig: federationConfig(isServer)
        })
      );
    }
    // !isServer &&
    //   config.plugins.push(
    //     new FederatedTypesPlugin({
    //       federationConfig: federationConfig(isServer),
    //     })
    //   );
    // config.plugins.push(
    //   new FederatedTypesPlugin({
    //     federationConfig: federationConfig(isServer),
    //   })
    // );

    // console.log("config.output", config.output);

    // config.devServer = {
    //   ...config.devServer,
    //   static: config.output.path,
    // };

    return config;
  }
  // experimental: {
  //   optimizeCss: true,
  // },
};

module.exports = nextConfig;

// {
//         filename: "types/remote_nextjs_module.d.ts",
//         exposes: {
//           "./ReactAppLoader": "./src/ReactAppLoader.tsx",
//         },
//       }
