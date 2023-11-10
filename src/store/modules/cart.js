import { getCartList, changeCountActionReq, delSelect } from '@/api/cart'
import { Toast } from 'vant'
export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    setCartList (state, paylod) {
      state.cartList = paylod
    },
    toggleCheck (state, goodsId) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.isChecked = !goods.isChecked
    },
    toggleAllCheck (state, flag) {
      state.cartList.forEach(item => { item.isChecked = flag })
    },
    changeCount (state, obj) {
      const { value, goodsId } = obj
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.goods_num = value
    }
  },
  actions: {
    // 使用 getCartList 获取 cartList 然后赋值
    async getCartAction (context) {
      const { data } = await getCartList()
      data.list.forEach(element => {
        element.isChecked = true
      })
      console.log('购物车查询result:', data)
      context.commit('setCartList', data.list)
    },
    async changeCountAction (context, obj) {
      const { value, goodsId, skuId } = obj
      context.commit('changeCount', obj)
      await changeCountActionReq(value, goodsId, skuId)
    },
    async delCartAction (context) {
      const selCartList = context.getters.selCartList
      const cartIds = selCartList.map(item => item.id)
      await delSelect(cartIds)
      Toast('删除成功')
      context.dispatch('getCartAction')
    }
  },
  getters: {
    // 商品总数
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品列表
    selCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 选中的商品总数
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品总价
    selPrice (state, getters) {
      return getters.selCartList.reduce(
        (sum, item) => { return sum + item.goods_num * item.goods.goods_price_min }, 0
      )
        .toFixed(2)
    },
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}
