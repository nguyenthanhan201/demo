// https://blog.openreplay.com/removing-unused-css-with-purgecss/
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    // tailwindcss: {},
    autoprefixer: {},
    // restore the Next.js default behavior
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009'
      },
      stage: 3,
      features: {
        'custom-properties': false
      }
    },
    // configure PurgeCSS
    '@fullhuman/postcss-purgecss': {
      content: [
        './src/**/*.{html,tsx}',
        './pages/**/*.{html,tsx}',
        './node_modules/react-pro-sidebar/**/*.js',
        './node_modules/react-quill/**/*.js',
        './node_modules/react-toastify/**/*.js'
      ],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
      safelist: {
        standard: ['html', 'body'],
        deep: []
      }
    }
  }
};
