import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import dotenvPlugin from 'rollup-plugin-dotenv';

export const config: Config = {
  namespace: 'ci-header',
  env: {
    ALGOLIA_APPLICATION_ID: process.env.ALGOLIA_APPLICATION_ID,
    ALGOLIA_SEARCH_API_KEY: process.env.ALGOLIA_SEARCH_API_KEY,
    NODE_ENV: process.env.NODE_ENV,
    ROLLBAR_ACCESS_TOKEN: process.env.ROLLBAR_ACCESS_TOKEN,
  },
  outputTargets: [
    {
      type: 'docs-readme',
    },
    {
      type: 'dist-hydrate-script',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      baseUrl: 'https://customink.com',
      copy: [
        {
          src: '**/*.js',
          dest: 'build/scripts',
        },
      ],
    },
  ],
  plugins: [
    sass({
      injectGlobalPaths: [process.env.NODE_ENV === 'staging' ? 'src/global-styles/staging.scss' : 'src/global-styles/production.scss'],
    }),
    dotenvPlugin(),
  ],
  testing: {
    moduleNameMapper: { '\\.svg': '<rootDir>/__mocks__/svgMock.ts' },
    globals: { self: 'global' },
  },
  extras: {
    experimentalSlotFixes: true,
  },
};
