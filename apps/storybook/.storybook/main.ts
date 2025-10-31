import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-vite',
    // 无需在 framework.options 中配置 reactDocgen，该字段不在类型中
    options: {},
  },
  // 正确的关闭方式是设置为 false，而不是 'none'
  typescript: { reactDocgen: false },
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
};

export default config;