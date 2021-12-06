import { useStore } from '@/store'
export default function (pageName: string, handleName: string) {
  const store = useStore()
  const usePermissions = store.state.login.permissions
  const verifyPermissions = `system:${pageName}:${handleName}`
  return !!usePermissions.find((item) => {
    return item == verifyPermissions
  })
}
