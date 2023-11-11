import request from '@/utils/request'

export const getAddressList = (goodsId, goodsNum, goodsSkuId) => {
  return request.get('/address/list')
}
