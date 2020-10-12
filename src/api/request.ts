import globalConfig from '@/globalCofing'
import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import qs from 'qs'

interface RequestOptions {
  /** 公共参数配置 */
  publicConfig?: () => RequestPublicConfig
  /** 不处理响应返回的错误 */
  notHandleResponseErrorApiList?: string[]
}
interface Options {
  publicConfig: () => RequestPublicConfig
  notHandleResponseErrorApiList: string[]
}
interface RequestPublicConfig {
  /** axios实例 baseURL */
  baseURL?: string
  /** 根据请求方法追加参数(data OR params) */
  params?: object
  /** 公用请求头设置，如Auth Token */
  headers?: object
}
interface PendingRequest {
  url: string
  cancelMethod: () => void
}
interface ResponseResult {
  error?: ResponseError
  success: boolean
  data?: any
}
interface ResponseError {
  code: number
  message: string
}

/** 防止重复请求接口列表 */
const preventDuplicateUrlList: string[] = []
const pengdingRequestList: PendingRequest[] = []
/** 请求错误状态 */
const RequestErrorCodeMap = new Map([
  [999, '网络请求超时'],
  [1000, '未知错误'],
  [400044, '登录失效，重新登录'],
])
/** 默认配置 */
let requestOptions: Options = {
  notHandleResponseErrorApiList: [],
  publicConfig: () => {
    return {
      params: {},
      baseURL: '',
      headers: {},
    }
  },
}

function cancelPengdingRequest(requestConfig: AxiosRequestConfig) {
  for (let i = pengdingRequestList.length - 1; i >= 0; i--) {
    const pengdingRequest: PendingRequest = pengdingRequestList[i]
    if (!requestConfig || requestConfig.url === pengdingRequest.url) {
      console.debug('cancel duplicate request', requestConfig.url)
      pengdingRequest.cancelMethod()
      pengdingRequestList.splice(i, 1)
    }
  }
}

function handleRequestError(error: ResponseError) {
  console.log()
  if (RequestErrorCodeMap.get(error.code) === '登录失效，重新登录') {
    // router.push({ name: 'Login', query: { redirect: router.currentRoute.path } })
  } else {
    console.log({
      message: RequestErrorCodeMap.get(error.code) || error.message || '服务器错误',
      type: 'error',
      duration: 3 * 1000,
    })
  }
}
const service = axios.create({
  timeout: 10000,
  withCredentials: true,
})

/** 设置公共参数 */
function setPublicParams(axiosConfig: AxiosRequestConfig) {
  const { method = 'GET', data = {}, params = {}, headers = {}, baseURL = '' } = axiosConfig
  const {
    params: defaultParams = {},
    baseURL: defaultBaseURL = '',
    headers: defaultHeaders = {},
  } = requestOptions.publicConfig()
  axiosConfig.baseURL = baseURL || defaultBaseURL
  axiosConfig.headers = {
    ...defaultHeaders,
    ...headers,
  }
  if (String(method).toUpperCase() === 'GET') {
    axiosConfig.params = { ...defaultParams, ...params }
  } else {
    if (Object.prototype.toString.call(data) === '[object FormData]') {
      Object.entries(defaultParams).forEach(([key, val]) => {
        if (!data.get(key)) {
          data.append(key, val)
        }
      })
    } else {
      axiosConfig.data = qs.stringify({ ...defaultParams, ...data })
    }
  }
}

// Request interceptors
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    setPublicParams(config)
    if (preventDuplicateUrlList && preventDuplicateUrlList.indexOf(config.url || '') !== -1) {
      cancelPengdingRequest(config)
      config.cancelToken = new axios.CancelToken((cancelMethod: () => void) => {
        pengdingRequestList.push({ url: config.url as string, cancelMethod })
      })
    }
    return config
  },
  error => {
    Promise.reject(error)
  },
)

// Response interceptors
service.interceptors.response.use(
  response => {
    const data: ResponseResult = response.data
    if (!data.success) {
      if (!requestOptions.notHandleResponseErrorApiList?.some(path => response.config.url?.includes(path))) {
        handleRequestError(response.data.error)
      }
      return Promise.reject(response)
    }
    return response
  },
  error => {
    console.log({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    })
    return Promise.reject(error)
  },
)
/** 基础服务 */
export function commonRequest(option: AxiosRequestConfig): Promise<any> {
  const { headers = {}, baseURL = '' } = option
  option.headers = { AHost: 'common-server', ...headers }
  option.baseURL = baseURL || globalConfig.baseURL
  return new Promise((resolve, reject) => {
    service
      .request(option)
      .then(response => {
        resolve(response.data.payload)
      })
      .catch((err: AxiosError) => {
        reject(err)
      })
  })
}
/** 其他服务 */
export function otherRequest(option: AxiosRequestConfig): Promise<any> {
  const { headers = {}, baseURL = '' } = option
  option.headers = { AHost: 'other-admin', ...headers }
  option.baseURL = baseURL || globalConfig.otherURL
  return new Promise((resolve, reject) => {
    service
      .request(option)
      .then(response => {
        resolve(response.data.payload)
      })
      .catch((err: AxiosError) => {
        reject(err)
      })
  })
}
/** 初始化axios服务配置 */
export function initHttp(options: RequestOptions) {
  requestOptions = { ...requestOptions, ...options }
}

export default service
