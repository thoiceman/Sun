---
title: NavBar 导航栏
group:
  title: 导航
  order: 1
---

用于在页面顶部呈现导航菜单，封装自 antd `Menu`，内置移动端折叠与可访问性支持。

## 基本用法

```tsx
import React from 'react';
import { NavBar } from '@sun-x/ui';

export default () => (
  <NavBar
    items={[
      { key: 'home', label: '首页', href: '/' },
      { key: 'components', label: '组件', href: '/components' },
    ]}
    onSelect={(key) => console.log('selected:', key)}
  />
);
```

## API

| 属性       | 说明                       | 类型                         | 默认值 |
|------------|----------------------------|------------------------------|--------|
| items      | 菜单项列表                 | `{ key, label, href? }[]`    | -      |
| onSelect   | 选择项事件                 | `(key: string) => void`      | -      |
| locale     | 文案语言                   | `'zh' \| 'en'`                | `'zh'` |
| menuProps  | 透传给 antd `Menu` 的属性  | `Partial<MenuProps>`         | -      |

## 最佳实践
- 在移动端通过切换按钮折叠导航，避免占用过多空间。
- 尽量使用语义化的导航项标签，便于无障碍工具识别。