---
title: Modal 模态框
group:
  title: 反馈
  order: 1
---

用于重要信息提示或交互确认，封装自 antd `Modal`，支持国际化与受控关闭。

## 基本用法

```tsx
import React, { useState } from 'react';
import { Modal, Button } from '@sun-x/ui';

export default () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>打开</Button>
      <Modal open={open} onOpenChange={setOpen} title="删除确认">
        是否删除该记录？
      </Modal>
    </>
  );
};
```

## API

| 属性          | 说明                   | 类型                     | 默认值 |
|---------------|------------------------|--------------------------|--------|
| open          | 是否打开               | `boolean`                | -      |
| onOpenChange  | 打开/关闭回调          | `(open: boolean) => void`| -      |
| okText        | 确认按钮文案           | `string`                 | `'确定'`|
| cancelText    | 取消按钮文案           | `string`                 | `'取消'`|
| locale        | 文案语言               | `'zh' \| 'en'`            | `'zh'` |
| ...rest       | 透传 antd `Modal` 属性 | -                        | -      |

## 最佳实践
- 避免在模态框中放置复杂表单，保持交互简洁明了。
- 使用受控模式便于与外部状态管理集成。