const { defineConfig } = require('@vue/cli-service');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const webpack = require('webpack');
// const { FederatedTypesPlugin } = require('@module-federation/typescript');

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.optimization.delete('splitChunks');
  },
  filenameHashing: false,
  publicPath: 'http://localhost:3003/',
  configureWebpack: {
    devServer: {
      allowedHosts: 'all',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
      }
    },
    // externals: {
    //   vue: 'Vue'
    // },
    resolve: {
      symlinks: false,
      alias: {
        vue: path.resolve(`./node_modules/vue`)
      }
    },
    output: {
      publicPath: 'http://localhost:3003/'
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'vuejs_app',
        filename: 'remoteEntry.js',
        exposes: {
          './HelloWorld': './src/bootstrap.ts',
          // './HelloWorld': './src/components/TestVue.vue',
          './Counter': './src/bootstrap2.ts',
          './Builder': './src/bootstrap-builder.ts',
          './Preview': './src/bootstrap-preview.ts'
        }

        // shared: {
        //   vue: {
        //     singleton: true,
        //     eager: true
        //   }
        // }
      }),
      // NativeFederationTypeScriptHost({
      //   /* options */
      // })
      // new FederatedTypesPlugin({
      //   federationConfig: {
      //     name: 'vue_app',
      //     filename: 'remoteEntry.js',
      //     exposes: {
      //       './DashboardApp': './src/bootstrap'
      //     }
      //     // shared: {
      //     //   vue: {
      //     //     singleton: true,
      //     //     eager: true
      //     //   }
      //     // }
      //   }
      // })
      new webpack.DefinePlugin({
        // Vue CLI is in maintenance mode, and probably won't merge my PR to fix this in their tooling
        // https://github.com/vuejs/vue-cli/pull/7443
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
      })
    ]
  }
});
