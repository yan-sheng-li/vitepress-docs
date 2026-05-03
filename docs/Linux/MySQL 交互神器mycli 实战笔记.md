# MySQL 交互神器 mycli 实战笔记

> 📊 告别黑白终端

### 💡 为什么需要 mycli？

原生的 MySQL 客户端就像在记事本里写代码，而 **mycli** 就像是给数据库装上了 **IDE**。它支持：

- **智能补全**：自动提示关键字、表名、字段名。
- **语法高亮**：SQL 不再是一坨白字。
- **排版美化**：自动处理超宽表格。

------

### 🛠 安装篇：依然首选隔离环境

由于 mycli 依赖较多 Python 库，为了避免和系统环境打架，继续使用 `pipx` 安装：

```Bash
# 1. 隔离安装
pipx install mycli

# 2. (可选) 如果需要连接加密方式较旧的数据库，可能需要加额外依赖
# pipx inject mycli cryptography
```

------

### 🚀 核心秘籍：提效进阶技巧

#### 1. 垂直显示 (最实用！)

当你的表字段太多（比如 Spring Boot 常见的 `sys_user` 表有 20 多个字段），屏幕横向显示会乱成一团。

- **操作**：在 SQL 结尾加 `\G` 或者在结果出来后按 **`F3`**。
- **效果**：每一行数据都会以“字段: 值”的垂直列表显示，看数据清爽无比。

#### 2. SQL 收藏夹 (拯救健忘症)

有些复杂的统计 SQL 记不住？

- **保存**：执行 `\fs 别名 你的复杂SQL`
- **调用**：执行 `\f 别名` 即可再次运行。

#### 3. 配置文件定制化 (`~/.myclirc`)

建议修改以下几项，让它更符合你的习惯：

Ini, TOML

```
# 修改配置文件
nano ~/.myclirc

# 建议配置：
multi_line = True         # 开启多行模式（按分号才执行）
syntax_style = paraiso-dark # 换个酷炫的主题
smart_completion = True   # 开启智能补全
```

------

### 🧪 Spring Boot 开发实战场景

在开发你的 `fast-web-tmp` 项目时，可以这样配合：

- **数据校验**：

  用 HTTPie 发送 POST 请求后，顺手在 mycli 里：

  `SELECT * FROM users ORDER BY create_time DESC LIMIT 1;`

  确认数据是否按预期落库。

- **结构变更**：

  直接在 mycli 里敲 `ALTER TABLE`，补全功能会帮你快速定位那些记不清拼写的字段名。

- **采纳整行提示**：

  **方向右键 (`→`)**：这是最常用的方法。按一下右箭头，整行灰色文字就会变成实体文字。

  **`Ctrl + E`**：这也是 Unix 终端常用的快捷键，意为“移动到行尾”，在 `mycli` 中同样可以采纳建议。

  

------

### ⚠️ 避坑提醒

1. **认证报错**：如果遇到 `Authentication plugin 'caching_sha2_password' cannot be loaded`，这是 MySQL 8.0 的默认认证问题。
   - **解决**：登录 MySQL 后执行 `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '你的密码';`。
2. **路径缓存**：如果你之前装过旧版，记得还是那招：`hash -d mycli`。



