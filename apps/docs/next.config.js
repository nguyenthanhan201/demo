const NextFederationPlugin = require("@module-federation/nextjs-mf");
const { FederatedTypesPlugin } = require("@module-federation/typescript");

/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui"],
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: "remote_nextjs_app",
        filename: "static/chunks/remoteEntry.js",
        remotes: {
          remote_nextjs_module: `remote_nextjs_module@http://localhost:3000/_next/static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`,
        },
        exposes: {},
        shared: {
          react: {
            eager: true,
            // singleton: true,
            // requiredVersion: "18.2.0",
          },
          "react-dom": {
            eager: true,
            // singleton: true,
            // requiredVersion: "18.2.0",
          },
        },
        // extraOptions: {
        //   automaticAsyncBoundary: true,
        // },
      }),

      ...(isServer
        ? []
        : [
            new FederatedTypesPlugin({
              federationConfig: {
                name: "remote_nextjs_app",
                filename: "static/chunks/remoteEntry.js",
                remotes: {
                  remote_nextjs_module: `remote_nextjs_module@http://localhost:3000/_next/static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`,
                },
                exposes: {},
                shared: {
                  react: {
                    eager: true,
                    // singleton: true,
                    // requiredVersion: "18.2.0",
                  },
                  "react-dom": {
                    eager: true,
                    // singleton: true,
                    // requiredVersion: "18.2.0",
                  },
                },
                // extraOptions: {
                //   automaticAsyncBoundary: true,
                // },
              },
            }),
          ])
    );

    return config;
  },
};
