<template>
  <div class="user">
    <section class="userFrom">
      <form-component
        :formItemStyle="formFormat"
        @resetButton="handleResetBtn"
        @searchButton="handleSearchBtn"
      />
    </section>
    <section class="user-table">
      <table-component
        :tableConfig="contentTableConfig"
        pageName="role"
        ref="PageTableRef"
        @handleNewButton="handleNewButton"
        @handleEditButton="handleEditButton"
      >
      </table-component>
      <page-dialog
        :defaultValue="defaultValue"
        ref="dialogRef"
        :dialogConfig="dialogConfig"
        :dialogConfigNew="dialogConfigNew"
        :otherInfo="otherInfo"
      >
        <template #bottom>
          <el-tree
            ref="elTreeRef"
            :data="menus"
            show-checkbox
            node-key="id"
            :props="{ children: 'children', label: 'name' }"
            @check="handleCheckChange"
          >
          </el-tree>
        </template>
      </page-dialog>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from '@/store'
import FormComponent from '@/components/src/page-form/page-form.vue'
import formFormat from './config/form-config'
import { contentTableConfig } from './config/table-config'
import TableComponent from '@/components/src/page-table/page-table.vue'
import pageSearch from '@/hooks/page-search'
import pageDialog from '@/components/src/page-modal/page-modal.vue'
import { dialogConfig, dialogFormConfig } from './config/dialog-config'
import { useNewEdit } from '@/hooks/useNewEdit'
import { ElTree } from 'element-plus/lib/components'
import { menuMapLeafKeys } from '@/util/map-menus'

export default defineComponent({
  name: 'user',
  components: {
    FormComponent,
    TableComponent,
    pageDialog
  },
  setup() {
    const [handleResetBtn, handleSearchBtn, PageTableRef] = pageSearch()
    const dialogConfigNew = computed(() => {
      return dialogFormConfig
    })
    // 1.处理pageModal的hook
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback: any = (item: any) => {
      const leafKeys = menuMapLeafKeys(item.menuList)
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, true)
      })
    }
    const [handleEditButton, handleNewButton, defaultValue, dialogRef] =
      useNewEdit(editCallback)
    const store = useStore()
    const menus = computed(() => store.state.entireMenu)
    const otherInfo = ref({})
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }

    return {
      formFormat,
      contentTableConfig,
      handleResetBtn,
      handleSearchBtn,
      PageTableRef,
      dialogConfigNew,
      handleEditButton,
      handleNewButton,
      defaultValue,
      dialogRef,
      dialogConfig,
      menus,
      handleCheckChange,
      otherInfo
    }
  }
})
</script>

<style scoped>
.user-table {
  margin-top: 80px;
}
.userFrom {
  padding: 35px 30px 20px 10px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.5);
  margin-top: 40px;
  background-color: rgb(240, 242, 245);
}
.user {
  padding-left: 15px;
}
</style>
