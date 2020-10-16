import { UserDispatchType } from './../store/modules/user'
import UserModule from '@/store/modules/user'
import { reactive, ref } from 'vue'
import router from '@/router'

export function useUserLogin() {
  const loginForm = reactive({
    /** 账号 */
    account: '',
    /** 密码 */
    password: '',
  })
  const isLogining = ref(false)
  const resetLoginForm = () => {
    loginForm.account = ''
    loginForm.password = ''
  }
  const handleLogin = async () => {
    isLogining.value = true
    try {
      if (loginForm.account && loginForm.password) {
        await UserModule.dispatch(UserDispatchType.Login, loginForm)
        await UserModule.dispatch(UserDispatchType.GetUserInfo)
        resetLoginForm()
        router.push('/')
      } else {
        alert('请输入账号密码')
      }
    } finally {
      isLogining.value = false
    }
  }
  const handleLogOut = async () => {
    await UserModule.dispatch(UserDispatchType.LogOut)
    router.push('/login')
  }
  return {
    isLogining,
    loginForm,
    handleLogin,
    handleLogOut,
    resetLoginForm,
  }
}
