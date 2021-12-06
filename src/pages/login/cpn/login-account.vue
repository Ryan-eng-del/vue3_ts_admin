<template>
  <div class="login-account">
    <el-form
      ref="formRef"
      label-width="150px"
      class="label-login"
      :rules="rules"
      :model="account"
    >
      <el-form-item label="账号:" prop="name">
        <el-input v-model="account.name" type="text"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input
          v-model="account.password"
          type="password"
          show-password
        ></el-input>
      </el-form-item>
      <div class="account-control">
        <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
        <el-link type="primary">忘记密码</el-link>
      </div>

      <el-form-item>
        <el-button type="primary" @click="handleClickAction">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElForm } from 'element-plus/lib/components'
import { useStore } from 'vuex'

import { rules } from '../config/input-rules'
import localCache from '@/util/cache'
export default defineComponent({
  setup() {
    const store = useStore()
    const isKeepPassword = ref(true)
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()
    const handleClickAction = () => {
      formRef.value?.validate((valid) => {
        if (valid) {
          if (isKeepPassword.value) {
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          }

          // 登录
          store.dispatch('login/accountLoginAction', { ...account })
        }
      })
    }
    return {
      account,
      rules,
      isKeepPassword,
      handleClickAction,
      formRef
    }
  }
})
</script>

<style>
.account-control {
  display: flex;
  justify-content: space-between;
  width: 350px;
  height: 40px;
  margin: 0 auto;
  padding: 0 0 8px 34px;
}
.el-form-item__label {
  color: #666;
  letter-spacing: 10px;
  font-size: 17px;
}
.el-input {
  width: 350px;
}
.login-account {
  padding-top: 25px;
}
.el-button__text--expand {
  position: relative;
  width: 200px;
  font-size: 16px;
  display: inline-block;
}
.el-button {
  margin-left: 51px;
}
</style>
