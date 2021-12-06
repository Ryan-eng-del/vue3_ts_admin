<template>
  <div class="menu">
    <page-table pageName="menu" :tableConfig="contentTableConfig"></page-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PageTable } from '@/components/src'
import { contentTableConfig } from './config'
export default defineComponent({
  name: 'menus',
  components: {
    PageTable
  },
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
