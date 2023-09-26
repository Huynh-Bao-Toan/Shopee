import axios, { AxiosInstance, HttpStatusCode, AxiosError } from 'axios'
import { toast } from 'react-toastify'
import {
  handleAddAccessToken,
  handleAddRefreshToken,
  handleAddUserProfile,
  handleClearLS,
  handleGetAccessToken,
  handleGetRefreshToken
} from './auth'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './axiosHandleError'
import { RefreshTokenReponse } from '~/types/auth.type'
export class Http {
  instance: AxiosInstance
  private access_token: string
  private refresh_token: string
  private refresh_token_request: Promise<string> | null
  constructor() {
    this.access_token = handleGetAccessToken()
    this.refresh_token = handleGetRefreshToken()
    this.refresh_token_request = null
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 60 * 60 * 24, // 1 ngày
        'expire-refresh-token': 60 * 60 * 24 * 160 // 160 ngày
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
        if (url === '/login' || url === '/register') {
          this.access_token = response.data.data.access_token
          this.refresh_token = response.data.data.refresh_token
          handleAddAccessToken(this.access_token)
          handleAddRefreshToken(this.refresh_token)
          handleAddUserProfile(response.data.data.user)
        } else if (url === '/logout') {
          this.access_token = ''
          this.refresh_token = ''
          handleClearLS()
        }
        return response
      },
      (error: AxiosError) => {
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }
        if (isAxiosUnauthorizedError<{ message: string; data?: { name: string; message: string } }>(error)) {
          const config = error.response?.config || { headers: {}, url: '' }
          const { url } = config
          // Trường hợp Token hết hạn và request đó không phải là của request refresh token
          // thì chúng ta mới tiến hành gọi refresh token
          if (isAxiosExpiredTokenError(error) && url !== '/refresh-access-token') {
            // Hạn chế gọi 2 lần handlerefresh_token
            this.refresh_token_request = this.refresh_token_request
              ? this.refresh_token_request
              : this.handleRefreshToken().finally(() => {
                  // Giữ refresh_token_request trong 10s cho những request tiếp theo nếu có 401 thì dùng
                  setTimeout(() => {
                    this.refresh_token_request = null
                  }, 10000)
                })
            return this.refresh_token_request.then((access_token) => {
              // Nghĩa là chúng ta tiếp tục gọi lại request cũ vừa bị lỗi
              return this.instance({ ...config, headers: { ...config.headers, authorization: access_token } })
            })
          }

          // Còn những trường hợp như token không đúng
          // không truyền token,
          // token hết hạn nhưng gọi refresh token bị fail
          // thì tiến hành xóa local storage và toast message
          handleClearLS()
          this.access_token = ''
          this.refresh_token = ''
          toast.error(error.response?.data.data?.message || error.response?.data.message)
          // window.location.reload()
        }
        return Promise.reject(error)
      }
    )
  }
  private handleRefreshToken() {
    return this.instance
      .post<RefreshTokenReponse>('/refresh-access-token', {
        refresh_token: this.refresh_token
      })
      .then((res) => {
        const { access_token } = res.data.data
        handleAddAccessToken(access_token)
        this.access_token = access_token
        return access_token
      })
      .catch((error) => {
        handleClearLS()
        this.access_token = ''
        this.refresh_token = ''
        throw error
      })
  }
}
export const http = new Http().instance
