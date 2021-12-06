import { ref } from 'vue'
import { dialogFormConfig } from '@/pages/main/system/user/config/dialog-config'
import pageModal from '@/components/src/page-modal/src/modal.vue'
export function useNewEdit(editCallback: any) {
  const defaultValue: any = ref({})
  const dialogRef = ref<InstanceType<typeof pageModal>>()
  function passwordInput(isHidden: boolean) {
    const result = dialogFormConfig.itemMenus.find((item: any) => {
      return item.filed == 'password'
    })
    result!.isHidden = isHidden
  }
  const handleNewButton = () => {
    for (const key in defaultValue.value) {
      defaultValue.value[key] = ''
    }
    defaultValue.value.password = ''
    passwordInput(false)
    if (dialogRef.value) {
      dialogRef.value.dialogVisible = true
    }
  }
  const handleEditButton = (item: any) => {
    for (const key in item) {
      defaultValue.value[key] = item[key]
    }
    editCallback(item)
    if (dialogRef.value) {
      dialogRef.value.dialogVisible = true
    }
    passwordInput(true)
  }
  return [handleEditButton, handleNewButton, defaultValue, dialogRef]
}
