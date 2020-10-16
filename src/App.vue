<template>
  <div id="nav">
    <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link>
    <template v-if="!isLogin"> | </template>
    <router-link to="/login" v-if="!isLogin">Login</router-link>
  </div>
  <router-view />
</template>

<script>
import { computed } from 'vue'
import UserModule from './store/modules/user'
export default {
  setup() {
    const isLogin = computed(() => UserModule.state.isLogin)
    return {
      isLogin,
    }
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
