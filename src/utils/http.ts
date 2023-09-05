import axios, { AxiosInstance, HttpStatusCode, AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { handleAddAccessToken, handleAddUserProfile, handleClearLS, handleGetAccessToken } from './auth'
import { publicRoutesPath } from '~/constants/routes.constant'
class Http {
  instance: AxiosInstance
  private access_token: string
  constructor() {
    this.access_token = handleGetAccessToken()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // Add a request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        if (this.access_token && config.headers) {
          config.headers.authorization = this.access_token
          return config
        }
        return config
      },
      (error) => {
        // Do something with request error
        return Promise.reject(error)
      }
    )
    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === publicRoutesPath.login || url === publicRoutesPath.register) {
          this.access_token = response.data.data.access_token
          handleAddAccessToken(this.access_token)
          handleAddUserProfile(response.data.data.user)
        } else if (url === '/logout') {
          this.access_token = ''
          handleClearLS()
        }
        return response
      },
      (error: AxiosError) => {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}
export const http = new Http().instance
