import axios from 'axios'
import store from '@/store'
import router from '@/router'

const API = axios.create({
  baseURL: 'http://35.205.158.207:8080'//'http://localhost:3001/' //'https://vue-start-kit-server.herokuapp.com/' //
})

// Request
API.interceptors.request.use(
  config => {
    var token = sessionStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    // TODO: check if have any lang saved in sessionStorage, if not browser lang or default
    // config.headers['Accept-Language'] = 'en'
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Response
API.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log(error)
    const originalRequest = error.config
    // token expired
    //&& error.response.data.error == 'token_expired'
    if (error.response.status === 401 || error.response.status === 409) {
      originalRequest._retry = true
      this.$store.dispatch('removeToken')
      router.push({ name: 'login' })
      /*
      store
        .dispatch('refreshToken')
        .then(response => {
          // console.log(response)
          let token = response.data.token
          let headerAuth = 'Bearer ' + response.data.token
          store.dispatch('saveToken', token)
          axios.defaults.headers['Authorization'] = headerAuth
          originalRequest.headers['Authorization'] = headerAuth
          return axios(originalRequest)
        })
        .catch(error => {
          store
            .dispatch('logout')
            .then(() => {
              router.push({ name: 'login' })
            })
            .catch(() => {
              router.push({ name: 'login' })
            })
        })
      */
    }
    return Promise.reject(error)
  }
)

export default API
