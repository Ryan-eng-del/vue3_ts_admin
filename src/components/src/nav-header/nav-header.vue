<template>
  <div class="nav-header">
    <breadcrumb :data="breadcrumbData"></breadcrumb>
    <section
      class="fold-btn"
      @click="handleClickAction"
      :class="isFold ? 'fold' : 'noFold'"
    >
      <el-icon class="icon-arrow" v-if="!isFold"><arrow-left-bold /> </el-icon>
      <el-icon class="icon-arrow" v-if="isFold">
        <arrow-right-bold />
      </el-icon>
    </section>
    <section class="quit-system">
      <el-button type="primary" size="mini" @click="handleQuitSystem"
        >退出系统</el-button
      >
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onUpdated } from 'vue'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons'
import breadcrumb from '@/base-ui/breadcrumb/src/breadcrumb.vue'
import localCache from '@/util/cache'
import mapBreadcrumb from '@/util/map-breadcrumb'

export default defineComponent({
  components: {
    ArrowLeftBold,
    ArrowRightBold,
    breadcrumb
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleClickAction = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    const store = useStore()
    const router = useRouter()
    const breadcrumbData = computed(() => {
      const path = useRoute().path
      const menus = store.state.login.userMenu
      return mapBreadcrumb(menus, path)
    })
    const handleQuitSystem = () => {
      localCache.deleteCache('token')
      router.push('main')
    }
    return { handleClickAction, isFold, breadcrumbData, handleQuitSystem }
  }
})
</script>

<style scoped lang="less">
div.nav-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
section.fold-btn {
  width: 20px;
  height: 35px;
  position: absolute;
  top: 50%;
  left: 210px;
  transform: translateY(-50%);
  background-color: rgb(0, 21, 41);
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  cursor: pointer;
  transition: left 0.3s;
  line-height: 35px;
  &.fold {
    left: 60px;
  }
  .icon-arrow {
    color: white;
    height: 15px;
    width: 15px;
  }
}
</style>
