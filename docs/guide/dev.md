---
title: 开发与发布流程
order: 2
---

## 开发约定

- 组件旁边放置 `index.md` 作为文档与 Demo。
- 包产物使用 `father` 输出到 `dist/esm` 与 `dist/cjs`。
- 类型统一由根 `tsconfig.base.json` 管理，包内设置 `declarationDir`。

## 常用命令

- 开发文档站：`pnpm dev`
- 构建所有包：`pnpm -r build`
- 递归 Lint：`pnpm -r lint`
- 递归测试：`pnpm -r test`

## 发布（Changesets）

1. 创建变更：`pnpm changeset`
2. git推送代码，触发github action自动发布（详情见[发布流程](releases.md)）
