<template>
  <div class="dashboard">
    <el-row>
      <el-col :span="7">
        <rd-card title="分类商品数量(饼图)">
          <template #echarts>
            <pie-charts :pieData="categoryGoodsCount"></pie-charts>
          </template>
        </rd-card>
      </el-col>
      <el-col :span="10">
        <rd-card title="不同城市商品销量">
          <template #echarts>
            <map-charts :mapData="addressGoodsSale"></map-charts>
          </template>
        </rd-card>
      </el-col>
      <el-col :span="7">
        <rd-card title="分类商品数量(玫瑰图)">
          <template #echarts>
            <role-charts :roseData="categoryGoodsCount"></role-charts>
          </template>
        </rd-card>
      </el-col>
    </el-row>
    <el-row class="second-row">
      <el-col :span="12">
        <rd-card title="分类商品的销量">
          <template #echarts>
            <line-charts v-bind="categoryGoodsSale"></line-charts>
          </template>
        </rd-card>
      </el-col>
      <el-col :span="12">
        <rd-card title="分类商品的收藏">
          <template #echarts>
            <bar-charts v-bind="categoryGoodsFavor"></bar-charts>
          </template>
        </rd-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import RdCard from '@/components/src/rd-card/src/rd-card.vue'
import PieCharts from '@/components/src/page-charts/page/pie-charts.vue'
import RoleCharts from '@/components/src/page-charts/page/role-charts.vue'
import LineCharts from '@/components/src/page-charts/page/line-echart.vue'
import BarCharts from '@/components/src/page-charts/page/bar-echart.vue'
import MapCharts from '@/components/src/page-charts/page/map-echart.vue'

export default defineComponent({
  name: 'dashboard',

  components: {
    RdCard,
    PieCharts,
    RoleCharts,
    LineCharts,
    BarCharts,
    MapCharts
  },
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item) => {
        return { name: item.name, value: item.goodsCount }
      })
    })
    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }
      return { xLabels, values }
    })
    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }
      return { xLabels, values }
    })
    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })
    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped>
.second-row {
  margin-top: 81px;
}
</style>
