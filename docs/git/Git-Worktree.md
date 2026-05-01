以下是关于 `git worktree` 的使用笔记与示例，适合日常开发场景参考。

---

# Git Worktree 使用笔记

## 1. 什么是 Git Worktree？

`git worktree` 允许你在同一个仓库上**同时检出多个分支**，每个分支位于**独立的目录**中，互不干扰。  
适合需要并行开发、快速切换分支、测试不同版本的场景，避免频繁 `stash` 或克隆仓库。

## 2. 核心优势

- 无需重复克隆仓库，节省磁盘空间
- 多个分支同时工作，立即切换上下文
- 每个 worktree 可以独立编译、运行、测试
- 主工作区保持干净，临时修复和功能开发并行进行

## 3. 常用命令

```bash
# 列出所有 worktree
git worktree list

# 添加新的 worktree
git worktree add <路径> <分支名>

# 添加并创建新分支
git worktree add -b <新分支名> <路径> <基于的分支>

# 移除 worktree（手动删除目录后执行）
git worktree prune

# 锁定/解锁 worktree（防止误删）
git worktree lock <路径>
git worktree unlock <路径>

# 移动 worktree
git worktree move <旧路径> <新路径>

# 修复 worktree 元数据（较少用）
git worktree repair <路径>
```

## 4. 典型使用流程示例

### 场景：修复线上 bug，同时开发新功能

```bash
# 假设主仓库在 ~/project，当前在 main 分支开发功能

# 1. 突然需要修复生产 bug，但不影响当前工作区
git worktree add ../project-hotfix hotfix/bug-123

# 2. 进入 hotfix 目录
cd ../project-hotfix

# 3. 修复 bug，提交并推送
git add .
git commit -m "fix: resolve null pointer in payment"
git push origin hotfix/bug-123

# 4. 回到主工作区继续开发功能
cd ../project

# 5. bug 修复分支合并后，删除 worktree
rm -rf ../project-hotfix
git worktree prune
```

### 场景：并行开发两个独立功能

```bash
# 基于 main 创建两个 worktree
git worktree add -b feature/login ../project-login main
git worktree add -b feature/payment ../project-payment main

# 分别进入对应目录开发
cd ../project-login   # 开发登录功能
cd ../project-payment # 开发支付功能
```

### 场景：测试 CI 前的某个 commit 或 tag

```bash
git worktree add ../project-test v2.3.0
cd ../project-test
npm test  # 在独立环境中测试
```

## 5. 注意事项

- **不能在同一分支上创建两个 worktree**（除非使用 `--force`，但不推荐）
- 删除 worktree 时**先确认没有正在执行的进程**（如 dev server、数据库连接等）
- 建议 worktree 目录放在仓库**同级或上层**，便于管理
- `.git` 文件位于 worktree 根目录，指向主仓库的 `.git/worktrees/`
- 主仓库的 `.git` 中会记录所有 worktree 信息，不要随意删除主仓库
- 如果使用 IDE（如 VS Code、IntelliJ），建议为每个 worktree 单独打开窗口

## 6. 快速删除所有无用的 worktree

```bash
# 列出所有 worktree
git worktree list

# 手动删除不再需要的目录后
git worktree prune
```

## 7. 常见问题

| 问题 | 解决方法 |
|------|----------|
| 删除 worktree 后仍被列表显示 | 执行 `git worktree prune` |
| 分支被 `locked` 无法删除 | `git worktree unlock <路径>` |
| 主仓库被移动位置导致 worktree 失效 | 在新的主仓库执行 `git worktree repair` |

## 8. 总结

`git worktree` 是并行开发的利器，尤其适合：
- 紧急 bugfix + 功能开发并行
- 长期多分支维护（如 LTS 版本、实验特性）
- 避免 `git stash` 来回切换的麻烦

学会它，能让你的 Git 工作流更加高效流畅。