# fd：更现代的 `find`

有了 `bat` 替代 `cat`，你还需要 `fd` 替代 `find`。

- **优势**：默认忽略 `.git` 和 `target` 目录（这在 Maven 项目里太重要了！），搜索速度比原生 `find` 快得多。
- **联动**：它和 `fzf` 是天生一对，配置 `fzf` 使用 `fd` 作为后台，搜索文件时就再也不会搜出一堆 `target/classes` 下的垃圾文件了。
- **安装**：`sudo apt install fd-find` (别名设置参考 bat，也是 `alias fd='fdfind'`)。

以下是 `fd` 值得你深入配置和使用的几个核心维度：

### 1. 为什么它是“开发者友好”的？

原生的 `find` 默认会翻遍每一个角落，但在我们的日常开发中，很多目录是**完全不需要搜索**的。

- **智能忽略**：`fd` 默认会自动忽略 `.gitignore` 里的内容，并且自动跳过隐藏文件夹（如 `.git`）和特定的编译目录（如 `target/`）。
- **速度优势**：它是用 Rust 写的，支持并行搜索。在像 `tour-tide-plus` 这样拥有大量依赖和源码的项目中，它的响应几乎是瞬间的。
- **彩色输出**：它会根据文件类型自动上色（就像 `ls` 那样），一眼就能分清文件夹、脚本和配置文件。

------

### 2. 核心用法速览

安装好并设置完别名 `alias fd='fdfind'` 后，你可以尝试这些命令：

- **最简搜索**：`fd user`

  （搜索所有文件名包含 "user" 的文件，不需要像 `find` 那样写 `-name "*user*"`）

- **按扩展名搜**：`fd -e java`

  （只找 Java 文件）

- **执行命令（类似 -exec）**：`fd -e sql -x mycli <`

  （找到所有 SQL 文件并批量用 `mycli` 处理，语法比 `find` 的 `-exec ... {} \;` 简洁得多）

- **包含隐藏文件**：`fd -H config`

  （如果你想搜 `.env` 或者 `.rc` 这种隐藏文件，加个 `-H` 即可）

------

### 3. 【重点】与 fzf 的“王炸”联动

这是最能提升体验的一步。默认情况下，`fzf` 搜索文件时调用的是系统的 `find`，会把一堆 `.git` 或 `node_modules` 里的杂质搜出来。

你可以通过设置环境变量，让 `fzf` 底层改用 `fd`：

1. **打开配置**：`vim ~/.rc`

2. **加入以下配置**：

   ```
   # 让 fzf 默认使用 fd 进行搜索（忽略 gitignore 里的内容）
   export FZF_DEFAULT_COMMAND='fd --type f'
   # 当你在终端按 Ctrl+T 时，也使用 fd
   export FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"
   ```

3. **生效**：`source ~/.rc`

**效果：** 之后你按 `Ctrl+T` 找文件时，你会发现列表非常清爽，搜出来的全是你想改的代码，再也没有 `target/classes` 下面的那些干扰项了。

------

### 4. 关于安装的小细节

在 Ubuntu/Debian 上，包名是 `fd-find`，执行命令是 `fdfind`。

为了用起来更顺手，一定要在 `~/.rc` 里加这一行：

```
alias fd='fdfind'
```

