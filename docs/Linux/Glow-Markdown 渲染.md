# Glow-Markdown 渲染

## 1. 简介

Glow 是一个命令行 Markdown 渲染工具，能在终端中优雅地显示 Markdown 文件，支持语法高亮、表格渲染、主题切换等功能。

## 2. 安装方法

### 2.1 Debian / Ubuntu

添加官方软件源并安装：

```bash
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://repo.charm.sh/apt/gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/charm.gpg
echo "deb [signed-by=/etc/apt/keyrings/charm.gpg] https://repo.charm.sh/apt/ * *" | sudo tee /etc/apt/sources.list.d/charm.list
sudo apt update
sudo apt install glow
```

### 2.2 Arch Linux

```bash
sudo pacman -S glow
```

### 2.3 Fedora / RHEL

```bash
echo '[charm]
name=charm
baseurl=https://repo.charm.sh/yum/
enabled=1
gpgcheck=0' | sudo tee /etc/yum.repos.d/charm.repo
sudo yum install glow
```

### 2.4 其他方式

**使用 Snap：**

```bash
sudo snap install glow
```

**使用 Homebrew：**

```bash
brew install glow
```

**从源码安装：**

```bash
go install github.com/charmbracelet/glow/v2@latest
```

### 2.5 验证安装

```bash
glow --version
```

## 3. 基础使用

### 3.1 渲染单个文件

```bash
glow README.md
glow /path/to/document.md
```

### 3.2 交互式 TUI 模式

```bash
glow                    # 浏览当前目录
glow ~/Documents/notes/ # 浏览指定目录
```

交互界面操作说明：

| 按键 | 功能 |
| :--- | :--- |
| 上下箭头 或 j/k | 移动光标 |
| 回车 | 打开选中文件 |
| / | 搜索 |
| q | 退出 |
| ? | 查看帮助 |

### 3.3 从标准输入读取

```bash
cat README.md | glow
echo "# 标题\n\n这是**粗体**文本" | glow
```

### 3.4 渲染远程文件

```bash
glow https://raw.githubusercontent.com/charmbracelet/glow/main/README.md
glow github.com/charmbracelet/glow
```

## 4. 进阶功能

### 4.1 切换主题

```bash
glow -s dark README.md   # 暗色主题（默认）
glow -s light README.md  # 亮色主题
```

### 4.2 分页控制

```bash
glow -p README.md        # 不分页，直接输出全部内容
```

### 4.3 显示行号

```bash
glow -n README.md
```

### 4.4 自定义样式

创建配置文件 `~/.config/glow/glow.yml`：

```yaml
style: dark
line-numbers: true
```

### 4.5 其他常用选项

```bash
glow --help   # 查看帮助
glow --version# 查看版本
glow -l       # 列出所有主题
```

## 5. 实用技巧

### 5.1 设置命令别名

在 `~/.bashrc` 或 `~/.zshrc` 中添加：

```bash
alias md='glow'
alias mdls='glow -p'
```

重新加载配置：

```bash
source ~/.bashrc
```

### 5.2 配合 find 命令使用

```bash
# 查找并渲染所有 Markdown 文件
find . -name "*.md" -exec glow {} \;

# 配合 fzf 实现模糊查找
find . -name "*.md" | fzf | xargs glow
```

### 5.3 创建快捷脚本

创建 `~/bin/mdview`：

```bash
#!/bin/bash
if [ -z "$1" ]; then
    echo "用法: mdview <markdown文件>"
    exit 1
fi
if [ -f "$1" ]; then
    glow -s dark -p "$1"
else
    echo "文件不存在: $1"
    exit 1
fi
```

赋予执行权限：

```bash
chmod +x ~/bin/mdview
```

## 6. 常见问题

### 6.1 中文显示乱码

确保终端支持 UTF-8 编码：

```bash
export LANG=zh_CN.UTF-8
export LC_ALL=zh_CN.UTF-8
```

### 6.2 图片无法显示

Glow 默认不显示图片，只显示图片的 alt 文本。在 TUI 模式下可按 `i` 键尝试渲染图片，但支持有限。

### 6.3 卸载 Glow

**Debian / Ubuntu：**

```bash
sudo apt remove glow
```

**Arch Linux：**

```bash
sudo pacman -Rs glow
```

**Snap：**

```bash
sudo snap remove glow
```

## 7. 参考资源

- 官方 GitHub：[github.com/charmbracelet/glow](https://github.com/charmbracelet/glow)
- 官方文档：[charm.sh](https://charm.sh/)

## 8. 总结

Glow 让终端不再是 Markdown 的阅读盲区，它简洁高效，特别适合以下场景：

- 在服务器上快速查看文档
- Git 仓库的 README 预览
- 笔记管理系统的终端界面
- CI/CD 流水线中的文档渲染

核心优势是无需离开终端即可获得良好的 Markdown 阅读体验。