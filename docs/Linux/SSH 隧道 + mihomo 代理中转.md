# SSH 隧道 + mihomo 代理中转

------

## 🎯 目标

把服务器上的 mihomo 作为代理出口，通过 SSH 隧道让本地电脑安全使用代理能力。

结构：

```text
本地电脑 → SSH 隧道 → 服务器 mihomo → 机场节点 → 外网
```

------

## 🖥️ 服务器端配置

### 1️⃣ 启动 mihomo

```bash
./mihomo -d .
```

确认监听：

```text
HTTP proxy listening at 127.0.0.1:7890
SOCKS proxy listening at 127.0.0.1:7891
```

------

### 2️⃣ 推荐安全配置

```yaml
allow-lan: false
bind-address: 127.0.0.1
```

👉 只允许本机访问（避免公网暴露）

------

## 🔐 本地 SSH 隧道

### 3️⃣ 建立隧道

```bash
ssh -N -L 7899:127.0.0.1:7890 root@liyansheng.top
```

含义：

```text
本地7899 → 服务器127.0.0.1:7890（mihomo）
```

------

### ⚠️ 特点

- 终端不会返回提示符（正常）
- SSH 连接保持即隧道存在
- 关闭窗口 = 代理断开

------

## 🌐 本地使用代理

### 4️⃣ 浏览器 / 系统代理

```text
HTTP Proxy
127.0.0.1:7899
```

或插件（推荐）：

- SwitchyOmega / ZeroOmega

------

### 5️⃣ curl 测试

```bash
curl -x http://127.0.0.1:7899 https://google.com
```

成功返回说明链路通：

```text
本地 → SSH → mihomo → 机场 → Google
```

------

## 🔍 验证方法

### ✔ SSH 隧道存在

```bash
netstat -ano | findstr 7899
```

看到 LISTENING 即正常

------

### ✔ IP 是否变化

访问：

```text
https://ipinfo.io
```

显示机场节点 IP = 成功

------

## ⚡ 常见坑

### ❌ SSH 无输出

正常（-N 模式）

------

### ❌ 浏览器打不开

检查：

- 是否设置 127.0.0.1:7899
- SSH 是否还在运行
- 端口是否写错

------

### ❌ curl 超时

检查：

- SSH 是否断开
- mihomo 是否运行
- 7890 是否监听

------

## 🚀 总结

这是一个三层结构：

```text
本地应用
   ↓
SSH 加密隧道
   ↓
服务器 mihomo
   ↓
机场代理
   ↓
外网
```

优点：

- 不暴露公网端口
- 安全性高
- 可随时切换节点
- 适合开发 / AI API / 浏览器统一代理

------

如果你下一步要升级，可以做：

- 一键 SSH 启动脚本
- 自动重连（autossh）
- 分流（国内直连 + AI 走代理）
- systemd 守护 mihomo

都可以继续帮你优化成“生产级代理网关”。