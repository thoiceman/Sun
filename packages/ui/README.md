# @sun/ui

Sun UI 组件库。示例包含 Button 组件与主题系统。

## 安装

```bash
npm install @sun/ui @emotion/react @emotion/styled
```

## 使用

```tsx
import React from 'react';
import { Button, ThemeProvider } from '@sun/ui';

export default () => (
  <ThemeProvider>
    <Button variant="primary">按钮</Button>
  </ThemeProvider>
);
```

## API

- Button
  - `variant`: `'primary' | 'outline' | 'ghost'`
  - `size`: `'sm' | 'md' | 'lg'`
  - `fullWidth`: `boolean`