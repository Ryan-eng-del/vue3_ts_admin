<template>
  <div class="login-phone">
    <el-form label-width="135px" :rules="rules" :model="phone">
      <el-form-item label="手机号:" prop="num">
        <el-input v-model="phone.num" />
      </el-form-item>
      <el-form-item label="验证码:" prop="code">
        <div class="get-code">
          <el-input v-model="phone.code" />
          <el-button type="primary" class="get-btn">获取验证码</el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="submit-button">
          <el-button type="primary" @click="handleClickAction">登录</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  setup() {
    const rules = {
      num: [
        { required: true, message: '手机号是必填内容', trigger: 'blur' },
        {
          pattern: /^[0-9]{11}$/,
          message: '手机号必须是11个数字~',
          trigger: 'blur'
        }
      ],
      code: [
        {
          required: true,
          message: '验证码是必传内容~',
          trigger: 'blur'
        },
        {
          pattern: /^[0-9]{4}$/,
          message: '验证码错误~',
          trigger: 'blur'
        }
      ]
    }

    const phone = reactive({
      code: '',
      num: ''
    })
    return {
      phone,
      rules
    }
  }
})
</script>

<style lang="less">
.login-phone {
  padding-top: 25px;
  padding-left: 35px;
  width: 650px;
  box-sizing: border-box;
  height: 261px;
}
.get-code {
  display: flex;
  justify-content: flex-start;
  div.el-input {
    width: 230px;
  }
  div.el-input > .el-input__inner {
    width: 200px;
  }
}
.submit-button {
  margin-top: 30px;
}
.get-btn {
  margin-left: 8px;
}
</style>
