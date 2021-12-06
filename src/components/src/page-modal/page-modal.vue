<template>
  <div>
    <dialog-component
      v-bind="dialogConfig"
      :dialogVisible="dialogVisible"
      @confirmCancelClick="confirmCancelClick"
      :formData="formData"
      @createDataClick="createDataClick"
      @editDataClick="editDataClick"
      :dialogConfigNew="dialogConfigNew"
    >
      <template #bottom>
        <slot name="bottom"></slot>
      </template>
    </dialog-component>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import DialogComponent from '@/base-ui/modal/src/modal.vue'
import { useStore } from '@/store'
export default defineComponent({
  props: {
    dialogConfig: {
      type: Object,
      required: true
    },
    defaultValue: {
      type: Object,
      required: true
    },
    dialogConfigNew: {
      type: Object
    },
    propsRef: {
      default: null
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    DialogComponent
  },
  setup(props) {
    const dialogVisible = ref(false)
    const store = useStore()
    const formData: any = ref({})
    watch(
      () => props.defaultValue,
      (newValue) => {
        for (const key in props.defaultValue) {
          formData.value[`${key}`] = newValue[key]
        }
      },
      { deep: true }
    )
    const confirmCancelClick = () => {
      dialogVisible.value = false
    }
    const createDataClick = (newData: any) => {
      console.log({ ...props.otherInfo }, '创建前')
      store.dispatch('system/createPageDataAction', {
        pageName: props.dialogConfig.pageName,
        newData: { ...newData.value, ...props.otherInfo }
      })
    }
    const editDataClick = (editData: any) => {
      console.log({ ...props.otherInfo }, '编辑前')
      store.dispatch('system/editPageDataAction', {
        pageName: props.dialogConfig.pageName,
        editData: { ...editData.value, ...props.otherInfo },
        id: props.defaultValue.id
      })
    }

    return {
      dialogVisible,
      confirmCancelClick,
      formData,
      createDataClick,
      editDataClick
    }
  }
})
</script>

<style scoped></style>
