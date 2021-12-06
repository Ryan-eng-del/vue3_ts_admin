<template>
  <div class="login-cover">
    <div class="content">
      <h2>RD后台管理系统</h2>
      <login-panel-component></login-panel-component>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginPanelComponent from './cpn/login-panel.vue'
export default defineComponent({
  components: {
    LoginPanelComponent
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
div.login-cover {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: url('../../assets/img/bg-login-4.jpg') center/cover;
  .content {
    position: relative;
    bottom: 80px;
  }
  // backgruond-size 只能在background-position之后
  h2 {
    color: white;
    text-shadow: 1px 1px 15px;
    font-size: 40px;
    text-align: center;
    letter-spacing: 15px;
  }
}
</style>
