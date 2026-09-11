import { defineConfig } from 'vitepress'

export default defineConfig({
  // ⚠️ 部署到 GitHub Pages 时，base 必须是 '/你的仓库名/'
  // 例如仓库叫 study-notes，就写 '/study-notes/'
  // 如果仓库名是 用户名.github.io，则写 '/'
  base: '/study-notes/',

  title: "我的计算机学习笔记",
  description: "专升本计算机、Python、CTF Pwn 学习记录",

  themeConfig: {
    // 顶部导航栏
    nav: [
      { text: "首页", link: "/" },
      { text: "Python", link: "/python/1-python基础" },
      { text: "CTF Pwn", link: "/pwn/栈溢出入门" },
      { text: "专升本数学", link: "/math/高等数学" }
    ],

    // 左侧侧边栏
    sidebar: [
      {
        text: "Python 学习",
        items: [
          { text: "Python 基础入门", link: "/python/1-python基础" }
        ]
      },
      {
        text: "CTF Pwn",
        items: [
          { text: "栈溢出入门", link: "/pwn/栈溢出入门" }
        ]
      },
      {
        text: "专升本数学",
        items: [
          { text: "高等数学", link: "/math/高等数学" }
        ]
      }
    ],

    // 社交链接（改成你自己的）
    socialLinks: [
      { icon: 'github', link: 'https://github.com/你的用户名' }
    ],

    // 页脚
    footer: {
      message: '用 VitePress + GitHub Pages 搭建',
      copyright: 'Copyright © 2026 我的学习笔记'
    },

    // 搜索功能
    search: {
      provider: 'local'
    }
  }
})
