# 新一代全能运行时：Bun

> **本质**：用现代低级语言 **Zig** 编写、基于苹果 JavaScriptCore 引擎的 **Node.js 超级进化版**。它是运行 gstack 自动化脚本的底座，也是前端开发全新的“火箭推进器”。

## 1. 核心优势

- **速度炸裂**：包管理安装、脚本启动速度比 npm/pnpm 快 10~20 倍，毫秒级响应。
- **全家桶合一**：把 Runtime（运行时）、包管理器（npm/pnpm）、打包工具（Vite/Webpack）、测试工具全部收纳进一个单文件二进制程序中。
- **原生支持 TS/JSX**：零配置，抬手就能直接运行 .ts 和 .tsx 文件。
- **完美白嫖 npm**：没有建立新生态，而是直接读取相同的 npm 官方仓库，并对 Node.js 底层 API 做了 99% 的完美兼容伪装。

## 2. 常用高频命令速查（Cheat Sheet）

### 📦 依赖管理（代 Npm / Pnpm）

```bash
bun init -y          # 初始化新项目
bun install          # 安装项目所有依赖（极速）
bun add <包名>        # 添加生产依赖
bun add -D <包名>     # 添加开发依赖
bun remove <包名>     # 移除依赖
bun add -g <工具>     # 全局安装 CLI 命令行程序（代 npm i -g）
bun update -i        # 带有红黄绿三色 TUI 菜单的交互式升级（强迫症福音）
```

### 🚀 脚本执行（代 Node / Npx）

```bash
bun run index.ts     # 直接运行单一 TypeScript 脚本
bun run dev          # 启动前端本地开发服务
bun --watch run s.ts # 监听模式（热重载），代码保存瞬间自动重启
bunx tldr git        # 临时下载并执行脚本（代 npx），零延迟启动
```

### 🛠️ 内置极客工具

```bash
bun                  # 进入交互式终端 (REPL)，支持顶层 await
bun upgrade          # 让 Bun 自己在线升级到最新稳定版
```
