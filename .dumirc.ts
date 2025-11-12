import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  themeConfig: {
    name: 'Sun',
    nav: [
      { title: '指南', link: '/guide/quick-start' },
      { title: '组件', link: '/components' },
      { title: '发布记录', link: '/changelogs' },
    ],
  },
  resolve: {
    atomDirs: [
      { type: 'component', dir: 'packages/ui/src' },
      { type: 'component', dir: 'packages/icons/src' },
    ],
    // 为 API 解析指定入口文件，便于识别导出的原子资产
    entryFile: 'packages/ui/src/index.ts',
  },
  alias: {
    '@sun-x/ui': path.resolve(__dirname, 'packages/ui/src'),
    '@sun-x/icons': path.resolve(__dirname, 'packages/icons/src'),
  },
  // 开启自动 API 解析功能
  apiParser: {},
});
