// https://blog.openreplay.com/removing-unused-css-with-purgecss/
module.exports = {
  plugins: {
    tailwindcss: {},
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
      content: ['./src/**/*.{html,tsx}', './pages/**/*.{html,tsx}'],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
      safelist: {
        standard: ['html', 'body']
      }
    }
  }
};
