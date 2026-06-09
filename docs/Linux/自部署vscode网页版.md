# 自部署vscode网页版

## 🚀 用脚本一键安装 code-server
在 WSL 终端执行：
```bash
curl -fsSL https://code-server.dev/install.sh | sh
```
## ⚙️ 启动并设置
**1. 先创建配置文件设置密码**

```bash
mkdir -p ~/.config/code-server
cat > ~/.config/code-server/config.yaml << EOF
bind-addr: 0.0.0.0:8080
auth: password
password: 你的密码
cert: false
EOF
```

**2. 启动服务**

```bash
code-server
```

看到类似 `HTTP server listening on http://0.0.0.0:8080` 的输出就成功了。

## 🌐 从 Windows 访问
打开 Windows 上的浏览器（Chrome/Edge），访问：
```
http://localhost:8080
```
输入你刚才设置的密码，就能用上和 VS Code 一模一样的网页编辑界面了。

## 💡 让它在后台一直运行
如果关掉 WSL 窗口也想让它继续跑，可以用 systemd 或简单点的 `nohup`：

```bash
# 后台运行并记录日志
nohup code-server --bind-addr 0.0.0.0:8080 --auth password --password 你的密码 > ~/code-server.log 2>&1 &

# 查看运行状态
ps aux | grep code-server

# 需要停止时
pkill code-server
```

## 🛠️ 常见小问题
- **端口被占**：换个端口，比如 `--bind-addr 0.0.0.0:8888`
- **想用 HTTPS**：WSL 本地开发一般不需要，用 HTTP 即可
- **WSL 里面打不开浏览器**：正常的，网页端是跑在 WSL 里、用 Windows 浏览器看



