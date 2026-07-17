# 9Router 配置 Google OIDC 单点登录（SSO）

## 1. 配置目标
为 9Router 仪表盘启用 Google OIDC 单点登录，用户可通过 Google 账号登录后台，同时保留 API 密钥用于模型调用。

---

## 2. Google Cloud Console 配置

**2.1 进入控制台**
- 访问 [Google Cloud Console](https://console.cloud.google.com/)
- 登录 Google 账号

**2.2 创建/选择项目**

- 点击顶部项目下拉菜单 → “新建项目”
- 命名项目（如 `9router-dashboard`）→ 点击“创建”
- 确保当前操作在该项目下进行

**2.3 配置 OAuth 同意屏幕**
- 左侧菜单：**APIs & Services** → **OAuth consent screen**
- User Type：选择 **External** → 点击“创建”
- 填写必填项：
  - **App name**：应用名称（显示给用户）
  - **User support email**：用户支持邮箱
  - **Developer contact information**：开发者联系邮箱
- Scopes 步骤：保持默认的 `openid`、`profile`、`email` → 保存并继续

**2.4 生成 OAuth 客户端 ID**
- 左侧菜单：**APIs & Services** → **Credentials**
- 点击 **+ CREATE CREDENTIALS** → **OAuth client ID**
- 配置项：
  - **Application type**：Web application
  - **Name**：客户端名称（如 `9router-dashboard-client`）
  - **Authorized JavaScript origins**：`https://your-domain.com`
  - **Authorized redirect URIs**：`https://your-domain.com/api/auth/oidc/callback`
- 点击 **Create**
- **立即复制并保存 Client ID 和 Client Secret**（Secret 不再显示）

> ⚠️ **重要**：回调地址必须与 9Router 配置界面中的 Redirect URI 完全一致，否则登录失败。

---

## 3. 9Router 配置界面填写

| 配置项 | 填写值 |
|--------|--------|
| **Auth Mode** | 按需选择（建议先选 `Both` 测试） |
| **Issuer URL** | `https://accounts.google.com` |
| **Client ID** | 从 Google Cloud Console 复制 |
| **Client Secret** | 从 Google Cloud Console 复制 |
| **Scopes** | `openid profile email` |
| **Login Button Label** | 自定义（如 `Sign in with Google`） |
| **Redirect URI** | `https://your-domain.com/api/auth/oidc/callback`（只读，由系统提供） |

---

## 4. 验证与保存
- 填写完成后，点击 **Test connection**
- 预期返回：
  ```
  Connection OK. Discovery loaded from https://accounts.google.com. Client secret validated too.
  ```
- 测试通过后，点击 **Save auth mode** 保存配置

---

## 5. 多项目复用建议
- **推荐做法**：在同一个 Google Cloud 项目下，为每个应用**创建新的 OAuth 客户端 ID**，而非共用同一个客户端
- 优点：共享 OAuth 同意屏幕配置，用户授权体验统一
- 操作为每个新应用重复 **步骤 2.4**，填入各自不同的 Redirect URI

---

## 6. 常见问题排查
| 问题 | 解决方案 |
|------|----------|
| **Discovery 加载失败** | 检查 Issuer URL 是否为 `https://accounts.google.com`（无多余斜杠） |
| **Client secret 验证失败** | 确认 Client ID 和 Secret 复制正确，无多余空格 |
| **登录后回调失败** | 检查 Google 侧 Redirect URI 是否与 9Router 配置**完全一致**（含路径和斜杠） |
| **配置生效慢** | Google 提示需 5 分钟到几小时，实际通常 1-2 分钟内生效 |

---

## 7. 安全提示
- Client Secret 为敏感信息，**只保存一次**，丢失需重新生成
- 生产环境建议使用 **HTTPS** 协议
- 测试完成后，可根据需要将 Auth Mode 从 `Both` 切换为 `OIDC only`（确保 OIDC 登录正常后再操作）

