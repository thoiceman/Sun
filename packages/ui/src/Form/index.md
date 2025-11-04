---
title: Form 表单
group:
  title: 数据输入
  order: 1
---

封装自 antd `Form` 的登录表单示例，支持国际化、校验与可访问性。

## 基本用法

```tsx
import React from 'react';
import { Form } from '@sun-x/ui';

export default () => (
  <Form onSubmit={(values) => console.log(values)} />
);
```

## API

| 属性       | 说明             | 类型                              | 默认值 |
|------------|------------------|-----------------------------------|--------|
| onSubmit   | 表单提交回调     | `(values: { username; password }) => void` | -      |
| locale     | 文案语言         | `'zh' \| 'en'`                      | `'zh'` |
| submitText | 提交按钮文案     | `string`                           | `'提交'`|

## 最佳实践
- 使用垂直布局提升移动端的可读性。
- 在表单项上添加 `aria-label` 以提升可访问性支持。