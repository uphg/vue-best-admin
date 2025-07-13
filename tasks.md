# Tasks

## Plugins

- [x] UnoCSS
- [x] unplugin-auto-import
- [x] unplugin-icon
- [x] vitePluginClean
- [x] msw

## Code

- [x] Base Admin Layout
- [x] 封装 HTTPCline 请求方法
- [ ] 通过 msw Mock 实现从后端路由获取菜单并根据权限渲染对应路由；

## 路由渲染

- [ ] 需要补充未添加的菜单页面，需要补充三级菜单、内嵌页面
- [ ] 需要解决 icon 导入问题

## 问题

- createSidebarMenus 方法没有生成 key，因为 key 是根据路由name 生成的，而接口获取的路由默认没有 name
- 需要线根据JSON路由生成实际路由，再根据实际路由生成对应 menus，这样就有 name，也就有 key 了
