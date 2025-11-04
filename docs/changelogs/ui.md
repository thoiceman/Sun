---
title: @sun-x/ui 发布记录
order: 1
---

# @sun-x/ui

## 0.1.1

### Patch Changes

- [`f1db801`](https://github.com/thoiceman/Sun/commit/f1db801df0356e6fb8a82eaf7faaa622538e9095) Thanks [@thoiceman](https://github.com/thoiceman)! - 修改文档

## 0.1.0

### Minor Changes

- ### 新增
  - Button 组件基于 antd 封装，`variant="primary|secondary"` 映射到 antd `type`。
  - 文档全局引入 `antd/dist/reset.css`，统一演示视觉。

  ### 修复
  - 解决自定义 `variant` 与 antd `variant` 的类型冲突（通过 Omit）。