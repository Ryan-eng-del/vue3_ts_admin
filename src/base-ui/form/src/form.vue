<template>
  <div class="rd-table">
    <section class="header">
      <slot name="header"></slot>
    </section>
    <el-form :label-width="formItemStyle[0].labelWidth">
      <el-row>
        <template
          v-for="item in formItemStyle[0].itemMenus"
          :key="item.labelName"
        >
          <el-col v-bind="formItemStyle[0].layoutStyle">
            <el-form-item
              :label="item.labelName"
              :rules="item.rules"
              v-if="!item.isHidden"
            >
              <template v-if="item.type == 'input' || item.type == 'password'">
                <el-input
                  v-model="formData[`${item.filed}`]"
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                ></el-input>
              </template>
              <template v-else-if="item.type == 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  v-model="formData[`${item.filed}`]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  ></el-option>
                </el-select>
              </template>
              <template v-else-if="item.type == 'datepicker'"> </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <section class="footer">
      <slot name="footer"></slot>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, provide } from 'vue'
import RDform from '../type'
export default defineComponent({
  props: {
    modelValue: {
      type: Object
    },
    formItemStyle: {
      type: Array
    },
    datas: {
      type: Object
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const formData = ref({ ...props.modelValue })

    watch(
      () => props.datas,
      (newValue: any) => {
        for (const key in props.datas) {
          formData.value[key] = newValue[key]
        }
      },
      { deep: true }
    )
    watch(
      formData,
      (newValue) => {
        emit('update:modelValue', newValue)
      },
      { deep: true }
    )
    return {
      formData
    }
  }
})
</script>

<style scoped></style>
