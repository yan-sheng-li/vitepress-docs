# SimpleMindMap快速入门

## 一、 直接使用

如果你只是需要一个好用、免费且不限节点的思维导图工具，可以直接使用它的官方在线版。

### 1. 快速上手

- **在线工具地址**：[SimpleMindMap 在线版](https://wanglin2.github.io/mind-map/)
- **基础操作快捷键**：
  - `Enter (回车)`：插入同级节点。
  - `Tab`：插入子节点。
  - `Delete`：删除当前节点。
  - `双击节点`：编辑文字。
  - `鼠标右键`：画布空白处右键可以拖拽画布，节点上右键可以打开功能菜单。

### 2. 亮点功能推荐

- **支持多种结构**：除了传统的**思维导图**，还支持**组织结构图**、**目录组织图**、**逻辑结构图**、时序图（鱼骨图）等，在上方菜单栏可以随时切换。
- **丰富的节点元素**：节点内不仅可以写字，还可以添加 **标签（Tag）、图标、超链接、图片、备注**，甚至支持编写 **LaTeX 数学公式**。
- **外框与概要**：可以选中多个节点一键添加“外框”，或者为某些节点生成“概要”总结。
- **多格式导入导出**：
  - **导出**：支持导出为图片（PNG/JPEG）、PDF、SVG，以及通用的 `xmind` 格式、Markdown 格式。
  - **导入**：支持直接打开 `.smm`（自研格式）、`xmind` 文件或 Markdown 文件。

## 二、 在前端项目中集成

如果你是前端开发，想在自己的网页或系统里嵌入这个思维导图，它提供了非常灵活的 SDK。

### 1. 安装核心库

在你的前端项目中运行以下命令安装核心依赖：

```Bash
npm install simple-mind-map
```

### 2. 极简 HTML 页面 Demo

在原生 HTML 中引入并初始化的最简代码如下：

```HTML
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>SimpleMindMap 极简 Demo</title>
    <!-- 需要为容器设置固定的宽高 -->
    <style>
        #mindMapContainer {
            width: 800px;
            height: 600px;
            border: 1px solid #ccc;
        }
    </style>
</head>
<body>

    <!-- 1. 准备一个挂载容器 -->
    <div id="mindMapContainer"></div>

    <!-- 2. 引入库文件（实际开发中通常通过 npm 配合打包工具引入） -->
    <script type="module">
        import MindMap from 'https://cdn.jsdelivr.net/npm/simple-mind-map/+esm'

        // 3. 定义初始的思维导图数据
        const data = {
            data: {
                text: "根节点"
            },
            children: [
                {
                    data: { text: "二级节点 A" },
                    children: []
                },
                {
                    data: { text: "二级节点 B" },
                    children: []
                }
            ]
        };

        // 4. 初始化思维导图
        const mindMap = new MindMap({
            el: document.getElementById('mindMapContainer'),
            data: data
        });
    </script>
</body>
</html>
```

### 3. 开发核心概念提示

- **核心与插件分离**：为了控制打包体积，拖拽、小地图、键盘快捷键、右键菜单、导出等高级功能都属于**插件**（Plugins）。如果需要使用，必须在初始化时手动注册（例如 `MindMap.usePlugin(Export)`）。
- **协同开发**：该项目还提供了扩展库，支持通过 WebRTC 或 Yjs 实现**多人同时在线编辑（协同办公）**。

## 三、 资源与链接

- **官方文档**：[SimpleMindMap Docs](https://wanglin2.github.io/mind-map-docs/)