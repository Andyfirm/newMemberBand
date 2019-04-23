import axios from 'axios'
// import { Message, MessageBox } from 'element-ui'
// import store from '../store'
// import { getToken } from '@/utils/auth'
const service = axios.create({
  baseURL: 'https://www.easyserp.com/wristband/wristband',
  timeout: 15000 // 请求超时时间
})
service.interceptors.request.use(config => {
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)
// export function post(url, params) {
//   return new Promise((resolve, reject) => {
//    axios.post(url, QS.stringify(params))
//     .then(res => {
//       resolve(res.data);
//     })
//     .catch(err =>{
//       reject(err.data)
//     })
//   });
//  }

export default service
