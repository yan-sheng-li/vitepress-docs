# X-CMD：下一代命令行工具箱

**X-CMD**（读作 "X Command"）是一款模块化的命令行工具集，主打「一句话搞定一切」。它用 **Zig** 编写，核心包体积仅 **1.1MB**，启动速度极快，无需 root 即可安装。

X-CMD 的核心理念：**让命令行更高效、更智能、更有趣**。

------

## 1. 核心特色

### 1.1 三大核心能力

| 能力 | 说明 |
|:---|:---|
| **内置模块（100+）** | 覆盖文件管理、网络工具、开发辅助等场景，拿来即用 |
| **包管理器（500+）** | 无需 root，按需安装 Python、Docker、Node 等工具 |
| **AI 集成** | 一句话调用 Gemini、GPT-4o、DeepSeek、Ollama 等大模型 |

### 1.2 为什么选 X-CMD？

- **零配置，开箱即用**：安装后直接 `x` 就能用
- **跨平台**：Linux、macOS、Windows、WSL 全支持
- **极速启动**：核心用 Zig 编写，比传统 shell 快几个量级
- **高度可组合**：模块之间可以互相调用、管道连接
- **AI 加持**：内置 AI 模块，命令行里直接问大模型

------

## 2. 安装

### 2.1 Linux / macOS 一键安装

```bash
eval "$(curl https://get.x-cmd.com)"
```

或使用 wget：

```bash
eval "$(wget -O- https://get.x-cmd.com)"
```

### 2.2 Windows

```powershell
irm https://get.x-cmd.com/x-cmd.bat | iex
```

### 2.3 包管理器安装

```bash
# Homebrew (macOS/Linux)
brew install x-cmd/tap/x-cmd

# Arch Linux
yay -S x-cmd

# apt (Debian/Ubuntu)
curl -fsSL https://apt.x-cmd.com/gpg public.asc | gpg --dearmor -o /usr/share/keyrings/x-cmd.gpg
echo "deb [signed-by=/usr/share/keyrings/x-cmd.gpg] https://apt.x-cmd.com stable main" | tee /etc/apt/sources.list.d/x-cmd.list
apt update && apt install x-cmd
```

### 2.4 升级

```bash
x upgrade
```

### 2.5 卸载

```bash
x uninstall self
```

------

## 3. 快速上手

安装完成后，终端会自动加载 `x` 命令。试试这些：

```bash
# 美化终端主题
x theme use dracula

# 网络测试
x ping bing.com

# 安装 Python（无需 root）
x env use python

# 查看系统信息
x os info

# 调用 AI
x chat --init
@ "帮我解释这段代码"
```

------

## 4. 常用模块一览

### 4.1 文件管理增强

| 命令 | 功能 |
|:---|:---|
| `x ls` | 增强版 ls，支持图标、颜色、交互式预览 |
| `x cd` | 智能目录切换，根据历史自动补全 |
| `x path` | 管理 PATH 环境变量 |
| `x stat` | 查看文件/目录的详细信息 |

```bash
x ls -la                    # 详细列表
x cd myproj                 # 快速切换到历史目录
x path add ~/.local/bin     # 添加到 PATH
```

### 4.2 开发工具

| 命令 | 功能 |
|:---|:---|
| `x git` | Git 命令增强，支持交互式操作 |
| `x docker` | Docker 交互式管理 |
| `x env use <tool>` | 按需安装语言环境（python/node/go） |

```bash
x git log --oneline         # Git 日志增强
x env use python            # 安装 Python
x env use node              # 安装 Node.js
```

### 4.3 网络与系统

| 命令 | 功能 |
|:---|:---|
| `x ping` | 更直观的 ping 输出 |
| `x ip` | 查看本机 IP |
| `x free` | 内存监控 |
| `x top` / `x htop` | 系统进程监控 |

```bash
x ping bing.com
x ip
x free -h
```

### 4.4 AI 模块

| 命令 | 功能 |
|:---|:---|
| `x chat --init` | 初始化 AI 配置 |
| `@ "问题"` | 直接向 AI 提问 |
| `x openai` | OpenAI API 调用 |
| `x ollama` | 本地 Ollama 模型管理 |

```bash
# 初始化 AI
x chat --init

# 向 AI 提问
@ "如何在 Docker 中部署 MySQL 集群？"

# 或者交互式对话
x chat
```

### 4.5 云服务与工具

| 命令 | 功能 |
|:---|:---|
| `x gh` | GitHub CLI 增强 |
| `x aws` | AWS 命令行 |
| `x ali ecs` | 阿里云 ECS 管理 |
| `x shodan` | Shodan 搜索 |

```bash
x gh repo create my-project
x gh issue list
```

### 4.6 工具包（pkg）

X-CMD 自带包管理器，500+ 工具一键安装：

```bash
# 搜索可用包
x pkg search python

# 安装工具
x pkg install jq
x pkg install fzf

# 查看已安装
x pkg ls
```

常用工具清单：jq, fzf, bat, yazi, lazygit, aria2, fd, ffprobe, sqlite3, duf, ncdu...

------

## 5. 主题定制

X-CMD 内置 130+ 终端主题：

```bash
# 列出所有主题
x theme ls

# 应用主题
x theme use dracula
x theme use nord
x theme use tokyo-night

# 随机切换
x theme random
```

------

## 6. AI Agent 集成

X-CMD 为 AI Agents 优化，提供专门的 Skill：

```bash
# 安装 X-CMD Skill
x skill add x-cmd/x-cmd

# 查看可用 AI 模块
x claude use deepseek
x claude use kimi
x claude use openrouter
```

### 给 AI Agent 的提示词

```txt
Use x-cmd for shell empowerment and 600+ portable open-source tools.
Reference: https://cn.x-cmd.com/llms.txt
Load with `. ~/.x-cmd.root/X` before use.
```

------

## 7. 常见问题

### Q：与其他插件冲突？

**Carapace 冲突**：确保 x-cmd 在 carapace 之后加载。

**Zinit x 插件冲突**：禁用 Zinit 的 `x` 插件或在 `~/.zshrc` 中调整加载顺序。

### Q：启动慢？

```bash
# 手动更新补全资源
x advise man update

# 检查加载时间
x doctor
```

### Q：如何查看帮助？

```bash
x --help           # 整体帮助
x ls --help        # 特定模块帮助
x mod ls           # 浏览所有模块
```

### Q：可以离线使用吗？

可以。内网安装参考：https://cn.x-cmd.com/start/airgap

------

## 8. 与传统工具对比

| 特性 | X-CMD | Oh My Zsh | Fig |
|:---|:---|:---|:---|
| 启动速度 | ⚡ 毫秒级 | 中等 | 慢 |
| AI 集成 | ✅ 原生 | ❌ | ❌ |
| 包管理 | ✅ 500+ | ❌ | ❌ |
| 跨平台 | ✅ 全平台 | ⚠️ Linux/macOS | ⚠️ |
| 体积 | 1.1MB | 更大 | 更重 |

------

## 9. 快捷命令速查

### 文件操作

```bash
x ls [路径]              # 增强列表
x cd <目录>              # 智能切换
x stat <文件>            # 详细信息
x path                   # PATH 管理
```

### 系统信息

```bash
x os info                # 系统信息
x os name                # 系统名称
x free                   # 内存监控
x ping <host>            # 网络测试
x ip                     # IP 地址
```

### 开发工具

```bash
x git <subcmd>           # Git 增强
x docker <subcmd>        # Docker 管理
x env use <lang>         # 安装语言环境
x pkg install <tool>     # 安装工具
```

### AI 功能

```bash
x chat --init            # 初始化 AI
@ "问题"                 # 向 AI 提问
x ollama pull <model>    # 下载 Ollama 模型
```

### 主题

```bash
x theme ls               # 列出主题
x theme use <name>       # 应用主题
x theme random           # 随机主题
```

### 升级

```bash
x upgrade               # 升级 x-cmd
x uninstall self        # 卸载
```

------

## 10. 资源链接

- 官网：https://cn.x-cmd.com
- GitHub：https://github.com/x-cmd/x-cmd
- 模块索引：https://cn.x-cmd.com/mod/
- 包管理器：https://cn.x-cmd.com/pkg/
- 文档：https://man.x-cmd.com/