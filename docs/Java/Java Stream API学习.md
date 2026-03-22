# Java Stream API学习

> 从“保姆式”到“老板式”编程

## 1. 核心思想：流水线模型

Stream（流）不是一种数据结构，它不存储数据，而是对数据源（如 `List`、`Set`）进行**连续处理**的工具。

- **数据源**：传送带上的原始零件（`List<String>`）。
- **中间操作**：加工工序（`filter`、`map`、`distinct`）。
- **终端操作**：最后打包出货（`collect`、`count`、`forEach`）。

------

## 2. 常用“加工工序”速查表

| **操作名称**      | **作用** | **逻辑简述**                      |
| ----------------- | -------- | --------------------------------- |
| **`.filter(p)`**  | **过滤** | 丢弃不符合条件 `p` 的元素         |
| **`.map(f)`**     | **映射** | 把 A 变成 B（例如 String 转对象） |
| **`.distinct()`** | **去重** | 基于 `equals()` 去除重复项        |
| **`.limit(n)`**   | **截断** | 只保留前 `n` 个元素               |
| **`.sorted()`**   | **排序** | 对流中元素进行排序                |

------

## 3. 实战案例：帖子图片更新逻辑

这是我们之前讨论的代码模型，它展示了 Stream 如何优雅地处理**清洗 + 转换**。

Java

```
List<PostImages> cleanedImages = imagesList.stream()
    // 1. 数据清洗：去空、去空格
    .filter(url -> url != null && !url.trim().isEmpty())
    .map(String::trim)
    
    // 2. 业务去重
    .distinct()
    
    // 3. 类型转换：String -> Entity
    .map(url -> {
        PostImages pi = new PostImages();
        pi.setPostId(postId);
        pi.setImageUrl(url);
        pi.setStatus(1);
        return pi;
    })
    
    // 4. 落地存储
    .collect(Collectors.toList());
```

------

## 4. 为什么要用 Stream？（避坑指南）

### ✅ 优点

1. **代码简洁**：一行流式代码能顶过去 10 行 `for` + `if`。
2. **语义清晰**：看方法名就知道在做什么，不需要人肉跟踪循环变量。
3. **减少 Bug**：自动处理集合初始化，减少了空指针和索引越界的风险。

### ⚠️ 注意事项

1. **惰性求值**：只有调用了 `.collect()` 或 `.forEach()` 这种**终端操作**，前面的过滤和映射才会真正执行！
2. **不可逆性**：流就像流水，流过去就没了。如果需要多次操作，必须重新调用 `.stream()`。
3. **方法引用**：当 Lambda 只是调用现有方法时，用 `ClassName::MethodName`（如 `String::trim`）会让代码更专业。

------

## 5. 进阶：快速转 Map

在做业务逻辑比对（如：找出数据库里已有的图片）时非常有用：

Java

```
// 将 List 转为 Map，Key 是 ID，Value 是对象本身
Map<Long, PostImages> imageMap = existingImages.stream()
    .collect(Collectors.toMap(PostImages::getId, img -> img));
```

------

> **💡 心得**：
>
> 写代码不只是为了让机器运行，更是为了让人阅读。Stream 让代码从“如何做”变成了“做什么”。

