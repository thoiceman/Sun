import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider locale={zhCN} theme={{ token: { colorPrimary: '#006fee' } }}>
      {children}
    </ConfigProvider>
  );
}