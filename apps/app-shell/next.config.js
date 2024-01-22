// https://bundlephobia.com
// https://www.skypack.dev
const NextFederationPlugin = require('@module-federation/nextjs-mf');
const { FederatedTypesPlugin } = require('@module-federation/typescript');
const federationConfig = require('./src/configs/federationConfig');
// const CompressionPlugin = require('compression-webpack-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // compress: true,
  // optimizeFonts: true,
  // transpilePackages: ['@mui/material'],
  // sassOptions: {
  //   includePaths: ['./src'],
  //   prependData: `@import "sass/index.scss";`
  // },
  images: {
    // limit of 25 deviceSizes values
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // limit of 25 imageSizes values
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // limit of 50 domains values
    domains: [
      'picsum.photos',
      'i.imgur.com',
      'cf.shopee.vn',
      'img.websosanh.vn',
      'gudlogo.com',
      'bizweb.dktcdn.net',
      'fakestoreapi.com',
      'www.godrejinterio.com'
    ],
    // path prefix for Image Optimization API, useful with `loader`
    path: '/_next/image',
    // loader can be 'default', 'imgix', 'cloudinary', 'akamai', or 'custom'
    loader: 'default',
    // disable static imports for image files
    disableStaticImages: false,
    // minimumCacheTTL is in seconds, must be integer 0 or more
    minimumCacheTTL: 60,
    // ordered list of acceptable optimized image formats (mime types)
    formats: ['image/webp'],
    // enable dangerous use of SVG images
    dangerouslyAllowSVG: false,
    // set the Content-Security-Policy header
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // limit of 50 objects
    remotePatterns: [],
    // when true, every image will be unoptimized
    unoptimized: false
  },
  // cant-access-my-pages-by-url-with-nextjs
  // trailingSlash: true,
  // Faster minification with SWC
  swcMinify: true,
  // Adding policies:
  // https://blog.logrocket.com/using-next-js-security-headers/

  i18n: {
    locales: ['vi', 'en'],
    defaultLocale: 'vi'
  },
  reactStrictMode: false,
  /**
   *
   * @param {import('webpack').Configuration} config
   * @returns {import('webpack').Configuration}
   */
  webpack(config, options) {
    const { isServer, dev } = options;
    // config.plugins.push(new NextFederationPlugin(federationConfig(isServer)));

    // if (!isServer) {
    //   config.plugins.push(
    //     new FederatedTypesPlugin({
    //       federationConfig: federationConfig(isServer)
    //     })
    //   );
    // }

    // Reduce Next.Js Bundle Size By Replacing React With Preact
    // https://joyofcode.xyz/next-bundle-size
    // if (!dev && !isServer) {
    //   // Note, preact is only enabled for production builds (`next build`)
    //   Object.assign(config.resolve.alias, {
    //     'react/jsx-runtime.js': 'preact/compat/jsx-runtime',
    //     react: 'preact/compat',
    //     'react-dom/test-utils': 'preact/test-utils',
    //     'react-dom': 'preact/compat'
    //   });
    // }

    // config.plugins.push(
    //   // new CompressionPlugin({
    //   //   // filename: "[path].gz[query]",
    //   //   algorithm: 'gzip',
    //   //   test: /\.js$|\.css$|\.tsx$|\.scss$|\.ts$/,
    //   //   threshold: 10240,
    //   //   minRatio: 0.9
    //   // })
    //   new CompressionPlugin({
    //     algorithm: 'gzip'
    //   })
    // );

    return config;
  }
  // experimental: {
  //   urlImports: ['https://cdn.skypack.dev', 'https://images.unsplash.com'],
  //   optimizeCss: true // enabling this will enable SSR for Tailwind
  // }
};

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

// module.exports = withBundleAnalyzer(nextConfig);
module.exports = nextConfig;