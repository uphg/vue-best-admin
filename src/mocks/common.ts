export const routeDate = [
  {
    path: '/about',
    component: 'Default',
    mergeSingleChild: true,
    children: [
      {
        path: 'base',
        component: 'about/about-page',
        meta: {
          title: '关于',
          icon: 'user-search',
        },
      },
    ],
  },
  {
    path: '/icon',
    component: 'Default',
    mergeSingleChild: true,
    children: [
      {
        path: 'base',
        component: 'icon/icon-page',
        meta: {
          title: '图标',
          icon: 'audio-waveform',
        },
      },
    ],
  },

  {
    path: '/request',
    component: 'Default',
    mergeSingleChild: true,
    children: [
      {
        path: 'base',
        component: 'request/request-page',
        meta: {
          title: '请求示例',
          icon: 'arrow-up-right',
        },
      },
    ],
  },
  {
    path: '/system',
    redirect: 'noRedirect',
    component: 'Default',
    meta: {
      title: '系统管理',
      icon: 'settings',
    },
    children: [
      {
        path: 'user',
        component: 'system/user/user-page',
        meta: {
          title: '用户管理',
          icon: 'user',
        },
      },
      {
        path: 'role',
        component: 'system/role/role-page',
        meta: {
          title: '角色管理',
          icon: 'user-cog',
        },
      },
      {
        path: 'menu',
        component: 'system/menu/menu-page',
        meta: {
          title: '菜单管理',
          icon: 'layout-list',
        },
      },
      {
        path: 'embed',
        redirect: 'noRedirect',
        component: 'ParentView',

        meta: {
          title: '内嵌网页',
          icon: 'globe',
        },
        children: [
          {
            path: 'juejin',
            component: 'InnerLink',
            meta: { title: '掘金', icon: 'link', link: 'https://juejin.cn/' },
          },
          {
            path: 'vite',
            component: 'InnerLink',
            meta: { title: 'Vite.js', icon: 'link', link: 'https://vite.dev/' },
          },
          {
            path: 'vue',
            component: 'InnerLink',
            meta: { title: 'Vue.js', icon: 'link', link: 'https://vuejs.org/' },
          },
        ],
      },
    ],
  },
]
