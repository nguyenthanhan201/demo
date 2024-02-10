// https://knip.dev
import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  ignore: ['**/node_modules/**', '**/.git/**', '**/.next/**', '**/out/**', '**/@mf-types/**'],
  next: {
    entry: ['src/pages/**/*.{ts,tsx}', 'pages/**/*.{ts,tsx}']
  }
};

export default config;
