import type { Preview } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from '@sun/ui';
import '@sun/ui/index.css';
import 'antd/dist/reset.css';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ConfigProvider locale={zhCN} theme={{ token: { colorPrimary: '#006fee' } }}>
        <ThemeProvider>
          <div style={{ padding: 16 }}>
            <Story />
          </div>
        </ThemeProvider>
      </ConfigProvider>
    ),
  ],
};

export default preview;