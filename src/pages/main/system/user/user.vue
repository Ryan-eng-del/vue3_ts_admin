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
      <dialog-component
        :defaultValue="defaultValue"
        ref="dialogRef"
        :dialogConfig="dialogConfig"
        :dialogConfigNew="dialogConfigNew"
      ></dialog-component>
      <table-component
        :tableConfig="contentTableConfig"
        pageName="users"
        @handleNewButton="handleNewButton"
        @handleEditButton="handleEditButton"
      >
      </table-component>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onUpdated, inject } from 'vue'
import FormComponent from '@/components/src/page-form/page-form.vue'
import DialogComponent from '@/components/src/page-modal/page-modal.vue'
import formFormat from './config/form-config'
import { contentTableConfig } from './config/table-config'
import { dialogConfig, dialogFormConfig } from './config/dialog-config'
import TableComponent from '@/components/src/page-table/page-table.vue'
import pageSearch from '@/hooks/page-search'
import { useStore } from '@/store'
import Modal from '@/base-ui/modal/src/modal.vue'
import { useNewEdit } from '@/hooks/useNewEdit'
export default defineComponent({
  name: 'user',
  components: {
    FormComponent,
    TableComponent,
    DialogComponent
  },
  setup() {
    const store = useStore()
    const [handleResetBtn, handleSearchBtn] = pageSearch()

    const dialogConfigNew = computed(() => {
      const departmentResult = dialogFormConfig.itemMenus.find((item: any) => {
        return item.filed == 'departmentId'
      })
      if (departmentResult) {
        departmentResult.options = store.state.entireDepartment.map(
          (item: any) => {
            return { label: item.name, value: item.id }
          }
        )
      }
      const roleListResult = dialogFormConfig.itemMenus.find((item: any) => {
        return item.filed == 'roleId'
      })
      if (roleListResult) {
        roleListResult.options = store.state.entireRole.map((item: any) => {
          return { label: item.name, value: item.id }
        })
      }

      return dialogFormConfig
    })
    const [handleEditButton, handleNewButton, defaultValue, dialogRef] =
      useNewEdit(undefined)
    return {
      formFormat,
      contentTableConfig,
      handleResetBtn,
      handleSearchBtn,
      handleNewButton,
      dialogRef,
      dialogConfig,
      handleEditButton,
      defaultValue,
      dialogConfigNew
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
