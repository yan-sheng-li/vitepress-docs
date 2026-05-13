# Btop：现代化系统监控利器

**Btop** 是一款用 C++ 编写的现代化系统监控工具，属于 `btop` 系列（之前叫 `bashtop`，后用 C++ 重写为 `btop`）。它用炫酷的 TUI 界面呈现 CPU、内存、磁盘、网络、进程等信息，让你一眼看清系统状态。

------

## 1. 为什么选 Btop？

在它之前，你可能用过 `htop`、`btm`、`glances`。但 Btop 有几个独特优势：

- **超美的界面**：自动变色、进度条、图标、开箱即用的好看配色
- **极速响应**：用 C++ 重写后，启动和刷新都比 htop 快
- **低资源占用**：几乎没有负担，不会影响系统性能
- **自适应布局**：终端大小变化时自动调整
- **功能完整**：不只是一个进程管理器，CPU/内存/网络/磁盘全都有

| 工具 | 语言 | 启动速度 | 界面美观度 |
|:---|:---|:---|:---|
| `htop` | C | 快 | 一般 |
| `btop` | C++ | 极快 | ⭐⭐⭐⭐⭐ |
| `glances` | Python | 较慢 | ⭐⭐⭐ |
| `bashtop` | Bash | 慢 | ⭐⭐⭐⭐ |

------

## 2. 安装

### 2.1 Linux

#### 方式一：系统包管理器（推荐）

```bash
# Ubuntu / Debian
sudo apt install btop

# Fedora
sudo dnf install btop

# Arch Linux
sudo pacman -S btop

# openSUSE
sudo zypper install btop
```

#### 方式二：二进制下载

```bash
# 从 GitHub 下载最新的 Linux x86_64 二进制
BTOP_VERSION=$(curl -s https://api.github.com/repos/aristocratos/btop/releases/latest | grep -o '"tag_name": "v[^"]*' | cut -d'"' -f4)
curl -Lo btop.tar.gz "https://github.com/aristocratos/btop/releases/download/${BTOP_VERSION}/btop-x86_64-linux-musl.tar.gz"
tar xzf btop.tar.gz
sudo mv btop /usr/local/bin/
rm btop.tar.gz
```

#### 方式三：源码编译

需要 GCC/G++ 编译器：

```bash
# 克隆源码
git clone https://github.com/aristocratos/btop.git
cd btop

# 编译安装
make && sudo make install
```

### 2.2 macOS

```bash
brew install btop
```

### 2.3 Windows (WSL)

WSL 用户直接安装 Linux 版本即可：

```bash
sudo apt install btop
# 或者
brew install btop  # 如果装了 Homebrew
```

> ⚠️ **WSL 注意事项**：在 Windows Terminal 中使用效果最佳，部分网络统计功能可能受限。

### 2.4 验证安装

```bash
btop --version
# btop version 1.3.2
```

### 2.5 升级

```bash
# 如果用包管理器
sudo apt upgrade btop

# 或者重新安装
btop -up  # 内置升级命令
```

### 2.6 卸载

```bash
# 二进制安装
sudo rm /usr/local/bin/btop

# 源码编译安装
cd btop && sudo make uninstall
```

------

## 3. 快速上手

安装完成后，终端直接运行：

```bash
btop
```

你会看到一个分屏界面，默认显示 **CPU**、**内存**、**磁盘**、**网络** 四个面板。

### 界面概览

```
┌─btop───2026-05-13 15:30:45─┐
│  GNU/Linux x86_64  uptime: 7 days  │
├─ CPU ─────────────────────────────┤
│  Model: Intel i7-12700K           │
│  35% ████████░░░░░░░░░░░░  3.5 GHz │
├─ MEM ─────────────────────────────┤
│  8.2G / 32G ██████░░░░░░░░░  25.6% │
├─ DISK ─────────────────────────────┤
│  /dev/sda1  128G / 256G  50%      │
└────────────────────────────────────┘
```

### 基础操作

| 按键 | 功能 |
|:---|:---|
| `↑` / `↓` | 上/下选择进程 |
| `Enter` | 查看进程详情 |
| `d` | 查看进程目录 |
| `e` | 打开进程环境变量 |
| `l` | 查看打开的文件 |
| `s` | 查看 socket 连接 |
| `Tab` | 切换视图（流程图/条形图/图形） |

------

## 4. 视图与面板

### 4.1 主面板（默认）

按 `1-4` 或 `m` 切换不同视图：

| 按键 | 视图 | 说明 |
|:---|:---|:---|
| `1` | cpu | 只看 CPU 使用 |
| `2` | mem | 只看内存使用 |
| `3` | net | 只看网络流量 |
| `4` | disk | 只看磁盘 I/O |
| `m` | menu | 显示所有面板 |

### 4.2 CPU 面板

- **整体使用率**：总 CPU 使用百分比
- **核心使用率**：每个核心的独立使用
- **温度**：如果传感器支持，显示 CPU 温度
- **频率**：当前运行频率

快捷键：

| 按键 | 功能 |
|:---|:---|
| `c` | 切换核心展开/折叠 |
| `t` | 显示温度（如果支持） |

### 4.3 内存面板

显示物理内存和交换分区使用情况：

- **RAM**：已用/可用/总计
- **Swap**：交换空间使用

### 4.4 网络面板

- **上传/下载**：实时流量
- **网卡列表**：所有网络接口
- **连接数**：TCP/UDP 连接统计

### 4.5 磁盘面板

- **读写速度**：MB/s
- **空间使用**：各分区使用情况

### 4.6 进程列表（主视图）

按 `P` 进入进程列表：

| 快捷键 | 功能 |
|:---|:---|
| `↑` / `↓` | 选择进程 |
| `Enter` | 查看详情 |
| `Space` | 选中进程 |
| `d` | 显示工作目录 |
| `l` | 显示打开的文件 |
| `e` | 显示环境变量 |
| `s` | 显示 socket |
| `f` | 搜索过滤 |
| `o` | 自定义排序 |

排序选项：

| 按键 | 排序方式 |
|:---|:---|
| `o` + `1` | 按 PID |
| `o` + `2` | 按 CPU |
| `o` + `3` | 按内存 |
| `o` + `4` | 按用户 |

------

## 5. 搜索与过滤

### 5.1 进程搜索

按 `/` 打开搜索框：

```
/node    # 搜索包含 "node" 的进程
```

### 5.2 命令过滤

| 按键 | 功能 |
|:---|:---|
| `/` | 按名称搜索 |
| `u` | 按用户过滤 |
| `t` | 按标签过滤 |

### 5.3 正则过滤

```bash
# 在搜索框输入正则
/^python.*worker
```

------

## 6. 配置与自定义

### 6.1 配置文件

```bash
~/.config/btop/
├── btop.conf      # 主配置
├── btop.theme     # 自定义主题
└── btop.sorted    # 进程排序偏好
```

### 6.2 主配置示例

```ini
# ~/.config/btop/btop.conf

# 主题（内置：default, dracula, monotile, nord）
theme = "dracula"

# 刷新间隔（毫秒）
# 最小 100ms，建议 1000-2000ms
update_interval = 1000

# 是否显示温度
show_cpu_temp = true

# 温度单位
temp_scale = "c"  # c = 摄氏度, f = 华氏度

# 内存显示格式
mem_bytes = true  # true = 显示字节数, false = 显示百分比

# 进程列表大小
proc_start = 1
proc_end = 30

# 进程排序（0=PID, 1=CPU, 2=Mem, 3=User）
proc_sorting = 1

# 颜色低阈值（CPU/Mem 低于此值变绿色）
green = 50

# 颜色高阈值（CPU/Mem 高于此值变红色）
red = 90

# 隐藏特定用户进程
user = "root"
```

### 6.3 内置主题

```bash
# 切换主题
btop -t <theme>

# 可用主题
btop -t default
btop -t dracula
btop -t nord
btop -t tokyonight
btop -t monokai
btop -t catppuccin
btop -t gruvbox
```

### 6.4 命令行参数

| 参数 | 功能 |
|:---|:---|
| `btop -h` | 显示帮助 |
| `btop -v` | 显示版本 |
| `btop -t <theme>` | 指定主题 |
| `btop -p <preset>` | 使用预设 |
| `btop -s` | 只读模式（禁止 kill） |
| `btop -m <arg>` | 内存单位（auto/b/kmg） |

```bash
# 使用 nord 主题
btop -t nord

# 只读模式
btop -s

# 强制使用 MB 显示
btop -m mb
```

------

## 7. 进阶用法

### 7.1 作为系统服务监控

配合 `systemd` 长期运行：

```ini
# /etc/systemd/system/btop.service
[Unit]
Description=Btop system monitor
After=network.target

[Service]
Type=simple
ExecStart=/usr/bin/btop
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable btop
sudo systemctl start btop
```

### 7.2 配合 TMux 使用

```bash
# 在 TMux 中运行 btop
tmux new-session -d -s monitor 'btop'
tmux attach -t monitor
```

### 7.3 输出到文件

```bash
# 输出 JSON 格式的统计数据
btop -o json > stats.json

# 输出日志
btop -l 1000 > btop.log  # 每行一条数据
```

### 7.4 进程管理

在进程列表中：

| 按键 | 功能 |
|:---|:---|
| `k` | 发送 SIGTERM |
| `x` | 发送 SIGKILL |
| `r` | 重命名进程窗口 |
| `n` | 启动新窗口 |
| `w` | 显示完整命令 |

### 7.5 快捷键总览

| 按键 | 功能 |
|:---|:---|
| `q` / `Esc` | 退出 |
| `h` / `?` | 帮助 |
| `m` | 切换面板 |
| `1-4` | 快速切换视图 |
| `+` / `-` | 调整刷新间隔 |
| `c` | 切换核心展开 |
| `t` | 切换温度显示 |
| `f` | 打开过滤器 |
| `o` | 排序选项 |
| `P` | 显示进程列表 |
| `/` | 搜索 |
| `Enter` | 进程详情 |
| `Space` | 选中 |
| `d/e/l/s` | 详情菜单 |
| `k` | Kill |
| `w` | 进程命令窗口 |
| `r` | 重命名 |

------

## 8. 常见问题

### Q：启动报错 "cannot open named pipe"

A：这是权限问题。确保在真实终端中运行（不是某些不支持 TTY 的环境）：

```bash
# 检查终端支持
echo $TERM  # 应该输出 xterm-256color 或类似值
```

### Q：温度不显示？

A：确保系统有温度传感器：

```bash
# Linux 检查
ls /sys/class/thermal/
cat /sys/class/thermal/thermal_zone0/temp
```

### Q：网络统计不准确？

A：某些网卡驱动可能不支持。检查：

```bash
cat /proc/net/dev
```

### Q：界面乱码？

A：安装支持 Unicode 的字体（如 Nerd Font）：

```bash
# Ubuntu
sudo apt install fonts-jetbrains-mono

# macOS
brew install --cask font-jetbrains-mono-nerd-font
```

### Q：如何降低 CPU 占用？

A：调高刷新间隔：

```bash
# 编辑配置文件
vim ~/.config/btop/btop.conf

# 设置为 2000ms
update_interval = 2000
```

------

## 9. 与其他监控工具对比

| 特性 | Btop | htop | glances |
|:---|:---|:---|:---|
| 界面美观度 | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| 启动速度 | ⚡ 极快 | 快 | 较慢 |
| 资源占用 | 低 | 中 | 中 |
| 进程管理 | ✅ | ✅ | ✅ |
| 网络监控 | ✅ | ❌ | ✅ |
| 磁盘监控 | ✅ | ❌ | ✅ |
| 主题定制 | ✅ | ⚠️ | ⚠️ |
| 可视化图表 | ✅ | ⚠️ | ✅ |

------

## 10. 资源链接

- GitHub：https://github.com/aristocratos/btop
- 官方文档：https://github.com/aristocratos/btop#readme
- 主题仓库：https://github.com/aristocratos/btop/tree/main/themes