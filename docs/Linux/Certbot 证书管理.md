## Certbot 证书管理

### 1. Certbot 是什么？
- 免费开源工具，用于自动化申请和管理 SSL/TLS 证书（主要来自 Let's Encrypt）
- 核心功能：自动申请 + 自动续期，为网站启用 HTTPS

### 2. 证书类型与续期方式

| 类型                             | 验证方式            | 自动续期          | 是否需要云厂商子账号 |
| :------------------------------- | :------------------ | :---------------- | :------------------- |
| **单域名**（如 `example.com`）   | HTTP 验证（80端口） | ✅ 自动，无需操作  | ❌ 不需要             |
| **泛域名**（如 `*.example.com`） | DNS 验证（TXT记录） | ⚠️ 需配置 API 密钥 | ✅ 需要（或手动续期） |

### 3. 泛域名证书的手动续期
如果不想配置子账号，可以手动续期（每 90 天一次）：
```bash
sudo certbot renew --manual          # 正常续期
sudo certbot renew --manual --force-renewal   # 强制刷新（未到期时用）
```
- 需要登录域名控制台，为 `_acme-challenge.你的域名` 添加 TXT 记录
- 等待 DNS 生效后按回车确认

### 4. 强制刷新证书（覆盖）
- 命令：`sudo certbot --force-renewal -d 主域名 -d *.泛域名`
- **注意**：必须用 `-d` 重新指定所有域名，否则会丢失
- 频率限制：Let's Encrypt 每周每域名最多 5 次

### 5. 证书文件位置
- 当前证书：`/etc/letsencrypt/live/你的域名/`
  - `fullchain.pem` → 证书文件（配置 `ssl_certificate`）
  - `privkey.pem` → 私钥文件（配置 `ssl_certificate_key`）
- 历史版本：`/etc/letsencrypt/archive/`
- 日志文件：`/var/log/letsencrypt/`

### 6. 常用管理命令
```bash
# 查看所有证书信息
sudo certbot certificates

# 列出已申请的域名
sudo ls /etc/letsencrypt/live/

# 验证私钥和证书是否匹配
sudo openssl rsa -noout -modulus -in privkey.pem | openssl md5
sudo openssl x509 -noout -modulus -in cert.pem | openssl md5

# 查看证书包含的域名
sudo openssl x509 -noout -text -in cert.pem | grep -A 1 "Subject Alternative Name"
```

### 7. 核心提醒
- **不要手动移动或复制** `/etc/letsencrypt/live/` 下的文件，续期时软链接会自动更新
- 泛域名证书配置自动续期需创建子账号并赋予 **DNS 管理权限**（最小权限原则）
- 服务器凭证文件应设为 `600` 权限：`sudo chmod 600 /etc/letsencrypt/credentials/xxx.ini`
- 自动续期依赖 80/443 端口可访问 + 服务器时间准确
