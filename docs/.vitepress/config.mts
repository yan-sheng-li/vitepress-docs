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
        ]
      }
    ],

    sidebar: {
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
    },


    socialLinks: [
      { icon: 'github', link: 'https://github.com/yan-sheng-li' },
    ]
  }
})
