```markdown
# 整合 Iconify 图标库

官网：https://iconify.design/

## 核心概念

- **unplugin-icons**：构建时自动导入 SVG 图标，支持按需加载和 tree-shaking
- **Iconify**：提供海量开源图标库（Material、Carbon、Tabler、Ant Design 等）
- 两者结合：直接在 Vue 中用组件方式调用图标，无需手动引入 SVG 文件

---

## 方案一：unplugin-icons（推荐用于 Vite 项目）

### 1. 安装依赖

```bash
npm install -D unplugin-icons unplugin-vue-components
```

### 2. 配置 Vite

`vite.config.js`：

```js
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default {
  plugins: [
    Components({
      resolvers: [
        IconsResolver({
          prefix: 'Icon',  // 组件前缀：<IconMdiHome />
        }),
      ],
    }),
    Icons({ autoInstall: true }),
  ],
}
```

### 3. 使用示例

```vue
<template>
  <div>
    <IconMdiHome />              <!-- Material 图标 -->
    <IconBiAlarm />              <!-- Bootstrap 图标 -->
    <IconCarbonUserAvatar />     <!-- Carbon 图标 -->
    <IconMdiHome class="w-6 h-6 text-red-500" />  <!-- 自定义样式 -->
  </div>
</template>
```

---

## 方案二：@iconify/vue（轻量简洁）

### 1. 安装依赖

**Vue 3：**
```bash
npm install @iconify/vue
```

**Vue 2：**
```bash
npm install @iconify/vue2
```

### 2. 注册组件

**全局注册**（`main.js`）：

```js
import { createApp } from 'vue'
import App from './App.vue'
import { Icon } from '@iconify/vue'

const app = createApp(App)
app.component('Icon', Icon)
app.mount('#app')
```

**局部引入**（单个组件）：

```vue
<script setup>
import { Icon } from '@iconify/vue'
</script>

<template>
  <Icon icon="carbon:building-insights-2" width="32" height="32" style="color: #ec7373" />
</template>
```

### 3. 使用示例

```vue
<template>
  <div>
    <Icon icon="carbon:building-insights-2" width="32" height="32" style="color: #ec7373" />
    <Icon icon="mdi:home" width="40" height="40" style="color: #4caf50" />
  </div>
</template>
```

**图标格式**：`库名:图标名称`
- 搜索图标：https://icon-sets.iconify.design/

---

## 方案三：纯 HTML 使用

```html
<!-- 引入库 -->
<script src="https://code.iconify.design/3/3.1.1/iconify.min.js"></script>

<!-- 使用图标 -->
<span class="iconify" data-icon="mdi:home"></span>
<span class="iconify" data-icon="fa-solid:heart"></span>
```

---

## 总结

| 方案 | 适用场景 | 特点 |
|------|---------|------|
| unplugin-icons | Vite + Vue 项目 | 按需加载，Tree-shaking |
| @iconify/vue | 任何 Vue 项目 | 轻量，简单直接 |
| 纯 HTML | 非构建项目 | 传统方式，即插即用 |
```