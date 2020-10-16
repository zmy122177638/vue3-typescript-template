<template>
  <div class="about">
    <h3>登录信息</h3>
    <div class="info" v-if="isLogin">
      <p>name: {{ userInfo.name }}</p>
      <p>email: {{ userInfo.email }}</p>
      <p>avator:</p>
      <img :src="userInfo.avator" alt="" srcset="" />
    </div>
    <p v-else>你还未登录</p>
    <br />
    <br />
    <button @click="handleLogOut" v-if="isLogin">退出登录</button>
  </div>
</template>
<script>
import { computed } from 'vue'
import UserModule from '@/store/modules/user'
import { useUserLogin } from '@/composables/user'
export default {
  setup() {
    const { handleLogOut } = useUserLogin()
    const userInfo = computed(() => UserModule.state.userInfo)
    const isLogin = computed(() => UserModule.state.isLogin)
    return {
      userInfo,
      isLogin,
      handleLogOut,
    }
  },
}
</script>
