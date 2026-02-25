# SortableJS快速实现拖拽排序

## 🔹 什么是 SortableJS

**SortableJS** 是一个轻量级的 JavaScript 拖放排序库，用于实现可拖拽重排序列表或元素。它：

✔ 不依赖任何框架（无 jQuery、React、Vue 等依赖）
✔ 支持移动端触摸拖拽
✔ 基于原生 HTML5 Drag & Drop API
✔ API 简单易用，兼容主流浏览器
✔ 支持多列表互拖、克隆、过滤、Handle 拖拽等高级功能 ([GitHub](https://github.com/SortableJS/Sortable?utm_source=chatgpt.com))

------

## 📦 安装与引入

### 📌 1) CDN 引入

```html
<script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>
```

这样就可以在页面中直接使用 `Sortable` 构造了。 ([Technical Manuals](https://manuals.muthu.co/posts/javascript-libraries-and-functions/sortablejs.html?utm_source=chatgpt.com))

### 📌 2) npm 安装（现代项目）

```bash
npm install sortablejs --save
```

在模块化项目中：

```js
import Sortable from 'sortablejs';
```

------

## 🚀 基本用法（最简单示例）

HTML 列表：

```html
<ul id="my-list">
  <li>苹果</li>
  <li>香蕉</li>
  <li>橙子</li>
</ul>
```

初始化：

```js
new Sortable(document.getElementById('my-list'));
```

结果 👉 成功让列表支持拖拽重排序，无须额外代码逻辑。 ([Technical Manuals](https://manuals.muthu.co/posts/javascript-libraries-and-functions/sortablejs.html?utm_source=chatgpt.com))

------

## 🧠 常用配置选项说明

Sortable 的强大之处在于 **可定制性和丰富的配置项**：

------

### ⭐ `animation`

拖拽排序完成时的动画时长（毫秒）：

```js
new Sortable(el, { animation: 150 });
```

------

### 🔁 多列表拖拽

两个列表设置相同 `group`，即可实现互相拖拽：

```js
new Sortable(list1, { group: 'shared' });
new Sortable(list2, { group: 'shared' });
```

------

### ✂ 克隆拖动

如果希望从一个列表拖到另一个列表时复制元素而非移动：

```js
new Sortable(list1, {
  group: { name: 'shared', pull: 'clone' }
});
new Sortable(list2, {
  group: 'shared'
});
```

------

### 🎯 指定 Handle（拖拽手柄）

只允许特定元素作为拖拽入口：

HTML：

```html
<li><span class="handle">☰</span> item text</li>
```

JS：

```js
new Sortable(el, {
  handle: '.handle'
});
```

------

### 🚫 禁止排序

有时想禁用本列表排序，但仍允许拖到别的列表：

```js
new Sortable(el, {
  sort: false, // 禁止排序
  group: 'shared'
});
```

------

### 🚫 过滤元素不可拖

某些元素不要参与拖拽，可以用 `filter`：

```js
new Sortable(el, {
  filter: '.no-drag'
});
```

------

## 🧠 事件回调

Sortable 提供了很多事件（比如排序结束）：

```js
new Sortable(el, {
  onEnd: (evt) => {
    console.log('从', evt.oldIndex, '移动到', evt.newIndex);
  }
});
```

可用于同步你的数据数组。 ([GitHub](https://github.com/SortableJS/Sortable?utm_source=chatgpt.com))

------

## 🧰 进阶功能 & 插件支持

📌 支持插件扩展，例如：

- **MultiDrag** — 可多选拖拽
- **Swap** — 鼠标经过交换而不是拖动替换位置
  （需要额外安装插件） ([SortableJS](https://sortablejs.github.io/Sortable/?utm_source=chatgpt.com))

------

## ⚡ 核心设计原理（思考）

Sortable 并不是简单监听鼠标坐标乱搬 DOM。它的核心有：

✨ 利用 HTML5 Drag & Drop 原生机制
✨ 通过虚拟排序状态机判断元素应该插入的位置
✨ 只在真正 drop 时才把 DOM 更新
✨ 动画效果通过 CSS 过渡更优雅 ([php.cn](https://www.php.cn/faq/1898849.html?utm_source=chatgpt.com))

------

## 📚 整体用法示例汇总

完整例子整合：

```html
<ul id="todo">
  <li><span class="handle">☰</span> 写博客</li>
  <li><span class="handle">☰</span> 阅读邮件</li>
  <li><span class="handle">☰</span> 整理代码</li>
</ul>

<script>
new Sortable(document.getElementById('todo'), {
  handle: '.handle',
  animation: 200,
  onEnd: (evt) => {
    console.log('排序后', evt.newIndex);
  }
});
</script>
```

------

## 📌 小结 ✍

| 特点       | 支持 |
| ---------- | ---- |
| 无依赖库   | ✅    |
| 支持触摸   | ✅    |
| 多列表拖拽 | ✅    |
| 动画       | ✅    |
| 高定制     | ✅    |
| 事件回调   | ✅    |

SortableJS 是**现代 Web 项目里最简单、最可靠的拖拽排序解决方案之一**，非常适合快速做交互功能。 ([GitHub](https://github.com/SortableJS/Sortable?utm_source=chatgpt.com))