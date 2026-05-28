# Nodejs项目发布至npm官网全流程指南

> 本指南总结了将一个 Node.js 项目从本地开发状态发布为专业 npm 包的完整步骤。

## 1. 准备阶段 (Configuration)

在发布之前，必须确保 `package.json` 包含完整的元数据，否则包在 npm 官网上缺乏可读性且难以被搜索。

### 核心字段检查
- **`name`**: 包的唯一名称。建议在 [npmjs.com](https://www.npmjs.com) 提前搜索确认是否被占用。
- **`version`**: 遵循 [语义化版本 (SemVer)](https://semver.org/lang/zh-CN/)。初始版本通常为 `1.0.0`。
- **`description`**: 简短的描述，直接影响 npm 搜索结果的展示。
- **`main`**: 项目入口文件 (如 `index.js`)。
- **`keywords`**: 关键词数组，方便用户通过搜索找到你的包。
- **`author`**: 作者信息。
- **`license`**: 许可证 (如 `MIT`)。
- **`repository`**: Git 仓库地址，方便用户提交 Issue 或贡献代码。

### 优化包体积 (白名单机制)
为了避免将测试文件 (`test.js`)、配置文件 (`.gitignore`) 或本地环境文件 (`.env`) 发布到 npm，建议使用 `files` 字段定义**白名单**：

```json
"files": [
  "index.js",
  "package.json",
  "README.md"
]
```
*只有在 `files` 列表中的文件才会被上传到 npm 仓库。*

---

## 2. 进阶：支持 `npx` 直接启动 (Optional)

如果你希望用户可以通过 `npx <package-name>` 直接运行你的程序而无需手动安装，需要完成以下两步：

1. **定义 `bin` 映射**：在 `package.json` 中添加：
   ```json
   "bin": {
     "your-command-name": "index.js"
   }
   ```
2. **添加 Shebang 行**：在入口文件 (`index.js`) 的**第一行**必须添加：
   ```javascript
   #!/usr/bin/env node
   ```
   *这告诉操作系统使用 Node.js 解释器来执行该脚本。*

---

## 3. 身份验证 (Authentication)

### 登录
在终端执行：
```bash
npm login
```

### 处理 2FA (两步验证)
如果你的账号开启了 2FA，在执行 `npm publish` 时可能会遇到 `403 Forbidden` 错误。
- **解决方法 A**：通过 `npm login` 重新登录，按照提示输入手机/验证器的 6 位验证码。
- **解决方法 B (Web 认证)**：部分版本的 npm 会提供一个 URL 链接，点击链接并在浏览器中确认授权即可。
- **解决方法 C (Token)**：在 npm 官网生成一个 **Granular Access Token**，并勾选 `Bypass 2FA for publishing`。

---

## 4. 执行发布 (Publishing)

### 标准发布
```bash
npm publish
```

### 作用域包发布 (Scoped Packages)
如果你使用了 `@username/package-name` 这种格式，默认是私有的，发布公开包需指定权限：
```bash
npm publish --access public
```

---

## 5. 后续维护 (Maintenance)

### 更新版本
绝对不能在不修改版本号的情况下重复发布同一版本。请使用以下命令快速升级：
- `npm version patch`: 补丁更新 (1.0.0 $\rightarrow$ 1.0.1) $\rightarrow$ 用于修复 Bug。
- `npm version minor`: 功能更新 (1.0.0 $\rightarrow$ 1.1.0) $\rightarrow$ 用于增加新功能且向下兼容。
- `npm version major`: 重大更新 (1.0.0 $\rightarrow$ 2.0.0) $\rightarrow$ 用于有不兼容的 API 变更。

### 重新发布
升级版本后，再次运行：
```bash
npm publish
```

---

## 🛠 快速检查清单 (Checklist)
- [ ] `package.json` 元数据齐全？
- [ ] `files` 白名单已配置？
- [ ] (可选) `bin` 字段和 Shebang 行已添加？
- [ ] 已执行 `npm login` 并通过 2FA 验证？
- [ ] 版本号是否已更新？