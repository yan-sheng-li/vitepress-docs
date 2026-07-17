# Bootswatch主题库

## 简介

> **Bootswatch** 就是一个**Bootstrap 免费主题库**，提供了几十种预制的皮肤，比如深色主题 "Darkly" 或简洁的 "Flatly"。你只需要替换 CSS 文件就能瞬间换肤，非常适合不想从头调样式、快速做原型或换皮的场景。

**官网**：https://bootswatch.com/

## 用法

三种方式，看你的项目情况选最简单的就行：

*   **最简单（CDN引用）**：直接在线引用。找到你喜欢的主题链接后，在 HTML 里把原来的 `bootstrap.min.css` 替换掉就行。注意**JS 文件还是要保留**，否则交互会失效。
    
    ```html
    <!-- 替换成 Bootswatch 的 CSS 链接 -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootswatch@5.3.8/dist/darkly/bootstrap.min.css">
    <!-- 原版 Bootstrap 的 JS 依然要引入 -->
    <script src="...bootstrap.bundle.min.js"></script>
    ```
    
*   **最推荐（Sass 导入）**：用 npm 安装后，在项目里精细控制，性能最好。这个方式能让你在主题基础上继续微调。
    
    ```scss
    // 1. 先导入主题变量
    @import "~bootswatch/dist/[主题名]/variables";
    // 2. 再导入官方 Bootstrap 核心
    @import "~bootstrap/scss/bootstrap";
    // 3. 最后导入主题的特殊样式
    @import "~bootswatch/dist/[主题名]/bootswatch";
    ```
    > 注意：`[主题名]` 换成具体名字，比如 `darkly`，顺序不能乱。
    
*   **React / Vue 用户**：执行 `npm install bootswatch`，然后在入口文件（比如 `index.js` 或 `App.js`）顶部直接引入 CSS 文件即可：
    ```javascript
    import 'bootswatch/dist/darkly/bootstrap.min.css';
    ```
