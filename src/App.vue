<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({})
</script>

<style lang="less">
body {
  user-select: none;
}
div.app {
  height: 100%;
}
</style>
