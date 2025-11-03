---
title: Button 按钮
group:
  title: 基础
  order: 1
---

按钮用于触发一个操作。

## 基本用法

```tsx
import React from 'react';
import { Button } from '@sun/ui';

export default () => (
  <>
    <Button>默认按钮</Button>
    <Button variant="secondary" style={{ marginLeft: 8 }}>次要按钮</Button>
  </>
);
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 按钮风格 | 'primary' | 'secondary' | 'primary' |