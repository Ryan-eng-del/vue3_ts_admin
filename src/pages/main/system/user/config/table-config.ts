export const contentTableConfig = {
  title: '用户列表',
  showIndexColumn: true,
  showSelectColumn: true,
  propList: [
    { prop: 'name', label: '用户名', minWidth: '100' },
    { prop: 'realname', label: '真实姓名', minWidth: '100' },
    { prop: 'cellphone', label: '手机号码', maxWidth: '150' },
    { prop: 'enable', label: '状态', maxWidth: '80', slotName: 'enable' },
    {
      prop: 'createAt',
      label: '创建时间',
      maxWidth: '300',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      maxWidth: '300',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '120', slotName: 'handler', prop: 'handler' }
  ],
  showFooter: true
}
