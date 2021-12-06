<template>
  <div class="nav-side">
    <div class="nav-header">
      <img src="~@/assets/img/logo.svg" alt="logo" />
      <span class="title" v-if="!collapse">Vue3+ts</span>
    </div>
    <el-menu
      :default-active="defaultId"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :collapse="collapse"
      :collapse-transition="true"
    >
      <template v-for="(item, index) in menuItems" :key="item.id">
        <template v-if="item.type === 1">
          <el-sub-menu :key="item.id" :index="item.id + ''">
            <template #title>
              <section class="nav-side-icon">
                <el-icon
                  color="white"
                  size="50px"
                  :class="collapse ? 'isfold' : 'noFold'"
                  ><monitor v-if="index === 0" />
                  <setting v-if="index === 1" />
                  <shopping-cart v-if="index === 2" />
                  <promotion v-if="index === 3"
                /></el-icon>
              </section>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="item in item.children" :key="item.id">
              <el-menu-item
                :index="item.id + ''"
                @click="handleMenuClick(item)"
              >
                <span>{{ item.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onUpdated } from 'vue'
import { useStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import { Monitor, Setting, Promotion, ShoppingCart } from '@element-plus/icons'
import mapDefaultValue from '@/util/map-default-value'
export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Monitor,
    Setting,
    Promotion,
    ShoppingCart
  },
  setup(props) {
    const router = useRouter()
    const route = useRoute()
    const handleMenuClick = (item: any) => {
      router.push({
        path: item.url
      })
    }
    const store = useStore()
    const menuItems = computed(() => store.state.login.userMenu)
    const defautValue = mapDefaultValue(menuItems.value, route.path) ?? {}
    const defaultId = ref(defautValue.id + '')

    return {
      menuItems,
      Setting,
      handleMenuClick,
      defaultId
    }
  }
})
</script>

<style scoped lang="less">
.nav-side {
  background-color: #001529;
  height: 100%;
}
.el-menu {
  border-right: none;
}
.nav-header {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 4px;
  flex-flow: nowrap, row;
  align-items: center;
  img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
  }
}
.el-sub-menu__title {
  padding-left: 60px;
}
.nav-side-icon {
  height: 56px;
  position: absolute;
  .el-icon {
    position: absolute;
    right: -133px;
    top: 18px;
    transition: right, 0.3s;
    &.isfold {
      right: -17px;
    }
  }
}

.el-submenu {
  background-color: #001529 !important;
  // 二级菜单 ( 默认背景 )
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135 !important;
  }
}

::v-deep .el-submenu__title {
  display: flex;
  background-color: #001529 !important;
}

// hover 高亮
.el-menu-item:hover {
  color: #fff !important; // 菜单
}

.el-menu-item.is-active {
  color: #fff !important;
  background-color: #0a60bd !important;
}
</style>
