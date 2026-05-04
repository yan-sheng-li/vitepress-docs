# bat插了翅膀的cat

**bat** 的定位是 *A cat clone with wings*（插了翅膀的 cat 复刻版）。

------

### 1. 为什么它是全栈开发者的心头好？

- **语法高亮**：它内置了对 Java, SQL, JSON, YAML, Python 等数百种语言的自动高亮。
- **Git 集成**：如果你的项目在 Git 管理下，`bat` 会在侧边栏显示 `+`, `-`, `~` 来告诉你哪些行是新加的、删除的或修改过的。
- **自动分页**：如果文件太长，它会自动调用 `less` 进行分页，不用担心大文件瞬间淹没你的终端。
- **显示不可见字符**：可以显示空格、制表符等（对排查 YAML 缩进错误极其有用）。

------

### 2. 安装（避坑说明）

在 Ubuntu/Debian 系统中，有一个小细节：

```
sudo apt update
sudo apt install bat
```

**⚠️ 注意：** 在 Ubuntu 上，由于软件包命名冲突，安装后的命令名可能是 `batcat` 而不是 `bat`。为了用起来顺手，建议在 `.rc` 里设置一个别名：

```
# 在 ~/.rc 末尾添加
alias bat='batcat'
source ~/.rc
```

------

### 3. 实战使用技巧

#### ① 基础查看（带高亮、带行号）

```
bat src/main/resources/application.yml
```

你会发现，原本灰蒙蒙的配置文件的缩进和键值对变得非常清晰。

#### ② 配合 HTTPie 调试接口

如果你想把接口返回的 JSON 存成文件再看，或者直接管道输出：

```
http :8888/api/users | bat -l json
```

*`-l json` 强制指定以 JSON 格式渲染高亮。*

#### ③ 配合 fzf 实现“真·神级预览”

这是最强联动方案。修改你的预览配置：

```
fzf --preview 'bat --style=numbers --color=always --line-range :500 {}'
```

这样你在 `fzf` 搜文件时，右侧会通过 `bat` 显示带行号、带高亮的文件内容，体验完全不输 IDEA 的文件搜索。

