# tldr命令行极简说明书

### 1. 为什么需要 tldr？

在 Linux 里，传统的 `man` 命令（Manual pages）虽然权威，但太像“法律条文”了——内容多、废话长、找个示例得翻好几屏。

**tldr** 的全称是 *Too Long; Didn't Read*（太长不看）。它的核心理念是：**不废话，只给最常用的命令示例。**

------

### 2. 安装（继续贯彻 pipx 隔离理念）

虽然 `apt` 也能装，但为了保持环境纯净和版本最新，我们依然用 `pipx`：

```Bash
pipx install tldr
```

**初始化（重要）：**

安装完后，需要下载最新的命令缓存（第一次可能稍慢）：

```
tldr --update
```

------

### 3. 实战场景：当你在开发中“断片”时

作为全栈开发，有些命令一个月才用一次，最容易忘。这时候 tldr 就救命了：

#### 场景 A：想压缩/解压文件，但记不住 `tar` 的参数

```
tldr tar
```

它会直接告诉你：

- `tar -cf target.tar source` (压缩)

- `tar -xf source.tar` (解压)

  没有那些深奥的原理，只有直接能用的命令。

#### 场景 B：忘了怎么用 `find` 找特定的 Java 文件

```
tldr find
```

它会列出：

- 按扩展名找：`find . -name "*.java"`
- 按目录找：`find . -type d -name "src"`

#### 场景 C：想看 `lsof` 怎么查端口占用（Spring Boot 启动报错端口被占时）

```
tldr lsof
```

直接给示例：`lsof -i :8888`

------

### 4. 进阶：配置中文支持

既然你偏好简体中文，`tldr` 是支持中文页面的，可以让它首选中文输出。

1. **临时查看中文**：

   ```
   tldr -L zh tar
   ```

2. **永久设置**：

   在你的 `~/.bashrc` 中添加环境变量：

   ```
   export TLDR_LANGUAGE="zh"
   ```

   然后执行 `source ~/.bashrc`。

