import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '88f'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', 'a54'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '1c1'),
            routes: [
              {
                path: '/docs/',
                component: ComponentCreator('/docs/', '6d8'),
                exact: true,
                sidebar: "components"
              },
              {
                path: '/docs/components/antd-button',
                component: ComponentCreator('/docs/components/antd-button', '56e'),
                exact: true,
                sidebar: "components"
              },
              {
                path: '/docs/components/boolean-trigger',
                component: ComponentCreator('/docs/components/boolean-trigger', '575'),
                exact: true,
                sidebar: "components"
              },
              {
                path: '/docs/components/button',
                component: ComponentCreator('/docs/components/button', 'bb1'),
                exact: true,
                sidebar: "components"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
