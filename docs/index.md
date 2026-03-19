---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "木子空间-文档集"
  # text: "A VitePress Site"
  # tagline: My great project tagline
  actions:
    - theme: brand
      text: 服务大厅
      link: https://liyansheng.top/pc/home
    # - theme: alt
    #   text: Vue
    #   link: /vue

# features:
#   - title: Feature A
#     details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
#   - title: Feature B
#     details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
#   - title: Feature C
#     details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---

<script setup>
const socials = [
  {
    title: "Gitee",
    platform: "gitee",
    img: "http://cdn.qiniu.liyansheng.top/img/image-20260117225444147.png",
    link: "https://gitee.com/yan-sheng-li"
  },
  {
    title: "闲鱼",
    platform: "xianyu",
    img: "http://cdn.qiniu.liyansheng.top/img/image-20260117225341405.png",
    link: "http://cdn.qiniu.liyansheng.top/img/20250423150441.png"
  },
  {
    title: "小程序商店",
    platform: "miniprogram",
    img: "http://cdn.qiniu.liyansheng.top/img/image-20260117225353909.png",
    link: "https://cdn.qiniu.liyansheng.top/img/20250423145452.png"
  },
  {
    title: "小红书",
    platform: "xiaohongshu",
    img: "http://cdn.qiniu.liyansheng.top/img/image-20260117225104400.png",
    link: "https://www.xiaohongshu.com/user/profile/668f634100000000030315a1"
  },
  {
    title: "GitHub",
    platform: "github",
    img: "http://cdn.qiniu.liyansheng.top/img/image-20260117225453253.png",
    link: "https://github.com/yan-sheng-li"
  },
  {
    title: "CSDN博客",
    platform: "csdn",
    img: "http://cdn.qiniu.liyansheng.top/img/image-20260117225435273.png",
    link: "https://blog.csdn.net/weixin_44107140"
  }
];
</script>

<SocialMarquee :items="socials" :duration="10" />