import api from '@/api'
import { getToken, setToken } from '@/helper/cookies'
import { createStore } from 'vuex'
interface UserInfo {
  name: string
  email: string
  avator: string
}
export interface UserState {
  token: string
  userInfo: UserInfo
  isLogin: boolean
}
export enum UserDispatchType {
  Login = 'Login',
  GetUserInfo = 'GetUserInfo',
  LogOut = 'LogOut',
}
export enum UserCommitType {
  SET_TOKEN_KEY = 'SET_TOKEN_KEY',
  SET_USER_INFO = 'SET_USER_INFO',
  SET_IS_LOGIN = 'SET_IS_LOGIN',
}
const UserModule = createStore<UserState>({
  state: {
    token: getToken() || '',
    userInfo: {} as UserInfo,
    isLogin: false,
  },
  mutations: {
    SET_TOKEN_KEY(state, token) {
      state.token = token
      setToken(token)
    },
    SET_USER_INFO(state, info) {
      state.userInfo = info
    },
    SET_IS_LOGIN(state, status: boolean) {
      state.isLogin = status
    },
  },
  actions: {
    async [UserDispatchType.Login]({ commit }, { account, password }: { account: string; password: string }) {
      const { token } = await api.user.login({ account, password })
      commit(UserCommitType.SET_TOKEN_KEY, token)
    },
    async [UserDispatchType.GetUserInfo]({ commit }) {
      try {
        const info = await api.user.getUserInfo()
        commit(UserCommitType.SET_USER_INFO, info)
        commit(UserCommitType.SET_IS_LOGIN, true)
      } catch (error) {
        commit(UserCommitType.SET_TOKEN_KEY, '')
        commit(UserCommitType.SET_USER_INFO, {})
        commit(UserCommitType.SET_IS_LOGIN, false)
        return Promise.reject(error)
      }
    },
    async [UserDispatchType.LogOut]({ commit }) {
      await api.user.logOut()
      commit(UserCommitType.SET_TOKEN_KEY, '')
      commit(UserCommitType.SET_USER_INFO, {})
      commit(UserCommitType.SET_IS_LOGIN, false)
    },
  },
})

export default UserModule
