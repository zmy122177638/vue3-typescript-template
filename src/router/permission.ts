import { UserDispatchType } from './../store/modules/user'
import UserModule from '@/store/modules/user'
import router from './index'

const whiteRouteList = ['/login', '/']

router.beforeEach(async (to, form, next) => {
  if (UserModule.state.isLogin) {
    if (to.path === '/login') {
      next(form.path)
      return
    }
    next()
  } else {
    if (whiteRouteList.includes(to.path)) {
      next()
    } else {
      if (UserModule.state.token) {
        try {
          await UserModule.dispatch(UserDispatchType.GetUserInfo)
          next()
        } catch {
          next('/login')
        }
      } else {
        alert('请先登录')
        next('/login')
      }
    }
  }
})
