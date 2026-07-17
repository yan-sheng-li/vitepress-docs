import{_ as a,c as s,o as e,aj as t}from"./chunks/framework.VtnL2jmu.js";const h=JSON.parse('{"title":"Pi Agent","description":"","frontmatter":{},"headers":[],"relativePath":"AI/Pi Agent.md","filePath":"AI/Pi Agent.md"}'),p={name:"AI/Pi Agent.md"};function l(i,n,o,r,u,d){return e(),s("div",null,[...n[0]||(n[0]=[t(`<h1 id="pi-agent" tabindex="-1">Pi Agent <a class="header-anchor" href="#pi-agent" aria-label="Permalink to “Pi Agent”">​</a></h1><h2 id="win环境" tabindex="-1">win环境 <a class="header-anchor" href="#win环境" aria-label="Permalink to “win环境”">​</a></h2><p>目录：<code>C:\\Users\\用户名\\.pi\\agent</code></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>{</span></span>
<span class="line"><span>  &quot;lastChangelogVersion&quot;: &quot;0.80.3&quot;,</span></span>
<span class="line"><span>  &quot;defaultProvider&quot;: &quot;9&quot;,</span></span>
<span class="line"><span>  &quot;defaultModel&quot;: &quot;dev&quot;,</span></span>
<span class="line"><span>  &quot;theme&quot;: &quot;dark&quot;,</span></span>
<span class="line"><span>  &quot;npmCommand&quot;: [</span></span>
<span class="line"><span>    &quot;powershell.exe&quot;,</span></span>
<span class="line"><span>    &quot;-NoLogo&quot;,</span></span>
<span class="line"><span>    &quot;-NoProfile&quot;,</span></span>
<span class="line"><span>    &quot;-Command&quot;,</span></span>
<span class="line"><span>    &quot;npm&quot;</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>  &quot;shellPath&quot;: &quot;C:\\\\Windows\\\\System32\\\\WindowsPowerShell\\\\v1.0\\\\powershell.exe&quot;,</span></span>
<span class="line"><span>  &quot;terminal&quot;: {</span></span>
<span class="line"><span>    &quot;showTerminalProgress&quot;: true</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="定义全局提示词" tabindex="-1">定义全局提示词 <a class="header-anchor" href="#定义全局提示词" aria-label="Permalink to “定义全局提示词”">​</a></h2><ul><li><p><strong>~/.pi/agent/AGENTS.md</strong>：<strong>全局</strong>的 Agent 指令文件。Pi 启动时会自动加载并注入到上下文中（作为项目指令/规范的一部分）。</p></li><li><p>其他位置的</p><p>AGENTS.md</p><p>也会被加载（按顺序拼接）：</p><ul><li>父目录（从当前工作目录向上查找）</li><li>当前项目目录下的 AGENTS.md</li></ul></li><li><p>专门用于 System Prompt 的文件</p><p>（更直接影响核心提示词）：</p><ul><li>全局替换：~/.pi/agent/SYSTEM.md</li><li>全局追加：~/.pi/agent/APPEND_SYSTEM.md</li><li>项目级同理（放在 .pi/ 目录下）</li></ul></li></ul><p>AGENTS.md 主要用于<strong>项目/全局的额外指令、规范、安全规则、常用命令</strong>等，它会和默认系统提示词 + SYSTEM/APPEND_SYSTEM.md 一起组成完整的上下文。</p>`,7)])])}const q=a(p,[["render",l]]);export{h as __pageData,q as default};
