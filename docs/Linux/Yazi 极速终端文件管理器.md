# Yazi: 下一代终端文件管理器

**Yazi** 是一款用 Rust 编写的极速终端文件管理器，承诺「给你世界上最快的文件管理体验」。它支持虚拟化预览、异步 I/O、默认就有的 TMDB 缩略图（图片预览）、甚至能预览 PDF、MP4、ZIP 等二进制文件。

------

## 1. 为什么选 Yazi？

在它之前，你可能用过 `ranger` 或者 `nnn`。但 Yazi 有几个让人眼前一亮的特性：

- **极速响应**：Rust 天生的性能优势，冷启动几乎零延迟
- **真·预览**：不止图片，连 PDF、视频、压缩包都能直接预览内容
- **TMDB 集成**：电影/剧集自动拉取海报和剧照
- **开箱即用**：零配置，方向键就能走天下
- **高度可定制**：主题、快捷键、插件全部可调

------

## 2. 安装（Linux / macOS / WSL）

Yazi 推荐使用预编译二进制安装。

#### 方式一：命令行一键安装

```bash
# Linux (x86_64)
curl -LsSf https://github.com/sxyazi/yazi/releases/latest/download/yazi-x86_64-unknown-linux-musl.tar.gz | tar xz -C /usr/local/bin

# macOS (Intel)
curl -LsSf https://github.com/sxyazi/yazi/releases/latest/download/yazi-x86_64-apple-darwin.tar.gz | tar xz -C /usr/local/bin

# macOS (Apple Silicon)
curl -LsSf https://github.com/sxyazi/yazi/releases/latest/download/yazi-aarch64-apple-darwin.tar.gz | tar xz -C /usr/local/bin
```

#### 方式二：包管理器

```bash
# Homebrew (macOS/Linux)
brew install yazi

# Arch Linux
sudo pacman -S yazi

# Fedora
sudo dnf install yazi

# Nix / NixOS
nix-env -iA nixpkgs.yazi
```

> ⚠️ **WSL 用户注意**：Yazi 在 WSL2 中完美运行，但如果你在 Windows 侧用 Windows Terminal，建议升级到最新版以获得最佳体验。

#### 方式三：源码编译

```bash
cargo install yazi
```

------

## 3. 快速上手

安装完成后，直接在终端输入 `yazi` 即可启动：

```bash
yazi
```

#### 基础操作（5 分钟入门）

| 按键 | 功能 |
|:---|:---|
| `h` / `j` / `k` / `l` 或 方向键 | 导航（l=进目录，h=退） |
| `Space` | 选中文件 |
| `y` | 复制（ yanked ） |
| `x` | 剪切 |
| `p` | 粘贴 |
| `d` | 删除（到回收站） |
| `D` | 永久删除（不经过回收站） |
| `Ctrl+f` 或 `/` | 全局搜索 |
| `Ctrl+z` | 后台任务列表 |
| `q` | 退出 |

#### 预览文件

选中文件后按 `l` 进入，或者直接按 `r` 以只读模式打开：

```bash
# 进入目录
yazi /path/to/your/project

# 直接打开特定文件（外部程序）
yazi /path/to/file.txt
```

------

## 4. 进阶配置

Yazi 的配置文件在 `~/.config/yazi/` 目录下：

```bash
~/.config/yazi/
├── yazi.toml      # 全局配置
├── theme.toml     # 颜色主题
└── keymap.toml    # 快捷键映射
```

#### yazi.toml 示例

```toml
[manager]
# 显示隐藏文件
show_hidden = true

# 向上/下滚动时，跳过 1 行
scrolloff = 1

# 文件夹排在前面
sort_by = "dir_first"

[preview]
# 预览时显示行号
line_numbers = true

# 图片预览（需要 chafa 或 lsix）
image_preview = true

[mouse]
# 启用鼠标支持
enabled = true
```

#### 启用图片预览（chafa）

很多发行版自带 `chafa`，如果没有：

```bash
# Ubuntu/Debian
sudo apt install chafa

# macOS
brew install chafa
```

然后在 `yazi.toml` 启用：

```toml
[preview]
image_preview = true
image_layer = "sixel"
```

------

## 5. 与你的工具链联动

#### 配合 fzf（模糊搜索）

在 `keymap.toml` 中绑定快捷键：

```toml
[[manager.keymap]]
on = ["<C-f>"]
exec = "sh -c 'fzf --preview \"bat --style=numbers --color=always --line-range :100 {}' | xargs -I {} yazi {}'"
desc = "用 fzf 搜索并打开文件"
```

#### 配合 Zellij / TMux

如果你用 Zellij 作为 TMux 替代品，Yazi 可以作为新 pane 打开：

```bash
# 在 TMux 中
yazi --hold  # 启动后等待按任意键退出

# 在 Zellij 中
yazi
```

#### 配合 lazygit

开发过程中快速切换：

```bash
# 从 yazi 快速打开 lazygit
# 在 yazi 中按 : 然后输入
lazygit
```

------

## 6. 插件生态

Yazi 支持用 Lua 编写的插件来扩展功能。推荐几个实用的：

| 插件 | 功能 |
|:---|:---|
| yazi-selenic-root | 自动跟随 Git 根目录 |
| yazi-copyword | 一键复制文件名/路径 |
| yazi-taskscheduler | 定时任务面板 |

安装插件：

```bash
# 安装所有推荐插件
yaPlugin --install

# 或者指定插件
yaPlugin --install selenic-root
```

------

## 7. 常见问题排查

#### Q：WSL 下图片不显示？

A：需要在 Windows Terminal 中启用 Sixel 支持（`"experimental.features": true"`），或者改用 `chafa` 模式。

#### Q：启动很慢？

A：检查插件是否过多，或者 `~/.cache/yazi/` 缓存是否堆积。定期清理：

```bash
rm -rf ~/.cache/yazi/*
```

#### Q：中文文件名显示乱码？

A：在 `yazi.toml` 中指定编码：

```toml
[manager]
filenames_icon = "auto"  # 自动检测
```

------

## 8. 与 Ranger 对比

| 特性 | Yazi | Ranger |
|:---|:---|:---|
| 启动速度 | ⚡ 毫秒级 | 慢 |
| 图片预览 | ✅ 内置 TMDB | 需配置 |
| 插件系统 | ✅ Lua | ✅ Python |
| 配置难度 | ⭐ 开箱即用 | 较高 |
| 社区活跃度 | 🚀 正在爆发 | 稳定但老旧 |

------

## 9. 一键脚本（懒人版）

不想折腾配置？用这个脚本快速体验 Yazi 最优配置：

```bash
cat << 'EOF' > ~/.config/yazi/yazi.toml
[manager]
show_hidden = true
scrolloff = 5
sort_by = "dir_first"
sort_dir_first = true

[preview]
line_numbers = true
image_preview = true
image_layer = "sixel"
EOF

echo "配置完成，重启 yazi 试试！"
```