---
title: InputField 输入框
group:
  title: 基础
  order: 2
---

用于采集单行文本输入，封装自 antd `Input`，内置标签、辅助信息与无障碍支持。

## 基本用法

```tsx
import React from 'react';
import { InputField } from '@sun-x/ui';

export default () => (
  <>
    <InputField label="姓名" required style={{ maxWidth: 320 }} />
    <div style={{ height: 12 }} />
    <InputField label="Name" locale="en" help="Please fill your legal name" />
  </>
);
```

## API

| 属性      | 说明                     | 类型          | 默认值 |
|-----------|--------------------------|---------------|--------|
| label     | 标签文本/节点            | `ReactNode`   | -      |
| help      | 辅助说明                 | `ReactNode`   | -      |
| required  | 是否必填                 | `boolean`     | `false`|
| locale    | 文案语言（影响占位符）   | `'zh' \| 'en'` | `'zh'` |
| status    | 校验状态（透传到 antd）  | `'error' \| 'warning'` | - |
| ...rest   | 其他同 antd `Input` 的属性 | -             | -      |

## 注意事项
- 当提供 `label` 时，组件自动关联无障碍标签与输入框，提升可访问性。
- 国际化通过 `locale` 控制默认占位符，你也可直接传入 `placeholder` 覆盖。
- 建议在移动端限制宽度或使用流式布局以提升体验。