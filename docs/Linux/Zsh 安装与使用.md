# Zsh：让你的终端脱胎换骨

**Zsh**（Z Shell）是 Linux/macOS 上的终极 shell，和 bash 是老乡但更强大。它能让你从「完成任务」进化到「享受敲命令」。

------

## 1. 为什么值得从 Bash 切换？

- **智能补全**：目录、文件名、命令参数、Git 分支，全给你提示
- **插件生态**：Oh My Zsh 提供 300+ 插件，开箱即用
- **主题定制**：Powerlevel10k、Starship，超好看的 prompt
- **共享补全**：一个脚本，所有 shell 都能用同一个补全规则
- **更聪明的历史**：输入一半命令，↑ 自动匹配历史

------

## 2. 安装（Linux / macOS / WSL）

#### Ubuntu / Debian

```bash
sudo apt update && sudo apt install zsh -y
```

#### Arch Linux

```bash
sudo pacman -S zsh
```

#### macOS（自带，但建议升级）

```bash
brew install zsh zsh-completions
```

#### WSL

```bash
sudo apt install zsh -y
```

安装完成后验证：

```bash
zsh --version
# zsh 5.9 (x86_64)
```

------

## 3. 设置为默认 Shell

```bash
# 把 zsh 设为默认
chsh -s /bin/zsh

# 或者
echo $SHELL  # 查看当前
```

> ⚠️ **WSL 用户**：修改后重新打开终端即可。如果想回退，`chsh -s /bin/bash`。

------

## 4. Oh My Zsh（必装！）

Oh My Zsh 是 Zsh 的配置框架，有了它，你等于拥有了一个完整的终端生态系统。

```bash
# 官方安装脚本（需要 curl/wget/git）
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

安装完成后，你会看到默认的 `robbyrussell` 主题。

#### 核心配置文件

```bash
~/.zshrc   # Zsh 主配置，Oh My Zsh 自动创建
~/.zshrc.d/  # 自定义片段（推荐把配置拆到这里）
```

#### 必装插件

```bash
# 编辑 ~/.zshrc，找到 plugins=() 这一行
plugins=(
    git
    zsh-autosuggestions
    zsh-syntax-highlighting
    fzf
    docker
    python
    pip
)
```

安装额外插件：

```bash
# zsh-autosuggestions（输入历史自动补全）
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# zsh-syntax-highlighting（命令语法高亮）
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

------

## 5. 主题：Powerlevel10k（装完之后帅到没朋友）

Powerlevel10k 是目前最流行的 Zsh 主题，速度极快、可定制、好看。

```bash
# 1. 安装字体（必须！否则图标乱码）
# 在终端设置中启用 "MesloLGS NF" 字体

# 2. 安装主题
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/themes/powerlevel10k

# 3. 设置主题
# 编辑 ~/.zshrc
ZSH_THEME="powerlevel10k/powerlevel10k"

# 4. 重启 zsh，进入配置向导
p10k configure
```

#### 常用配置项

```bash
# ~/.p10k.zsh 中常用配置
# POWERLEVEL10K_LEFT_PROMPT_ELEMENTS=(context dir vcs)
# POWERLEVEL10K_RIGHT_PROMPT_ELEMENTS=(status command_execution_time todo)

# 禁用图标（纯文字模式）
# POWERLEVEL10K_MODE=ascii
```

------

## 6. 实战配置清单

#### 基础优化 ~/.zshrc

```bash
# 历史记录优化
HISTFILE=~/.zsh_history
HISTSIZE=100000
SAVEHIST=100000
setopt HIST_IGNORE_DUPSES    # 去除重复记录
setopt SHARE_HISTORY         # 多个终端共享历史
setopt INC_APPEND_HISTORY    # 实时写入历史

# 自动纠错
setopt CORRECT

# 自动补全
autoload -Uz compinit
compinit
zstyle ':completion:*' menu select
zstyle ':completion:*' matcher-list 'm:{a-zA-Z}={A-Za-z}'  # 大小写不敏感
```

#### Git 别名

```bash
# ~/.zshrc 或 ~/.zshrc.d/git-alias.zsh
alias gs='git status'
alias ga='git add .'
alias gc='git commit -m'
alias gp='git push'
alias gl='git pull'
alias gd='git diff'
alias gco='git checkout'
alias gb='git branch'
alias gf='git fetch'
alias gm='git merge'
alias gk='git stash'
alias gpl='git stash list'
```

#### 常用快捷键

| 快捷键 | 功能 |
|:---|:---|
| `Tab` | 补全 |
| `↑` / `↓` | 浏览历史命令 |
| `Ctrl+r` | 搜索历史 |
| `Ctrl+w` | 删除单词 |
| `Ctrl+u` | 删除整行 |
| `Alt+.` | 粘贴上条命令的最后一个参数 |
| `Ctrl+a` / `Ctrl+e` | 行首/行尾 |

------

## 7. 常用场景配置

#### Docker 场景

```bash
# ~/.zshrc.d/docker.zsh
alias d='docker'
alias dc='docker-compose'
alias dps='docker ps'
alias di='docker images'
alias dex='docker exec -it'
```

#### Python 场景

```bash
# ~/.zshrc.d/python.zsh
alias venv='python -m venv venv && source venv/bin/activate'
alias py='python'
alias pip='pip'
```

#### WSL 场景（剪贴板互通）

```bash
# ~/.zshrc.d/wsl.zsh
alias copy='clip.exe'
alias paste='powershell.exe Get-Clipboard'
```

------

## 8. 迁移 Checklist

从 Bash 迁移过来，这些步骤别漏：

1. **导出 Bash 历史**

   ```bash
   history -a  # 先确保 bash 历史写入
   fc -R  # 导入到 zsh
   ```

2. **迁移别名**

   ```bash
   cat ~/.bashrc >> ~/.zshrc
   cat ~/.bash_aliases >> ~/.zshrc
   ```

3. **迁移 PATH**

   ```bash
   # 检查 ~/.zshrc 中是否包含
   export PATH="$HOME/bin:$PATH"
   ```

4. **安装 oh-my-zsh**

   ```bash
   sh -c "$(curl -fsSL https://raw.githubusercontent.com/oh-myzsh/ohmyzsh/master/tools/install.sh)"
   ```

5. **选主题 / 插件**

   ```bash
   # 推荐插件
   plugins=(git zsh-autosuggestions zsh-syntax-highlighting fzf docker)
   ```

------

## 9. 常见问题

#### Q：macOS Catalina 后默认变成 Zsh，还需要装 Oh My Zsh 吗？

A：Catalina 只是把默认 shell 换成 Zsh，Oh My Zsh 还是推荐安装，否则没有补全和插件支持。

#### Q：启动很慢，怎么排查？

```bash
# 测量启动时间
zsh -xv 2>&1 | tail -100
```

常见原因：插件太多、`compinit` 太慢、git 仓库太大。

优化方法：懒加载插件。

```bash
# ~/.zshrc 末尾添加
# 懒加载 fzf
eval "$(fzf --zsh)"
```

#### Q：命令高亮不生效？

A：确保 `zsh-syntax-highlighting` 是最后一个加载的插件。

#### Q：WSL 中 Oh My Zsh 安装失败？

A：可能是网络问题，或者 `sh` 的 alias 被修改过：

```bash
unalias sh
sh -c "$(curl -fsSL ...)"  # 重试
```

------

## 10. 一键安装脚本

```bash
#!/usr/bin/env bash
set -e

# 1. 安装 zsh
if command -v apt &>/dev/null; then
    sudo apt update && sudo apt install -y zsh curl git
elif command -v brew &>/dev/null; then
    brew install zsh
fi

# 2. 安装 Oh My Zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# 3. 安装 Powerlevel10k
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/themes/powerlevel10k

# 4. 安装插件
git clone --depth=1 https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
git clone --depth=1 https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# 5. 配置
sed -i 's/^ZSH_THEME=.*/ZSH_THEME="powerlevel10k\/powerlevel10k"/' ~/.zshrc
sed -i 's/^plugins=.*/plugins=(git zsh-autosuggestions zsh-syntax-highlighting)/' ~/.zshrc

echo "✅ 安装完成！请重启终端，然后运行 p10k configure 进行主题定制。"
```

运行：

```bash
curl -fsSL https://your-raw-url/install-zsh.sh | bash
```