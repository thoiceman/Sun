import type { Config } from '@docusaurus/types';

const config: Config = {
  title: 'Sun UI',
  url: 'https://example.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  i18n: { defaultLocale: 'zh-CN', locales: ['zh-CN'] },
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/docs',
          sidebarPath: require.resolve('./sidebars.ts'),
        },
        blog: false,
        theme: { customCss: require.resolve('./src/css/custom.css') },
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: 'Sun UI',
      items: [
        { to: '/docs/components/button', label: '组件', position: 'left' },
        { href: 'http://localhost:6006', label: 'Storybook', position: 'right' },
      ],
    },
  },
};

export default config;