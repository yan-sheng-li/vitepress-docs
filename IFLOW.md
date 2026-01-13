# 木子空间 VitePress 文档项目

## 项目概述

这是一个基于 VitePress 构建的静态文档网站项目，名为"木子空间"。项目使用 VitePress 2.0.0-alpha.15 版本，主要用于创建美观、高性能的文档网站。

## 技术栈

- **文档框架**: VitePress 2.0.0-alpha.15
- **包管理器**: pnpm
- **语言**: Markdown

## 项目结构

```
my_vitepress_docs/
├── docs/                    # 文档源文件目录
│   ├── .vitepress/         # VitePress 配置目录
│   │   └── config.mts      # VitePress 配置文件
│   ├── index.md            # 首页文件
│   ├── markdown-examples.md # Markdown 示例文档
│   └── api-examples.md     # API 示例文档
├── package.json            # 项目配置和依赖
├── pnpm-lock.yaml          # pnpm 锁定文件
└── .gitignore              # Git 忽略文件配置
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
在本地预览构建后的静态网站

## 开发指南

### 添加新文档
1. 在 `docs/` 目录下创建新的 `.md` 文件
2. 在文件中添加 frontmatter 配置（如需要）
3. 在导航中添加链接（通过配置文件或手动链接）

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

## 注意事项

1. VitePress 配置文件使用 `.mts` 扩展名，表示 ES 模块语法
2. 开发时注意缓存问题，如需要可以删除 `docs/.vitepress/cache` 目录
3. 构建前确保所有依赖已正确安装

## 部署建议

构建完成后，可以将 `docs/.vitepress/dist` 目录部署到任何静态文件托管服务，如：
- GitHub Pages
- Netlify
- Vercel
- 等等