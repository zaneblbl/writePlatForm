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

export default function (method:string, url:string, data:any=null) {
  method = method.toLowerCase()
  if (method === 'post') {
    return instance.post(url, data)
  } else if (method === 'get') {
    return instance.get(url, {params: data})
  } else if (method === 'put') {
    return instance.put(url, data)
  } else if (method === 'delete') {
    return instance.delete(url)
  } else {
    console.log('未知的method')
    return Promise.reject('未知的method')
  }
}
