# Termux 安装 Arise AI 编程助手笔记

## 一、Arise 简介

Arise 是一个轻量级的 AI 编程 CLI 工具，专为 Termux 优化，支持：
- 文件读写、Shell 命令执行
- **自定义 API 提供商**（Base URL + 模型）
- 会话保存/恢复
- 低资源占用、响应快速

![image-20260531125116571](http://cdn.qiniu.liyansheng.top/img/image-20260531125116571.png)

---

## 二、安装步骤

### 1. 安装 Node.js（如未安装）
```bash
pkg update && pkg upgrade -y
pkg install nodejs -y
```

### 2. 全局安装 Arise
```bash
npm i -g arise-jinwoo
```

> 若有 esbuild 安装脚本警告，可忽略，不影响使用。

### 3. 配置 API Key（只需一次）
```bash
mkdir -p ~/.arise
echo 'OPENAI_API_KEY=你的密钥' > ~/.arise/.env
```

---

## 三、使用方式

```bash
cd /你的项目目录
arise
```

**就这么简单** — 不需要每次都创建工作目录或复杂配置。

---

## 四、自定义提供商（示例）

### DeepSeek API
```bash
/provider custom https://api.deepseek.com/v1 sk-你的密钥
/model deepseek-chat
```

### 智谱/通义/其他 OpenAI 兼容 API
```bash
/provider custom https://你的base_url/v1 你的密钥
/model 你的模型名
```

---

## 五、常用命令

| 命令                           | 作用             |
| ------------------------------ | ---------------- |
| `/model`                       | 切换模型         |
| `/provider custom <url> <key>` | 配置自定义提供商 |
| `/help`                        | 查看帮助         |
| 直接输入自然语言               | 让 AI 执行任务   |

---

## 六、注意事项

| 项目        | 说明                              |
| ----------- | --------------------------------- |
| GitHub 仓库 | ❌ 无公开仓库，通过 NPM 分发       |
| MCP 支持    | ❌ 暂不支持 Model Context Protocol |
| 配置位置    | `~/.arise/` 目录                  |
| 工作目录    | 自动使用当前目录                  |

---

## 七、与其他工具对比

| 工具         | Termux 适配 | 速度 | MCP  | 自定义 Provider |
| ------------ | :---------: | :--: | :--: | :-------------: |
| **Arise**    | ✅ 专门优化  |  快  |  ❌   |        ✅        |
| Hermes Agent |   ✅ 可用    |  慢  |  ❌   |        ❌        |
| OpenCode     | ❌ 无法安装  |  -   |  -   |        -        |

---

## 八、总结

- ✅ 安装简单：`npm i -g arise-jinwoo`
- ✅ 使用方便：`cd 项目目录 && arise`
- ✅ 高度灵活：支持任意 OpenAI 兼容 API
- ✅ 轻量快速：适合 Termux 移动端使
