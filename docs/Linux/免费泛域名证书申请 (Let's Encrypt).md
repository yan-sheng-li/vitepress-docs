# 免费泛域名证书申请 (Let's Encrypt)

## 1. 申请场景

需要为一个主域名及其所有子域名（如 `liyansheng.top` 和 `*.liyansheng.top`）配置 HTTPS 证书。

## 2. 手动申请方式 (适合初期，但无法自动续期)

- 安装 Certbot (以 Ubuntu/CentOS 为例)：`sudo apt/yum install certbot`
- 申请证书：
  ```bash
  sudo certbot certonly --manual --preferred-challenges dns -d "liyansheng.top" -d "*.liyansheng.top"
  ```
- 验证过程：
  1. Certbot 会提示在域名 DNS 管理后台添加 TXT 记录。
  2. 主机记录填 `_acme-challenge`，记录值为 Certbot 提供的一串字符。
  3. 注意：可能需要同时添加两条不同的 TXT 记录（相同主机名，不同值），这是正常的。
  4. 等待 DNS 解析生效（5-30分钟），用 `nslookup -type=TXT _acme-challenge.liyansheng.top 8.8.8.8` 验证。
  5. 验证通过后按 Enter，证书会生成在 `/etc/letsencrypt/live/liyansheng.top/` 目录下。
- 证书文件：
  - `fullchain.pem`：证书文件
  - `privkey.pem`：私钥文件
- 重要限制：此方式的证书不会自动续期，90 天后需重复手动操作。

## 3. 自动续期方式 (进阶配置，一劳永逸)

- 原理：使用 DNS 服务商的 API 密钥，让 Certbot 自动添加/删除验证用的 TXT 记录。
- 步骤：
  1. 在阿里云/腾讯云等控制台创建 RAM 子账号，获取 `AccessKey ID` 和 `Secret`，并授予 DNS 完全访问权限。
  2. 在服务器上安装 Certbot 及对应 DNS 插件（如 `certbot-dns-aliyun`）。
  3. 配置 API 密钥文件（如 `~/.aliyunkey.ini`），并设置权限 `600`。
  4. 使用插件命令申请证书（无需手动交互）。
  5. 配置 crontab 定时任务，实现自动续期。

## 4. Nginx 泛域名配置示例

```nginx
# HTTP 重定向到 HTTPS
server {
    listen 80;
    server_name ~^(?<subdomain>.+)\.liyansheng\.top$;
    return 301 https://$host$request_uri;
}

# HTTPS 泛域名配置
server {
    listen 443 ssl http2;
    server_name ~^(?<subdomain>.+)\.liyansheng\.top$;
    ssl_certificate /etc/letsencrypt/live/liyansheng.top/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/liyansheng.top/privkey.pem;
    root /data/nginx/html/$subdomain; # 自动映射子域名到对应目录
    index index.html;

    location / {
        try_files $uri $uri/ /index.html; # SPA 路由支持
    }
}
```
- 部署映射：当 CLI 工具将文件上传至 `/data/nginx/html/blog` 时，访问 `https://blog.liyansheng.top` 即可自动生效。