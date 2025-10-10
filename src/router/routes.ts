/**
 * 常量路由配置
 * 分离出来避免循环依赖问题
 */

import LayoutDefault from '@/components/layout/layout-default'
import LayoutInnerLink from '@/components/layout/layout-inner-link'
import LayoutParentView from '@/components/layout/layout-parent-view'

export const constantRoutes = [
  {
    path: '',
    component: LayoutDefault, // 使用字符串标识，避免直接导入
    redirect: '/home',
    mergeSingleChild: true,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/pages/home/home-page'),
        meta: { title: '首页', icon: 'shell', affix: true },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('@/pages/login/login-page'),
  },
  {
    path: '/register',
    name: 'Register',
    hidden: true,
    component: () => import('@/pages/register/register-page'),
  },
  {
    path: '/user',
    redirect: 'noredirect',
    hidden: true,
    component: LayoutDefault, // 使用字符串标识
    children: [
      {
        path: 'profile',
        component: () => import('@/pages/user/user-page'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    hidden: true,
    component: () => import('@/pages/error/404'),
  },
  {
    path: '/401',
    name: '401',
    hidden: true,
    component: () => import('@/pages/error/401'),
  },
  {
    path: '/divider',
    name: 'Divider',
    hidden: true,
    component: () => import('@/pages/divider/divider-page'),
  },
  {
    path: '/switch',
    name: 'Switch',
    hidden: true,
    component: () => import('@/pages/switch/switch-page'),
  },
]

export const permissionRoutes = [
  {
    path: '/about',
    name: 'About',
    component: LayoutDefault,
    mergeSingleChild: true,
    children: [
      {
        path: 'base',
        name: 'AboutBase',
        component: () => import('@/pages/about/about-page'),
        meta: {
          title: '关于',
          icon: 'user-search',
        },
      },
    ],
  },
  {
    path: '/icon',
    name: 'Icon',
    component: LayoutDefault,
    mergeSingleChild: true,
    children: [
      {
        path: 'base',
        name: 'IconBase',
        component: () => import('@/pages/icon/icon-page'),
        meta: {
          title: '图标',
          icon: 'audio-waveform',
        },
      },
    ],
  },
  {
    path: '/table',
    name: 'Table',
    component: LayoutDefault,
    meta: {
      title: '表格',
      icon: 'table',
    },
    children: [
      {
        path: 'base',
        name: 'TableBase',
        component: () => import('@/pages/table/base-table/base-table-page'),
        meta: {
          title: '基础表格',
          icon: 'table',
        },
      },
      {
        path: 'data-table',
        name: 'TableDataTable',
        component: () => import('@/pages/table/data-table/data-table-page'),
        meta: {
          title: '数据表格',
          icon: 'table',
        },
      },
      {
        path: 'sort-table',
        name: 'TableSortTable',
        component: () => import('@/pages/table/sort-table/sort-table-page'),
        meta: {
          title: '排序表格',
          icon: 'table',
        },
      },
      {
        path: 'sort-table2',
        name: 'TableSortTable2',
        component: () => import('@/pages/table/sort-table/sort-table2-page'),
        meta: {
          title: '排序表格2',
          icon: 'table',
        },
      },
    ],
  },
  {
    path: '/form',
    name: 'Form',
    component: LayoutDefault,
    meta: {
      title: '表单',
      icon: 'table',
    },
    children: [
      {
        path: 'n-base',
        name: 'FormNBase',
        component: () => import('@/pages/form/form-demo-page'),
        meta: {
          title: 'Naive表单示例',
          icon: 'table',
        },
      },
      {
        path: 'base',
        name: 'FormBase',
        component: () => import('@/pages/form/form-page'),
        meta: {
          title: '表单示例',
          icon: 'table',
        },
      },
      {
        path: 'x-form',
        name: 'FormXForm',
        component: () => import('@/pages/form/x-form-demo-page'),
        meta: {
          title: 'XForm 组件',
          icon: 'form-input',
        },
      },
    ],
  },
  {
    path: '/modal',
    name: 'Modal',
    component: LayoutDefault,
    mergeSingleChild: true,
    children: [
      {
        path: 'base',
        name: 'ModalBase',
        component: () => import('@/pages/modal/modal-page'),
        meta: {
          title: 'Modal 弹框',
          icon: 'table',
        },
      },
    ],
  },
  {
    path: '/tabs',
    name: 'Tabs',
    component: LayoutDefault,
    mergeSingleChild: true,
    children: [
      {
        path: 'base',
        name: 'TabsBase',
        component: () => import('@/pages/tabs/tabs-page'),
        meta: {
          title: 'Tabs 标签页',
          icon: 'tabs',
        },
      },
    ],
  },
  {
    path: '/request',
    name: 'Request',
    component: LayoutDefault,
    mergeSingleChild: true,
    children: [
      {
        path: 'base',
        name: 'RequestBase',
        component: () => import('@/pages/request/request-page'),
        meta: {
          title: '请求示例',
          icon: 'arrow-up-right',
        },
      },
    ],
  },
  {
    path: '/system',
    name: 'System',
    redirect: '/system',
    component: LayoutDefault,
    meta: {
      title: '系统管理',
      icon: 'settings',
    },
    children: [
      {
        path: 'user',
        name: 'SystemUser',
        component: () => import('@/pages/system/user/user-page.vue'),
        meta: {
          title: '用户管理',
          icon: 'user',
        },
      },
      {
        path: 'role',
        name: 'SystemRole',
        component: () => import('@/pages/system/role/role-page'),
        meta: {
          title: '角色管理',
          icon: 'user-cog',
        },
      },
      {
        path: 'menu',
        name: 'SystemMenu',
        component: () => import('@/pages/system/menu/menu-page'),
        meta: {
          title: '菜单管理',
          icon: 'layout-list',
        },
      },
      {
        path: 'embed',
        name: 'SystemEmbed',
        redirect: '/system/embed',
        component: LayoutParentView,
        meta: {
          title: '内嵌网页',
          icon: 'globe',
        },
        children: [
          {
            path: 'juejin',
            name: 'SystemEmbedJuejin',
            component: LayoutInnerLink,
            meta: {
              title: '掘金',
              icon: 'link',
              link: 'https://juejin.cn/',
            },
          },
          {
            path: 'vite',
            name: 'SystemEmbedVite',
            component: LayoutInnerLink,
            meta: {
              title: 'Vite.js',
              icon: 'link',
              link: 'https://vite.dev/',
            },
          },
        ],
      },
    ],
  },
]
