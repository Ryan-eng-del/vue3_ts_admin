import RDform from '@/base-ui/form/type'
export const searchFormConfig: RDform = {
  labelWidth: '120px',
  itemMenus: [
    {
      filed: 'name',
      type: 'input',
      labelName: '角色名称',
      placeholder: '请输入角色名称'
    },
    {
      filed: 'intro',
      type: 'input',
      labelName: '权限介绍',
      placeholder: '请输入权限介绍'
    }
  ],
  layoutStyle: {
    xl: 12,
    lg: 12,
    md: 12,
    sm: 24,
    xs: 24
  }
}

export default searchFormConfig
