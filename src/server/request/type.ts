import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface RDRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface RDRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RDRequestInterceptors<T>
  showLoading?: boolean
  isLoading?: boolean
}
