# uv 学习

> 从零到一掌握现代化 Python 工具链

## 📌 前言

本总结基于实际动手练习的完整对话记录，涵盖了 `uv` 的核心概念、安装、常用命令、工作流程以及与传统工具（`pip`、`pipx`）的对比。通过这次学习，你已经从传统的 `pip` + `venv` + `requirements.txt` 工作流，成功过渡到了现代化的 `uv` 统一工具链。

## 一、uv 是什么？

**`uv` 是一个用 Rust 编写的、极速的 Python 包管理和项目管理工具**，旨在替代 `pip`、`pip-tools`、`virtualenv`、`poetry` 等多个工具。

### 核心特点
- **速度快**：比传统工具快 10-100 倍
- **功能统一**：一个工具解决环境管理、依赖管理、包安装、Python 版本管理
- **现代化**：完全支持 `pyproject.toml` 标准，使用 `uv.lock` 锁定依赖
- **零迁移成本**：提供 `uv pip` 命令兼容传统 `pip` 用法

## 二、与传统工具的对比

| 功能         | 传统工具组合              | uv 对应命令                 | 优势                    |
| ------------ | ------------------------- | --------------------------- | ----------------------- |
| 创建虚拟环境 | `python -m venv .venv`    | `uv venv`                   | 可自动下载指定 Python   |
| 安装包       | `pip install`             | `uv add` / `uv pip install` | 依赖解析快 10-100 倍    |
| 项目依赖管理 | 手动维护 requirements.txt | `uv add` / `uv remove`      | 自动更新 pyproject.toml |
| 运行脚本     | 手动激活环境 + `python`   | `uv run`                    | 自动激活环境            |
| 版本锁定     | `pip freeze`（不可靠）    | `uv lock`                   | 精确跨平台锁定          |
| 安装 Python  | 需要 pyenv 或官网下载     | `uv python install`         | 一条命令搞定            |
| 运行临时工具 | `pipx` 或全局安装         | `uvx`                       | 用完即焚，不污染环境    |

## 三、安装与配置

### 推荐安装方式

**Windows (PowerShell)**
```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

**macOS / Linux**
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### 验证安装
```bash
uv --version
```

### 可选：配置国内镜像源（以清华源为例）
```bash
# macOS / Linux
echo 'export UV_INDEX_URL="https://pypi.tuna.tsinghua.edu.cn/simple"' >> ~/.bashrc

# 重启终端或执行
source ~/.bashrc
```

## 四、核心命令速查表

### 项目管理命令

| 命令                  | 作用                   | 示例                    |
| --------------------- | ---------------------- | ----------------------- |
| `uv init`             | 初始化新项目           | `uv init my-project`    |
| `uv add <package>`    | 添加依赖（推荐）       | `uv add requests`       |
| `uv remove <package>` | 移除依赖               | `uv remove requests`    |
| `uv sync`             | 安装所有依赖到虚拟环境 | `uv sync`               |
| `uv run <command>`    | 在虚拟环境中执行命令   | `uv run python main.py` |
| `uv lock`             | 锁定依赖版本           | `uv lock`               |

### Python 环境管理

| 命令                          | 作用            | 示例                     |
| ----------------------------- | --------------- | ------------------------ |
| `uv venv`                     | 创建虚拟环境    | `uv venv`                |
| `uv python install <version>` | 安装指定 Python | `uv python install 3.11` |
| `uv python list`              | 列出可用 Python | `uv python list`         |

### 工具管理

| 命令                        | 作用         | 示例                   |
| --------------------------- | ------------ | ---------------------- |
| `uvx <tool>`                | 临时运行工具 | `uvx ruff check .`     |
| `uv tool install <package>` | 全局安装工具 | `uv tool install ruff` |

### 兼容命令

| 命令             | 作用          | 示例                                 |
| ---------------- | ------------- | ------------------------------------ |
| `uv pip install` | 兼容 pip 用法 | `uv pip install -r requirements.txt` |
| `uv pip list`    | 查看已安装包  | `uv pip list`                        |

## 五、标准工作流程

### 1. 创建新项目
```bash
uv init my-project
cd my-project
```

### 2. 添加依赖
```bash
# 生产依赖
uv add numpy pandas

# 开发依赖
uv add --dev pytest black
```

### 3. 编写代码
```bash
# 使用 uv run 运行，无需手动激活环境
uv run python main.py
```

### 4. 项目分享（别人拿到项目后）
```bash
# 对方只需要执行一条命令
git clone <your-project>
cd <your-project>
uv sync          # 自动创建环境、安装所有依赖
uv run python main.py
```

## 六、核心原则与最佳实践

### ✅ 正确做法
```bash
uv add pandas          # 添加项目依赖
uv add --dev pytest    # 添加开发依赖
uv sync                # 安装所有依赖
uv run python script   # 运行脚本
uvx ruff check .       # 临时使用工具
```

### ❌ 错误做法（在 uv 项目中）
```bash
uv venv
source .venv/bin/activate
uv pip install pandas   # 不会记录到 pyproject.toml
# 别人运行 uv sync 时会缺少依赖！
```

### 核心原则
> **用 `uv add` 而不是 `uv pip install`，除非只是临时测试。**

原因：
- `uv add` 会自动更新 `pyproject.toml` 和 `uv.lock`
- `uv pip install` 只安装到当前环境，不记录依赖
- 没有依赖记录，团队协作会出问题

## 七、深入理解：虚拟环境与 Python 解释器

### 关键概念
- **虚拟环境**：隔离的 Python 包空间，但本身**不包含** Python 解释器
- **Python 解释器**：由系统或 `uv python install` 提供
- **虚拟环境只是链接**：`.venv/bin/python` 是指向真实解释器的软链接

### 更换虚拟环境的 Python 版本
```bash
# 1. 退出当前环境
deactivate

# 2. 删除旧环境
rm -rf .venv

# 3. 安装想要的 Python 版本
uv python install 3.11

# 4. 重新创建环境
uv venv --python 3.11

# 5. 重新激活
source .venv/bin/activate
```

## 八、uv vs pipx vs pip 的关系

| 工具   | 定位           | 使用场景                      |
| ------ | -------------- | ----------------------------- |
| `pip`  | 安装 Python 库 | 代码中 `import` 使用的库      |
| `pipx` | 安装命令行工具 | 需要在终端运行的 Python 工具  |
| `uv`   | 统一工具链     | 同时替代 pip、pipx、poetry 等 |

**uv 的优势**：
- `uv pip` 直接取代 `pip`
- `uvx` 直接取代 `pipx`
- 加上项目管理功能，一个工具全搞定

## 九、常见问题处理

### Q1: 虚拟环境创建后，`uv pip list` 是空的正常吗？
**A**: 正常。表示环境是干净的，需要用 `uv add` 或 `uv pip install` 安装包。

### Q2: 为什么我用 `uv pip install` 安装的包没有记录在 `pyproject.toml`？
**A**: 这是正常的，`uv pip install` 是为了兼容 `pip` 的行为。要记录依赖，请使用 `uv add`。

### Q3: 如何迁移现有 `requirements.txt` 项目？
**A**: 
```bash
uv init
uv add $(cat requirements.txt)
uv lock
```

### Q4: 团队其他人不想安装 uv 怎么办？
**A**: 可以在项目中同时保留 `requirements.txt`：
```bash
uv pip freeze > requirements.txt
```
但建议推动团队统一使用 uv。

## 十、进阶学习方向

熟悉基础后，可以继续探索：

1. **uvx 的高级用法**：临时环境运行工具
2. **Docker 集成**：用 uv 优化镜像构建
3. **脚本内嵌元数据**：单文件脚本的自带依赖
4. **发布包到 PyPI**：`uv build` 和 `uv publish`
5. **monorepo 支持**：多项目工作区管理

## 十一、总结：为什么 uv 这么香？

| 维度       | 传统方式             | uv 方式          | 体验提升 |
| ---------- | -------------------- | ---------------- | -------- |
| 上手难度   | 需要学习多个工具     | 一个工具全覆盖   | ⬆️ 50%    |
| 执行速度   | 慢（特别是依赖解析） | 快 10-100 倍     | ⬆️ 1000%  |
| 环境一致性 | 容易出问题           | uv.lock 精确锁定 | ⬆️ 80%    |
| 团队协作   | 文档依赖，步骤多     | 一个命令同步     | ⬆️ 70%    |
| 心智负担   | 高（记忆各种命令）   | 低（直观统一）   | ⬆️ 60%    |

### 最终建议
- **新项目**：无脑上 uv

- **旧项目**：逐步迁移，uv 兼容性很好

- **团队推广**：分享本文档，让更多人体验"相见恨晚"的感觉

  

---

希望这份总结对你有帮助！你也可以根据自己的理解继续完善这份文档。😊