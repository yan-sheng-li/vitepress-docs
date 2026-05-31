# Termux 安装 Hermes 完整避坑指南

## 📱 环境准备阶段

### 坑 1：Termux 版本选择
**问题**：Google Play 版 Termux 已停更，存在兼容性问题。

**解决**：
- 从 **F-Droid** 或 **GitHub Releases** 下载安装
- GitHub 地址：`https://github.com/termux/termux-app/releases`
- 选择 `termux-app_v0.118.x+github-debug_universal.apk`

### 坑 2：存储权限
**问题**：无法访问手机文件。

**解决**：
```bash
termux-setup-storage
```

### 坑 3：软件源慢
**问题**：默认源在国外，下载慢。

**解决**：
```bash
termux-change-repo
# 选择清华源 mirrors.tuna.tsinghua.edu.cn
```

---

## 🔧 SSH 远程连接阶段

### 坑 4：sshd 不会自动启动
**问题**：每次重启 Termux 后需要手动启动 sshd。

**解决**：在 `~/.zshrc` 中添加自动启动脚本

```bash
if ! pgrep -x "sshd" > /dev/null; then
    sshd
fi
```

### 坑 5：找不到局域网 IP
**问题**：`ifconfig` 输出中没有常见的 `192.168.x.x`。

**解决**：查找 `ccmni2` 接口下的 `inet 10.x.x.x`，这也是局域网地址。

---

## 🐍 Python 环境阶段

### 坑 6：nvm 安装的 Node 无法运行
**问题**：nvm 下载的标准 Linux ARM64 二进制与 Android 的 bionic libc 不兼容。

**错误表现**：
```bash
node --version
# zsh: no such file or directory: ./node
```

**解决**：放弃 nvm，直接用 Termux 官方版本
```bash
pkg install nodejs-lts -y
```

### 坑 7：卸载 nvm 残留
**解决**：
```bash
rm -rf ~/.nvm
# 并从 ~/.zshrc 中删除 nvm 相关配置
```

---

## 🤖 Hermes 安装阶段

### 坑 8：psutil 编译失败
**问题**：`psutil` 官方版本不支持 Android 平台。

**错误表现**：
```
ERROR: Failed to build 'psutil' when getting requirements to build wheel
platform android is not supported
```

**解决**：安装 Termux 预编译版本
```bash
pkg install python-psutil -y
```

### 坑 9：jiter 编译失败
**问题**：需要 Rust 编译，且缺少 Android API 级别设置。

**错误表现**：
```
Failed to determine Android API level. Please set the ANDROID_API_LEVEL environment variable.
```

**解决**：
```bash
# 安装 Rust
pkg install rust binutils -y

# 设置环境变量
export ANDROID_API_LEVEL=24
```

### 坑 10：pip 无法识别系统已安装的包
**问题**：虽然用 `pkg install` 装了包，但虚拟环境中的 pip 仍尝试重新编译。

**解决**：使用约束文件或直接复制
```bash
# 方法1：复制到虚拟环境
cp -r /data/data/com.termux/files/usr/lib/python3.13/site-packages/psutil* $VIRTUAL_ENV/lib/python3.13/site-packages/

# 方法2：使用约束文件
pip install -e '.[termux]' --constraint constraints.txt
```

### 坑 11：hermes 命令找不到
**问题**：软链接创建失败，`/bin` 目录只读或 `$PREFIX` 变量为空。

**解决**：
```bash
# 方案1：设置 PREFIX
export PREFIX=/data/data/com.termux/files/usr
ln -sf ~/.hermes/hermes-agent/venv/bin/hermes $PREFIX/bin/hermes

# 方案2：使用别名（最稳妥）
echo 'alias hermes="~/.hermes/hermes-agent/venv/bin/hermes"' >> ~/.zshrc
source ~/.zshrc
```

---

## 💬 Hermes 运行阶段

### 坑 12：TUI 界面卡住
**问题**：进入对话界面后无法输入，界面卡在初始化阶段。

**解决**：
```bash
# 设置正确的终端类型
export TERM=xterm-256color

# 或使用非交互模式测试
hermes chat -q "你好"
```

### 坑 13：API 模型名称错误
**问题**：配置了自定义 API 但模型名 `top` 不被识别。

**解决**：
```bash
# 查看 API 支持的模型
curl http://你的API地址/v1/models -H "Authorization: xxxx"

# 设置正确的模型名
hermes config set model "正确的模型名"
```

### 坑 14：API 连接超时
**问题**：自定义代理端点的网络连通性问题。

**解决**：
```bash
# 测试连通性
curl -I http://你的API地址/v1/models

# 检查 Hermes 调试日志
hermes --dev chat -q "test" 2>&1 | head -50
```

---

## 📋 最终工作环境检查清单

| 组件    | 验证命令              | 预期结果     |
| ------- | --------------------- | ------------ |
| Termux  | `pkg list-installed`  | 显示已安装包 |
| SSH     | `sshd` + 远程连接     | 可以电脑连接 |
| Node.js | `node --version`      | 显示版本号   |
| Python  | `python --version`    | 3.13+        |
| Hermes  | `hermes --version`    | v0.15.x      |
| API     | `hermes config show`  | 显示配置信息 |
| 对话    | `hermes chat -q "hi"` | AI 响应      |

---

## 🚀 一键恢复脚本

如果换新手机需要重新配置，保存以下脚本：

```bash
#!/bin/bash
# termux-hermes-setup.sh

# 更新源
termux-change-repo

# 安装基础包
pkg update -y && pkg upgrade -y
pkg install python nodejs-lts git openssh zsh rust binutils -y
pkg install python-psutil termux-exec -y

# 安装 Oh My Zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended

# 设置 sshd 自启
echo 'if ! pgrep -x "sshd" > /dev/null; then sshd; fi' >> ~/.zshrc

# 安装 Hermes
curl -fsSL https://res1.hermesagent.org.cn/install.sh | bash

# 设置别名
echo 'alias hermes="~/.hermes/hermes-agent/venv/bin/hermes"' >> ~/.zshrc
source ~/.zshrc

echo "✅ 安装完成！运行 hermes setup 进行配置"
```


