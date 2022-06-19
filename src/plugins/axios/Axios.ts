import { RouteEnum } from '../../enum/RouteEnum'
import { CacheEnum } from '../../enum/CacheEnum'
import store from '@/utils/store'
import router from '@/router'
import axios, { AxiosRequestConfig } from 'axios'
import errorStore from '@/store/errorStore'
// import { MessagePlugin } from 'tdesign-vue-next'
import { ElMessage } from 'element-plus'

export default class Axios {
  private instance
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors()
  }

  public async request<T, D = ResponseResult<T>>(config: AxiosRequestConfig) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.instance.request<D>(config)
        resolve(response.data)
      } catch (error) {
        reject(error)
      }
    }) as Promise<D>
  }

  private interceptors() {
    this.interceptorsRequest()
    this.interceptorsResponse()
  }

  private interceptorsRequest() {
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        errorStore().resetErrors()
        config.headers = {
          Accept: 'application/json',
          Authorization: `Bearer ${store.get(CacheEnum.TOKEN_NAME)}`,
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )
  }
  private interceptorsResponse() {
    this.instance.interceptors.response.use(
      (response) => {
        // if (response.data?.message)
        //   ElMessage({
        //     type: 'success',
        //     message: response.data?.message,
        //     duration: 2000,
        //   })
        return response
      },
      (error) => {
        const {
          response: { status, data },
        } = error
        switch (status) {
          case 401:
            store.remove(CacheEnum.TOKEN_NAME)
            router.push({ name: RouteEnum.LOGIN })
            break
          case 422:
            errorStore().setErrors(data.errors)
            break
          case 403:
            ElMessage.error('你没有操作权限')
            break
          default:
            if (data.message) ElMessage.error(data.message)
        }
        return Promise.reject(error)
      },
    )
  }
}
