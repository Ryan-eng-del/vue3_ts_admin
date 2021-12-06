export const contentTableConfig = {
  title: '商品列表',
  propList: [
    { prop: 'name', label: '商品名称', minWidth: '80' },
    { prop: 'oldPrice', label: '原价格', minWidth: '80', slotName: 'oldPrice' },
    { prop: 'newPrice', label: '现价格', minWidth: '80' },
    { prop: 'imgUrl', label: '商品图片', minWidth: '100', slotName: 'image' },
    { prop: 'enable', label: '状态', minWidth: '100', slotName: 'enable' },
    {
      prop: 'createAt',
      label: '创建时间',
      maxWidth: '200',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      maxWidth: '200',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '120', slotName: 'handler', prop: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: true,
  showFooter: true
}
