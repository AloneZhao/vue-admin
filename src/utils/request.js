import axios from 'axios'
import {
  Message
} from 'element-ui'
import {
  get_Token,
  get_Username
} from '@/utils/storage'

// 创建axios拦截器
// 创建axios,赋给变量service
const BASE = process.env.NODE_ENV === 'production' ? '' : '/devApi'
const service = axios.create({
  baseURL: BASE,
  timeout: 15000
})

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.headers['Tokey'] = get_Token()
    config.headers['UserName'] = get_Username()
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    let {
      data
    } = response
    if (data.resCode !== 0) {
      Message.error(data.message)
      return Promise.reject(data)
    } else {
      return data
    }
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
export default service