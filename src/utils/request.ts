import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { BASE_URL } from '@/configs/app'

export interface HttpResponse<T = unknown> {
  data: T
  errorCode: string
  success: boolean
}

const service = axios.create({
  baseURL: BASE_URL,
  timeout: 10 * 1000,
  withCredentials: true,
})

service.interceptors.request.use(
  (config: AxiosRequestConfig) => config,
  (error) => Promise.reject(error),
)

service.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const result = response.data
    if (result.success) {
      return result.data
    } else {
      return Promise.reject(result)
    }
  },
  (error: any) => {
    return Promise.reject(error)
  },
)

export default service
