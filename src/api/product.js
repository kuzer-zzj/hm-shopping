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
