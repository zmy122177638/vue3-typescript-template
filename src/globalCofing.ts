
console.log(process.env)
const { VUE_APP_BASE_URL, VUE_APP_OTHER_URL } = process.env
const globalConfig = {
  /** 基础服务 */
  baseURL: VUE_APP_BASE_URL,
  /** 其他服务 */
  otherURL: VUE_APP_OTHER_URL,
  /** 渠道ID */
  orgId: 110,
}

export default globalConfig
