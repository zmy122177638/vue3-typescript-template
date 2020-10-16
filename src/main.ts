import { createApp } from 'vue'
import { initHttp } from './api/request'
import App from './App.vue'
import globalConfig from './globalCofing'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/router/permission'

/** 初始化axios实例，设置公共参数、请求头、权限等等 */
initHttp({
  publicConfig: () => ({
    params: {
      orgId: globalConfig.orgId,
    },
    baseURL: '',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Auth: store.state.user?.token,
    },
  }),
})

const globalApp = createApp(App)

globalApp
  .use(store)
  .use(router)
  .mount('#app')

export default globalApp
