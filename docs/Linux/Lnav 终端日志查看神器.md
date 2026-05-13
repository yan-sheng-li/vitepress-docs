# Lnav：终端日志查看神器

**Lnav**（Log File Navigator）是一款高级日志文件查看器，专为处理海量日志而设计。它能同时打开多个日志文件、语法高亮、自动解析、SQL 查询，让你在终端里像用数据库一样分析日志。

------

## 1. 为什么需要 Lnav？

日常开发中，日志分析是刚需。你可能在这些场景里挣扎过：

- `tail -f` 盯着滚动的日志，眼睛都快瞎了
- `grep` 搜日志，条件一复杂就要写一堆管道
- 多个服务的日志分散在不同文件，想关联分析却没法一起看
- 日志格式不统一，手动解析耗时费力

Lnav 解决这些问题：**一个工具，搞定所有日志痛点**。

- **多文件同时查看**：一次打开多个日志，并排显示时间线
- **自动格式解析**：识别 Apache、Nginx、Syslog、JSON 等常见格式
- **SQL 查询日志**：用 SQL 语句过滤和统计日志
- **实时监控**：类似 `tail -f`，但带搜索和高亮
- **时间线视图**：多文件时间对齐，一眼看出关联

------

## 2. 安装

### 2.1 Linux

#### 方式一：包管理器（推荐）

```bash
# Ubuntu / Debian
sudo apt install lnav

# Fedora
sudo dnf install lnav

# Arch Linux
sudo pacman -S lnav

# RHEL / CentOS
sudo yum install lnav
```

#### 方式二：二进制下载

```bash
# 下载最新版
LNAV_VERSION=$(curl -s https://api.github.com/repos/tstack/lnav/releases/latest | grep -o '"tag_name": "v[^"]*' | cut -d'"' -f4)
curl -Lo lnav "https://github.com/tstack/lnav/releases/download/${LNAV_VERSION}/lnav-${LNAV_VERSION}-linux-x86_64.zip"
unzip lnav-${LNAV_VERSION}-linux-x86_64.zip
sudo mv lnav-${LNAV_VERSION}-linux-x86_64/lnav /usr/local/bin/
rm -rf lnav-${LNAV_VERSION}-linux-x86_64*
```

#### 方式三：Homebrew（Linux 也支持）

```bash
brew install lnav
```

### 2.2 macOS

```bash
brew install lnav
```

### 2.3 源码编译

需要 CMake 和 C++ 编译器：

```bash
git clone https://github.com/tstack/lnav.git
cd lnav
mkdir build && cd build
cmake .. -DCMAKE_BUILD_TYPE=Release
make -j$(nproc)
sudo make install
```

### 2.4 验证安装

```bash
lnav --version
# lnav v0.12.0
```

### 2.5 升级

```bash
# 重新安装或用包管理器
sudo apt upgrade lnav
```

------

## 3. 快速上手

### 3.1 基本用法

```bash
# 查看单个日志文件
lnav /var/log/syslog

# 同时查看多个文件
lnav /var/log/syslog /var/log/nginx/access.log

# 查看压缩日志（自动解压缩）
lnav /var/log/nginx/error.log.gz

# 实时监控（类似 tail -f）
lnav -f /var/log/nginx/access.log
```

### 3.2 界面概览

```
┌─ lnav ─────────────────────────────────────────────────────────────┐
│ 2024-12-25 10:30:45  [www] nginx access log                        │
├─ log ─────────────────────────────────────────────────────────────┤
│ 10:30:45  GET /api/users 200 12ms  192.168.1.1                    │
│ 10:30:46  POST /api/login 200 45ms  192.168.1.2                   │
│ 10:30:47  GET /api/products 404 5ms  192.168.1.3                   │
│ 10:30:48  GET /health 200 1ms  192.168.1.1                        │
├─ status ──────────────────────────────────────────────────────────┤
│ [SYSLOG] [NGINX]              1/50000 lines | 10:30:48            │
└────────────────────────────────────────────────────────────────────┘
```

### 3.3 基础导航

| 按键 | 功能 |
|:---|:---|
| `j` / `k` | 上/下滚动 |
| `g` / `G` | 跳到文件开头/结尾 |
| `↑` / `↓` | 上一条/下一条日志 |
| `Space` | 下一页 |
| `b` | 上一页 |
| `/` | 向前搜索 |
| `?` | 向后搜索 |
| `n` | 下一个搜索结果 |
| `N` | 上一个搜索结果 |

------

## 4. 核心功能

### 4.1 多文件时间线

Lnav 最大的亮点：**同时分析多个日志文件**，按时间线合并显示。

```bash
# 同时打开多个服务的日志
lnav /var/log/app/error.log /var/log/nginx/access.log /var/log/mysql/error.log
```

界面会显示：

```
┌─ 时间线视图 ─────────────────────────────────────────────────────┐
│ | 10:30:45 [APP] ERROR: Connection failed                        │
│ | 10:30:46 [NGINX] GET /api/users 200                            │
│ | 10:30:47 [MYSQL] ERROR 1045: Access denied                     │
│ | 10:30:48 [APP] WARN: Retrying connection...                     │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 SQL 查询日志

这是 Lnav 最强大的功能：**用 SQL 分析日志**。

按 `;` 打开 SQL 提示符：

```sql
-- 查看所有 404 错误
SELECT * FROM nginx_access WHERE status = 404;

-- 统计每分钟的请求数
SELECT
    date_time,
    COUNT(*) as count
FROM nginx_access
GROUP BY date_time
ORDER BY count DESC;

-- 找出最慢的请求
SELECT
    path,
    time_ms
FROM nginx_access
ORDER BY time_ms DESC
LIMIT 10;

-- 统计错误日志最多的文件
SELECT
    log_artifact,
    COUNT(*) as errors
FROM syslog_log
WHERE log_level = 'ERROR'
GROUP BY log_artifact
ORDER BY errors DESC;

-- 查找 IP 地址出现次数
SELECT
    log_artifact,
    COUNT(DISTINCT ip) as unique_ips
FROM access_log
GROUP BY log_artifact;
```

### 4.3 过滤器

#### 正则过滤

按 `f` 打开过滤器：

```
/error|warn/i    # 显示包含 error 或 warn 的行（忽略大小写）
```

#### 排除过滤

在过滤器前加 `-`：

```
-/DEBUG            # 排除所有 DEBUG 日志
```

#### 按时间过滤

```bash
# 只显示最近 10 分钟的日志
lnav -f access.log -t "10m"

# 只显示今天 10:00 到 11:00 的日志
lnav -f access.log -t "10:00-11:00"
```

### 4.4 搜索与高亮

| 按键 | 功能 |
|:---|:---|
| `/` | 搜索 |
| `?` | 反向搜索 |
| `n` | 下一个匹配 |
| `N` | 上一个匹配 |
| `Ctrl+z` | 清除搜索高亮 |

自动高亮规则：

- **ERROR、FATAL**：红色
- **WARN**：黄色
- **DEBUG**：灰色
- **IP地址**：青色
- **URL**：蓝色带下划线

### 4.5 书签与标注

| 按键 | 功能 |
|:---|:---|
| `m` | 标记当前行 |
| `M` | 清除所有书签 |
| `'0` - `'9` | 跳转到对应书签 |

按 `c` 添加注释：

```bash
# 按 c 后输入注释内容
# 这个错误需要跟进处理 - 已联系运维
```

### 4.6 实时监控

```bash
# 监控新日志
lnav -f /var/log/nginx/access.log

# 退出实时模式
# 按 q
```

------

## 5. 内置日志格式

Lnav 自动识别以下格式：

| 格式 | 说明 |
|:---|:---|
| Apache Common/Combined | Web 服务器日志 |
| Nginx | 反向代理日志 |
| Syslog | 系统日志 |
| JSON | 结构化日志 |
| Python traceback | Python 异常 |
| Java stacktrace | Java 异常 |
| Linux kernel messages | 内核日志 |
| Strace | 系统调用追踪 |
| CUPS | 打印机日志 |

### 5.1 自定义格式

创建格式文件：

```bash
# ~/.config/lnav/formats/custom/myapp.yml
myapp_log:
  regex: ^(?<timestamp>\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) \[(?<level>\w+)\] (?<message>.*)$
  timestamp-format: "%Y-%m-%d %H:%M:%S"
  only-matching: true
  level: debug
```

------

## 6. 配置与自定义

### 6.1 配置文件

```bash
~/.config/lnav/lnav.conf
```

### 6.2 常用配置

```ini
# ~/.config/lnav/lnav.conf

# 启用鼠标支持
ui.mousemode = true

# 语法高亮主题（default、solarized、monokai）
ui.theme = "solarized"

# 状态栏显示时间格式
ui.timezone = "local"

# 日志文件编码
ui.utf8 = true

# 自动关闭隐藏文件的提示
ui.hide-empty-minimap = true

# 搜索时忽略大小写
ui.search_case_sensitivity = false

# 滚动时显示百分比
ui.scroll_index = true

# 每个视图的默认过滤器
[views]
syslog = { hide_levels = "DEBUG" }
nginx = { hide_levels = "INFO" }
```

### 6.3 高亮规则配置

```ini
# 添加自定义高亮
[highlight]
browsers = "(firefox|chrome|safari)";

[highlight :red]
error = "error|fail|exception";
warning = "warn(ing)?";
```

### 6.4 命令行参数

| 参数 | 功能 |
|:---|:---|
| `lnav -h` | 帮助 |
| `lnav -V` | 版本 |
| `lnav -f <file>` | 实时监控文件 |
| `lnav -t` | 显示时间戳 |
| `lnav -c <cmd>` | 启动后执行命令 |
| `lnav -w <dir>` | 导出文件到目录 |
| `lnav -i <fmt>` | 忽略特定格式 |

```bash
# 监控并自动执行 SQL
lnav /var/log/app.log -c ";SELECT * FROM app_log WHERE level = 'ERROR' LIMIT 10"

# 导出过滤后的日志
lnav /var/log/app.log -c "/error" -w ./filtered_logs
```

------

## 7. 进阶技巧

### 7.1 日志分析实战

#### 分析 Nginx 访问日志

```bash
# 打开日志
lnav /var/log/nginx/access.log

# 按 ; 进入 SQL 模式
```

```sql
-- 1. 查看 TOP 10 慢请求
SELECT path, request_time, status
FROM nginx_access
WHERE request_time > 1
ORDER BY request_time DESC
LIMIT 10;

-- 2. 统计 HTTP 状态码分布
SELECT status, COUNT(*) as count
FROM nginx_access
GROUP BY status;

-- 3. 找出异常 IP（请求数超过 100）
SELECT remote_host, COUNT(*) as requests
FROM nginx_access
GROUP BY remote_host
HAVING requests > 100
ORDER BY requests DESC;

-- 4. 分析用户行为路径
SELECT path, COUNT(*) as hits
FROM nginx_access
WHERE path LIKE '/api/%'
GROUP BY path
ORDER BY hits DESC;
```

#### 分析 Java 应用日志

```bash
# 同时查看多个服务的日志
lnav /var/log/app1/error.log /var/log/app2/error.log

# SQL 过滤
```

```sql
-- 查找所有异常
SELECT log_time, message
FROM app_log
WHERE message LIKE '%Exception%'
   OR message LIKE '%ERROR%';

-- 统计每小时错误数
SELECT
    strftime('%Y-%m-%d %H:00', log_time) as hour,
    COUNT(*) as errors
FROM app_log
WHERE message LIKE '%ERROR%'
GROUP BY hour
ORDER BY hour DESC;
```

### 7.2 与其他工具联动

#### 配合 grep

```bash
# 先用 grep 预处理
grep "ERROR" /var/log/app.log | lnav

# 或者管道输入
cat /var/log/app.log | grep -E "error|warn" | lnav
```

#### 配合 journalctl

```bash
# 查看 systemd 日志
journalctl -f | lnav
```

#### 配合 remote syslog

```bash
# 监控远程日志
lnav -r tcp://192.168.1.100:514
```

### 7.3 快捷键速查

| 按键 | 功能 |
|:---|:---|
| `q` | 退出 |
| `j` / `k` | 上/下滚动 |
| `g` / `G` | 文件头/尾 |
| `/` | 搜索 |
| `?` | 反向搜索 |
| `n` | 下一个匹配 |
| `N` | 上一个匹配 |
| `f` | 打开过滤器 |
| `;` | SQL 查询 |
| `Space` | 下一页 |
| `b` | 上一页 |
| `m` | 书签 |
| `c` | 添加注释 |
| `o` | 打开文件 |
| `Ctrl+g` | 跳到指定行 |
| `Ctrl+r` | 清屏 |
| `t` | 时间线视图 |
| `1-9` | 切换视图 |

### 7.4 SQL 函数速查

```sql
-- 常用函数
regexp_capture(message, 'pattern')  -- 正则提取
strftime('%Y-%m-%d', col)          -- 时间格式化
sum(col)                           -- 求和
avg(col)                           -- 平均
min(col) / max(col)                -- 最值

-- 过滤条件
WHERE log_level IN ('ERROR', 'FATAL')
WHERE message LIKE '%pattern%'
WHERE log_time BETWEEN '2024-01-01' AND '2024-01-02'
```

------

## 8. 常见问题

### Q：日志不显示高亮？

A：Lnav 需要识别日志格式。检查文件扩展名或手动指定：

```bash
lnav -i syslog /var/log/messages
```

### Q：SQL 查询报错？

A：确保进入 SQL 模式（按 `;`），并且日志格式被识别：

```sql
-- 先查看可用表
SELECT * FROM sqlite_master;

-- 查看日志结构
.schema nginx_access
```

### Q：中文显示乱码？

A：确保终端编码为 UTF-8：

```bash
export LC_ALL=en_US.UTF-8
lnav /var/log/app.log
```

### Q：文件太大加载慢？

A：Lnav 会自动索引。首次加载需要时间，后续会快：

```bash
# 限制加载行数
lnav -n 10000 /var/log/large.log
```

### Q：如何只看新的日志？

```bash
# 实时监控模式
lnav -f /var/log/app.log
```

------

## 9. 资源链接

- 官网：https://lnav.org
- GitHub：https://github.com/tstack/lnav
- 官方文档：https://docs.lnav.org/
- 日志格式参考：https://docs.lnav.org/en/formats.html