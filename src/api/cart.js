import request from '@/utils/request'

export const addCarts = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId, goodsNum, goodsSkuId
  })
}

export const getCartList = () => {
  return request.get('/cart/list')
}

export const changeCountActionReq = (goodsNum, goodsId, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsNum, goodsId, goodsSkuId
  })
}

export const delSelect = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
