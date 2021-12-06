import RDform from '@/base-ui/form/type'
export const searchFormConfig: RDform = {
  labelWidth: '120px',
  itemMenus: [
    {
      filed: 'id',
      type: 'input',
      labelName: 'id',
      placeholder: '请输入id'
    },
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
      filed: 'cellphone',
      type: 'input',
      labelName: '电话号码',
      placeholder: '请输入电话号码'
    },
    {
      filed: 'enable',
      type: 'select',
      labelName: '用户状态',
      placeholder: '请选择用户状态',
      options: [
        { title: '启用', value: 1 },
        { title: '禁用', value: 0 }
      ]
    }
  ],
  layoutStyle: {
    xl: 8,
    lg: 8,
    md: 12,
    sm: 24,
    xs: 24
  }
}
export default searchFormConfig
