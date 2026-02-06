import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/vitepress-docs/',
  lang: 'zh-CN',
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
            { text: '前后端一键docker启动', link: '/docker/前后端一键docker启动' },
          ]
        }
      ],
      /**
       *       '/微信小程序/': [
        {
          title: '微信小程序',
          collapsable: false,
          children: [
            '微信登录',
            '选择位置',
            '请求发起封装',
            'picker选择器',
            '常用API汇总'
          ]
        },
      ],
       */
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
    },


    socialLinks: [
      { icon: 'github', link: 'https://github.com/yan-sheng-li' },
    ]
  }
})
