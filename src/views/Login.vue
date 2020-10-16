<template>
  <div class="login">
    <h3>登录表单</h3>
    <p>账号: admin 密码: 123456</p>
    <div class="form">
      账号：<input type="text" v-model="loginForm.account" />
      <br />
      <br />
      密码：<input type="text" v-model="loginForm.password" @keyup.enter="handleLogin" />
      <br />
      <br />
      <button @click="handleLogin">{{ isLogining ? '登录中' : '登录' }}</button>
      <button @click="resetLoginForm" style="margin-left: 15px">重置</button>
    </div>
  </div>
</template>

<script>
import { useUserLogin } from '@/composables/user'
export default {
  setup() {
    const loginApi = useUserLogin()
    return {
      ...loginApi,
    }
  },
}
</script>
