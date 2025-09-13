/**
 * 常量路由配置
 * 分离出来避免循环依赖问题
 */

export const constantRoutes = [
  {
    path: '',
    component: 'Default', // 使用字符串标识，避免直接导入
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
    component: 'Default', // 使用字符串标识
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
