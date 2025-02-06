// https://bundlephobia.com
// https://www.skypack.dev
const NextFederationPlugin = require('@module-federation/nextjs-mf');
const { FederatedTypesPlugin } = require('@module-federation/typescript');
const federationConfig = require('./src/configs/federationConfig');
// const million = require('million/compiler');
// const CompressionPlugin = require('compression-webpack-plugin');

const beUrl = process.env.NEXT_PUBLIC_BE || '';
const dev = process.env.NODE_ENV === 'development';

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  optimizeFonts: true,
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
      'www.godrejinterio.com',
      'localhost'
    ],
    // path prefix for Image Optimization API, useful with `loader`
    // path: '/_next/image',
    // loader can be 'default', 'imgix', 'cloudinary', 'akamai', or 'custom'
    // loader: 'default',
    // disable static imports for image files
    // disableStaticImages: false,
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
  trailingSlash: true,
  // Faster minification with SWC
  swcMinify: true,
  // Adding policies:
  // https://blog.logrocket.com/using-next-js-security-headers/

  i18n: {
    locales: ['vi', 'en'],
    defaultLocale: 'vi',
    localeDetection: false
  },
  reactStrictMode: false,
  // async headers() {
  //   return [
  //     {
  //       // matching all API routes
  //       source:
  //         '/demo-nextjs-module-admin-27w0gnlcj-nguyenthanhan201.vercel.app/_next/static/chunks/remoteEntry.js ',
  //       headers: [
  //         {
  //           key: 'Authorization',
  //           value: 'SnJmfAX7LcaRBbszdAwbHTYj'
  //         }
  //       ]
  //     }
  //   ];
  // },
  /**
   *
   * @param {import('webpack').Configuration} config
   * @returns {import('webpack').Configuration}
   */
  webpack(config, options) {
    const { isServer } = options;

    // config.optimization.sideEffects = true;

    // config.optimization = {
    //   // usedExports: false
    //   // sideEffects: true
    // };

    if (!isServer) {
      // Setting `resolve.alias` to `false` will tell webpack to ignore a module.
      // `msw/node` is a server-only module that exports methods not available in
      // the `browser`.
      config.resolve.alias = {
        ...config.resolve.alias,
        'msw/node': false
      };
    }

    config.plugins.push(new NextFederationPlugin(federationConfig(isServer)));
    if (!isServer && dev) {
      console.log('Adding FederatedTypesPlugin');
      config.plugins.push(
        new FederatedTypesPlugin({
          federationConfig: federationConfig(isServer)
        })
      );
    }

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
  },
  experimental: {
    urlImports: [
      'https://cdn.skypack.dev',
      'https://images.unsplash.com',
      'https://cdn.jsdelivr.net',
      'https://www.gstatic.com'
    ],
    optimizeCss: true // enabling this will enable SSR for Tailwind
  },
  // transpilePackages: ['@mui/material'],
  transpilePackages: ['my-package', '@repo/icons'],
  modularizeImports: {
    // '@mui/material/?(((\\w*)?/?)*)': {
    //   transform: '@mui/material/{{ matches.[1] }}/{{member}}'
    // },
    // '@mui/material': {
    //   transform: '@mui/material/{{member}}'
    // },
    '@mui/material/!(styles)/?*': {
      transform: '@mui/material/{{path}}/{{member}}',
      skipDefaultConversion: true
    },
    '@mui/icons-material/?(((\\w*)?/?)*)': {
      transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}'
    }
  },
  async rewrites() {
    // console.log('Rewrites configuration applied');
    // return {
    //   afterFiles: [
    //     {
    //       basePath: false,
    //       // source: '/:localhost:8080/api/v1/upload/image/1718509662888-80932055.jpeg',
    //       // source: '/api/v1/upload/image/:path*', // :path* will match zero or more path segments
    //       source: '/api/v1/upload/image/:path*', // :path* will match zero or more path segments
    //       destination:
    //         'http://localhost:8081/insecure/resize:fit:25:0:no:0/plain/http://api:8080/api/v1/upload/image/1718509662888-80932055.jpeg'
    //     },
    //     {
    //       source: '/images/slider/:path*',
    //       destination: 'http://new-destination-url/:path*'
    //     }
    //   ]
    // };
    // return {
    //   beforeFiles: [
    //     // {
    //     //   source: '/login',
    //     //   destination: 'https://www.youtube.com/'
    //     // }
    //     // {
    //     //   source: '/images/slider/:path*',
    //     //   destination: 'https://picsum.photos/id/237/200/300',
    //     //   basePath: false
    //     // },
    //     // {
    //     //   source: '/api/v1/upload/image/:path*',
    //     //   destination: `http://localhost:8081/insecure/resize:fit:825:0:no:0/plain/${beUrl}upload/image/1718509662888-80932055.jpeg`,
    //     //   basePath: false
    //     // },
    //     // {
    //     //   source: '/_next/image/:path*',
    //     //   destination: `http://localhost:8081/insecure/resize:fit:825:0:no:0/plain/${beUrl}upload/image/1718509662888-80932055.jpeg`,
    //     //   basePath: false
    //     // },
    //     // {
    //     //   // http://localhost:8081/insecure/resize:fit:825:0:no:0/plain/http://api:8080/api/v1/upload/image/1718509078056-80932055.jpeg
    //     //   source: '/_next/image/:path*',
    //     //   // destination: 'http://localhost:8080/api/v1/upload/image/1718523210791-images.jpeg',
    //     //   destination:
    //     //     'http://localhost:8081/insecure/resize:fit:825:0:no:0/plain/https://picsum.photos/id/237/200/300',
    //     //   basePath: false
    //     // }
    //     {
    //       source: '/_next/image/:path*',
    //       destination:
    //         '/_next/image/?url=https://imgproxy-1-0-0.onrender.com/insecure/resize:fit:825:0:no:0/plain/https://picsum.photos/id/237/200/300'
    //       // basePath: false
    //     }
    //     // {
    //     //   source: ''
    //     // }
    //   ]
    // };
    // return [{ source: '/api/:path*', destination: `${beUrl}api/:path*` }];
    return [];
  }
  // redirects() {
  //   return [{ source: '/api/:path*', destination: `${beUrl}api/:path*`, permanent: false }];
  // }
};

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true'
// });

// module.exports = withBundleAnalyzer(nextConfig);
// module.exports = million.next(nextConfig);
module.exports = nextConfig;
