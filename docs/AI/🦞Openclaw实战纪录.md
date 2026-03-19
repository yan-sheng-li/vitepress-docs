# 🦞Openclaw实战纪录

## 文档

- [官网](https://docs.openclaw.ai/zh-CN/install)

> 本次基于window的powershell环境

## 安装

通过`pnpm`更快，先安装它

```bash
npm install -g pnpm
```

安装`openclaw`

```bash
pnpm add -g openclaw@latest
```

## 配置模型

基于`iflow`API，[参考这里](https://platform.iflow.cn/docs)

直接编辑openclaw配置文件在`C:\Users\用户名\.openclaw`的`openclaw.json`文件

在`providers`新增如下：

```json
      "iflow": {
        "baseUrl": "https://apis.iflow.cn/v1",
        "apiKey": "sk-",
        "api": "openai-completions",
        "models": [
          {
            "id": "qwen3-coder-plus",
            "name": "Qwen3 Coder Plus",
            "reasoning": false,
            "input": [
              "text"
            ],
            "cost": {
              "input": 0,
              "output": 0,
              "cacheRead": 0,
              "cacheWrite": 0
            },
            "contextWindow": 128000,
            "maxTokens": 8192
          }
        ]
      }
```

调整默认模型

```bash
  "agents": {
    "defaults": {
      "model": {
        "primary": "iflow/qwen3-coder-plus"
      },
```

重启openclaw即可使用

## 接入飞书

如何开通，可以[参考这里](https://www.runoob.com/ai-agent/openclaw-feishu.html)

接入方式，我是直接修改`C:\Users\用户名\.openclaw`的`openclaw.json`配置文件，编辑或者新增：

```json
  "channels": {
    "feishu": {
      "enabled": true,
      "appId": "xxx",
      "appSecret": "xxx",
      "mode": "bot"
    }
  },
```

重启服务即可

## 接入QQ

很简单，直接安装插件即可

👉[看这里](https://q.qq.com/qqbot/openclaw/index.html)

## 配置

### 工作区切换

在`C:\Users\用户名\.openclaw`的`openclaw.json`里面直接修改即可，在`agents.defaults.workspace`

### 警告

```bash
plugins.allow is empty; discovered non-bundled plugins may auto-load
```

意思是：检测到第三方插件，但没有明确写在允许列表里。

消除办法：

```bash
  "plugins": {
    "allow": [
      "openclaw-qqbot"
    ],
```

