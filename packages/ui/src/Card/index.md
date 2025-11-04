---
title: Card 卡片
group:
  title: 展示
  order: 1
---

用于承载信息块与操作，封装自 antd `Card`，支持主题定制与移动端优化。

## 基本用法

```tsx
import React from 'react';
import { Card } from '@sun-x/ui';

export default () => (
  <Card title="示例卡片">
    <p>卡片内容区域</p>
  </Card>
);
```

## API

| 属性       | 说明                     | 类型        | 默认值 |
|------------|--------------------------|-------------|--------|
| title      | 标题                     | `ReactNode` | -      |
| hoverable  | 鼠标悬浮阴影             | `boolean`   | `true` |
| ariaLabel  | 可访问性区域描述         | `string`    | -      |
| ...rest    | 透传 antd `Card` 其他属性 | -           | -      |

## 最佳实践
- 通过 CSS 变量自定义圆角与阴影以适配主题。
- 在移动端减少外边距并使用流式布局。