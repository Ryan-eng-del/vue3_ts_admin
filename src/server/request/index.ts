import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { ElLoading } from 'element-plus/lib/components'
import { RDRequestInterceptors, RDRequestConfig } from './type'
import { ILoadingInstance } from 'element-plus/es/components/loading/src/loading.type'

class RDRequest {
  instance: AxiosInstance
  interceptors?: RDRequestInterceptors
  loading?: ILoadingInstance
  isLoading?: boolean
  constructor(config: RDRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)
    // 所有实例默认的拦截器, 如果你之后请求的时候有传入拦截器那么会覆盖默认的拦截器
    this.interceptors = config.interceptors
    // 默认的加载动画
    this.isLoading = config.isLoading ?? true
    // 使得每个实例的拦截器生效
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    // 使得为所有实例添加默认的请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.isLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }
        return config
      },
      (err) => {
        this.loading?.close()
        return err
      }
    )
    // 使得为所有的实例添加默认的响应拦截器
    this.instance.interceptors.response.use((res) => {
      setTimeout(() => {
        this.loading?.close()
      }, 500)
      const data = res.data
      return data
    })
  }

  request<T>(config: RDRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 对某次的请求做出拦截处理
      if (config?.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      // 2.判断是否需要显示loading
      if (config.isLoading === false) {
        this.isLoading = config.isLoading
      }

      this.instance
        .request(config)
        .then((res: any) => {
          // 对这次请求的响应拦截
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 下一次请求的时候,有可能使用默认值, 但是你已经将实例的isLoading值修改了,下一次请求的实例默认值就是你上一次的值, 所以每次请求完修改回默认值
          this.isLoading = true
          resolve(res)
        })
        .catch((error) => {
          this.isLoading = true
          reject(error)
        })
    })
  }
  get<T>(config: RDRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }
  post<T>(config: RDRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T>(config: RDRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }
}
export default RDRequest
