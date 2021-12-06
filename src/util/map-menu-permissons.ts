export default function (menu: any): any[] {
  const permissionCollection: string[] = []
  function _curseGetPermissons(useMenu: any[]) {
    useMenu.forEach((item: any) => {
      if (item.type === 1 || item.type === 2) {
        _curseGetPermissons(item.children ?? [])
      } else if (item.type === 3) {
        permissionCollection.push(item.permission)
      }
    })
  }
  _curseGetPermissons(menu)
  return permissionCollection
}
