<template>
  <div class="goods">
    <page-table :tableConfig="contentTableConfig" pageName="goods">
      <template #imgUrl="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        ></el-image>
      </template>
    </page-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PageTable } from '@/components/src'
import { contentTableConfig } from './config'
export default defineComponent({
  name: 'goods',
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

<style scoped>
.goods {
  margin-top: 30px;
}
</style>
