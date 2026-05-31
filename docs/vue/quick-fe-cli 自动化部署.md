# quick-fe-cli 自动化部署

## 1. 核心命令

不要使用通用的 `npx deploy init`，该命令可能与其他包（如 Roboflow）冲突。应使用完整包名 `quick-fe-cli`。

```bash
# 初始化配置（交互式）
npx quick-fe-cli deploy init

# 执行部署
npx quick-fe-cli deploy dev
```

## 2. 配置文件

- 初始化后会在项目根目录生成 `.deployrc.js` 和 `.env` 两个文件（隐藏文件，需用 `ls -la` 查看）。
- `.env` 文件中需填写服务器真实的密码/密钥。
- `.deployrc.js` 中配置服务器信息、构建命令 (`npm run build`)、本地打包目录 (`dist`) 及服务器目标路径 (`remote`)。

## 3. 工作流程

- 工具在本地执行打包。
- 通过 SSH 协议将打包后的文件（默认 `dist` 目录）上传至配置文件中指定的服务器路径（如 `/data/nginx/html/项目名`）。
- 注意：该工具仅负责文件传输，网站的 Web 服务（如 Nginx）需单独配置和启动。

## 4. 常见问题

- 命令未找到：使用 `npx quick-fe-cli --help` 查看工具支持的实际命令。
- 配置文件未生成：确认执行的是 `deploy init`（`deploy` 是主命令，`init` 是其子命令），而不是单独的 `init`。
- 无法连接服务器：先用 `ssh root@你的服务器IP` 测试连通性，检查密码、端口（22）及防火墙设置。
