# ZestSend部署

## 一、项目简介

ZestSend 是一个基于 WebRTC 的开源工具，核心功能是**发一个链接，对方点开就能进行点对点语音通话或文件传输**。它使用端到端加密，数据不经过中心服务器，隐私性较好。

项目地址：https://github.com/RavelloH/ZestSend

![image-20260924003713588](http://cdn.qiniu.liyansheng.top/img/image-20260924003713588.png)

![image-20260924003848630](http://cdn.qiniu.liyansheng.top/img/image-20260924003848630.png)

![image-20260924003921507](http://cdn.qiniu.liyansheng.top/img/image-20260924003921507.png)

---

## 二、部署方案选择

| 方案 | 优点 | 缺点 | 适用场景 |
| --- | --- | --- | --- |
| **Cloudflare Worker** | 零运维、免费额度充足、部署简单 | 国内访问速度不稳定、`workers.dev` 被屏蔽 | 个人使用、能接受偶尔慢 |
| **自建服务器** | 国内访问稳定、完全可控 | 需要自己维护、`workerd` 对系统版本有要求 | 面向国内用户、追求稳定 |

**最终选择**：Cloudflare Worker + 自定义域名 `send.example.com`

---

## 三、部署过程回顾

### 1. 在 Cloudflare 部署 Worker

- Fork ZestSend 仓库到自己的 GitHub
- 在 Cloudflare Dashboard 创建 Worker，导入仓库
- 配置构建命令和部署命令
- 部署成功后获得 `zestsend.<你的子域>.workers.dev` 地址

### 2. 域名 NS 迁移到 Cloudflare

- 在原 DNS 服务商处，把 `example.com` 的 NS 服务器改为 Cloudflare 分配的两台 NS
- **注意**：迁移前需在 Cloudflare 补全所有原有 DNS 记录，否则相关服务会失联

### 3. 绑定自定义域名

- 在 Worker 设置里添加自定义域 `send.example.com`
- Cloudflare 自动创建 CNAME 记录并签发 SSL 证书

---

## 四、踩坑记录

### 坑 1：Nginx 泛域名规则导致 500

- **现象**：访问 `send.example.com` 返回 `500 Internal Server Error`，错误页显示 `nginx/1.20.1`
- **原因**：域名解析回源到了自己的服务器，被 Nginx 泛域名规则 `~^(?<subdomain>.+)\.example\.com$` 接住，去 `/www/send` 找文件失败
- **解决**：确保 Cloudflare DNS 里 `send` 记录指向 Worker，而非服务器 IP

### 坑 2：FlClash 代理导致 DNS 解析错误

- **现象**：代理开启时，访问返回 500，FlClash 显示 DIRECT 但依然无效
- **原因**：FlClash 的 FakeIP 模式 + DNS 接管，导致本机解析 `send.example.com` 时得到错误 IP，请求被导向服务器而非 Cloudflare
- **解决**：
  - 在 FlClash 的“附加规则”里添加 `DOMAIN-SUFFIX,send.example.com,DIRECT`
  - 打开“覆写 DNS”，默认域名服务器填 `1.1.1.1`，Fallback 填 `8.8.8.8`
  - 把 DNS 模式从 `FakeIP` 改为 `redir-host`（或把域名加入 FakeIP 过滤）
  - 保存后重启 FlClash 内核

### 坑 3：本机 DNS 缓存

- **现象**：公共 DNS 解析正确，但本机访问仍 500
- **解决**：`ipconfig /flushdns`，或手动改本机 DNS 为 `1.1.1.1`

---

## 五、关键命令

```powershell
# 清除本机 DNS 缓存
ipconfig /flushdns

# 用公共 DNS 查询解析结果
nslookup send.example.com 1.1.1.1

# 强制指定 IP 请求，绕过本机 DNS
curl.exe -I --resolve send.example.com:443:<Cloudflare_IP> https://send.example.com

# 直接请求，看响应头
curl.exe -I https://send.example.com
```

**成功标志**：返回 `server: cloudflare` 和 `307` 重定向，而不是 `nginx/1.20.1` 的 500。

---

## 六、后续可优化项

### 1. 配置 TURN 中继（可选）

- 位置：Cloudflare Dashboard → Realtime → TURN
- 作用：在双方都处于严格 NAT 环境时，通过中继保证通话连通
- 配置：生成凭证后，在 Worker 的 Settings → Variables and Secrets 添加 `TURN_ID` 和 `TURN_TOKEN`

### 2. 实际测试

- 找一位朋友，**不开代理**，用手机流量打开 `https://send.example.com`
- 验证页面能否正常加载、麦克风权限能否正常请求、通话能否建立

---

## 七、最终效果

- **访问地址**：`https://send.example.com`
- **无需科学上网**：国内用户可直接访问（速度取决于 Cloudflare 节点状况）
- **通话方式**：发链接给对方，对方点开即可通话
- **隐私性**：端到端加密，数据不经过中心服务器

---

## 八、经验总结

1. **DNS 是核心**：域名解析指向哪里，请求就去哪里。排查问题时，先用 `nslookup` 和 `curl` 确认解析和响应头。
2. **代理软件要配分流**：科学上网工具要正确配置直连规则，否则会干扰正常访问。
3. **Cloudflare 自定义域是解决国内访问的关键**：`workers.dev` 被屏蔽，但自定义域走的是 Cloudflare 边缘节点，国内可直接访问。
4. **耐心排查，逐层剥离**：从 Nginx → DNS → 代理 → 本机缓存，一层层排除，最终定位问题。

