import { createStore } from 'vuex'
import app, { AppState } from './modules/app'
import user, { UserState } from './modules/user'

interface StoreState {
  user?: UserState
  app?: AppState
}

export default createStore<StoreState>({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    app,
  },
})
