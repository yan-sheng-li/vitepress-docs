# Tmux终端复用器

## 1. 简介

Tmux（Terminal Multiplexer）是一款终端复用器，它允许你在**一个终端窗口中同时管理多个会话**。它的核心价值在于：

- **会话持久化**：关闭终端或断开 SSH 连接后，会话中的任务继续在后台运行
- **窗口管理**：在一个会话中创建多个窗口（类似浏览器标签页）
- **面板拆分**：将单个窗口分割成多个面板（分屏），同时查看多个任务

与同类工具 `screen` 相比，tmux 设计更现代、功能更丰富，且采用 BSD 开源协议。


## 2. 安装 Tmux

### 2.1 各系统安装命令

| 操作系统            | 安装命令                                                    |
| :------------------ | :---------------------------------------------------------- |
| **Ubuntu / Debian** | `sudo apt update && sudo apt install tmux -y`               |
| **CentOS / RHEL**   | `sudo yum install epel-release -y && sudo yum install tmux` |
| **Fedora**          | `sudo dnf install tmux`                                     |
| **Arch Linux**      | `sudo pacman -S tmux`                                       |
| **macOS**           | `brew install tmux`                                         |
| **Alpine Linux**    | `sudo apk add tmux`                                         |
| **openSUSE**        | `sudo zypper install tmux`                                  |

### 2.2 验证安装

```bash
tmux -V
```

若正确安装，终端会显示版本号，如 `tmux 3.4`。


## 3. 核心概念

Tmux 采用三级层次结构来组织工作空间：

```
Session（会话）
  └── Window（窗口）   ← 可多个，类似标签页
        └── Pane（面板） ← 可多个，分屏显示
```

| 概念                | 说明                                 | 类比           |
| :------------------ | :----------------------------------- | :------------- |
| **Session（会话）** | 最高层容器，一个会话可包含多个窗口   | 一本"笔记本"   |
| **Window（窗口）**  | 会话内的独立工作区，类似浏览器标签页 | 笔记本的"章节" |
| **Pane（面板）**    | 窗口内分割出的子区域，可并排显示     | 章节中的"页面" |


## 4. 会话管理（基础操作）

### 4.1 创建会话

```bash
tmux                          # 创建无名称会话（编号从0开始）
tmux new -s myproject         # 创建并命名会话（推荐）
```

### 4.2 查看会话列表

```bash
tmux ls                       # 列出所有会话
```

### 4.3 分离与重新连接会话

```bash
# 在会话内执行
Ctrl+b d                      # 快捷键：分离当前会话

# 在终端执行
tmux attach                   # 重新连接最近的会话
tmux a -t myproject           # 连接到指定名称的会话
```

分离会话后，内部运行的程序会**继续在后台运行**，这是 tmux 最实用的特性。

### 4.4 杀死会话

```bash
tmux kill-session -t myproject   # 杀死指定会话
tmux kill-server                 # 杀死所有 tmux 会话
```


## 5. 前缀键说明

Tmux 所有快捷键都以 **前缀键** 开头。默认前缀是 **`Ctrl+b`**。

**使用方式**：先按下 `Ctrl+b`（同时按，然后松开），再按功能键。

> 💡 下文所有快捷键省略前缀键，如 `Ctrl+b d` 表示为 `d`。

### 5.1 修改前缀键（可选）

编辑 `~/.tmux.conf` 配置文件：

```bash
# 将前缀键改为 Ctrl+a
set-option -g prefix C-a
unbind C-b
bind C-a send-prefix
```

修改后需重启 tmux 使配置生效。


## 6. 窗口管理

| 快捷键          | 功能说明                     |
| :-------------- | :--------------------------- |
| `c`             | 创建新窗口（create）         |
| `n`             | 切换至下一个窗口（next）     |
| `p`             | 切换至上一个窗口（previous） |
| `数字键`（0-9） | 切换到指定编号的窗口         |
| `w`             | 列出所有窗口，可交互选择     |
| `,`（逗号）     | 重命名当前窗口               |
| `&`             | 关闭当前窗口（需确认）       |

> 💡 查看当前会话所有窗口时，`w` 快捷键会显示可交互的树形视图，非常直观。


## 7. 面板（分屏）管理

### 7.1 创建面板

| 快捷键 | 功能说明             |
| :----- | :------------------- |
| `%`    | 垂直分屏（左右两栏） |
| `"`    | 水平分屏（上下两行） |

> 📝 **记忆技巧**：`%` 像被竖线分成两半，`"` 像上下两横。

### 7.2 面板导航与操作

| 快捷键   | 功能说明                     |
| :------- | :--------------------------- |
| `方向键` | 移动光标到指定方向的面板     |
| `o`      | 循环切换面板                 |
| `z`      | 放大当前面板（再按一次恢复） |
| `x`      | 关闭当前面板（需确认）       |
| `空格键` | 在预设面板布局中循环切换     |

### 7.3 调整面板大小

| 快捷键          | 功能说明                                  |
| :-------------- | :---------------------------------------- |
| `Ctrl + 方向键` | 以 1 个单元格为单位调整边缘               |
| `Alt + 方向键`  | 以 5 个单元格为单位调整边缘（macOS 可用） |


## 8. 复制模式（滚动与复制）

Tmux 默认不支持鼠标滚动，需进入复制模式查看历史输出。

| 快捷键                     | 功能说明             |
| :------------------------- | :------------------- |
| `[`                        | 进入复制模式         |
| `方向键 / PageUp/PageDown` | 在复制模式中滚动浏览 |
| `空格键`                   | 开始选择文本         |
| `方向键`                   | 扩展选择区域         |
| `回车`                     | 复制选中文本         |
| `]`                        | 粘贴已复制的文本     |

按 `q` 或 `Esc` 退出复制模式。


## 9. 高级配置与定制

### 9.1 配置文件位置

- 用户配置：`~/.tmux.conf` 或 `~/.config/tmux/tmux.conf`（新版）
- 系统全局：`/etc/tmux.conf`

### 9.2 常用配置示例

```bash
# 开启鼠标支持（可通过前缀键 + m 切换）
set -g mouse on

# 限制回滚行数为 10000
set -g history-limit 10000

# 窗口和面板编号从 1 开始
set -g base-index 1
set -g pane-base-index 1

# 状态栏配色
set -g status-bg blue
set -g status-fg white

# 开启窗口活动通知
setw -g monitor-activity on
setw -g visual-activity on
```

### 9.3 配置生效方法

```bash
# 方法1：重启 tmux 服务器
tmux kill-server

# 方法2：在 tmux 会话内重新加载配置
prefix + :             # 进入命令模式
source-file ~/.tmux.conf
```


## 10. SSH 远程使用注意事项

| 场景             | 最佳实践                                               |
| :--------------- | :----------------------------------------------------- |
| **远程连接后**   | 先输入 `tmux new -s taskname` 创建会话，再执行任务     |
| **网络不稳定时** | 断开前先分离会话（`prefix + d`），重连后 `tmux a` 恢复 |
| **长时间任务**   | 在 tmux 会话中执行，即使 SSH 断开也不会中断            |
| **查看已有会话** | `tmux ls` 查看所有会话列表                             |


## 11. 常用快捷键速查表

| 分类     | 快捷键    | 功能                      |
| :------- | :-------- | :------------------------ |
| **会话** | `d`       | 分离当前会话              |
|          | `$`       | 重命名当前会话            |
| **窗口** | `c`       | 新建窗口                  |
|          | `n` / `p` | 下一窗口 / 上一窗口       |
|          | `,`       | 重命名窗口                |
|          | `&`       | 关闭窗口                  |
| **面板** | `%`       | 垂直分屏                  |
|          | `"`       | 水平分屏                  |
|          | `方向键`  | 切换面板                  |
|          | `z`       | 放大/恢复面板             |
|          | `x`       | 关闭面板                  |
| **其他** | `[`       | 进入复制模式（滚动/复制） |
|          | `]`       | 粘贴                      |
|          | `?`       | 列出所有快捷键            |


## 12. 快速上手流程

```bash
# 1. 安装
sudo apt install tmux

# 2. 创建命名会话
tmux new -s work

# 3. 在会话中分屏操作
Ctrl+b %        # 左右分屏
Ctrl+b "        # 上下分屏
Ctrl+b 方向键   # 切换焦点

# 4. 分离会话（后台继续运行）
Ctrl+b d

# 5. 重新连接
tmux a -t work

# 6. 结束会话
tmux kill-session -t work
```

## 13. 窗口命名

tmux 里“子窗口”可能有两层概念：

- **window（窗口）**：一个 session 里的标签页
- **pane（分屏/子窗格）**：窗口里的上下/左右拆分

两者都能命名，但方式不同。

给 **window** 起名：

```bash
tmux rename-window myapp
```

快捷键：

```text
Ctrl+b ,
```

然后输入名字。

给 **pane（分屏）** 起名（tmux 3.2+）：

```bash
tmux select-pane -T logs
```

或者指定 pane：

```bash
tmux select-pane -t :.1 -T backend
```

说明：

- `:.1` = 当前窗口的第 1 个 pane
- `-T` = pane 标题（title）

如果想显示 pane 名称，需要开启 pane 边框状态：

```bash
tmux set -g pane-border-status top
```

然后可自定义显示格式：

```bash
tmux set -g pane-border-format "#{pane_index}: #{pane_title}"
```

效果类似：

```text
┌─0: logs────────┐
│                │
├─1: backend─────┤
│                │
└────────────────┘
```

## 14. 持久化（WSL / 通用）

### 前置

插件管理器，用于方便地安装和管理其他 tmux 插件。

```bash
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
```

#### 配置文件 (`~/.tmux.conf`)

在你的 WSL 主目录下创建或编辑 `~/.tmux.conf` 文件，加入以下配置：

```bash
# 1. 使用 tpm 插件管理器
set -g @plugin 'tmux-plugins/tpm'

# 2. 状态保存与恢复核心插件
set -g @plugin 'tmux-plugins/tmux-resurrect'

# 3. 自动化插件：定时保存和自动恢复
set -g @plugin 'tmux-plugins/tmux-continuum'

# --- 以下是针对 continuum 的配置选项 ---
# 设置自动保存的间隔（单位：分钟），默认15分钟
set -g @continuum-save-interval '15'

# 开启自动恢复：tmux 启动时自动加载 last 保存的状态
set -g @continuum-restore 'on'

# 开启开机自启：确保 WSL 重启后，tmux 服务器能被 continuum 拉起
# 注意：此选项需配合 WSL 的自启环境使用，效果可能因 WSL 版本而异，但设置无害
set -g @continuum-boot 'on'

# [可选] 保存面板内的内容，这有助于恢复 vim 等程序的部分状态
set -g @resurrect-capture-pane-contents 'on'

# 确保 tpm 的配置行在最后
run -b '~/.tmux/plugins/tpm/tpm'
```

配置完成后，在 tmux 会话中按下 `prefix + I`（大写的 I，即 Shift + i），tpm 会自动从 GitHub 下载并安装你在配置文件中声明的插件。

### 1. 核心概念

- **tmux-resurrect**：核心插件，负责保存/恢复会话
- **tmux-continuum**：自动化插件，定时保存 + 开机/启动自动恢复
- **默认存档**：`last`（`prefix + Ctrl-r` 默认恢复这个）

---

### 2. 日常操作

| 操作     | 快捷键            | 说明                               |
| -------- | ----------------- | ---------------------------------- |
| 手动保存 | `prefix + Ctrl-s` | 保存当前会话到 `last`              |
| 手动恢复 | `prefix + Ctrl-r` | 从 `last` 恢复最近一次保存的状态   |
| 自动保存 | 每15分钟          | 由 continuum 自动触发，覆盖 `last` |
| 自动恢复 | 运行 `tmux` 时    | 需要 `@continuum-restore 'on'`     |

---

### 3. 多存档管理（保存/恢复指定名称）

#### 查看所有存档
```bash
ls ~/.tmux/resurrect/
```

#### 保存到指定名称（例如 `work2`）
```bash
tmux run-shell 'tmux save-session -t ~/.tmux/resurrect/work2'
```

#### 从指定名称恢复
```bash
tmux run-shell 'tmux load-session -t ~/.tmux/resurrect/work2'
```

#### 常用存档切换流程
```bash
# 1. 保存当前状态到 work
tmux run-shell 'tmux save-session -t ~/.tmux/resurrect/work'

# 2. 切换到 work2（假设之前已保存）
tmux run-shell 'tmux load-session -t ~/.tmux/resurrect/work2'

# 3. 或者手动 kill-server 后从 work 恢复
tmux kill-server
tmux run-shell 'tmux load-session -t ~/.tmux/resurrect/work'
```

---

### 4. 测试流程

```bash
# 1. 手动保存（或等自动保存）
prefix + Ctrl-s

# 2. 彻底退出 tmux
tmux kill-server

# 3. 验证已清空
tmux ls   # 应显示无服务器

# 4. 重新启动并恢复
tmux      # 自动恢复 last（需开启 continuum-restore）
# 或手动从指定存档恢复
tmux run-shell 'tmux load-session -t ~/.tmux/resurrect/work'
```

---

### 5. 快捷键绑定建议（可选）

在 `~/.tmux.conf` 中添加：

```bash
# 指定名称保存（prefix + M-s）
bind M-s command-prompt -p "Save as:" "run-shell 'tmux save-session -t ~/.tmux/resurrect/%%1'"

# 指定名称恢复（prefix + M-r）
bind M-r command-prompt -p "Restore from:" "run-shell 'tmux load-session -t ~/.tmux/resurrect/%%1'"
```

重载配置：`tmux source-file ~/.tmux.conf`

---

### 6. 关键路径

| 内容     | 路径                 |
| -------- | -------------------- |
| 配置文件 | `~/.tmux.conf`       |
| 插件目录 | `~/.tmux/plugins/`   |
| 存档目录 | `~/.tmux/resurrect/` |

---

### 7. 常见问题速查

| 问题                 | 解决                                                         |
| -------------------- | ------------------------------------------------------------ |
| 自动恢复无效         | 检查 `@continuum-restore 'on'` 是否配置                      |
| 程序（如 vim）未恢复 | 添加 `@resurrect-capture-pane-contents 'on'`                 |
| 恢复后是空白会话     | 确认之前确实保存过，且没有 `tmux kill-server` 后忘记保存     |
| 想改变自动恢复的目标 | 复制其他存档到 `last`：`cp ~/.tmux/resurrect/work2 ~/.tmux/resurrect/last` |

