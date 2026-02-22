import { defineConfig } from 'vitepress'
import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'

// 自动生成侧边栏
function getSidebar(dir: string): { text: string; link: string }[] {
  const fullPath = resolve(process.cwd(), 'docs', dir)

  let files: string[] = []
  try {
    files = readdirSync(fullPath)
  } catch (err) {
    console.warn(`目录不存在: ${fullPath}`)
    return []
  }

  return files
    .filter(file => file.endsWith('.md') && file !== 'index.md')
    .sort() // 按文件名排序
    .map(file => ({
      text: file.replace('.md', ''),
      link: `/${dir}/${file.replace('.md', '')}`
    }))
}

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
    search: { provider: 'local' },

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
          { text: 'uniapp', link: '/uniapp/' }
        ]
      },
      {
        text: '后端',
        items: [
          { text: 'Java', link: '/Java/' },
          { text: 'Javaee', link: '/Javaee/' },
          { text: 'SpringBoot', link: '/springboot/' },
          { text: 'Mybatis', link: '/mybatis/' },
          { text: 'nodejs', link: '/nodejs/' },
          { text: 'Python', link: '/Python/' },
          { text: 'Java swing', link: '/swing/' }
        ]
      },
      {
        text: '综合',
        items: [
          { text: 'Git', link: '/git/' },
          { text: 'Linux', link: '/Linux/' },
          { text: 'ElasticSearch', link: '/elastic-search/' },
          { text: 'Kafka', link: '/kafka/' },
          { text: 'MySQL', link: '/MySQL/' }

        ]
      },
      {
        text: '其他',
        items: [
          { text: 'tool', link: '/tool/' },
        ]
      }

    ],

    // 自动生成侧边栏
    sidebar: {
      '/Js/': [
        { text: 'Js 系列', items: getSidebar('Js') }
      ],
      '/uniapp/': [
        { text: 'uniapp 系列', items: getSidebar('uniapp') }
      ],
      '/tool/': [
        { text: '工具', items: getSidebar('tool') }
      ],
      '/swing/': [
        { text: 'swing 系列', items: getSidebar('swing') }
      ],
      '/Python/': [
        { text: 'Python 系列', items: getSidebar('Python') }
      ],
      '/Linux/': [
        { text: 'Linux 系列', items: getSidebar('Linux') }
      ],
      '/nodejs/': [
        { text: 'nodejs 系列', items: getSidebar('nodejs') }
      ],
      '/MySQL/': [
        { text: 'MySQL 系列', items: getSidebar('MySQL') }
      ],
      '/mybatis/': [
        { text: 'mybatis 系列', items: getSidebar('mybatis') }
      ],
      '/Java/': [
        { text: 'Java 系列', items: getSidebar('Java') }
      ],
      '/Javaee/': [
        { text: 'Javaee 系列', items: getSidebar('Javaee') }
      ],
      '/springboot/': [
        { text: 'SpringBoot 系列', items: getSidebar('springboot') }
      ],
      '/kafka/': [
        { text: 'Kafka 系列', items: getSidebar('kafka') }
      ],
      '/vue/': [
        { text: 'Vue 系列', items: getSidebar('vue') }
      ],
      '/docker/': [
        { text: 'Docker 系列', items: getSidebar('docker') }
      ],
      '/微信小程序/': [
        { text: '微信小程序系列', items: getSidebar('微信小程序') }
      ],
      '/css/': [
        { text: 'CSS 系列', items: getSidebar('css') }
      ],
      '/git/': [
        { text: 'Git 系列', items: getSidebar('git') }
      ],
      '/elastic-search/': [
        { text: 'ElasticSearch 系列', items: getSidebar('elastic-search') }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yan-sheng-li' },
    ]
  }
})