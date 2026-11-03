# Vue3 集成 GA4 访问统计笔记

## 背景
统计 Vue3 SPA 的访问量（PV/UV）。选用免费的 Google Analytics 4 (GA4)，配合 `vue-gtag` 插件自动监听路由切换，解决 SPA 页面跳转不刷新导致的数据漏报问题。

## 实施步骤

### 1. 获取 ID
获取地址：
https://analytics.google.com/analytics/web

在 GA 后台创建数据流，获取 **衡量 ID**（格式：`G-XXXXXXXXXX`）。

### 2. 安装依赖
```bash
npm install vue-gtag
```

### 3. 修改 `src/main.js`
使用 `vue-gtag@3.x` 语法，将 `router` 传入 `pageTracker` 实现自动追踪。

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createGtag } from 'vue-gtag'

const app = createApp(App)

const gtag = createGtag({
  tagId: 'G-XXXXXXXXXX', // 替换为你的衡量 ID
  pageTracker: {
    router: router, 
  },
})

app.use(gtag)
app.use(router)
app.mount('#app')
```

### 4. 验证
部署后访问网站，在 GA 后台进入 **“报告” -> “实时”**，能看到活跃用户及页面路径即为成功。

## 避坑指南

1. **构建报错 `"default" is not exported`**
   `vue-gtag@3.x` 废弃了默认导出。必须使用 `import { createGtag } from 'vue-gtag'`，且配置项由 `config.id` 变为 `tagId`。
2. **无需手动监听路由**
   配置了 `pageTracker.router` 后，插件已自动处理路由切换上报，切勿再手动写 `router.afterEach`，否则会导致 PV 翻倍。
3. **数据延迟**
   “实时”面板无延迟；“概览”等标准报告通常有 24-48 小时延迟。
4. **测试没数据**
   检查浏览器是否开启了 AdBlock 等拦截插件，建议在无痕模式下测试。