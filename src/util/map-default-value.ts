export default function mapDefaultValue(menu: any[], routeUrl: string): any {
  for (const menuItem of menu) {
    if (menuItem.type === 1) {
      const findMenu = mapDefaultValue(menuItem.children ?? [], routeUrl)
      if (findMenu) {
        return findMenu
      }
    } else {
      if (menuItem.type === 2 && menuItem.url === routeUrl) {
        return menuItem
      }
    }
  }
}
