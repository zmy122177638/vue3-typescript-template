<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import api from '@/api'
export default {
  name: '',
  components: {
    HelloWorld,
  },
  setup() {
    api.user.getUserInfo().then(() => {
      console.log(4444)
    })
  },
}
</script>
