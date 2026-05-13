# Lazygit：终端里的 Git 魔法

**Lazygit** 是一个用 Go 编写的终端 Git 管理工具，专为那些觉得 Git 命令太繁琐、又不想装 IDE 的开发者设计。它把 Git 的日常工作流（commit、push、stash、rebase）变成了一场「在终端里玩俄罗斯方块」般的流畅体验。

------

## 1. 为什么需要 Lazygit？

Git 的日常操作很机械：`git add .` → `git commit -m` → `git push`。每次都要手敲命令，参数记不住，还要 `git status` 反复确认。

Lazygit 的思路是：**把所有 Git 操作可视化**，用键盘导航代替命令行。你可以用方向键、快捷键，一气呵成完成提交、推送、变基。

- **所见即所得**：文件变更、分支状态一目了然
- **交互式操作**：Rebase、Merge、Cherry-pick 点点键盘就搞定
- **零门槛**：不需要记复杂命令，Tab 和方向键走天下
- **快速修复**：随手 stash、unstash，不需要切窗口

------

## 2. 安装（Linux / macOS / WSL）

### 方式一：二进制安装（推荐）

```bash
# Linux (x86_64)
LAZYGIT_VERSION=$(curl -s "https://api.github.com/repos/jesseduffield/lazygit/releases/latest" | grep -o '"tag_name": "v[^"]*' | cut -d'"' -f4)
curl -Lo lazygit "https://github.com/jesseduffield/lazygit/releases/download/${LAZYGIT_VERSION}/lazygit_${LAZYGIT_VERSION}_Linux_x86_64.tar.gz"
tar xf lazygit_${LAZYGIT_VERSION}_Linux_x86_64.tar.gz
sudo install lazygit /usr/local/bin/
rm lazygit lazygit_${LAZYGIT_VERSION}_Linux_x86_64.tar.gz
```

```bash
# macOS
brew install lazygit
```

### 方式二：包管理器

```bash
# Ubuntu / Debian
sudo add-apt-repository ppa:lazygit-team/release
sudo apt update && sudo apt install lazygit

# Arch Linux
sudo pacman -S lazygit

# Fedora
sudo dnf install lazygit

# Nix
nix-env -iA nixpkgs.lazygit
```

### 方式三：源码编译

需要 Go 1.21+：

```bash
go install github.com/jesseduffield/lazygit@latest
```

### WSL 注意事项

```bash
# 如果你在 Windows Terminal + WSL 中使用
# 需要设置默认终端类型
export LAZYGIT_CONFIG_DIR="$HOME/.config/lazygit"
```

验证安装：

```bash
lazygit --version
```

------

## 3. 快速上手

安装完成后，进入你的 Git 仓库目录，直接运行：

```bash
lazygit
```

你会看到一个分屏界面，左侧是文件列表，右侧是变更预览。

### 基础界面导航

| 快捷键 | 功能 |
|:---|:---|
| `h` / `l` | 左右面板切换 |
| `j` / `k` | 上下移动 |
| `Enter` | 进入 / 确认 |
| `q` / `Esc` | 返回 / 退出 |
| `x` | 展开折叠 |
| `Space` | 选中 / 取消选中 |

### 基础工作流（5 分钟上手）

#### 第一步：暂存文件

1. 启动 `lazygit`
2. 在左侧 Files 面板，用 `j/k` 选中修改的文件
3. 按 `Space` 暂存单个文件，或者按 `a` 暂存所有文件
4. 暂存后文件会跑到 Staged 区域

#### 第二步：提交

1. 文件暂存后，切换到 Staged 区域
2. 按 `c` 打开提交信息编辑框
3. 输入提交信息后 `:wq` 保存
4. 提交完成！

#### 第三步：推送

1. 提交后，按 `P`（大写 P）推送到远程
2. 如果有冲突，会提示处理

#### 第四步：查看日志

1. 按 `l` 进入日志视图
2. 用 `j/k` 浏览提交历史
3. 按 `Enter` 查看提交详情

------

## 4. 核心功能详解

### 4.1 文件暂存（Staging）

这是最常用的操作。

```bash
# 按 Space：暂存当前文件
# 按 A（大写）：暂存所有文件
# 按 u：取消暂存
# 按 d：查看文件差异
```

暂存单行（Hunk Splitting）：

```bash
# 进入文件后
# 按 s：将选中行拆成单独的 hunks
# 按 1/2：只暂存这一行
```

### 4.2 提交管理（Commits）

| 快捷键 | 功能 |
|:---|:---|
| `c` | 新建提交 |
| `d` | 查看提交详情 |
| `e` | 修改提交信息 |
| `f` | 变基（squash）提交 |
| `g` | 重置到某个提交 |

Squash（合并提交）：

1. 进入 Commits 面板
2. 选中你想合并的多个提交
3. 按 `s` 开始 squash 流程
4. 编辑合并后的提交信息

### 4.3 分支管理（Branches）

| 快捷键 | 功能 |
|:---|:---|
| `n` | 新建分支 |
| `c` | 基于当前创建新分支并 checkout |
| `Enter` | 查看分支信息 |
| `d` | 删除分支 |
| `m` | 合并分支 |

快速切换分支：

1. 按 `b` 打开分支面板
2. 输入分支名或搜索
3. `Enter` 切换

### 4.4 远程操作（Remote）

| 快捷键 | 功能 |
|:---|:---|
| `f` | Fetch 拉取最新 |
| `p` | Push 推送 |
| `F` | Pull 拉取并合并 |
| `M` | Merge 合并 |

### 4.5 Stash（暂存工作区）

当你需要临时切换分支，但不想提交未完成的工作时：

```bash
# 按 s：stash 当前更改
# 按 g：应用 stash
# 按 d：删除 stash
# 按 l：查看 stash 列表
```

------

## 5. 进阶操作

### 5.1 Rebase 交互式变基

这是 Lazygit 最强大的功能之一。

```bash
# 场景：需要整理提交历史
# 1. 按 r 进入 rebase 模式
# 2. 选择起始提交点
# 3. 可以：
#    - pick：保留提交
#    - reword：修改提交信息
#    - squash：合并到上一个提交
#    - drop：删除提交
# 4. 编辑完成后 :wq
```

### 5.2 Merge 冲突解决

```bash
# 1. 遇到冲突时，lazygit 会高亮显示冲突文件
# 2. 进入冲突文件
# 3. 选择：
#    - 按 1：使用ours（本地版本）
#    - 按 2：使用theirs（远程版本）
#    - 按 b：手动编辑
# 4. 解决后按 c 标记为已解决
# 5. 继续 rebase/merge 流程
```

### 5.3 Cherry-pick

```bash
# 1. 在 Commits 面板选中提交
# 2. 按 C（shift+c）执行 cherry-pick
# 3. 选择目标分支
```

### 5.4 搜索和过滤

```bash
# 按 /：打开搜索框
# 输入关键词实时过滤

# 按 z + c：只显示当前分支的提交
# 按 z + a：显示所有分支
```

------

## 6. 配置与自定义

Lazygit 的配置文件在 `~/.config/lazygit/config.yml`：

```yaml
# ~/.config/lazygit/config.yml

# 主题设置
gui:
  # 主题：dark, light, monokai, nord, dracula
  theme: "nord"

  # 显示行号
  showLineNumbers: true

  # 分屏布局
  splitViewSize: 0.5

# 定制化的用户操作
customCommands:
  - name: "Deploy to Prod"
    context: "local"
    command: "bash scripts/deploy.sh prod"
    description: "部署到生产环境"

# 忽略某些文件/目录
fileWatcher:
  ignorePatterns:
    - "node_modules/"
    - ".idea/"
```

### 常用配置项

```yaml
# 禁用某些烦人的提示
gui:
  # 跳过确认提示
  skipDiscardChangeWarning: true

  # 默认提交信息模板
  defaultCommitMessage: ""

# Git 配置
git:
  # 自动 fetch
  autoRefresh: true

  # 拉取时自动 stash
  autoStashAndPop: false

# 侧边栏宽度
gui:
  leftPanelWidth: 0.3
  sidePanelWidth: 0.4
```

### 自定义快捷键

```yaml
keybinding:
  universial:
    # 覆盖默认的退出键
    quit: "q"

  files:
    # 文件操作
    stageSelectedFile: "Space"
    unstageSelectedFile: "u"

  commits:
    # 提交操作
    createCommit: "c"
    amendCommit: "C"
```

------

## 7. 与其他工具联动

### 7.1 配合 Yazi

在 Yazi 中按 `:` 打开命令面板，输入：

```
lazygit
```

直接跳转到 lazygit。

### 7.2 配合 TMux

```bash
# 在 TMux 中新开一个 pane 运行 lazygit
tmux new-window -n lazygit
tmux send-keys -t lazygit "lazygit" Enter
```

### 7.3 配合 Neovim / Vim

如果你用 Neovim，可以使用 `:LazyGit` 插件：

```bash
# 安装 lazygit.nvim
Plug 'kdheepak/lazygit.nvim'

# 或者用 lazy.nvim
{ "kdheepak/lazygit.nvim" }
```

然后在 Neovim 中：

```vim
:LazyGit    " 打开 lazygit
```

### 7.4 设置 Git 默认编辑器

```bash
# 让 Git 使用 lazygit 作为编辑器
git config --global core.editor "lazygit"
```

这样 `git commit --amend` 等操作会直接调用 lazygit。

------

## 8. 常见问题

### Q：启动后界面乱码？

```yaml
# 在 config.yml 中设置
gui:
  theme: "nord"
```

或者在终端设置中确保使用支持 Unicode 的字体（如 Fira Code、Nerd Font）。

### Q：WSL 下无法打开编辑器？

```bash
# 确保设置了 EDITOR 环境变量
export EDITOR=vim  # 或 nano, code
```

### Q：提交信息写错了怎么改？

```bash
# 还没 push 的情况下
# 在 lazygit 中，选中提交按 e 修改
git commit --amend
```

### Q：如何完全撤销一个操作？

```bash
# 按 g 选择 reset
# 选择 --soft / --mixed / --hard
```

### Q：慢？加载很久？

```bash
# 大仓库可以优化
# 在 config.yml 中关闭某些特性
git:
  disableForcePush: true
```

### Q：不小心关了，怎么恢复？

```bash
# lazygit 会自动保存状态
# 重开时会恢复到之前的状态
```

------

## 9. 与其他工具对比

| 特性 | Lazygit | GitKraken | SourceTree |
|:---|:---|:---|:---|
| 启动速度 | ⚡ 毫秒级 | 慢 | 中等 |
| 终端原生 | ✅ 是 | ❌ 否 | ❌ 否 |
| 配置难度 | ⭐ 零配置 | 较高 | 较高 |
| 跨平台 | ✅ 全平台 | ✅ | ✅ |
| 键盘操作 | ✅ 极致优化 | 一般 | 一般 |
| 体积 | ~10MB | ~200MB | ~100MB |

------

## 10. 快捷键速查表

### 文件操作

| 快捷键 | 功能 |
|:---|:---|
| `a` | 暂存所有文件 |
| `Space` | 暂存/取消暂存当前文件 |
| `u` | 取消暂存 |
| `d` | 查看 diff |
| `i` | 忽略文件 |

### 提交操作

| 快捷键 | 功能 |
|:---|:---|
| `c` | 新建提交 |
| `C` | Amend 追加修改 |
| `e` | 修改提交信息 |
| `d` | 查看提交详情 |
| `f` | Squash 合并 |
| `r` | Rebase 变基 |

### 分支与远程

| 快捷键 | 功能 |
|:---|:---|
| `n` | 新建分支 |
| `p` | Push 推送 |
| `P` | Pull 拉取 |
| `m` | Merge 合并 |
| `b` | 查看分支列表 |

### 视图切换

| 快捷键 | 功能 |
|:---|:---|
| `l` | 查看日志 |
| `b` | 查看分支 |
| `s` | Stash 暂存 |
| `t` | Todo 列表 |

### 通用

| 快捷键 | 功能 |
|:---|:---|
| `q` / `Esc` | 退出 |
| `/` | 搜索 |
| `?` | 帮助 |
| `Ctrl+z` | 后台任务 |
| `w` | 展开折叠 |