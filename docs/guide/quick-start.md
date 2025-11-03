---
title: 快速开始
order: 1
---

## 安装

```bash
pnpm add @sun/ui @sun/icons react react-dom
```

## 使用示例

```tsx
import React from 'react';
import { Button } from '@sun/ui';
import { IconStar } from '@sun/icons';

export default () => (
  <>
    <Button>默认按钮</Button>
    <Button variant="secondary" style={{ marginLeft: 8 }}>次要按钮</Button>
    <IconStar size={20} style={{ marginLeft: 12 }} />
  </>
);
```

## 本地开发

- 启动文档站：`pnpm dev`
- 递归构建：`pnpm -r build`
- 代码检查：`pnpm -r lint`
- 单元测试：`pnpm -r test`