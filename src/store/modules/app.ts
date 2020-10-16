import globalConfig from '@/globalCofing'
import { createStore } from 'vuex'

export interface AppState {
  name: string
  config: typeof globalConfig
}

const AppModule = createStore<AppState>({
  state: {
    name: 'appModule',
    config: globalConfig,
  },
  mutations: {},
  actions: {},
})

export default AppModule
