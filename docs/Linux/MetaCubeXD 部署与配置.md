## MetaCubeXD 部署与配置

### 1. 项目地址与获取方式

- **官方 GitHub 仓库**：`https://github.com/MetaCubeX/metacubexd`
- **在线使用地址**：`https://metacubexd.pages.dev`

> 如需自定义或稳定访问，建议 **Fork 仓库** 并自行部署。

### 2. Fork 后只有 main 分支怎么办？

Fork 后默认只复制默认分支（main），而部署需要的是 `gh-pages` 分支（存放编译好的静态文件）。

#### 解决方法（推荐命令行方式）

```bash
git clone https://github.com/你的用户名/metacubexd.git
cd metacubexd
git remote add upstream https://github.com/MetaCubeX/metacubexd.git
git fetch upstream
git checkout -b gh-pages upstream/gh-pages
git push origin gh-pages
```

### 3. 在服务器上部署面板（轻量方案）

**需求**：将前端文件放在服务器上，避免 HTTPS 混合内容错误，减少资源消耗。

#### 方法一：Python 自带 HTTP 服务器（推荐，轻量）

```bash
# 进入面板文件目录
cd /path/to/metacubexd

# 启动服务（端口可自定义）
python3 -m http.server 9148
```

- **内存占用**：约 10-20MB
- **无日志刷屏**（默认只输出访问日志）

#### 方法二：Caddy（支持 HTTPS，自动证书）

```bash
caddy file-server --listen :9148 --browse
```

- **内存占用**：约 5-15MB
- **优点**：自动 HTTPS、HTTP/3，可同时作为反向代理

#### 方法三：miniserve（Rust 编写，极致轻量）

```bash
miniserve ./metacubexd --port 9148 --index index.html
```

- **内存占用**：约 2-5MB

> **注意**：若使用 `serve`（Node.js），内存占用约 60-80MB，可用 `-L` 关闭请求日志：`npx serve -p 9148 -L /path/to/metacubexd`

### 4. 配置 mihomo 后端

编辑 `config.yaml`：

```yaml
external-controller: 0.0.0.0:9148   # API 端口，注意开放防火墙
secret: "你的密码"                   # 设置访问密码
```

重启 mihomo：

```bash
sudo systemctl restart mihomo
```

### 5. 处理 HTTPS 混合内容问题

**问题**：面板通过 HTTPS 加载时，请求 HTTP 后端会被浏览器阻止。

**解决方案**（任选其一）：

#### 方案 A：让前后端同源（推荐内网使用）

- 面板和后端使用相同 IP 和端口（均为 HTTP）
- 访问地址：`http://你的IP:9148`

#### 方案 B：为 mihomo 开启原生 HTTPS

```yaml
external-controller-tls: 0.0.0.0:9149
tls:
  certificate: /path/to/cert.pem
  private-key: /path/to/private.key
```

#### 方案 C：使用 Nginx 反向代理（保持 HTTP 后端）

```nginx
location / {
    proxy_pass http://127.0.0.1:9148;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto https;
}
```

### 6. 面板访问与认证

- **访问地址**：`http://你的IP:端口` 或 `https://你的域名`
- **在面板设置中填写**：
  - `Endpoint URL`：后端 API 地址（如 `http://你的IP:9148`）
  - `Secret`：你在 `config.yaml` 中设置的密码

### 7. 常用命令速查

```bash
# Python 轻量服务器
python3 -m http.server 9148 --directory /path/to/metacubexd

# Caddy 文件服务器
caddy file-server --listen :9148 --browse

# 关闭 serve 的请求日志
npx serve -p 9148 -L /path/to/metacubexd
```

---

**核心思路总结**：将前端静态文件部署在服务器上，与后端 API 同源（同 IP 同端口），即可避免 HTTPS 混合内容错误，同时降低资源消耗。