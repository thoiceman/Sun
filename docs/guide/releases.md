---
title: 发布记录与版本规范
order: 3
---

# 发布记录与版本规范

本文说明如何在本仓库中记录发布变更、生成 `CHANGELOG.md`，以及如何编写优质的变更说明。

## 流程总览

- 使用 Changesets 在每次改动时编写变更文件（语义化版本：`major/minor/patch`）。
- 推送到 `main/master` 后，CI 会执行版本号提升、构建、发布，并把版本提交与 `CHANGELOG.md` 回写推送到仓库。
- 每个包的发布记录位于对应目录下的 `CHANGELOG.md`（如：`packages/ui/CHANGELOG.md`）。

## 日常命令

```bash
# 新增一条变更记录（交互式选择包与版本级别）
pnpm changeset

# 本地生成版本与 CHANGELOG（不发布）
pnpm changeset version

# 发布（CI 中执行：version + build + publish）
pnpm release
```

## 编写规范

- 版本级别判定：
  - `major` 不兼容变更（删除/重命名 API、默认行为改变、类型签名破坏）。
  - `minor` 新增功能或非破坏性增强。
  - `patch` 缺陷修复、样式/文档/性能的微调。
- 结构建议：
  - 分类书写：`新增`、`优化`、`修复`、`文档`、`性能`、`测试`、`破坏性变更`。
  - 每条建议一句话描述结果，必要时补充背景与简短示例。
- 关联引用：
  - 关联 Issue/PR：在行尾添加 `(#123)` 或链接，方便追踪。

## 示例 Changeset

在 `.changeset/` 下创建的文件示例：

```markdown
---
"@sun-x/ui": minor
"@sun-x/icons": patch
---

### 新增
- Button 组件基于 antd 封装，`variant="primary|secondary"` 映射到 antd `type`（#456）。

### 修复
- 修复 IconStar 在 SSR 下的警告（#457）。

### 破坏性变更
- Button 的自定义 `variant` 不再透传到 antd（改为内部映射），如需原生 antd `variant` 请直接使用 antd Button。
```

## CI 与权限

- 工作流在发布后会推送“版本提交与标签”，保证仓库中的 `CHANGELOG.md` 与版本号保持一致。
- 如启用 npm 2FA，可在手动触发工作流时传入一次性密码；使用 Automation Token 则无需 OTP。

## 常见问题

- 没有变更文件时执行发布：Changesets 将跳过版本生成与发布，不会产生提交。
- 多包联动：内部依赖版本策略为 `patch`，可在配置中调整（当前已在 `.changeset/config.json` 设置）。

## 最佳实践

- 尽量在每次可发布的改动完成后立即添加变更文件，避免遗漏。
- 在 `新增` 与 `破坏性变更` 中优先提供简短代码示例或用法差异，提升可读性。
- 对外 API 变更尽量遵循语义化版本，避免无谓的 `major`。