import { ref } from 'vue'
import PageTable from '@/components/src/page-table/page-table.vue'
export default function () {
  const PageTableRef = ref<InstanceType<typeof PageTable>>()
  const handleResetBtn = () => {
    // 重置之后发送请求 在重新请求
  }
  const handleSearchBtn = (queryInfo: any) => {
    // PageTable.getPageData(queryInfo
    // 点击搜索之后拿着用户的搜索字段去模糊搜索
    PageTableRef.value?.getPageData(queryInfo)
  }
  return [handleResetBtn, handleSearchBtn, PageTableRef]
}
// 这里有一个问题就是拿不到另一个组件当中的网络请求函数
