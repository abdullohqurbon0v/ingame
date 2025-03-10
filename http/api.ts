import axios from 'axios'

export const $axios = axios.create({
  baseURL: "https://api.mirmakhmudoff.uz/api/",
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})
$axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token') 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})
