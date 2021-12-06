export const dialogConfig = {
  pageName: 'role',
  modalTitle: '新建角色'
}
export const dialogFormConfig = {
  labelWidth: '90px',
  itemMenus: [
    {
      filed: 'name',
      type: 'input',
      labelName: '角色名',
      placeholder: '请输入角色名'
    },
    {
      filed: 'intro',
      type: 'input',
      labelName: '角色介绍',
      placeholder: '请输入角色介绍'
    }
  ],
  colLayout: { span: 24 }
}
