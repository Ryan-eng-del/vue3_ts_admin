<template>
  <div>
    <form-component :formItemStyle="[formItemStyle]" v-model="resultData">
      <template #header>
        <h2 class="title">高级检索</h2>
      </template>
      <template #footer>
        <el-button type="primary" size="medium" @click="handleResetAction"
          >重置</el-button
        >
        <el-button type="primary" plain @click="handleResearchAction"
          >搜索</el-button
        >
      </template>
    </form-component>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import FormComponent from '@/base-ui/form/src/form.vue'

export default defineComponent({
  components: {
    FormComponent
  },
  props: {
    formItemStyle: {
      type: Object,
      required: true
    }
  },
  emits: ['resetButton', 'searchButton'],
  setup(props, { emit }) {
    const originDataObject: any = {}
    for (const dataItem of props.formItemStyle?.itemMenus) {
      originDataObject[dataItem.filed] = ''
    }
    let resultData = ref(originDataObject)
    const handleResetAction = () => {
      for (const key in resultData.value) {
        resultData.value[key] = ''
        emit('resetButton')
      }
    }
    const handleResearchAction = () => {
      emit('searchButton', resultData.value)
    }
    return {
      resultData,
      handleResetAction,
      handleResearchAction
    }
  }
})
</script>

<style scoped>
.title {
  font-size: 45px;
  letter-spacing: 20px;
  padding-bottom: 20px;
  font-weight: 700;
  letter-spacing: 20px;
}
</style>
