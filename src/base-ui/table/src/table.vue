<template>
  <div class="table">
    <div class="table-header">
      <div class="title">{{ tableConfig.title }}</div>
      <div class="table-handler">
        <slot name="tableHandler"></slot>
      </div>
    </div>
    <el-table
      :data="tableListData"
      style="width: 100%"
      border
      v-bind="tableConfig.childrenProps"
    >
      <el-table-column
        v-if="tableConfig.showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <el-table-column
        v-if="tableConfig.showSelectColumn"
        type="selection"
        align="center"
        width="80"
      ></el-table-column>
      <template v-for="propItem in tableConfig.propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :row="scope.row" :name="propItem.prop">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="table-footer" v-if="tableConfig.showFooter">
      <slot name="tableFooter">
        <el-pagination
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageInfo.pageSize"
          :current-page="pageInfo.currentPage == 0 ? 1 : pageInfo.currentPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="100"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageTable from '@/components/src/page-table/page-table.vue'
export default defineComponent({
  props: {
    tableConfig: {
      type: Object,
      required: true
    },
    tableListData: {
      type: Array,
      required: true
    },
    listCount: {
      type: Number,
      required: true
    },
    pageInfo: {
      type: Object,
      required: true,
      default: () => ({ currentPage: 1, pageSize: 10 })
    }
  },
  // emits 和 emit 连用来发送事件
  // updata:name中间不可以有空格
  emits: ['update:pageInfo'],
  setup(props, { emit }) {
    const handleSizeChange = (pageSize: number) => {
      // 更新了Prop

      emit('update:pageInfo', { ...props.pageInfo, pageSize })
    }
    const handleCurrentChange = (currentPage: number) => {
      emit('update:pageInfo', { ...props.pageInfo, currentPage })
    }
    return {
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="less">
.table {
  min-width: 700px;
}
.table-footer {
  margin-top: 20px;
}
.table-header {
  .title {
    font-weight: 700;
    flex: 1;
    padding-bottom: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    letter-spacing: 20px;
    padding-left: 85px;
  }
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
</style>
