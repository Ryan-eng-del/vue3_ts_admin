<template>
  <div class="rd-card">
    <section class="title">{{ title }}</section>
    <section class="echarts">
      <slot name="echarts"></slot>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
section.title {
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 15px;
  letter-spacing: 6px;
}
section.echarts {
  background-color: white;
  box-shadow: 3px 2px 10px rgba(0, 0, 0, 0.4);
}
</style>
