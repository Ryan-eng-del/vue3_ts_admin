<template>
  <div>
    <el-tabs type="border-card" stretch class="panel-inner">
      <el-tab-pane>
        <template #label>
          <span class="title-login"> <el-icon></el-icon>账号登录 </span>
        </template>
        <login-account-input />
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span class="title-login"> <el-icon></el-icon>手机登录 </span>
        </template>
        <login-phone-input></login-phone-input>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginAccountInput from './login-account.vue'
import LoginPhoneInput from './login-phone.vue'
export default defineComponent({
  components: {
    LoginAccountInput,
    LoginPhoneInput
  },
  setup() {
    return {}
  }
})
</script>

<style>
span.title-login {
  font-size: 20px;
  letter-spacing: 10px;
  color: rgba(0, 0, 0, 0.6);
}
.panel-inner {
  border-radius: 15px;
  overflow: hidden;
}

.el-tabs--border-card > .el-tabs__header .el-tabs__item {
  height: 60px;
  line-height: 60px;
}
.el-tabs--border-card
  > .el-tabs__header
  .el-tabs__item:not(.is-disabled):hover
  span.title-login {
  color: black;
}
.el-tabs--border-card > .el-tabs__header.el-tabs__item.is-active {
  background-color: rgba(0, 0, 0, 0.3);
}
.el-tabs--border-card {
  background: #fff;
  border: 1 px solid var(--el-border-color-base);
  box-shadow: 0 8px 15px rgb(255, 255, 255, 0.7);
}
</style>
