<template>
  <div>
    <table-base
      :tableListData="userList"
      :tableConfig="tableConfig"
      :listCount="userCount"
      v-model:pageInfo="pageInfo"
    >
      // 公共插槽
      <template #tableHandler>
        <el-button
          type="primary"
          size="medium"
          v-if="isCreate"
          @click="createUserClick"
          >新建用户</el-button
        >
      </template>
      <template #enable="scope">
        <el-button type="primary" size="mini" plain>
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #handler="scope">
        <section class="handle-btn">
          <el-button
            size="mini"
            type="primary"
            plain
            v-if="isUpdate"
            @click="handleEditClick(scope.row)"
            >编辑 <el-icon><Edit /></el-icon>
          </el-button>
          <el-button
            size="mini"
            type="danger"
            plain
            v-if="isDelete"
            @click="handleDeleteClick(scope.row)"
            >删除
            <el-icon><Delete /></el-icon>
          </el-button>
        </section>
      </template>
      <template #updateAt="scope">
        {{ formatUtcString(scope.row.updateAt) }}
      </template>
      <template #createAt="scope">
        {{ formatUtcString(scope.row.createAt) }}
      </template>
      // 在pageContent当中动态的插入剩余的插槽, 实现在page层 传入slot实例,
      由page-table完成到base-ui的跨组件插槽,
      本质上就是在在映射一层template给base-ui在template当中插入插槽,实现page页面的插入slot实例,
      就是利用这一层template作为桥梁,使得page和baseui之间实现了跨组件插槽
      <template
        v-for="item in otherProps"
        #[item.prop]="scope"
        :key="item.label"
      >
        <slot :name="item.prop" :row="scope.row"></slot>
      </template>
    </table-base>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'
import { Delete, Edit } from '@element-plus/icons'
import { formatUtcString } from '@/util/date-format'
import TableBase from '@/base-ui/table/src/table.vue'
import usePermissions from '@/hooks/usePermissions'
import pageModal from '@/components/src/page-modal/page-modal.vue'
export default defineComponent({
  props: {
    tableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    TableBase,
    Edit,
    Delete
  },
  emits: ['handleNewButton', 'handleEditButton'],
  setup(props, { emit }) {
    const store = useStore()
    const pageInfo = ref({ currentPage: 0, pageSize: 10 })
    watch(pageInfo, () => getPageData())
    // 获取权限
    const isCreate = usePermissions(props.pageName, 'create')
    const isUpdate = usePermissions(props.pageName, 'update')
    const isDelete = usePermissions(props.pageName, 'delete')
    const isQuery = usePermissions(props.pageName, 'query')
    // 优化多次请求一个函数 switch case 或者是和后端商量好了之后 直接拼接字符串
    let getPageData = (queryInfo: any = {}): void => {
      store.dispatch('system/getPageListAction', {
        // pageUrl: '/users/list',
        pageName: props.pageName,
        queryInfo: {
          offset:
            pageInfo.value.currentPage == 1
              ? 0
              : pageInfo.value.currentPage * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()
    const userList = computed(() =>
      store.getters[`system/getListData`](props.pageName)
    )
    const userCount = computed(() =>
      store.getters[`system/getListCount`](props.pageName)
    )
    const otherProps = props.tableConfig.propList.filter((item: any) => {
      if (item.prop === 'enable') return false
      if (item.prop === 'createAt') return false
      if (item.prop === 'updateAt') return false
      if (item.prop === 'handler') return false
      return true
    })
    const handleDeleteClick = (item: any) => {
      store.dispatch('system/deletePageAction', {
        id: item.id,
        pageName: props.pageName
      })
    }
    const handleEditClick = (item: any) => {
      emit('handleEditButton', item)
    }
    const createUserClick = () => {
      emit('handleNewButton')
    }
    return {
      userList,
      formatUtcString,
      userCount,
      pageInfo,
      getPageData,
      otherProps,
      isCreate,
      isUpdate,
      isDelete,
      isQuery,
      handleDeleteClick,
      createUserClick,
      handleEditClick
    }
  }
})
</script>

<style scoped>
.handle-btn {
  display: flex;
  justify-content: center;
}
</style>
