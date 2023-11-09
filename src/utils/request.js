import axios from 'axios'
import { Toast } from 'vant'

const request = axios.create({
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api/'
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // loading转圈 防止重复请求
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner'
  })
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  const res = response.data
  console.log('接口响应：', res)
  if (res.status !== 200) {
    Toast(res.message)
    return Promise.reject(res.message)
  } else {
    Toast.clear()
  }
  return res
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default request
