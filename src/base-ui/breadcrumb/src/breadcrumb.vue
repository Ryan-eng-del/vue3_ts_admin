<template>
  <div class="breadcrumb">
    <el-breadcrumb>
      <el-breadcrumb-item
        :to="{ path: '/' }"
        v-for="item in data"
        :key="item.name"
        >{{ item.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
