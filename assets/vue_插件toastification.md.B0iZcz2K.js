import{_ as a,c as n,o as i,aj as t}from"./chunks/framework.VtnL2jmu.js";const g=JSON.parse('{"title":"vue-toastification","description":"","frontmatter":{},"headers":[],"relativePath":"vue/插件toastification.md","filePath":"vue/插件toastification.md"}'),e={name:"vue/插件toastification.md"};function p(l,s,o,r,c,h){return i(),n("div",null,[...s[0]||(s[0]=[t(`<h1 id="vue-toastification" tabindex="-1">vue-toastification <a class="header-anchor" href="#vue-toastification" aria-label="Permalink to “vue-toastification”">​</a></h1><blockquote><p><code>vue-toastification</code> 是一个轻量级、高度可定制的 Toast 通知插件，适用于 Vue 2 和 Vue 3。以下是它在 <strong>Vue 2 项目</strong>中的详细使用指南：</p></blockquote><h3 id="_1-安装" tabindex="-1"><strong>1. 安装</strong> <a class="header-anchor" href="#_1-安装" aria-label="Permalink to “1. 安装”">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>npm install vue-toastification@2</span></span>
<span class="line"><span># 或</span></span>
<span class="line"><span>yarn add vue-toastification@2</span></span></code></pre></div><blockquote><p>注意：Vue 2 需要安装 <code>@2.x</code> 版本，Vue 3 使用最新版。</p></blockquote><h3 id="_2-基本使用" tabindex="-1"><strong>2. 基本使用</strong> <a class="header-anchor" href="#_2-基本使用" aria-label="Permalink to “2. 基本使用”">​</a></h3><h4 id="_2-1-全局注册" tabindex="-1"><strong>2.1 全局注册</strong> <a class="header-anchor" href="#_2-1-全局注册" aria-label="Permalink to “2.1 全局注册”">​</a></h4><p>在入口文件（如 <code>main.js</code>）中引入并配置：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>import Vue from &#39;vue&#39;;</span></span>
<span class="line"><span>import Toast from &#39;vue-toastification&#39;;</span></span>
<span class="line"><span>import &#39;vue-toastification/dist/index.css&#39;; // 引入默认样式</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 可选配置</span></span>
<span class="line"><span>const options = {</span></span>
<span class="line"><span>  timeout: 3000, // 默认显示时长（毫秒）</span></span>
<span class="line"><span>  position: &#39;top-right&#39;, // 位置：top-right | top-left | bottom-right | bottom-left</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Vue.use(Toast, options);</span></span></code></pre></div><h4 id="_2-2-在组件中使用" tabindex="-1"><strong>2.2 在组件中使用</strong> <a class="header-anchor" href="#_2-2-在组件中使用" aria-label="Permalink to “2.2 在组件中使用”">​</a></h4><p>通过 <code>this.$toast</code> 调用：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>export default {</span></span>
<span class="line"><span>  methods: {</span></span>
<span class="line"><span>    showToast() {</span></span>
<span class="line"><span>      // 基础用法</span></span>
<span class="line"><span>      this.$toast.success(&#39;操作成功！&#39;);</span></span>
<span class="line"><span>      this.$toast.error(&#39;发生错误！&#39;);</span></span>
<span class="line"><span>      this.$toast.info(&#39;这是一个提示&#39;);</span></span>
<span class="line"><span>      this.$toast.warning(&#39;警告内容&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 自定义选项（覆盖全局配置）</span></span>
<span class="line"><span>      this.$toast(&#39;自定义内容&#39;, {</span></span>
<span class="line"><span>        type: &#39;default&#39;, // default | success | error | info | warning</span></span>
<span class="line"><span>        timeout: 5000,</span></span>
<span class="line"><span>        position: &#39;bottom-left&#39;,</span></span>
<span class="line"><span>      });</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};</span></span></code></pre></div><h3 id="_3-高级用法" tabindex="-1"><strong>3. 高级用法</strong> <a class="header-anchor" href="#_3-高级用法" aria-label="Permalink to “3. 高级用法”">​</a></h3><h4 id="_3-1-自定义-html-内容" tabindex="-1"><strong>3.1 自定义 HTML 内容</strong> <a class="header-anchor" href="#_3-1-自定义-html-内容" aria-label="Permalink to “3.1 自定义 HTML 内容”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>this.$toast(&#39;&lt;strong&gt;加粗文本&lt;/strong&gt;&lt;br&gt;支持 HTML&#39;, {</span></span>
<span class="line"><span>  timeout: false, // 不自动关闭</span></span>
<span class="line"><span>  closeOnClick: false, // 点击不关闭</span></span>
<span class="line"><span>});</span></span></code></pre></div><h4 id="_3-2-手动关闭-toast" tabindex="-1"><strong>3.2 手动关闭 Toast</strong> <a class="header-anchor" href="#_3-2-手动关闭-toast" aria-label="Permalink to “3.2 手动关闭 Toast”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>const toastId = this.$toast(&#39;点击按钮关闭我&#39;);</span></span>
<span class="line"><span>this.$toast.dismiss(toastId); // 关闭指定 Toast</span></span>
<span class="line"><span>this.$toast.clear(); // 关闭所有 Toast</span></span></code></pre></div><h4 id="_3-3-全局配置覆盖" tabindex="-1"><strong>3.3 全局配置覆盖</strong> <a class="header-anchor" href="#_3-3-全局配置覆盖" aria-label="Permalink to “3.3 全局配置覆盖”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>// 在初始化时配置</span></span>
<span class="line"><span>Vue.use(Toast, {</span></span>
<span class="line"><span>  transition: &#39;Vue-Toastification__bounce&#39;, // 动画效果</span></span>
<span class="line"><span>  maxToasts: 3, // 最大同时显示数量</span></span>
<span class="line"><span>  closeButton: false, // 隐藏关闭按钮</span></span>
<span class="line"><span>  // 更多配置见官方文档</span></span>
<span class="line"><span>});</span></span></code></pre></div><h3 id="_4-在-composition-api-中使用" tabindex="-1"><strong>4. 在 Composition API 中使用</strong> <a class="header-anchor" href="#_4-在-composition-api-中使用" aria-label="Permalink to “4. 在 Composition API 中使用”">​</a></h3><p>如果项目使用了 <code>@vue/composition-api</code>，可以通过 <code>useToast</code>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>import { useToast } from &#39;vue-toastification&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  setup() {</span></span>
<span class="line"><span>    const toast = useToast();</span></span>
<span class="line"><span>    toast.success(&#39;Composition API 调用！&#39;);</span></span>
<span class="line"><span>    return {};</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};</span></span></code></pre></div><h3 id="_5-样式自定义" tabindex="-1"><strong>5. 样式自定义</strong> <a class="header-anchor" href="#_5-样式自定义" aria-label="Permalink to “5. 样式自定义”">​</a></h3><h4 id="_5-1-覆盖默认样式" tabindex="-1"><strong>5.1 覆盖默认样式</strong> <a class="header-anchor" href="#_5-1-覆盖默认样式" aria-label="Permalink to “5.1 覆盖默认样式”">​</a></h4><p>在 CSS 文件中修改变量：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>:root {</span></span>
<span class="line"><span>  --vt-color-success: #4caf50;</span></span>
<span class="line"><span>  --vt-text-color-success: #fff;</span></span>
<span class="line"><span>  --vt-toast-min-width: 300px;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_5-2-使用-scss" tabindex="-1"><strong>5.2 使用 SCSS</strong> <a class="header-anchor" href="#_5-2-使用-scss" aria-label="Permalink to “5.2 使用 SCSS”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>// 在 vue.config.js 中确保 sass-loader 配置正确</span></span>
<span class="line"><span>@import &#39;~vue-toastification/src/scss/_variables&#39;;</span></span>
<span class="line"><span>@import &#39;~vue-toastification/src/scss/_toastContainer&#39;;</span></span>
<span class="line"><span>@import &#39;~vue-toastification/src/scss/_toast&#39;;</span></span>
<span class="line"><span>@import &#39;~vue-toastification/src/scss/_closeButton&#39;;</span></span></code></pre></div><h3 id="_6-常见问题" tabindex="-1"><strong>6. 常见问题</strong> <a class="header-anchor" href="#_6-常见问题" aria-label="Permalink to “6. 常见问题”">​</a></h3><ul><li><strong>按需引入</strong>：默认会打包所有样式，如需按需加载，参考官方文档的 <a href="https://github.com/Maronato/vue-toastification#tree-shaking" target="_blank" rel="noreferrer">Tree-Shaking 指南</a>。</li><li><strong>TypeScript 支持</strong>：自带类型定义，无需额外安装。</li><li><strong>Nuxt.js 集成</strong>：需通过 Nuxt 的插件机制封装，参考 <a href="https://github.com/Maronato/vue-toastification/issues/1#issuecomment-595990783" target="_blank" rel="noreferrer">官方示例</a>。</li></ul><h3 id="官方文档" tabindex="-1"><strong>官方文档</strong> <a class="header-anchor" href="#官方文档" aria-label="Permalink to “官方文档”">​</a></h3><ul><li>GitHub: <a href="https://github.com/Maronato/vue-toastification" target="_blank" rel="noreferrer">https://github.com/Maronato/vue-toastification</a></li><li>所有配置项: <a href="https://github.com/Maronato/vue-toastification/blob/master/docs/index.md#toastoptions" target="_blank" rel="noreferrer">Options 文档</a></li></ul><p>通过以上步骤，你可以快速集成一个美观且功能强大的 Toast 通知系统！</p>`,33)])])}const u=a(e,[["render",p]]);export{g as __pageData,u as default};
