# GitHub CLI (gh)

## 1. 安装

| 系统                      | 命令                             |
| ------------------------- | -------------------------------- |
| **macOS**                 | `brew install gh`                |
| **Windows**               | `winget install --id GitHub.cli` |
| **Linux (Debian/Ubuntu)** | 先配源，再 `sudo apt install gh` |
| **Termux (Android)**      | `pkg install gh`                 |

验证安装：`gh --version`

---

## 2. 登录认证

```bash
gh auth login
```

推荐选择：**GitHub.com → HTTPS → 浏览器登录（设备码方式）**

其他相关命令：
- `gh auth status` — 查看登录状态
- `gh auth logout` — 退出登录

---

## 3. 常用命令速查表

| 类别        | 命令                                           | 说明                   |
| ----------- | ---------------------------------------------- | ---------------------- |
| **仓库**    | `gh repo clone 用户/仓库`                      | 克隆仓库               |
|             | `gh repo create 名称 --public --clone`         | 创建并克隆到本地       |
|             | `gh repo fork 仓库 --clone`                    | Fork 并克隆            |
|             | `gh repo view`                                 | 查看当前仓库信息       |
| **PR**      | `gh pr list`                                   | 列出 Pull Request      |
|             | `gh pr checkout 编号`                          | 检出 PR 到本地         |
|             | `gh pr create`                                 | 创建 PR（交互式）      |
|             | `gh pr merge 编号 --squash`                    | 合并 PR                |
|             | `gh pr status`                                 | 查看我的 PR 状态       |
| **Issue**   | `gh issue list`                                | 列出 Issues            |
|             | `gh issue create --title "标题" --body "内容"` | 创建 Issue             |
|             | `gh issue view 编号`                           | 查看 Issue 详情        |
| **Actions** | `gh run list`                                  | 查看工作流运行记录     |
|             | `gh run watch`                                 | 实时查看运行状态       |
|             | `gh run rerun`                                 | 重新运行失败任务       |
| **Release** | `gh release create v1.0.0 --notes "说明"`      | 创建发布               |
|             | `gh release download v1.0.0`                   | 下载发布资源           |
| **工具**    | `gh browse`                                    | 浏览器打开当前仓库页面 |
|             | `gh alias set 简称 原命令`                     | 设置命令别名           |
|             | `gh --help`                                    | 查看帮助               |

---

## 4. 实用技巧

### 4.1 组合 `--web` 参数
几乎所有命令都支持 `--web`，会在浏览器打开对应的 GitHub 页面：

```bash
gh issue list --web      # 在网页端打开 Issues 页面
gh pr view 13 --web      # 在网页端打开该 PR
```

### 4.2 设置别名提速

```bash
# 设置别名
gh alias set co 'pr checkout'
gh alias set ls 'issue list'

# 之后直接用
gh co 123
gh ls
```

查看已设别名：`gh alias list`

### 4.3 与 git 无缝配合

`gh` 本质上是对 git 的增强包装，克隆后的仓库就是正常的 git 仓库，所有 `git` 命令照常使用：

```bash
gh repo clone octocat/Hello-World
cd Hello-World
git add .
git commit -m "update"
git push
```

### 4.4 在脚本中使用

加上 `--json` 参数可输出结构化数据：

```bash
# 获取所有 open 状态的 PR 编号和标题
gh pr list --state open --json number,title
```

---

## 5. 常用工作流示例

### 场景一：参与开源项目

```bash
gh repo fork 原作者/项目 --clone      # Fork 并克隆到本地
cd 项目
gh checkout -b feature-xxx            # 创建分支
# ... 写代码 ...
git add . && git commit -m "描述"
git push --set-upstream origin feature-xxx
gh pr create --title "PR标题" --body "描述"   # 提 PR
```

### 场景二：管理自己的项目

```bash
gh repo create 新项目 --public --clone   # 新建项目
gh issue create --title "待办1"          # 创建任务
gh issue list                            # 查看任务
gh release create v1.0.0 -t "v1.0.0"    # 打版本
```

---

## 6. 官方文档

- 命令大全：`gh --help` 或 `gh 命令 --help`
- 在线文档：[cli.github.com/manual](https://cli.github.com/manual)

