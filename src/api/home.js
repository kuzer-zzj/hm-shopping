import request from '@/utils/request'

export const getHomeData = () => {
  return request.get('/page/detail', {
    params: {
      // 接口请求参数
      pageId: 0
    }
  })
}
