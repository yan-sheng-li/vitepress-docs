# 木子空间 - VitePress 文档项目

## 项目概述

这是一个基于 VitePress 构建的静态文档网站项目，名为"木子空间"。项目使用 VitePress 2.0.0-alpha.15 版本，用于创建美观、高性能的文档网站。项目已配置自定义域名并使用 gh-pages 部署。

项目地址：https://www.liyansheng.top/vitepress-docs/

## 技术栈

- **文档框架**: VitePress 2.0.0-alpha.15
- **包管理器**: npm
- **语言**: Markdown
- **部署工具**: gh-pages
- **部署平台**: GitHub Pages（自定义域名）

## 项目结构

```
vitepress-docs/
├── .gitignore                  # Git 忽略文件配置
├── IFLOW.md                    # 项目说明文档
├── README.md                   # 项目说明
├── package.json                # 项目配置和依赖
├── pnpm-lock.yaml              # 依赖锁定文件
└── docs/                       # 文档源文件目录
    ├── .vitepress/             # VitePress 配置目录
    │   ├── config.mts          # VitePress 配置文件
    │   ├── cache/              # VitePress 缓存目录
    │   ├── dist/               # 构建输出目录
    │   └── public/             # 静态资源目录
    │       └── CNAME           # 自定义域名配置
    ├── index.md                # 首页文件
    ├── vue/                    # Vue 相关文档
    │   ├── index.md
    │   └── dayjs.md
    ├── 微信小程序/              # 微信小程序文档
    │   ├── index.md
    │   ├── 微信登录.md
    │   ├── 选择位置.md
    │   ├── 请求发起封装.md
    │   ├── picker选择器.md
    │   └── 常用API汇总.md
    ├── css/                    # CSS 框架文档
    │   ├── index.md
    │   ├── Bulma.md
    │   └── tailwindcss.md
    ├── docker/                 # Docker 相关文档
    │   ├── index.md
    │   ├── 常用命令清单.md
    │   ├── 镜像加速.md
    │   ├── 前后端一键docker启动.md
    │   ├── WSL2安装.md
    │   └── docker-compose常用命令.md
    ├── elastic-search/         # ElasticSearch 文档
    │   ├── index.md
    │   └── 快速入门与部署.md
    └── springboot/             # SpringBoot 文档（30+篇）
        ├── index.md
        ├── 常规整合.md
        ├── 远程仓库源.md
        ├── 配置热部署.md
        ├── 配置文件加密.md
        ├── 绑定配置文件中变量.md
        ├── 静态资源访问不到.md
        ├── 开启跨域.md
        ├── 全局异常处理.md
        ├── 参数校验.md
        ├── 整合参数校验.md
        ├── 请求转发.md
        ├── 简洁版的Result类.md
        ├── thymeleaf常用语法.md
        ├── Thymeleaf和JavaScript在前后端交互中获取后端值.md
        ├── 兼容JSP页面.md
        ├── 整合redis.md
        ├── 数据导入导出.md
        ├── 整合JWT.md
        ├── 整合sa-token权限控制.md
        ├── 定时任务.md
        ├── 整合xxl-job定时任务.md
        ├── 文件上传-下载.md
        ├── 整合七牛云图床.md
        ├── 整合WebSocket.md
        ├── 整合kafka.md
        ├── 整合knife4j.md
        ├── 整合邮件发送.md
        ├── 整合验证码.md
        ├── 整合支付宝沙箱支付.md
        ├── 整合IK分词器.md
        ├── 整合webhook自动部署.md
        ├── 集成AI大模型.md
        ├── 项目打jar包-docker部署.md
        ├── 打包的jar启动报错问题.md
        ├── 服务开启HTTPS访问.md
        ├── 前后端多端口启动与访问.md
        ├── 常用算法封装.md
        ├── 优雅实现动态日志记录.md
        └── 告别各种奇怪的时间格式.md
```

## 构建和运行命令

### 开发环境
```bash
npm run docs:dev
```
启动开发服务器，支持热重载，默认运行在 http://localhost:5173

### 构建生产版本
```bash
npm run docs:build
```
构建静态网站，生成文件到 `docs/.vitepress/dist` 目录

### 预览生产版本
```bash
npm run docs:preview
```
在本地预览构建后的静态网站，运行在 http://localhost:8080

### 部署到 GitHub Pages
```bash
npm run deploy
```
自动构建并部署到 GitHub Pages（自定义域名：www.liyansheng.top）

## 文档分类

### 前端开发
- **Vue**: Vue 系列文档，包括 dayjs 等常用库的使用
- **微信小程序**: 微信小程序开发指南，包括登录、位置选择、API 封装等
- **CSS**: CSS 框架文档，包括 Bulma 和 TailwindCSS

### 后端开发
- **SpringBoot**: 30+ 篇 SpringBoot 实战文档，涵盖：
  - 基础配置
  - Web 开发
  - 模板引擎
  - 数据库与缓存
  - 安全认证
  - 定时任务
  - 文件与存储
  - 消息与通信
  - 接口文档
  - 其他整合
  - 部署相关
  - 工具与技巧
- **ElasticSearch**: ElasticSearch 快速入门与部署

### 运维工具
- **Docker**: Docker 容器化技术文档，包括常用命令、镜像加速、WSL2 安装等

## 网站配置

### 导航栏
- **首页**: 网站首页
- **服务大厅**: 外部链接 https://liyansheng.top/pc/home
- **前端**: Vue、微信小程序、CSS
- **后端**: SpringBoot、ElasticSearch

### 侧边栏
每个文档分类都有独立的侧边栏导航，支持折叠分组，便于文档浏览。

### 其他配置
- **语言**: 中文（zh-CN）
- **搜索**: 本地搜索
- **Logo**: 自定义 logo 图片
- **社交链接**: GitHub 链接

## 开发指南

### 添加新文档
1. 在 `docs/` 目录下创建新的 `.md` 文件
2. 在文件中添加 frontmatter 配置（如需要）
3. 在 `docs/.vitepress/config.mts` 的导航栏或侧边栏中添加链接

### 目录组织建议
- 前端技术文档放在 `docs/vue/`、`docs/微信小程序/`、`docs/css/` 等
- 后端技术文档放在 `docs/springboot/`、`docs/elastic-search/` 等
- 运维工具文档放在 `docs/docker/` 等

### 配置网站
编辑 `docs/.vitepress/config.mts` 文件，可以配置：
- 网站标题和描述
- 导航栏和侧边栏
- 主题和样式
- 搜索功能
- 社交链接

### Markdown 扩展
项目支持 VitePress 提供的 Markdown 扩展：
- 语法高亮
- 自定义容器（info、tip、warning、danger、details）
- 行高亮
- 更多功能参考 [VitePress Markdown 扩展文档](https://vitepress.dev/guide/markdown)

## 部署指南

### 自动部署（推荐）
项目使用 gh-pages 进行部署，只需：
1. 运行 `npm run deploy` 命令
2. 自动构建并部署到 GitHub Pages
3. 访问 https://www.liyansheng.top/vitepress-docs/ 查看部署结果

### 手动部署
如需手动部署到其他平台：
1. 运行 `npm run docs:build` 构建项目
2. 将 `docs/.vitepress/dist` 目录内容部署到静态文件托管服务

### 支持的部署平台
- GitHub Pages（已配置自定义域名）
- Netlify
- Vercel
- 任何支持静态文件的托管服务

## 开发环境要求

- Node.js
- npm 或 pnpm
- Git

## 注意事项

1. VitePress 配置文件使用 `.mts` 扩展名，表示 ES 模块语法
2. 开发时注意缓存问题，如需要可以删除 `docs/.vitepress/cache` 目录
3. 构建前确保所有依赖已正确安装
4. 项目使用 npm 脚本，如使用 pnpm 需先安装依赖
5. 自定义域名已配置在 `docs/.vitepress/public/CNAME` 文件中
6. VitePress base 路径配置为 `/vitepress-docs/`，部署时需注意

## 故障排除

### 常见问题
1. **构建失败**：检查依赖是否正确安装，尝试删除 `node_modules` 和 `package-lock.json` 后重新安装
2. **部署失败**：检查 gh-pages 配置和 Git 远程仓库设置
3. **缓存问题**：删除 `docs/.vitepress/cache` 目录后重新构建
4. **页面 404**：检查 base 路径配置是否正确（当前为 `/vitepress-docs/`）

### 获取帮助
- 参考 [VitePress 官方文档](https://vitepress.dev/)
- 查看 [gh-pages 文档](https://www.npmjs.com/package/gh-pages)
- 检查项目 Issues 页面获取已知问题解决方案