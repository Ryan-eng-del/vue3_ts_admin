<template>
  <div class="panel-login">
    <login-tab></login-tab>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginTab from './login-tab.vue'
export default defineComponent({
  components: {
    LoginTab
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
div.panel-login {
  padding: 60px 30px 20px 30px;
  box-sizing: border-box;
  width: 700px;
  height: 450px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 13px;
  margin-top: 20px;
  box-shadow: 0 0 18px rgba(255, 255, 255, 0.8);
}
</style>
