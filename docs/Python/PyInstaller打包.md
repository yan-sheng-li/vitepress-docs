## PyInstaller 打包 Python 脚本笔记

### 一、能否直接打包虚拟环境？

**不可以直接复制虚拟环境文件夹给别人**，因为：
- 不同操作系统不兼容（Windows/Linux/Mac）
- Python 版本不同会报错
- 路径变化导致激活脚本失效

**推荐方案：**
| 方案 | 适用场景 |
|------|----------|
| `requirements.txt` | 标准做法，对方有 Python 环境 |
| PyInstaller | 打包成独立可执行文件，无需环境 |
| conda-pack | 跨平台迁移 |

---

### 二、PyInstaller 打包说明

```bash
pyinstaller --onefile your_script.py
```

**会自动打包：**
- 所有 `import` 导入的 Python 库
- Python 解释器本身

**需要手动处理：**
| 类型 | 参数 |
|------|------|
| 资源文件（图片、配置等） | `--add-data` |
| 动态导入的模块 | `--hidden-import` |
| 第三方库的数据文件 | `--collect-data` |

---

### 三、常见错误：缺少数据文件

**错误示例：**
```
FileNotFoundError: ... bpe_simple_vocab_16e6.txt.gz
```

**原因：** 第三方库（如 `open_clip`）的数据文件未被自动打包

**解决方案：**

```bash
# 方案1：自动收集第三方库的数据文件（推荐）
pyinstaller --onefile --collect-data open_clip your_script.py

# 方案2：手动添加单个文件
pyinstaller --onefile --add-data "路径/bpe_simple_vocab_16e6.txt.gz;open_clip" your_script.py
```

> Windows 路径分隔符用 `;`，Linux/Mac 用 `:`

---

### 四、使用 .spec 文件（推荐复杂项目）

```bash
# 1. 生成 spec 文件
pyi-makespec --onefile your_script.py

# 2. 编辑 spec 文件，在 datas=[] 中添加：
datas=[
    ('data/*.json', 'data'),           # 自己的资源文件
],

# 3. 使用 spec 打包
pyinstaller your_script.spec
```

---

### 五、打包前检查清单

- [ ] 主脚本中所有依赖都已正确 `import`
- [ ] 第三方库的数据文件用 `--collect-data` 添加
- [ ] 自己的资源文件用 `--add-data` 添加
- [ ] 动态导入的模块用 `--hidden-import` 添加
- [ ] 在无 Python 环境的电脑上测试打包结果