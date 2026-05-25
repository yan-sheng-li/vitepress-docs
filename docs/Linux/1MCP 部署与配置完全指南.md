# 1MCP 部署与配置完全指南

## 📖 目录
1. [什么是 1MCP](#什么是-1mcp)
2. [核心概念](#核心概念)
3. [安装与基础配置](#安装与基础配置)
4. [添加 MCP 服务](#添加-mcp-服务)
5. [客户端连接](#客户端连接)
6. [服务器部署](#服务器部署)
7. [常见问题与解决方案](#常见问题与解决方案)
8. [最佳实践](#最佳实践)

---

## 什么是 1MCP

**1MCP** 是一个 MCP (Model Context Protocol) 网关，核心价值是：

- **一处配置，处处使用**：在服务器上配置一次 MCP 工具，所有 AI 客户端都能共享
- **统一管理**：集中管理所有 MCP 服务器的配置、认证和生命周期
- **资源节约**：避免每个客户端重复启动 MCP 进程，节省内存和 CPU

官方文档：https://docs.1mcp.app

---

## 核心概念

| 概念               | 说明                                                       |
| :----------------- | :--------------------------------------------------------- |
| **MCP Server**     | 提供具体功能的后端服务（如文件操作、GitHub API、文档查询） |
| **1MCP Gateway**   | 统一入口，接收客户端请求并路由到对应的 MCP Server          |
| **Transport Type** | 通信方式：`stdio`（本地命令）或 `http`/`sse`（远程 HTTP）  |
| **Tags**           | 标签过滤机制，控制不同客户端能看到哪些服务                 |
| **OAuth**          | 认证机制，公网部署时必须开启                               |

---

## 安装与基础配置

### 安装 1MCP

```bash
# 使用 npm 安装
npm install -g 1mcp

# 或下载二进制文件
curl -L -o 1mcp https://github.com/1mcp-app/agent/releases/latest/download/1mcp-linux-x64
chmod +x 1mcp
sudo mv 1mcp /usr/local/bin/
```

### 配置文件位置

| 类型     | 路径                          | 说明             |
| :------- | :---------------------------- | :--------------- |
| 服务配置 | `~/.config/1mcp/mcp.json`     | MCP 服务器列表   |
| 预设配置 | `~/.config/1mcp/presets.json` | 预设配置         |
| 主配置   | `~/.config/1mcp/config.toml`  | 全局设置（可选） |

### 基础启动

```bash
# 本地开发（仅本机访问）
1mcp

# 服务器部署（允许其他设备访问）
1mcp --host 0.0.0.0 --port 3050
```

---

## 添加 MCP 服务

### 1. Stdio 类型（本地命令）

适用于通过命令行启动的 MCP 服务，如 `context7`、`filesystem`。

**方法一：命令行添加**
```bash
# 基本格式
1mcp mcp add <服务名> -- <命令> [参数...]

# 示例：添加 context7
1mcp mcp add context7 -- npx -y @upstash/context7-mcp

# 带环境变量
1mcp mcp add github --env "GITHUB_TOKEN=xxx" -- npx -y @modelcontextprotocol/server-github
```

**方法二：手动编辑配置文件** (`~/.config/1mcp/mcp.json`)
```json
{
  "mcpServers": {
    "context7": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "github": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxxx"
      }
    }
  }
}
```

### 2. HTTP 类型（远程服务）

适用于云端托管的 MCP 服务，如 ModelScope 代理、Gitee MCP。

```json
{
  "mcpServers": {
    "modelscope-github": {
      "type": "http",
      "url": "https://mcp.api-inference.modelscope.net/xxx/mcp",
      "headers": {
        "Authorization": "Bearer ms-xxxxx"
      }
    }
  }
}
```

命令行添加方式：
```bash
1mcp mcp add modelscope-github --type http --url "https://xxx/mcp" --headers "Authorization=Bearer xxx"
```

### 3. 带标签的服务（用于过滤）

```json
{
  "mcpServers": {
    "filesystem": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/root"],
      "tags": ["local", "file"]
    }
  }
}
```

### 管理命令

```bash
# 列出所有服务
1mcp mcp list

# 查看服务详情
1mcp mcp status <服务名>

# 查看服务提供的工具
1mcp inspect <服务名>

# 直接调用工具测试
1mcp run <服务名>/<工具名> --args '{"参数名":"值"}'

# 禁用/启用服务
1mcp mcp disable <服务名>
1mcp mcp enable <服务名>

# 移除服务
1mcp mcp remove <服务名>
```

---

## 客户端连接

### Claude Code

```bash
# 添加 1MCP 作为 MCP 服务器
claude mcp add --transport http 1mcp "http://服务器IP:端口/mcp?app=claude-code"

# 查看已配置的 MCP 服务
claude mcp list
```

### Cursor

编辑 `~/.cursor/mcp.json`：
```json
{
  "mcpServers": {
    "1mcp": {
      "url": "http://服务器IP:端口/mcp?app=cursor"
    }
  }
}
```

### 标签过滤（仅加载特定服务）

```bash
# 只加载带有 "docs" 标签的服务
claude mcp add --transport http 1mcp "http://127.0.0.1:3050/mcp?tags=docs"
```

---

## 服务器部署

### 基础部署（无认证，个人使用）

```bash
# 启动命令（注意设置 EXTERNAL_URL 避免 OAuth 检查）
ONE_MCP_EXTERNAL_URL="http://127.0.0.1:3050" 1mcp --host 0.0.0.0 --port 3050
```

### 使用 tmux 管理

```bash
# 创建会话
tmux new -s 1mcp

# 在会话中启动
ONE_MCP_EXTERNAL_URL="http://127.0.0.1:3050" 1mcp --host 0.0.0.0 --port 3050

# 切出会话：Ctrl+B, D
# 重新进入：tmux attach -t 1mcp
# 重启：在会话中 Ctrl+C，然后按 ↑ 键 + Enter
```

### 生产部署（开启 OAuth + HTTPS）

```bash
# 需要先配置 HTTPS 证书
ONE_MCP_FEATURES_AUTH=true \
1mcp --host 0.0.0.0 \
      --port 3050 \
      --external-url https://你的域名
```

客户端需要配置 OAuth：
```bash
claude mcp add-json '{
  "1mcp": {
    "url": "https://你的域名/mcp",
    "auth": { "type": "oauth", "autoSelect": true }
  }
}'
```

---

## 常见问题与解决方案

### Q1: 添加服务后 Claude Code 看不到？

**原因**：1MCP 需要重启才能加载新配置。

**解决**：
```bash
# 在 tmux 会话中 Ctrl+C，然后重新执行启动命令
# 或直接重启进程
pkill -f "1mcp" && ONE_MCP_EXTERNAL_URL="http://127.0.0.1:3050" 1mcp --host 0.0.0.0 --port 3050
```

### Q2: 启动报错 `Issuer URL must be HTTPS`

**原因**：1MCP 绑定 `0.0.0.0` 时自动检查 OAuth issuer 需要 HTTPS。

**解决**：设置 `ONE_MCP_EXTERNAL_URL` 环境变量绕过检查
```bash
ONE_MCP_EXTERNAL_URL="http://127.0.0.1:3050" 1mcp --host 0.0.0.0 --port 3050
```

### Q3: stdio 服务在 `/oauth` 页面看不到？

**原因**：`/oauth` 页面只显示需要 OAuth 认证的 HTTP 服务，stdio 服务不会显示。

**解决**：这是正常设计，使用 `1mcp mcp list` 查看所有服务。

### Q4: 如何让多个客户端共享同一套工具？

**解决**：
1. 在服务器上运行 1MCP
2. 各客户端配置指向同一个 `http://服务器IP:端口/mcp`
3. 所有添加的 MCP 服务自动对所有客户端生效

### Q5: 修改配置后服务不生效？

**解决**：必须重启 1MCP 进程。1MCP 只在启动时读取一次配置，不支持热加载。

---

## 最佳实践

### 1. 配置文件组织

```json
{
  "mcpServers": {
    // 文档查询类
    "context7": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"],
      "tags": ["docs", "online"]
    },
    // 代码分析类
    "codegraph": {
      "type": "stdio",
      "command": "codegraph",
      "args": ["serve", "--mcp"],
      "tags": ["code", "local"]
    },
    // 外部服务类（需认证）
    "github": {
      "type": "http",
      "url": "https://xxx/mcp",
      "headers": { "Authorization": "Bearer xxx" },
      "tags": ["remote", "github"]
    }
  }
}
```

### 2. 服务命名规范

- 使用小写字母和连字符：`context7`、`code-graph`
- 名称简洁明了，体现功能
- 避免使用特殊字符

### 3. 标签使用建议

| 标签类型 | 示例                          | 用途           |
| :------- | :---------------------------- | :------------- |
| 功能分类 | `docs`, `code`, `file`, `git` | 按功能筛选     |
| 来源分类 | `local`, `remote`, `cloud`    | 按部署位置筛选 |
| 认证需求 | `auth-required`, `public`     | 按安全等级筛选 |

### 4. 内存管理

| 服务类型       | 内存占用  | 建议                            |
| :------------- | :-------- | :------------------------------ |
| 1MCP 核心      | ~50MB     | 基础开销                        |
| stdio 轻量服务 | ~50-100MB | filesystem、sequential-thinking |
| stdio 重服务   | 200-400MB | memory-slim（需要嵌入模型）     |
| HTTP 代理服务  | 极低      | 只做转发，不占用本机内存        |

**200MB 剩余内存可安全运行**：1MCP 核心 + 2-3 个轻量 stdio 服务。

### 5. 安全建议

| 场景          | 建议                                                        |
| :------------ | :---------------------------------------------------------- |
| 本地开发      | 默认 HTTP，无需认证                                         |
| 内网个人使用  | HTTP + 防火墙 IP 白名单                                     |
| 公网/团队使用 | HTTPS + OAuth 认证                                          |
| Token 存储    | 配置文件权限设为 `600`：`chmod 600 ~/.config/1mcp/mcp.json` |

### 6. 快速排错流程

```
1. 检查 1MCP 是否运行：curl http://127.0.0.1:3050/mcp
2. 查看服务列表：1mcp mcp list
3. 测试单个服务：1mcp inspect <服务名>
4. 检查客户端连接：在 Claude Code 中输入 /mcp
5. 查看 1MCP 日志：tmux attach -t 1mcp
```

---

## 快速参考卡

```bash
# 启动服务（服务器部署）
ONE_MCP_EXTERNAL_URL="http://127.0.0.1:3050" 1mcp --host 0.0.0.0 --port 3050

# 添加 stdio 服务
1mcp mcp add <name> -- <command> [args...]

# 添加 HTTP 服务
1mcp mcp add <name> --type http --url <URL> --headers "Header=Value"

# 客户端连接（Claude Code）
claude mcp add --transport http 1mcp "http://服务器IP:3050/mcp"

# 常用管理命令
1mcp mcp list          # 查看所有服务
1mcp inspect <name>    # 查看服务工具
1mcp mcp disable <name> # 禁用服务
```

---

## 相关链接

- [1MCP 官方文档](https://docs.1mcp.app)
- [1MCP GitHub](https://github.com/1mcp-app/agent)
- [MCP 协议规范](https://modelcontextprotocol.io)

