export default function mapDefaultValue(menu: any[], routeUrl: string): any {
  const breadcrumbD: any[] = []
  for (const menuItem of menu) {
    if (menuItem.type === 1) {
      const findMenu = mapDefaultValue(menuItem.children, routeUrl)
      if (findMenu) {
        breadcrumbD.push({ name: menuItem.name, path: menuItem.url })
        breadcrumbD.push({ name: findMenu.name, path: findMenu.url })
        return breadcrumbD
      }
    } else if (menuItem.type === 2 && menuItem.url === routeUrl) {
      return menuItem
    }
  }
}
