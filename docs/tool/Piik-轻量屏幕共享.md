# Piik：太方便了，给朋友分享屏幕，不用装任何东西

周末想和朋友一起看个电影、打游戏时直播一下，或者给同事看看你正在画的图——这类"小范围共享屏幕"的需求其实挺常见，但真做起来总有点别扭：微信视频糊得一塌糊涂，腾讯会议要开会话、拉人、共享，折腾半天，还有免费的商业软件动不动就限时长、加水印。

今天介绍一个开源项目 **Piik**，主打"给朋友分享好东西"这件事，思路很清爽。

![image-20260922170145400](http://cdn.qiniu.liyansheng.top/img/image-20260922170145400.png)

## 它是什么

Piik 是一个**免费、开源的屏幕共享工具**，定位很明确：

> 给朋友分享屏幕，不折腾。

核心特点一句话概括：**分享方选好要共享的内容，发个邀请链接，朋友在浏览器里直接看，不用装客户端。**

支持共享**屏幕、窗口、浏览器标签页、摄像头**（可用源和音频取决于平台），一个房间可以有一个分享者 + 最多 20 个观众。

![image-20260922170417717](http://cdn.qiniu.liyansheng.top/img/image-20260922170417717.png)

## 为什么值得一看

### 1. 观众不用装任何东西

这是它最大的亮点。朋友收到邀请链接后，**用桌面或手机浏览器打开就能看**，不用下载 App、不用注册账号。分享方需要装 Piik App（或者用在线版本共享），但看的人零门槛。

### 2. 优先 P2P 直连

媒体流**优先在参与者之间直连（P2P）**，不经过服务器中转，延迟低、画质好，服务器的带宽压力也小。如果网络环境太差（比如双方都在严格 NAT 后面），自建的服务端还能提供**自动 SFU 中转兜底**。

### 3. 房间由你控制

- 邀请链接、房间码、可选房间密码
- 一个房主 + 最多 20 个观众
- 房间邀请和加入权限由房主管理

### 4. 观看体验做得挺细

- 浅色/深色主题
- 播放控制
- 画中画（PiP）
- **连接拓扑视图**（能看到谁跟谁直连）
- 麦克风评论，可选输入设备、调音量

### 5. 一个程序就能自建站点

Piik Server 是一个**独立的 Linux x64 二进制程序**，把**网页界面、房间管理、可选的媒体转发**打包在一起，解压即可运行，房间数据存在 SQLite 里。想自己搭一个私有的屏幕共享站点，很轻松。

## 怎么用

| 场景           | 你需要做什么                                                 |
| -------------- | ------------------------------------------------------------ |
| **只想看**     | 打开朋友发来的邀请链接，画面没自动开始就点一下 Play          |
| **想分享**     | 下载 Piik App，或者用[在线版本](https://demo.piik.tv)直接开房 |
| **想自建站点** | 在 Linux x64 服务器上部署 Piik Server，配上自己的域名（进阶） |

下载时认准文件名前缀 `piik-app`，后缀对应平台：`windows-amd64`（Windows x64）、`darwin-arm64`（Apple 芯片，原生采集需 macOS 13+）、`linux-amd64`（Linux x64）。

> 小提示：浏览器采集需要 **HTTPS 或 localhost** 环境。目前 Windows App 和桌面浏览器共享是主要测试路径，macOS 和 Linux 的 App 还没在真机上测过，作者欢迎反馈。

## 技术底子

- **Go 后端 + TypeScript 前端**，统一运行时
- 屏幕共享基于 **WebRTC**，P2P 优先 + 可选 SFU 兜底
- 房间数据存 **SQLite**
- **MIT 协议**（Piik 自有代码），依赖保留各自许可

项目维护得挺活跃，最近还在加摄像头共享、房主麦克风控制等特性。

## 自己动手：部署一个 Piik 站点

如果你有一台 Linux 服务器，想搭个自己的屏幕共享站点（比如 `share.你的域名.top`），下面是完整流程。本文以 Docker + Nginx 为例。

### 前提

- Linux x64 服务器
- 已装 Docker Compose v2
- 已装 Nginx，且**有域名和 SSL 证书**
- 域名**直接解析到服务器公网 IP**（重要，后面说原因）

### 第一步：准备文件

```bash
mkdir -p /opt/piik && cd /opt/piik
curl -fsSLo compose.yaml https://raw.githubusercontent.com/TNTcraftHIM/Piik/main/deploy/container/compose.yaml
curl -fsSLo .env https://raw.githubusercontent.com/TNTcraftHIM/Piik/main/deploy/container/.env.example
```

### 第二步：配置 `.env`

把域名换成你自己的：

```bash
PIIK_ENV=production
LISTEN_HOST=127.0.0.1
PUBLIC_BASE_URL=https://share.你的域名.top
STUN_URLS=stun:share.你的域名.top:3478
MAX_VIEWERS_PER_ROOM=20
SITE_ACCESS_PASSWORD=
```

几个关键点：

- `LISTEN_HOST=127.0.0.1`：只监听本机，由 Nginx 反代，**别改成 0.0.0.0**，否则 8787 会暴露到公网
- `STUN_URLS` 用你的域名 + 3478，所以这个域名必须**直接解析到服务器公网 IP**
- `MAX_VIEWERS_PER_ROOM`：每房观众上限（1~20，不含房主）
- `SITE_ACCESS_PASSWORD` 留空则进站无需口令；想设就填上
- 想启用 SFU 兜底，再加 `SFU_UDP_PORT=7882`（服务器在 NAT 后还要设 `SFU_PUBLIC_IP`）

### 第三步：启动 Piik

```bash
docker compose run --rm piik --check-config
docker compose up -d
```

镜像 `ghcr.io/tntcrafthim/piik:latest` 已包含网页、信令、STUN 和可选 SFU。**`piik-data` 数据卷别删**，房间数据都在里面。

### 第四步：配置 Nginx

在你现有的 Nginx 配置里加一个 server 块。**关键是 WebSocket 支持**：

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name share.你的域名.top;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name share.你的域名.top;

    ssl_certificate     /usr/local/nginx/cert/fullchain.pem;
    ssl_certificate_key /usr/local/nginx/cert/fullchain-key.pem;
    ssl_session_cache   shared:SSL:1m;
    ssl_session_timeout 10m;
    ssl_ciphers         PROFILE=SYSTEM;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://127.0.0.1:8787;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 3600s;
        proxy_send_timeout 3600s;
    }
}
```

改完测试并重载：

```bash
nginx -t && nginx -s reload
```

> 两个常见的 Nginx 报错提醒：
> 1. **`duplicate listen 443`**：同一个 server 块里写了两次 `listen 443`，只留一行 `listen 443 ssl http2;` 即可
> 2. **`shared memory zone "SSL" conflicts`**：`ssl_session_cache` 大小和全局不一致，统一改成 `shared:SSL:1m`

### 第五步：放行端口

在**系统防火墙**和**云平台安全组**两处都放行：

| 端口     | 协议    | 用途                   |
| -------- | ------- | ---------------------- |
| 80       | TCP     | HTTP 跳转 / 证书续期   |
| 443      | TCP     | HTTPS 入口             |
| **3478** | **UDP** | **STUN（必须，别漏）** |
| 7882     | UDP     | SFU 兜底（可选）       |

**8787 不用对外放行**，只给本机 Nginx 访问。

### 第六步：验证

```bash
curl https://share.你的域名.top/healthz
# 应返回 {"status":"ok"}
```

然后用两台不同网络的设备实测：A 开房分享，B 加入看画面，能通就说明 P2P 链路正常。

## 两个关键坑

**1. UDP 必须放，不能只放 TCP**
STUN（3478/UDP）和 SFU（7882/UDP）都走 UDP。只放 TCP 的话，P2P 打洞会失败。

**2. STUN 域名要直接解析到服务器公网 IP**
不能只经过 CDN 的 HTTP 代理。CDN 一般只代理 TCP 的 80/443，UDP 3478 过不去，STUN 就废了。

## 维护

- **更新**：停服务 → 备份 `rooms.sqlite` → 拉新镜像 → 启动 → 查 `/healthz`
- **启用 SFU 后**：房主分享前要**关闭隐私模式**才会走 SFU 线路

## 最后

Piik 把"给朋友分享屏幕"这件事做得足够简单：分享方选内容发链接，观看方浏览器直接看，不用装、不用注册。对想要私有部署的人来说，一个二进制程序 + 一个域名就能拥有自己的屏幕共享站点，数据全在自己手里，这点很舒服。

项目地址：**https://github.com/TNTcraftHIM/Piik**
官网：https://piik.tv ｜ 在线体验：https://demo.piik.tv

