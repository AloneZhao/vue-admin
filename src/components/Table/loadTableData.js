/**
 * 表格数据加载的方法封装
 */
import { requestUrl } from '@/api/requestUrl'
import { getUserList } from '@/api/common'
export function loadData() {
  const tabData = {
    item: []
  }
  // 根据参数请求数据
  const loadTableData = params => {
    let requestJson = params.requestData
    let requestData = {
      url: requestUrl[requestJson.url],
      method: requestJson.method,
      data: requestJson.data
    }
    getUserList(requestData)
      .then(res => {
        console.log('res', res)
        tabData.item = res.data.data.data
      })
      .catch(err => {
        console.log('err', err)
      })
  }
  return {
    tabData,
    loadTableData
  }
}
