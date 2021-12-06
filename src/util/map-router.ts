import { RouteRecordRaw } from 'vue-router'
let firstMenu: any = null
function mapMenuRouter(menuRole: any[]): RouteRecordRaw[] {
  const allRoutes: RouteRecordRaw[] = []
  const routes: RouteRecordRaw[] = []
  const routeFiles = require.context('../route/main', true, /.ts$/)
  // 将所有路由导入allRoutes的数组当中
  routeFiles.keys().forEach((item) => {
    const routes = require('../route/main' + item.split('.')[1])
    allRoutes.push(routes.default)
  })
  // 根据角色返回菜单
  const _recurseGetMenu = (menu: any[]): void => {
    for (const item of menu) {
      if (item.type === 2) {
        // find方法返回符合条件的第一个值
        const route = allRoutes.find((child) => {
          return child.path === item.url
        })
        if (route) routes.push(route)
        if (!firstMenu) firstMenu = route
      } else {
        _recurseGetMenu(item.children)
      }
    }
  }
  _recurseGetMenu(menuRole)
  return routes
}
export default mapMenuRouter
export { firstMenu }
