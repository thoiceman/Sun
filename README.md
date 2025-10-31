# Sun UI Monorepo

一个基于 React 18+ 与 TypeScript 的组件库工程化模板，包含：

- Monorepo（npm workspaces + Turborepo）
- 组件开发（Storybook + 原子化设计）
- 测试（Jest + React Testing Library + Codecov）
- 文档（Storybook Docs + Docusaurus）
- 规范（ESLint + Prettier）
- 构建与类型（tsup + 完整 d.ts）
- 样式与主题（Emotion + CSS 变量 + 响应式）
- 版本与发布（standard-version + 私有 npm）
- 质量保障（Chromatic 可视化回归、size-limit、Browserslist）

## 快速开始

```bash
# 安装依赖
npm install

# 启动 Storybook（预览组件）
npm run dev --workspace storybook-app

# 启动文档（Docusaurus）
npm run dev --workspace docs

# 构建 UI 包
npm run build --workspace @sun/ui

# 运行测试
npm run test --workspace @sun/ui
```

## 目录结构

```
apps/
  docs/        # Docusaurus 文档站
  storybook/   # 组件开发与演示
packages/
  ui/          # React 组件库
```

## 发布到私有 npm

在根目录 `.npmrc` 中配置私有仓库地址与 Token（参考文件内占位说明），并在 CI 中设置环境变量后执行发布脚本（可在工作流中添加）。