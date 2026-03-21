# Mac安装 MySQL 

在 Mac 上安装 `手动`MySQL 

## ① 去官网下载

打开：
👉 https://dev.mysql.com/downloads/mysql/

选择：

- macOS
- DMG 安装包

------

## ② 安装步骤

一路点击：

- Next
- Install

安装完成后：

- 系统会给你一个 **临时 root 密码（一定记住）**

------

## ③ 启动 MySQL

系统偏好设置里会出现：
👉 MySQL 控制面板
可以直接点击启动/停止

------

## ④ 修改密码

```bash
mysql -u root -p
```

输入临时密码后：

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY '你的新密码';
```

------

## 🔥 常见问题（很重要）

## 1. 命令找不到 mysql

```bash
mysql: command not found
```

👉 解决：

根据实际路径填写

```bash
echo 'export PATH="/opt/homebrew/opt/mysql/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

------

## 2. 端口冲突（默认 3306）

如果启动失败：

```bash
lsof -i :3306
```

------

