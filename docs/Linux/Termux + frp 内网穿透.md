# Termux + frp 内网穿透

> 让手机变身公网服务器

## 📌 核心原理

利用 **frp** 内网穿透工具，将 Termux 环境中的手机服务（SSH、Web等）通过**有公网 IP 的服务器**暴露到公网，实现随时随地访问手机。

**架构图：**

```
手机 (Termux) ----(frpc)----> 云服务器 (frps) ----(公网访问)----> 你的电脑/手机
     ↑                              ↑
  内网环境                        公网入口
```

---

## 🛠️ 实施步骤

### 第一阶段：Termux 环境准备

```bash
# 1. 换源（国内加速）
termux-change-repo
# 选择清华/北外镜像

# 2. 更新并安装工具
pkg update -y && pkg upgrade -y
pkg install vim wget git -y
```

### 第二阶段：安装 frp 客户端

```bash
# 1. 下载 ARM64 版本（根据手机架构选择）
cd ~
wget https://github.com/fatedier/frp/releases/download/v0.57.0/frp_0.57.0_linux_arm64.tar.gz

# 2. 解压并进入目录
tar -xzf frp_0.57.0_linux_arm64.tar.gz
mv frp_0.57.0_linux_arm64 frp  # 重命名方便管理
cd ~/frp

# 3. 删除服务端文件（客户端只需要 frpc）
rm -f frps frps.toml
```

### 第三阶段：配置 frpc.toml

```toml
# ~/frp/frpc.toml
serverAddr = "你的服务器公网IP"
serverPort = 7000              # 与服务端 bindPort 一致

# 示例1：穿透 Termux 的 SSH（端口 8022）
[[proxies]]
name = "termux-ssh"
type = "tcp"
localIP = "127.0.0.1"
localPort = 8022               # Termux 的 SSHD 默认端口
remotePort = 6000              # 服务器上暴露的端口

# 示例2：穿透 Python 临时 Web 服务
[[proxies]]
name = "termux-web"
type = "tcp"
localIP = "127.0.0.1"
localPort = 8000
remotePort = 6080

# 示例3：穿透手机上的文件服务（miniserve）
[[proxies]]
name = "termux-files"
type = "tcp"
localIP = "127.0.0.1"
localPort = 8080
remotePort = 8088
```

### 第四阶段：配置 Shell 快捷命令（.zshrc）

编辑 `~/.zshrc`，添加以下内容：

```bash
# frp 配置
FRP_HOME="$HOME/frp"

# 启动 frpc
frp-start() {
    if pgrep -f "frpc -c frpc.toml" > /dev/null; then
        echo "⚠️  frpc 已在运行中"
    else
        echo "🚀 启动 frpc..."
        cd $FRP_HOME && nohup ./frpc -c frpc.toml > frpc.log 2>&1 &
        echo "✅ 已启动，日志: $FRP_HOME/frpc.log"
        cd -
    fi
}

# 停止 frpc
frp-stop() {
    if pgrep -f "frpc -c frpc.toml" > /dev/null; then
        echo "🛑 停止 frpc..."
        pkill -f "frpc -c frpc.toml"
        echo "✅ 已停止"
    else
        echo "ℹ️  frpc 未运行"
    fi
}

# 重启
frp-restart() {
    frp-stop && sleep 1 && frp-start
}

# 查看状态
frp-status() {
    if pgrep -f "frpc -c frpc.toml" > /dev/null; then
        echo "✅ 运行中，PID: $(pgrep -f 'frpc -c frpc.toml')"
        echo "📌 最近日志:"
        tail -5 $FRP_HOME/frpc.log
    else
        echo "❌ 未运行"
    fi
}

# 查看实时日志
frp-log() {
    tail -f $FRP_HOME/frpc.log
}
```

生效配置：
```bash
source ~/.zshrc
```

### 第五阶段：启动与测试

```bash
# 启动穿透
frp-start

# 查看状态
frp-status

# 测试 SSH 连接（在任意电脑上）
ssh -p 6000 termux用户名@你的服务器IP
```

---

## 📱 手机端服务示例

### 1. 开启 Termux 的 SSH 服务（让你能远程登录手机）

```bash
# 安装并启动 SSHD
pkg install openssh -y
sshd

# 设置密码（可选）
passwd termux

# 查看手机用户名
whoami
```

### 2. 临时起一个 Web 服务

```bash
# Python 方式
python -m http.server 8000

# Node.js 方式
npx serve .

# 或安装 miniserve（更美观）
cargo install miniserve
miniserve . --port 8080
```

### 3. 跑文件下载服务（aria2）

```bash
pkg install aria2 -y
aria2c --enable-rpc --rpc-listen-port=6800
```

---

## ⚙️ 保活与优化策略

### 后台保活（关键！）

| 设置项            | 操作                                          |
| :---------------- | :-------------------------------------------- |
| **Termux 自启动** | 手机设置 → 应用启动管理 → Termux → 允许自启动 |
| **关闭电池优化**  | 设置 → 电池 → 应用耗电管理 → Termux → 不优化  |
| **锁定后台**      | 多任务界面 → 长按 Termux 图标 → 锁定          |
| **省电模式**      | 关闭全局省电，或把 Termux 加入白名单          |

### 开机自动启动（利用 .zshrc）

```bash
# 在 ~/.zshrc 末尾添加
(sleep 10 && frp-start) &   # 延迟10秒启动，等待网络就绪
```

---

## 🧪 高级玩法：手机还能当什么服务器？

| 服务类型          | 实现方式                          | 公网访问效果                   |
| :---------------- | :-------------------------------- | :----------------------------- |
| **个人博客**      | `python -m http.server` 或 Hexo   | `http://你的IP:remotePort`     |
| **云盘/文件共享** | `miniserve` / `caddy file-server` | 随时随地下载手机文件           |
| **远程下载机**    | `aria2` + Web UI                  | 出门在外给家里手机添加下载任务 |
| **API 服务器**    | Flask / FastAPI / Express         | 跑自己的小后端                 |
| **定时任务**      | crontab + 爬虫脚本                | 7x24h 自动签到/监控            |
| **代码运行环境**  | Code-Server / Jupyter Lab         | 浏览器里写代码，用手机算力     |
| **轻量数据库**    | MySQL / PostgreSQL / Redis        | 公网可访问的数据存储           |

---

## ⚠️ 注意事项

### 1. 安全性提醒
- **不要暴露敏感端口**（如 22、3306 等）到公网
- 建议服务端配置 `auth.method = "token"` 做身份验证
- SSH 使用密钥登录，不要用弱密码

### 2. 性能局限
- 手机适合轻量服务（并发 < 50，CPU < 30%）
- 大文件传输会受手机 Wi-Fi 硬件限制
- 长时间高负载会导致发热降频

### 3. 网络限制
- 家宽可能屏蔽 80/443 端口，建议用高位端口（> 10000）
- 手机 IP 变化时 frp 会自动重连，但会有短暂断线
- 4G/5G 网络下 NAT 更严格，建议优先用 Wi-Fi

---

## 🎯 常用命令速查表

| 命令                  | 作用                    |
| :-------------------- | :---------------------- |
| `frp-start`           | 启动穿透服务            |
| `frp-stop`            | 停止穿透服务            |
| `frp-restart`         | 重启穿透服务            |
| `frp-status`          | 查看运行状态            |
| `frp-log`             | 实时查看日志            |
| `sshd`                | 启动 Termux 的 SSH 服务 |
| `pkill sshd`          | 停止 SSH 服务           |
| `ps aux \| grep frpc` | 查看 frp 进程           |

---

## 🔗 相关资源

- [frp 官方文档](https://gofrp.org/docs/)
- [Termux 官网](https://termux.com/)
- [GitHub Releases (下载 frp)](https://github.com/fatedier/frp/releases)

---

🎉 现在你的手机已经是一台真正的公网服务器了！享受随时随地的访问自由吧！