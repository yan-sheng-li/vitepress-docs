import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/vitepress-docs/',
  lang: 'zh-CN',
  ignoreDeadLinks: true,
  title: "木子空间",
  description: "A VitePress Site",
  themeConfig: {
    siteTitle: "木子空间",
    logo: 'http://cdn.qiniu.liyansheng.top/img/graphic-4005286_640.png',
    footer: {
      copyright: 'Copyright © 2019-present 木子空间'
    },
    search: {
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '服务大厅', link: 'https://liyansheng.top/pc/home' },
      {
        text: '前端',
        items: [
          { text: 'Vue', link: '/vue/' },
          { text: '微信小程序', link: '/微信小程序/' },
          { text: 'CSS', link: '/css/' },
          { text: 'Js', link: '/Js/' },
        ]
      },
      {
        text: '后端',
        items: [
          { text: 'Java', link: '/Java/' },
          { text: 'Javaee', link: '/Javaee/' },
          { text: 'SpringBoot', link: '/springboot/' },
          { text: 'ElasticSearch', link: '/elastic-search/' },
        ]
      },
      { text: 'Git', link: '/git/' }
    ],

    sidebar: {
      '/Js/': [
        {
          text: 'Js 系列',
          items: [
            { text: 'index', link: '/Js/index' },
            { text: '404页面-模板', link: '/Js/404页面-模板' },
            { text: 'bootstrap-table插件', link: '/Js/bootstrap-table插件' },
            { text: 'bs-stepper步进组件库', link: '/Js/bs-stepper步进组件库' },
            { text: 'Day.js常用方法速查', link: '/Js/Day.js常用方法速查' },
            { text: 'driverjs页面引导', link: '/Js/driverjs页面引导' },
            { text: 'Dropzonejs实现文件上传', link: '/Js/Dropzonejs实现文件上传' },
            { text: 'easy-qrcodejs生成二维码', link: '/Js/easy-qrcodejs生成二维码' },
            { text: 'Fetch请求封装', link: '/Js/Fetch请求封装' },
            { text: 'flatpicker时间选择', link: '/Js/flatpicker时间选择' },
            { text: 'fullcalendar日历组件', link: '/Js/fullcalendar日历组件' },
            { text: 'FullPagejs图片全面屏网页', link: '/Js/FullPagejs图片全面屏网页' },
            { text: 'Jodit富文本编辑器', link: '/Js/Jodit富文本编辑器' },
            { text: 'Leaflet-地图应用', link: '/Js/Leaflet-地图应用' },
            { text: 'select2下拉选择组件', link: '/Js/select2下拉选择组件' },
            { text: 'slidejs幻灯片', link: '/Js/slidejs幻灯片' },
            { text: 'sweetalert2', link: '/Js/sweetalert2' },
            { text: 'timeagojs时间xxx前', link: '/Js/timeagojs时间xxx前' },
            { text: 'viewjs点击图片放大预览', link: '/Js/viewjs点击图片放大预览' },
            { text: '三级地图跳转', link: '/Js/三级地图跳转' },
            { text: '单html页面-elementUI-案例', link: '/Js/单html页面-elementUI-案例' },
            { text: '单html页面-vue-案例', link: '/Js/单html页面-vue-案例' },
            { text: '实现网页弹幕', link: '/Js/实现网页弹幕' },
            { text: '消息弹窗', link: '/Js/消息弹窗' },
            { text: '登录页-模板', link: '/Js/登录页-模板' },
            { text: '首页-模板', link: '/Js/首页-模板' },
            { text: '记录网页浏览时长', link: '/Js/记录网页浏览时长' },
            { text: '网页静态表格数据导出', link: '/Js/网页静态表格数据导出' },
            { text: '文字-转-头像', link: '/Js/文字-转-头像' },
            { text: '解构赋值', link: '/Js/解构赋值' },
            { text: '随机头像生成', link: '/Js/随机头像生成' },
            { text: '页面-组件-自由拖放', link: '/Js/页面-组件-自由拖放' }
          ]
        }
      ],
      '/Javaee/': [
        {
          text: 'Javaee 系列',
          items: [
            { text: 'index', link: '/Javaee/index' },
            { text: 'C标签库语法', link: '/Javaee/C标签库语法' },
            { text: '对象属性复制', link: '/Javaee/对象属性复制' },
            { text: '简易验证码', link: '/Javaee/简易验证码' },
            { text: '全局过滤器', link: '/Javaee/全局过滤器' },
            { text: '使用tomcat部署可能遇到的问题', link: '/Javaee/使用tomcat部署可能遇到的问题' },
            { text: '数据分页实现-案例', link: '/Javaee/数据分页实现-案例' },
            { text: '页面跳转值传递', link: '/Javaee/页面跳转值传递' },
            { text: 'Commons-DbUtils库', link: '/Javaee/Commons-DbUtils库' },
            { text: '基础写法', link: '/Javaee/基础写法' },
            { text: '密码加密', link: '/Javaee/密码加密' },
            { text: '实操案例', link: '/Javaee/实操案例' },
            { text: '数据导入导出', link: '/Javaee/数据导入导出' },
            { text: '文件上传下载', link: '/Javaee/文件上传下载' },
          ]
        }
      ],
      '/Java/': [
        {
          text: 'Java 系列',
          items: [
            { text: 'index', link: '/Java/index' },
            { text: 'Java项目CMD启动指南', link: '/Java/Java项目CMD启动指南' },
            { text: 'JDBC常用方法封装', link: '/Java/JDBC常用方法封装' },
            { text: '普通项目打jar', link: '/Java/普通项目打jar' },
            { text: '时间差计算', link: '/Java/时间差计算' },
            { text: '实现定时任务', link: '/Java/实现定时任务' },
            { text: '使用JFileChooser', link: '/Java/使用JFileChooser' },
            { text: '文字转化图片', link: '/Java/文字转化图片' },
          ]
        }
      ],
      '/vue/': [
        {
          text: 'Vue 系列',
          items: [
            { text: 'dayjs', link: '/vue/dayjs' },
          ]
        }
      ],
      '/docker/': [
        {
          text: 'Docker 系列',
          items: [
            { text: 'Docker容器系列', link: '/docker/' },
            { text: '常用命令清单', link: '/docker/常用命令清单' },
            { text: '镜像加速', link: '/docker/镜像加速' },
            { text: '前后端一键docker启动', link: '/docker/前后端一键docker启动' },
            { text: 'WSL2安装', link: '/docker/WSL2安装' },
            { text: 'docker-compose常用命令', link: '/docker/docker-compose常用命令' },
          ]
        }
      ],
      '/微信小程序/': [
        {
          text: '微信小程序系列',
          items: [
            { text: '微信登录', link: '/微信小程序/微信登录' },
            { text: '选择位置', link: '/微信小程序/选择位置' },
            { text: '请求发起封装', link: '/微信小程序/请求发起封装' },
            { text: 'picker选择器', link: '/微信小程序/picker选择器' },
            { text: '常用API汇总', link: '/微信小程序/常用API汇总' },
          ]
        }
      ],
      '/css/': [
        {
          text: 'CSS',
          items: [
            { text: 'Bulma', link: '/css/Bulma' },
            { text: 'TailwindCSS', link: '/css/tailwindcss' }
          ]
        }
      ],
      '/elastic-search/': [
        {
          text: 'ElasticSearch',
          items: [
            { text: '快速入门与部署', link: '/elastic-search/快速入门与部署' }
          ]
        }
      ],
      '/springboot/': [
        {
          text: 'SpringBoot 系列',
          items: [
            { text: '简介', link: '/springboot/' },
          ]
        },
        {
          text: '基础配置',
          collapsed: true,
          items: [
            { text: '常规整合', link: '/springboot/常规整合' },
            { text: '远程仓库源', link: '/springboot/远程仓库源' },
            { text: '配置热部署', link: '/springboot/配置热部署' },
            { text: '配置文件加密', link: '/springboot/配置文件加密' },
            { text: '绑定配置文件中变量', link: '/springboot/绑定配置文件中变量' },
            { text: '静态资源访问不到', link: '/springboot/静态资源访问不到' },
          ]
        },
        {
          text: 'Web开发',
          collapsed: true,
          items: [
            { text: '开启跨域', link: '/springboot/开启跨域' },
            { text: '全局异常处理', link: '/springboot/全局异常处理' },
            { text: '参数校验', link: '/springboot/参数校验' },
            { text: '整合参数校验', link: '/springboot/整合参数校验' },
            { text: '请求转发', link: '/springboot/请求转发' },
            { text: '简洁版的Result类', link: '/springboot/简洁版的Result类' },
          ]
        },
        {
          text: '模板引擎',
          collapsed: true,
          items: [
            { text: 'thymeleaf常用语法', link: '/springboot/thymeleaf常用语法' },
            { text: 'Thymeleaf和JS交互', link: '/springboot/Thymeleaf和JavaScript在前后端交互中获取后端值' },
            { text: '兼容JSP页面', link: '/springboot/兼容JSP页面' },
          ]
        },
        {
          text: '数据库与缓存',
          collapsed: true,
          items: [
            { text: '整合redis', link: '/springboot/整合redis' },
            { text: '数据导入导出', link: '/springboot/数据导入导出' },
          ]
        },
        {
          text: '安全认证',
          collapsed: true,
          items: [
            { text: '整合JWT', link: '/springboot/整合JWT' },
            { text: '整合sa-token权限控制', link: '/springboot/整合sa-token权限控制' },
          ]
        },
        {
          text: '定时任务',
          collapsed: true,
          items: [
            { text: '定时任务', link: '/springboot/定时任务' },
            { text: '整合xxl-job定时任务', link: '/springboot/整合xxl-job定时任务' },
          ]
        },
        {
          text: '文件与存储',
          collapsed: true,
          items: [
            { text: '文件上传-下载', link: '/springboot/文件上传-下载' },
            { text: '整合七牛云图床', link: '/springboot/整合七牛云图床' },
          ]
        },
        {
          text: '消息与通信',
          collapsed: true,
          items: [
            { text: '整合WebSocket', link: '/springboot/整合WebSocket' },
            { text: '整合kafka', link: '/springboot/整合kafka' },
          ]
        },
        {
          text: '接口文档',
          collapsed: true,
          items: [
            { text: '整合knife4j', link: '/springboot/整合knife4j' },
          ]
        },
        {
          text: '其他整合',
          collapsed: true,
          items: [
            { text: '整合邮件发送', link: '/springboot/整合邮件发送' },
            { text: '整合验证码', link: '/springboot/整合验证码' },
            { text: '整合支付宝沙箱支付', link: '/springboot/整合支付宝沙箱支付' },
            { text: '整合IK分词器', link: '/springboot/整合IK分词器' },
            { text: '整合webhook自动部署', link: '/springboot/整合webhook自动部署' },
            { text: '集成AI大模型', link: '/springboot/集成AI大模型' },
          ]
        },
        {
          text: '部署相关',
          collapsed: true,
          items: [
            { text: '项目打jar包-docker部署', link: '/springboot/项目打jar包-docker部署' },
            { text: '打包的jar启动报错问题', link: '/springboot/打包的jar启动报错问题' },
            { text: '服务开启HTTPS访问', link: '/springboot/服务开启HTTPS访问' },
            { text: '前后端多端口启动与访问', link: '/springboot/前后端多端口启动与访问' },
          ]
        },
        {
          text: '工具与技巧',
          collapsed: true,
          items: [
            { text: '常用算法封装', link: '/springboot/常用算法封装' },
            { text: '优雅实现动态日志记录', link: '/springboot/优雅实现动态日志记录' },
            { text: '告别各种奇怪的时间格式', link: '/springboot/告别各种奇怪的时间格式' },
          ]
        },
      ],
      '/git/': [
        {
          text: 'Git 系列',
          items: [
            { text: '简介', link: '/git/' },
            { text: 'git快速入门', link: '/git/git快速入门' },
            { text: 'git标签', link: '/git/git标签' },
            { text: '写有意义的提交记录说明', link: '/git/写有意义的提交记录说明' },
            { text: '分支改进', link: '/git/分支改进' },
            { text: '暂存临时栈', link: '/git/暂存临时栈' },
            { text: '本地初始库与远程库已有库合并', link: '/git/本地初始库与远程库已有库合并' },
            { text: '通过 GitHub 托管静态文件', link: '/git/通过 GitHub 托管静态文件' },
            { text: '常见问题', link: '/git/常见问题' },
            { text: 'gitea自定义issue模板', link: '/git/gitea自定义issue模板' },
          ]
        }
      ],
    },


    socialLinks: [
      { icon: 'github', link: 'https://github.com/yan-sheng-li' },
    ]
  }
})
