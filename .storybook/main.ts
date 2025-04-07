import type { StorybookConfig } from '@storybook/react-vite';
import graphql from 'vite-plugin-graphql-loader';
import remarkGfm from 'remark-gfm';
const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    '@storybook/preset-scss',
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test",
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  core: {
    builder: '@storybook/builder-vite', // 👈 The builder enabled here.
  },
  docs:{
    autodocs: true,
    defaultName: '使用说明 Docs',
  },
  typescript: {
    // Enables the `react-docgen-typescript` parser.
    // See https://storybook.js.org/docs/api/main-config/main-config-typescript for more information about this option.
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
        tsconfigPath: './tsconfig.app.json', // 👈 This solves your problem.
    },
  },
  async viteFinal(config) {
    return {
      ...config,
      plugins: [...(config.plugins ?? []), graphql()],
    };
  },
  features: {
    viewportStoryGlobals: true,
  },
};
export default config;