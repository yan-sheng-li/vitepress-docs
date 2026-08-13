# 前端项目 npm 自动发布流水线

> 基于 [pi-codegraph-fix](https://github.com/yan-sheng-li/pi-codegraph-fix) 的实际配置过程整理，适用于任何前端/Node.js npm 包的 CI/CD 发布。

---

## 核心思路

把 `npm publish` 从「手动操作」改为「Git push 触发的自动化流程」：

```bash
git push origin main --tags
     ↓ GitHub Actions 检测到 v* tag
     ↓ 校验 tag 版本 == package.json 版本
     ↓ npm publish --access public
     ↓ 发布到 registry.npmjs.org
```

日常发版只需一条命令，无需本地 npm 登录、无需手动 publish。

---

## 一、package.json 配置

### 必备字段

```json
{
  "name": "@scope/pkg",          // scoped 包用 @scope/ 前缀，避免重名
  "version": "1.0.0",
  "files": ["extensions/", "README.md"],  // 控制发布内容，不发布 dev 文件
  "publishConfig": { "registry": "https://registry.npmjs.org/" },  // 强制官方源
  "repository": { "type": "git", "url": "git+https://github.com/<owner>/<repo>.git" },
  "scripts": {
    "release:patch": "npm version patch && git push origin main --tags",
    "release:minor": "npm version minor && git push origin main --tags",
    "release:major": "npm version major && git push origin main --tags"
  }
}
```

### 注意点

| 问题 | 说明 |
|---|---|
| `repository.url` 格式 | 应写 `git+https://...git`，否则 npm publish 时会警告并自动规范化 |
| `files` 字段 | 不写则默认 publish 全部文件；写了只发布列出的文件/目录 |
| scoped 包 | `@scope/pkg` 在 npm 上发布必须加 `--access public` |
| peerDependencies | 若包是 pi/Webpack/Vite 等插件，声明 `peerDependencies` 避免重复安装 |

### 版本发布脚本

```bash
npm run release:patch   # 1.2.1 → 1.2.2，bug 修复
npm run release:minor   # 1.2.x → 1.3.0，新功能
npm run release:major   # 1.x   → 2.0.0，破坏性变更
```

内部执行：`npm version <level>`（自动升版本号 + commit + 打 `v*` tag）→ `git push origin main --tags`。

---

## 二、GitHub Actions 工作流

### 文件位置

`.github/workflows/publish.yml`

### 完整配置

```yaml
name: Publish to npm

on:
  push:
    tags:
      - "v*"

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read    # 最小权限原则
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: https://registry.npmjs.org/   # 强制官方源

      - name: Verify version matches tag
        run: |
          TAG_VERSION="${GITHUB_REF_NAME#v}"
          PKG_VERSION=$(node -p "require('./package.json').version")
          if [ "$TAG_VERSION" != "$PKG_VERSION" ]; then
            echo "Tag v$TAG_VERSION does not match package.json version $PKG_VERSION"
            exit 1
          fi

      - name: Publish to npm
        run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### 关键设计

| 设计点 | 说明 |
|---|---|
| tag 触发 | 只响应 `v*` 格式的 tag，避免 main 上的普通 push 触发 |
| 版本校验 | 防止 tag 与 package.json 版本不一致时发错包 |
| `permissions: contents: read` | 最小权限，不需要写权限 |
| `registry-url` | 绕开本地 CNPM 镜像，确保登录官方源 |
| `--access public` | scoped 包必须加，否则发布失败 |

---

## 三、npm Token 配置

### 生成 Automation Token

1. 打开 https://www.npmjs.com/settings/<用户名>/tokens
2. **Generate New Token** → 类型选 **Automation**
3. 复制 token

> ⚠️ **必须选 Automation 类型**。普通 token 在 CI 环境里会报 `EOTP`（需要 2FA 验证码），Automation token 不需要 2FA，专为 CI 设计。

### 配置 GitHub Secret

1. 打开 https://github.com/<owner>/<repo>/settings/secrets/actions
2. **New repository secret**
   - Name: `NPM_TOKEN`
   - Secret: 上一步的 Automation token
3. 选 **Repository secrets**（不要选 Environment secrets）

> ⚠️ Token 永远不提交到仓库。只存在 GitHub Secrets 加密存储里，workflow 运行时通过 `${{ secrets.NPM_TOKEN }}` 临时注入。

---

## 四、分支规范

| 建议 | 说明 |
|---|---|
| 默认分支 | `main`（单一可信源） |
| 开发模式 | 直接提交到 main，不用 feature 分支 |
| 默认分支改名 | `git branch -m master main` → 推送 → GitHub 设置里改默认分支 → 删旧 master |

---

## 五、常见问题排障

| 症状 | 原因 | 处理 |
|---|---|---|
| `EOTP ... one-time password` | token 不是 Automation 类型 | 重新生成 Automation token 并更新 secret |
| `E404 Not Found` | scoped 包未加 `--access public` | workflow 里 `npm publish --access public` |
| `repository.url was normalized` 警告 | URL 格式不规范 | 本地跑 `npm pkg fix` 后提交 |
| `Tag does not match package.json` | tag 和版本不一致 | 重新 `npm version <level>` 再 push |
| 发布失败但无 token 错误 | 本地 CNPM 源导致登录状态混乱 | workflow 里强制 `registry-url: https://registry.npmjs.org/` |

---

## 六、验证发布成功

```bash
npm view <包名> version
```

输出应为刚发布的版本号。Action 运行时间约 1-2 分钟。

---

## 七、实际案例

以 [pi-codegraph-fix](https://github.com/yan-sheng-li/pi-codegraph-fix) 为例：

```bash
# 发版流程（一条命令）
npm run release:patch

# 验证
npm view @yan-sheng-li/pi-codegraph-fix version
# 输出: 1.2.2
```

整个流程不需要本地 npm 登录，不需要手动 `npm publish`，全靠 GitHub Actions 自动化。

---

## 八、注意事项

1. **不本地 publish**：发布只能由 GitHub Action 执行，避免 token 泄露
2. **Automation token 权限最小化**：只用于发布，泄露后无法登录网页操作 npm
3. **无构建步骤的项目**：如果包直接发布 TS/JS 源码（如 pi 扩展），不需要 `npm ci` / build 步骤
4. **bilingual README**：若项目有中英文文档，版本 bump 时两个 README 都要同步更新
