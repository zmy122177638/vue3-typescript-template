console.log(process.env)
const { VUE_APP_BASE_URL, VUE_APP_OTHER_URL, VUE_APP_ENV, NODE_ENV } = process.env
const globalConfig = {
  /** 当前自定义环境 */
  env: VUE_APP_ENV,
  /** 当前node环境 */
  nodeEnv: NODE_ENV,
  /** 基础服务 */
  baseURL: VUE_APP_BASE_URL,
  /** 其他服务 */
  otherURL: VUE_APP_OTHER_URL,
  /** 渠道ID */
  orgId: '110',
}

export default globalConfig
