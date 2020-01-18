import axios from 'axios'

const instance = axios.create({
  timeout: 10000
})

// 请求拦截
instance.interceptors.request.use(function (config) {
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截
instance.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error)
})

export default function (method, url, data = null) {
  method = method.toLowerCase()
  if (method === 'post') {
    return instance.post(url, data)
  } else if (method === 'get') {
    return instance.get(url, {params: data})
  } else {
    console.log('未知的method')
    return false
  }
}
