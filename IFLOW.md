# 木子空间 VitePress 文档项目

## 项目概述

这是一个基于 VitePress 构建的静态文档网站项目，名为"木子空间"。项目使用 VitePress 2.0.0-alpha.15 版本，主要用于创建美观、高性能的文档网站。项目已配置 GitHub Actions 自动部署到 GitHub Pages。

## 技术栈

- **文档框架**: VitePress 2.0.0-alpha.15
- **包管理器**: pnpm 9
- **语言**: Markdown
- **CI/CD**: GitHub Actions
- **部署平台**: GitHub Pages

## 项目结构

```
my_vitepress_docs/
├── .github/                 # GitHub 配置目录
│   └── workflows/          # GitHub Actions 工作流
│       └── deploy.yml      # 自动部署到 GitHub Pages 的工作流
├── docs/                   # 文档源文件目录
│   ├── .vitepress/        # VitePress 配置目录
│   │   ├── config.mts     # VitePress 配置文件
│   │   ├── cache/         # VitePress 缓存目录
│   │   └── dist/          # 构建输出目录
│   ├── advanced/          # 高级主题文档目录（待填充）
│   ├── guide/             # 指南文档目录（待填充）
│   ├── index.md           # 首页文件
│   ├── markdown-examples.md # Markdown 示例文档
│   └── api-examples.md    # API 示例文档
├── .gitignore             # Git 忽略文件配置
├── IFLOW.md               # 项目说明文档
├── package.json           # 项目配置和依赖
└── pnpm-lock.yaml         # pnpm 锁定文件
```

## 构建和运行命令

### 开发环境
```bash
pnpm run docs:dev
```
启动开发服务器，支持热重载，默认运行在 http://localhost:5173

### 构建生产版本
```bash
pnpm run docs:build
```
构建静态网站，生成文件到 `docs/.vitepress/dist` 目录

### 预览生产版本
```bash
pnpm run docs:preview
```
在本地预览构建后的静态网站，运行在 http://localhost:8080

## 自动部署

项目已配置 GitHub Actions 自动部署到 GitHub Pages：

1. **触发条件**：
   - 向 `main` 分支推送代码时自动触发
   - 可在 GitHub Actions 页面手动触发

2. **部署流程**：
   - 使用 Ubuntu 环境
   - 安装 Node.js 24 和 pnpm 9
   - 安装依赖并构建项目
   - 自动部署到 GitHub Pages

3. **权限配置**：
   - 工作流已配置必要的权限（contents: read, pages: write, id-token: write）
   - 使用并发控制确保部署安全性

## 开发指南

### 添加新文档
1. 在 `docs/` 目录下创建新的 `.md` 文件
2. 在文件中添加 frontmatter 配置（如需要）
3. 在导航中添加链接（通过配置文件或手动链接）

### 目录组织建议
- `docs/guide/` - 存放用户指南和教程文档
- `docs/advanced/` - 存放高级主题和深入内容
- 直接在 `docs/` 目录下存放核心文档

### 配置网站
1. 编辑 `docs/.vitepress/config.mts` 文件
2. 可以配置网站标题、主题、导航栏、侧边栏等

### Markdown 扩展
项目支持 VitePress 提供的 Markdown 扩展：
- 语法高亮
- 自定义容器（info、tip、warning、danger、details）
- 行高亮
- 更多功能参考 [VitePress Markdown 扩展文档](https://vitepress.dev/guide/markdown)

### 自定义组件
可以在 Markdown 文件中使用 Vue 组件，如示例中展示的 `useData()` API 使用。

## 部署指南

### 自动部署（推荐）
项目已配置自动部署到 GitHub Pages，只需：
1. 将代码推送到 `main` 分支
2. GitHub Actions 会自动构建并部署
3. 访问 GitHub Pages URL 查看部署结果

### 手动部署
如需手动部署到其他平台：
1. 运行 `pnpm run docs:build` 构建项目
2. 将 `docs/.vitepress/dist` 目录内容部署到静态文件托管服务

### 支持的部署平台
- GitHub Pages（已配置自动部署）
- Netlify
- Vercel
- 任何支持静态文件的托管服务

## 开发环境要求

- Node.js 24
- pnpm 9
- Git

## 注意事项

1. VitePress 配置文件使用 `.mts` 扩展名，表示 ES 模块语法
2. 开发时注意缓存问题，如需要可以删除 `docs/.vitepress/cache` 目录
3. 构建前确保所有依赖已正确安装
4. 推送代码到 `main` 分支会触发自动部署，请确保代码已经过测试
5. `guide` 和 `advanced` 目录已创建但待填充内容

## 故障排除

### 常见问题
1. **构建失败**：检查依赖是否正确安装，尝试删除 `node_modules` 和 `pnpm-lock.yaml` 后重新安装
2. **部署失败**：检查 GitHub Actions 工作流日志，确认权限配置正确
3. **缓存问题**：删除 `docs/.vitepress/cache` 目录后重新构建

### 获取帮助
- 参考 [VitePress 官方文档](https://vitepress.dev/)
- 查看 GitHub Actions 工作流日志获取部署错误信息
- 检查项目 Issues 页面获取已知问题解决方案