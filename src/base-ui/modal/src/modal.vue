<template>
  <div class="modal">
    <el-dialog
      v-model="centerDialogVisible"
      :title="modalTitle"
      width="30%"
      center
      @close="handleCancelClick"
    >
      <page-content
        :formItemStyle="[dialogConfigNew]"
        v-model="formDataValue"
        :datas="formDataValue"
      ></page-content>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancelClick">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
      <slot name="bottom"></slot>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref, watch, watchEffect } from 'vue'
import PageContent from '@/base-ui/form/src/form.vue'
export default defineComponent({
  components: {
    PageContent
  },
  props: {
    modalTitle: {
      type: String,
      default: ''
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      defalut: () => ({})
    },
    pageName: {
      type: String,
      default: ''
    },
    dialogConfigNew: {
      type: Object
    }
  },
  emits: ['confirmCancelClick', 'createDataClick', 'editDataClick'],
  setup(props: any, { emit }) {
    const centerDialogVisible = ref(false)
    const formDataValue: any = ref({})
    watch(
      () => props.formData,
      (newValue: any) => {
        for (const key in props.formData)
          formDataValue.value[`${key}`] = newValue[key]
      },
      { deep: true }
    )
    watch(
      () => props.dialogVisible,
      (newValue) => {
        centerDialogVisible.value = newValue
      }
    )
    const handleCancelClick = () => {
      centerDialogVisible.value = false
      emit('confirmCancelClick')
    }
    const handleConfirmClick = () => {
      centerDialogVisible.value = false
      let length = Object.keys(props.formData).length
      if (length == 0) {
        emit('createDataClick', formDataValue)
      } else {
        emit('editDataClick', formDataValue)
      }
      emit('confirmCancelClick')
    }
    return {
      centerDialogVisible,
      handleCancelClick,
      handleConfirmClick,
      formDataValue
    }
  }
})
</script>

<style scoped></style>
