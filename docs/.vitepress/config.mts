import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/docs/',
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
    },


    socialLinks: [
      { icon: 'github', link: 'https://github.com/yan-sheng-li' },
    ]
  }
})
