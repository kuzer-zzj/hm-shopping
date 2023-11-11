import { getUserInfo, setUserInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      userInfo: getUserInfo()
    }
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
      setUserInfo(userInfo)
    }
  },
  actions: {
    logout (context) {
      context.commit('setUserInfo', {})
      // 清除购物车
      context.commit('cart/setCartList', [], { root: true })
    }
  }
}
