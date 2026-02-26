# 环境变量&dotenv

## 一、为什么要用环境变量？

作用：

- 存放配置（数据库地址、API Key、路径等）
- 避免把敏感信息写死在代码里
- 区分开发 / 测试 / 生产环境
- 提高项目可维护性

------

## 二、`.env` 文件是什么？

`.env` 是一个普通文本文件，用来写：

```text
DB_HOST=localhost
DB_USER=root
DATA_DIR=/mnt/data
DEBUG=True
```

⚠ 注意：

- 每行是 `KEY=VALUE`
- 不要有空格（除非用引号）
- 一般加入 `.gitignore`

------

## 三、`load_dotenv()` 的作用

```python
from dotenv import load_dotenv
load_dotenv()
```

作用：

> 读取 `.env` 文件
> 把里面的变量加载到 `os.environ` 中

安装：

```bash
pip install python-dotenv
```

------

## 四、读取环境变量的几种方式

#### 1️⃣ 基本读取

```python
import os

value = os.getenv("DATA_DIR")
```

如果不存在 → 返回 `None`

------

#### 2️⃣ 设置默认值（推荐写法）

```python
DATA_DIR = os.getenv("DATA_DIR", "data")
```

含义：

- 有环境变量 → 用它
- 没有 → 用 `"data"`

✔ 推荐
✔ 工程中常用
✔ 有兜底机制

------

#### 3️⃣ 强制必须存在

###### 写法一（更安全）

```python
DATA_DIR = os.getenv("DATA_DIR")
if DATA_DIR is None:
    raise ValueError("DATA_DIR 未设置")
```

###### 写法二（更简洁）

```python
DATA_DIR = os.environ["DATA_DIR"]
```

如果不存在会直接报 `KeyError`

适合生产环境必须配置的变量。

------

## 五、⚠ 重要注意事项

#### 1️⃣ 环境变量永远是字符串

例如：

```
DEBUG=False
PORT=8000
```

读取后：

```python
debug = os.getenv("DEBUG")
port = os.getenv("PORT")

print(type(debug))  ## str
print(type(port))   ## str
```

###### 正确转换方式：

```python
DEBUG = os.getenv("DEBUG", "False").lower() == "true"
PORT = int(os.getenv("PORT", 8000))
```

------

#### 2️⃣ `.env` 不要提交到 Git

在 `.gitignore` 里加：

```
.env
```

避免泄露：

- API key
- 数据库密码
- 云服务密钥

------

#### 3️⃣ load_dotenv() 只需要调用一次

通常放在：

- 项目入口文件
- main.py
- app.py

------

## 六、推荐的标准写法（实战风格）

```python
from dotenv import load_dotenv
import os

load_dotenv()

DATA_DIR = os.getenv("DATA_DIR", "data")
DEBUG = os.getenv("DEBUG", "False").lower() == "true"
PORT = int(os.getenv("PORT", 8000))
```

这种写法：

✔ 可读性高
✔ 有默认值
✔ 类型正确
✔ 生产可用

------

## 七、一句话总结

- `.env` = 存配置
- `load_dotenv()` = 加载配置
- `os.getenv(key, default)` = 读取配置 + 默认值
- 环境变量永远是字符串，记得转换类型

------

