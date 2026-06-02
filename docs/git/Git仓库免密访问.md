# Git仓库免密访问

## SSH 密钥（最推荐）

适用于 GitHub、GitLab、Gitee 等，通过密钥对认证。

- 生成密钥：`ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`
- 添加公钥：将 `~/.ssh/id_rsa.pub` 内容复制到 Git 平台（Settings → SSH Keys）。
- 使用 SSH 地址：克隆时用 `git@github.com:用户名/仓库.git`，而不是 `https://` 开头的地址。

## credential.helper（HTTPS 长期缓存）

适合个人电脑，缓存账号密码或 Token。

- 永久存储：`git config --global credential.helper store`（下次输入后明文保存，慎用）。
- 缓存一段时间：`git config --global credential.helper 'cache --timeout=3600'`（缓存 1 小时）。
- Windows/macOS 会自动使用系统凭据管理器（钥匙串/凭据管理器），通常无需配置。

## 个人访问令牌（Token）

当平台禁用密码登录时（如 GitHub），用 Token 代替密码。

- 在 Git 平台生成 Token（勾选 `repo`、`workflow` 等权限）。
- 执行 `git push` 时，用户名不变，密码处粘贴 Token。
- 配合 `credential.helper`，首次输入后自动保存。

已用 HTTPS 但想切 SSH：修改远程地址为 SSH 格式。
```bash
git remote set-url origin git@github.com:用户名/仓库.git
```

安全提醒：多因素认证环境下，Token 比密码更安全；使用 `store` 时确保电脑不会被他人使用。