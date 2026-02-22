import{_ as i,c as a,o as n,aj as l}from"./chunks/framework.VtnL2jmu.js";const r=JSON.parse('{"title":"gitea自定义issue模板","description":"","frontmatter":{},"headers":[],"relativePath":"git/gitea自定义issue模板.md","filePath":"git/gitea自定义issue模板.md"}'),e={name:"git/gitea自定义issue模板.md"};function t(h,s,p,k,d,E){return n(),a("div",null,[...s[0]||(s[0]=[l(`<h1 id="gitea自定义issue模板" tabindex="-1">gitea自定义issue模板 <a class="header-anchor" href="#gitea自定义issue模板" aria-label="Permalink to “gitea自定义issue模板”">​</a></h1><p>以下是适用于 Gitea 的三个常用 issue 模板，分别是：</p><ol><li>🐞 Bug 报告（bug.md）</li><li>🌟 功能请求（feature.md）</li><li>❓ 使用咨询 / 问题反馈（question.md）</li></ol><p>将它们放在你的仓库目录下的 <code>.gitea/ISSUE_TEMPLATE/</code> 文件夹中。</p><hr><h3 id="✅-gitea-issue-template-bug-md" tabindex="-1">✅ <code>.gitea/ISSUE_TEMPLATE/bug.md</code> <a class="header-anchor" href="#✅-gitea-issue-template-bug-md" aria-label="Permalink to “✅ .gitea/ISSUE_TEMPLATE/bug.md”">​</a></h3><div class="language-markdown"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">---</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">🐞 Bug 报告</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">about</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">提交一个 bug 或系统异常问题</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">title</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;[Bug]: &quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">labels</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">bug</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">assignees</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">---</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">### 🐞 描述问题</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">请简要描述你遇到的问题是什么。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">### 🔁 复现步骤</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ...</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">2.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ...</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">3.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 出现以下报错/问题：...</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">### 🧠 期望行为</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">请说明你原本预期的正确行为是什么。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">### 🖼️ 实际表现（可选截图）</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">如果可能，请粘贴相关截图或屏幕录制。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">### 🧾 环境信息</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Gitea 版本：</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 浏览器 / 客户端版本：</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 操作系统 / 服务器系统：</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 数据库类型（如 MySQL、PostgreSQL）：</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 日志中是否有报错（粘贴关键日志）：</span></span></code></pre></div><hr><h3 id="✅-gitea-issue-template-feature-md" tabindex="-1">✅ <code>.gitea/ISSUE_TEMPLATE/feature.md</code> <a class="header-anchor" href="#✅-gitea-issue-template-feature-md" aria-label="Permalink to “✅ .gitea/ISSUE_TEMPLATE/feature.md”">​</a></h3><div class="language-markdown"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">---</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">🌟 功能请求</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">about</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">提出一个新功能、增强或建议</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">title</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;[Feature]: &quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">labels</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">enhancement</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">assignees</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">---</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">### 💡 功能描述</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">请描述你想要实现的功能或增强是什么。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">### ✅ 该功能的使用场景</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">请说明你为什么需要它？是否有具体的使用场景或业务需求？</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">### 🛠️ 建议的解决方案（可选）</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">你有什么初步的想法或建议实现方式吗？</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">### 📌 其他补充信息（可选）</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">你是否有参考链接、其他平台的做法？</span></span></code></pre></div><hr><h3 id="✅-gitea-issue-template-question-md" tabindex="-1">✅ <code>.gitea/ISSUE_TEMPLATE/question.md</code> <a class="header-anchor" href="#✅-gitea-issue-template-question-md" aria-label="Permalink to “✅ .gitea/ISSUE_TEMPLATE/question.md”">​</a></h3><div class="language-markdown"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">---</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">❓ 使用咨询 / 问题反馈</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">about</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">提问或反馈使用中遇到的问题（非 bug）</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">title</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;[Question]: &quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">labels</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">question</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">assignees</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">---</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">### ❓ 你的问题是什么？</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">请简要描述你的疑问或不确定的地方。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">### 💬 背景信息（可选）</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">你是在什么场景下遇到这个问题的？是否尝试过其他方式？</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">### 📄 相关配置 / 日志 / 代码片段（可选）</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">如果有配置文件、日志、截图等信息可以提供，请一并粘贴。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">### 📌 你希望得到什么帮助？</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">请描述你希望我们如何协助你解决这个问题。</span></span></code></pre></div><hr><h3 id="📁-最终目录结构如下" tabindex="-1">📁 最终目录结构如下： <a class="header-anchor" href="#📁-最终目录结构如下" aria-label="Permalink to “📁 最终目录结构如下：”">​</a></h3><div class="language-plaintext"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>your-repo/</span></span>
<span class="line"><span>└── .gitea/</span></span>
<span class="line"><span>    └── ISSUE_TEMPLATE/</span></span>
<span class="line"><span>        ├── bug.md</span></span>
<span class="line"><span>        ├── feature.md</span></span>
<span class="line"><span>        └── question.md</span></span></code></pre></div>`,16)])])}const c=i(e,[["render",t]]);export{r as __pageData,c as default};
