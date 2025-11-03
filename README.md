# Sun 组件库 Monorepo

一个基于 React 的通用组件与图标库，采用 pnpm workspaces + Turborepo 管理，使用 dumi 构建文档站，father 产出 ESM/CJS 产物，Vitest + Testing Library 做单测与行为测试，Changesets 管理多包版本与发布。

## 目录结构

```
.
├─ docs/                     # 文档站内容（首页、指南等）
│  ├─ index.md               # 文档站首页
│  └─ guide/                 # 指南与流程文档
│     ├─ quick-start.md      # 快速开始
│     └─ dev.md              # 开发与发布流程
├─ packages/
│  ├─ ui/                    # UI 组件包（@sun/ui）
│  │  ├─ src/                # 组件源码与旁路文档
│  │  │  ├─ Button/          # 示例组件：按钮
│  │  │  │  ├─ index.tsx     # 组件入口
│  │  │  │  ├─ style.module.css
│  │  │  │  └─ index.md      # 组件文档（Demo、API）
│  │  │  └─ index.ts         # 包导出汇总
│  │  ├─ .fatherrc.ts        # father 构建配置（esm/cjs）
│  │  ├─ tsconfig.json       # 包内 TS 配置（声明目录）
│  │  └─ vitest.config.mts   # Vitest 测试配置（jsdom）
│  └─ icons/                 # 图标包（@sun/icons）
│     ├─ src/
│     │  ├─ IconStar/
│     │  │  ├─ index.tsx
│     │  │  └─ index.md
│     │  └─ index.ts
│     ├─ .fatherrc.ts
│     ├─ tsconfig.json
│     └─ vitest.config.mts
├─ .dumirc.ts                # dumi 文档配置（atomDirs、alias、导航）
├─ turbo.json                # Turborepo 管道与缓存配置
├─ tsconfig.base.json        # 根 TS 配置（统一严格模式与出码目标）
├─ pnpm-workspace.yaml       # pnpm 工作区配置
├─ eslint.config.js          # ESLint v9 扁平配置
├─ .prettierrc               # Prettier 配置
├─ package.json              # 根脚本与统一依赖
└─ .changeset/config.json    # Changesets 发布配置
```

## 技术栈

- pnpm workspaces：多包管理，统一依赖安装与版本解析，本地包互相引用
- Turborepo：任务编排与增量缓存（build/test/lint 并行，只构建受影响包）
- Changesets：多包语义化版本与发布，自动生成 CHANGELOG，协同 `npm publish`
- dumi：组件库文档与演示（旁路 `index.md` 自动解析 Demo、API）
- father：产物构建，按源码目录输出 ESM/CJS（bundless），`peerDependencies` 走 external
- TypeScript：统一类型配置与声明输出（`tsconfig.base.json` + 包内 `tsconfig.json`）
- ESLint v9 + Prettier：扁平配置与统一代码风格
- Vitest + @testing-library/react + @testing-library/jest-dom：组件行为测试与可访问性断言

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动文档站（http://localhost:8000/）
pnpm dev

# 递归构建 / Lint / 测试
pnpm -r build
pnpm -r lint
pnpm -r test

# 仅构建某包（示例：@sun/ui）
turbo run build --filter=@sun/ui

# 构建静态文档站
pnpm build:docs
```

## 新增组件步骤（@sun/ui）

1. 创建组件目录与文件：
   - `packages/ui/src/MyComponent/index.tsx`
   - `packages/ui/src/MyComponent/style.module.css`（可选）
   - `packages/ui/src/MyComponent/index.md`（文档与 Demo）
2. 在包导出文件注册组件：
   - 编辑 `packages/ui/src/index.ts`，新增 `export * from './MyComponent';`
3. 编写测试：
   - `packages/ui/src/MyComponent/index.test.tsx`（建议覆盖渲染、交互、可访问性）
4. 本地验证：
   - `pnpm -r lint`、`pnpm -r test`、`pnpm -r build`
   - `pnpm dev` 在文档侧边栏或「组件」页查看 Demo

> 图标组件新增方式与之类似，路径位于 `packages/icons/src/*`。

## 发布组件库步骤（Changesets）

1. 新增变更：
   ```bash
   pnpm changeset
   # 根据提示选择变更的包与版本类型（patch/minor/major），填写变更说明
   ```
2. 提交并发起合并：
   - 提交 Changeset 文件（位于 `.changeset/`）并创建 PR
3. 合并到主分支后发布：
   ```bash
   pnpm release
   # 等价流程：changeset version（提版本）→ pnpm -r build（构建所有包）→ changeset publish（发布）
   ```
4. 发布前检查：
   - `.changeset/config.json` 的 `repo` 替换为你的实际仓库（用于生成 CHANGELOG 链接）
   - 确保 npm 登录并具备发布权限（建议使用作用域包名）
   - `peerDependencies` 保持与 React 版本一致（当前为 `>=18`）

## 开发注意事项

- 代码与类型：
  - 启用严格模式（TS），为组件 Props 与返回值提供完整类型
  - 优先使用命名导出，避免默认导出以保持 API 一致性
  - 复杂组件建议使用 `forwardRef` 并设置 `displayName`
- 样式与可访问性：
  - 使用 CSS Modules（`*.module.css`），避免全局样式污染
  - 注意 `aria-*` 与语义化标签，测试中使用 jest-dom 断言（如 `toBeInTheDocument`）
- 构建与依赖：
  - `father` bundless 输出到 `dist/esm`、`dist/cjs`，类型到 `dist/types`
  - 组件库对 `react`、`react-dom` 使用 `peerDependencies`
- 文档约定：
  - 组件旁 `index.md` 放置示例与 API，dumi 自动解析并展示
  - 站点首页与指南位于 `docs/`，导航由 `.dumirc.ts` 管理
- 工具与脚本：
  - ESLint v9 扁平配置文件为 `eslint.config.js`
  - 测试环境为 jsdom，适配器导入 `@testing-library/jest-dom/vitest`
  - Turborepo 可用 `--filter` 加速局部构建与测试

## 常用命令速查

- `pnpm dev`：启动 dumi 文档站
- `pnpm -r build`：递归构建所有包（father）
- `pnpm -r lint`：递归 ESLint 检查
- `pnpm -r test`：递归 Vitest 测试
- `turbo run build --filter=@sun/ui`：仅构建 UI 包
- `pnpm build:docs`：构建静态文档站
- `pnpm changeset` → `pnpm release`：版本与发布流程

---

如需自定义主题（Logo、色彩、导航）或接入远程缓存（Turborepo Remote Cache），请在 `.dumirc.ts` 与 `turbo.json` 中调整配置，我可以继续帮助完善。
