# @sun-x/ui

## 0.1.0

### Minor Changes

- ### 新增
  - Button 组件基于 antd 封装，`variant="primary|secondary"` 映射到 antd `type`。
  - 文档全局引入 `antd/dist/reset.css`，统一演示视觉。

  ### 修复
  - 解决自定义 `variant` 与 antd `variant` 的类型冲突（通过 Omit）。
