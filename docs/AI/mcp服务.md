# MCP服务器

> Agent可通过模型上下文协议（MCP）  连接到外部工具和数据源。它给 AI 装了个“超级网线”，让 AI 能跟外部工具、数据、系统无缝对接。

**比喻：AI 是个聪明但宅家的书呆子，MCP 就是它的“外卖员”，能帮它拿数据、干活儿。
目标：让 AI 不只聊天，还能真动手，比如查数据库、发邮件、写代码。**

[👉mcp集合](https://github.com/yzfly/Awesome-MCP-ZH?tab=readme-ov-file)

经实验，下面是一些还不错的mcp服务


## mcp-server-mysql

> 一个提供对 MySQL 数据库只读访问的模型上下文协议服务器。该服务器使 LLMs 能够检查数据库模式并执行只读查询。

地址：https://github.com/benborla/mcp-server-mysql

可直接通过全局npm/pnpm安装
```bash
# Using npm
npm install -g @benborla29/mcp-server-mysql

# Using pnpm
pnpm add -g @benborla29/mcp-server-mysql
```
配置示例：
```json
  "mcpServers": {
    "mcp_server_mysql": {
      "command": "npx",
      "args": [
        "@benborla29/mcp-server-mysql"
      ],
      "env": {
        "MYSQL_HOST": "127.0.0.1",
        "MYSQL_PORT": "3306",
        "MYSQL_USER": "root",
        "MYSQL_PASS": "root",
        "MYSQL_DB": "",
        "ALLOW_INSERT_OPERATION": "true",
        "ALLOW_UPDATE_OPERATION": "true",
        "ALLOW_DELETE_OPERATION": "true"
      }
    }
  }
```
重启agent服务即可使用！

## microsoft/playwright-mcp

> 一个使用 Playwright 提供浏览器自动化功能的模型上下文协议（MCP）服务器。该服务器使 LLMs 能够通过结构化的可访问性快照与网页交互，从而无需截图或视觉调优的模型。


地址: https://github.com/microsoft/playwright-mcp

快速启用：
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp@latest"
      ]
    }
  }
}
```

## gitee
[参考文档](https://help.gitee.com/ai-productivity/mcp-server#%E5%AE%89%E8%A3%85npx-%E5%90%AF%E5%8A%A8%E5%8F%AF%E7%9B%B4%E6%8E%A5%E8%B7%B3%E8%BF%87%E8%AF%A5%E6%AD%A5%E9%AA%A4)
>它提供了一系列与 Gitee API 交互的工具，使 AI 助手能够管理仓库、问题、拉取请求等。
```json
{
  "mcpServers": {
    "gitee": {
      "url": "https://api.gitee.com/mcp",
      "headers": {
        "Authorization": "Bearer <your personal access token>"
      }
    }
  }
}
```