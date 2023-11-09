import request from '@/utils/request'

export const getProList = (paramObj) => {
  const { categoryId, goodsName, page } = paramObj
  return request.get('/goods/list', {
    params: {
      // 接口请求参数
      categoryId, goodsName, page
    }
  })
}

export const getGoodsDetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      // 接口请求参数
      goodsId
    }
  })
}

export const getProComments = (goodsId, limit) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId, limit
    }
  })
}
