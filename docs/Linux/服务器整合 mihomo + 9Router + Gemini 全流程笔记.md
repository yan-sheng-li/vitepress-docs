# 服务器整合 mihomo + 9Router + Gemini 全流程笔记

------

## 1️⃣ 环境准备

### 目标

让服务器具备稳定外网访问能力（用于 AI API）

------

## 1.1 安装 mihomo（Clash Meta）

```bash
cd ~/clash

wget https://github.com/MetaCubeX/mihomo/releases/latest/download/mihomo-linux-amd64.gz

gunzip mihomo-linux-amd64.gz
chmod +x mihomo-linux-amd64
mv mihomo-linux-amd64 mihomo
```

------

## 1.2 验证版本

```bash
./mihomo -v
```

看到版本号即成功

------

## 2️⃣ 配置机场订阅

## 2.1 创建配置文件

```bash
nano config.yaml
```

------

## 2.2 基础配置（订阅模式）

```yaml
port: 7890
socks-port: 7891
allow-lan: false
mode: rule

proxy-providers:
  airport:
    type: http
    url: "你的机场订阅链接"
    interval: 3600
    path: ./providers/airport.yaml
    health-check:
      enable: true
      url: http://www.gstatic.com/generate_204
      interval: 300

proxy-groups:
  - name: PROXY
    type: select
    use:
      - airport

rules:
  - MATCH,PROXY
```

------

## 3️⃣ 启动 mihomo

```bash
./mihomo -d .
```

------

## ✔ 成功标志

```text
HTTP proxy listening at 127.0.0.1:7890
SOCKS proxy listening at 127.0.0.1:7891
```

------

## 4️⃣ 验证代理是否可用

```bash
curl -x http://127.0.0.1:7890 https://google.com
```

成功返回：

- `301` 或 `200`
- 或 Google 页面

------

## 5️⃣ 设置环境变量（供应用使用）

```bash
export HTTP_PROXY=http://127.0.0.1:7890
export HTTPS_PROXY=http://127.0.0.1:7890
```

------

## 6️⃣ 启动 9Router（关键）

## 推荐方式（强制代理）

```bash
HTTP_PROXY=http://127.0.0.1:7890 \
HTTPS_PROXY=http://127.0.0.1:7890 \
9router
```

------

## 7️⃣ 验证 9Router 是否走代理

## 看 mihomo 日志

```text
[TCP] xxx -> generativelanguage.googleapis.com via PROXY
```

------

## 或直接 curl 测试

```bash
curl -x http://127.0.0.1:7890 https://generativelanguage.googleapis.com
```

返回 404/401 即成功

------

## 8️⃣ 常见问题总结

------

## ❌ 1. curl 通但 9Router 不通

原因：

> 9Router 没继承 HTTP_PROXY

解决：

```bash
HTTP_PROXY=... HTTPS_PROXY=... 9router
```

------

## ❌ 2. 连接超时

原因：

- 没走代理
- mihomo没启动
- DNS问题

------

## ❌ 3. Gemini 400 / location error

原因：

- API key 区域限制
- 节点 IP 被风控

------

## 9️⃣ 系统结构总结

```
9Router
   ↓
HTTP_PROXY
   ↓
mihomo (7890)
   ↓
机场节点（SG / JP / US）
   ↓
Google / Gemini API
```

------

## 🔟 核心经验总结

✔ mihomo 只是代理内核，不是 VPN
✔ 必须配置订阅才可用
✔ 9Router 必须显式继承 HTTP_PROXY
✔ curl 成功 ≠ 应用一定成功
✔ Gemini 还可能有地区/风控限制

------

## 🚀 最终状态判断标准

只要满足：

- curl -x 7890 能访问 Google ✔
- mihomo 有 PROXY 日志 ✔
- 9Router 无 timeout ✔

👉 就说明整条链路已打通

------

如果你下一步要优化，我可以帮你升级成：

- 自动分流（国内直连 + AI 走代理）
- Gemini + OpenAI 双路 fallback
- systemd 守护运行
- 一键部署脚本

直接变生产级 AI 网关。