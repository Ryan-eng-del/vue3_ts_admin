export const dialogConfig = {
  pageName: 'users',
  modalTitle: '新建用户'
}
export const dialogFormConfig = {
  labelWidth: '90px',
  itemMenus: [
    {
      filed: 'name',
      type: 'input',
      labelName: '用户名',
      placeholder: '请输入用户名'
    },
    {
      filed: 'realname',
      type: 'input',
      labelName: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      filed: 'password',
      type: 'password',
      labelName: '用户密码',
      placeholder: '请输入密码',
      isHidden: false
    },
    {
      filed: 'cellphone',
      type: 'input',
      labelName: '电话号码',
      placeholder: '请输入电话号码'
    },
    {
      filed: 'departmentId',
      type: 'select',
      labelName: '选择部门',
      placeholder: '请选择部门',
      options: []
    },
    {
      filed: 'roleId',
      type: 'select',
      labelName: '选择角色',
      placeholder: '请选择角色',
      options: []
    }
  ],
  colLayout: { span: 24 }
}
