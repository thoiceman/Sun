import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  themeConfig: {
    name: 'Sun',
    nav: [
      { title: '指南', link: '/guide/quick-start' },
      { title: '组件', link: '/components' },
    ],
  },
  resolve: {
    atomDirs: [
      { type: 'component', dir: 'packages/ui/src' },
      { type: 'component', dir: 'packages/icons/src' },
    ],
  },
  alias: {
    '@sun-x/ui': path.resolve(__dirname, 'packages/ui/src'),
    '@sun-x/icons': path.resolve(__dirname, 'packages/icons/src'),
  },
});
