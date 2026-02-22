import{_ as i,c as a,o as n,aj as l}from"./chunks/framework.VtnL2jmu.js";const c=JSON.parse('{"title":"MySQL配置文件","description":"","frontmatter":{"permalink":"/mysql/1"},"headers":[],"relativePath":"MySQL/MySQL配置文件.md","filePath":"MySQL/MySQL配置文件.md"}'),p={name:"MySQL/MySQL配置文件.md"};function t(e,s,h,k,r,d){return n(),a("div",null,[...s[0]||(s[0]=[l(`<h1 id="mysql配置文件" tabindex="-1">MySQL配置文件 <a class="header-anchor" href="#mysql配置文件" aria-label="Permalink to “MySQL配置文件”">​</a></h1><blockquote><p>在MySQL安装目录下的<code>my.ini</code>，参考配置如下：</p></blockquote><div class="language-ini"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">[mysqld]</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 设置3306端口</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">port</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=3306</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 设置mysql的安装目录   ----------是你的文件路径-------------</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">basedir</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=D:\\MySQL_Navicat\\mysql-8.0.27-winx64</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 设置mysql数据库的数据的存放目录  ---------是你的文件路径data文件夹自行创建</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 设置 mysql数据库的数据的存放目录，MySQL 8+ 不需要以下配置，系统自己生成即可，否则有可能报错</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#datadir=D:\\Mysql\\mysql\\data</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 允许最大连接数</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">max_connections</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=200</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 允许连接失败的次数。</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">max_connect_errors</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=10</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 服务端使用的字符集默认为utf8mb4</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">character-set-server</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=utf8mb4</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 创建新表时将使用的默认存储引擎</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">default-storage-engine</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=INNODB</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 默认使用“mysql_native_password”插件认证</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#mysql_native_password</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">default_authentication_plugin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=mysql_native_password</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">[mysql]</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 设置mysql客户端默认字符集</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">default-character-set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=utf8mb4</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">[client]</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 设置mysql客户端连接服务端时默认使用的端口</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">port</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=3306</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">default-character-set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=utf8mb4</span></span></code></pre></div>`,3)])])}const g=i(p,[["render",t]]);export{c as __pageData,g as default};
