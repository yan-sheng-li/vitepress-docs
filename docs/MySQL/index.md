![](http://cdn.qiniu.liyansheng.top/img/20240715125411.png)


## 数据库脚本兼容

> 高版本=》低版本

## 要点

- MySQL 5 不支持 `utf8mb4` 排序规则，可以使用 `utf8` 和 `utf8_general_ci` 排序规则。
- `bit(1)` 类型在 MySQL 5 中处理时可能会产生不兼容的错误。建议将其替换为 `TINYINT(1)` 类型。
- MySQL 5 不支持 `datetime` 类型的默认值为 `NULL` 或其他时间类型的默认值。虽然它是支持的，但是与新版本的行为略有不同。确保没有冲突。

## 脚本调整

解决方案 1：将字符集改为 `utf8` 并使用 `utf8_general_ci`

解决方案 2：将字符集改为 `utf8mb4` 并使用 `utf8mb4_general_ci`

解决方案 3：如果想使用 `utf8mb4` 字符集

## 驱动下载

[mysql8](https://mvnrepository.com/artifact/com.mysql/mysql-connector-j)

[mysql5](https://mvnrepository.com/artifact/mysql/mysql-connector-java)

## JDBC乱码解决
在连接 MySQL 数据库时，可以通过在 JDBC URL 中添加字符集参数来设置字符集。对于你的连接 URL，可以在其末尾添加 characterEncoding=UTF-8 参数。

## window上设置免密登录

在 Windows 上，MySQL 客户端会按以下顺序查找配置文件：

1. `%WINDIR%\my.ini` （如 `C:\Windows\my.ini`）
2. `C:\my.ini`
3. **当前用户目录下的 `.my.ini`** （注意是 `.my.ini`，不是 `my.cnf`）
4. 命令行参数指定的 `--defaults-extra-file`

**最稳妥的做法**：在你的用户目录下创建 `.my.ini` 文件

```powershell
# 查看当前用户目录
echo $env:USERPROFILE
# 通常是 C:\Users\用户名
```

在该目录下创建文件 `C:\Users\用户名\.my.ini`，内容如下：

```ini
[client]
user=你的MySQL用户名
password=你的MySQL密码
host=127.0.0.1
port=3306
```

保存后，重新打开 PowerShell 终端，直接执行：

```powershell
mysql -e "select 1"
```