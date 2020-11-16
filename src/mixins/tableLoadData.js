import { requestUrl } from '@/api/requestUrl'
import { getUserList } from '@/api/common'
let tableLoadData = {
  data() {
    return {}
  },
  created() {},
  mounted() {
    this.loadTableData()
  },
  methods: {
    loadTableData() {
      let requestJson = this.configData.requestData
      let requestData = {
        url: requestUrl[requestJson.url],
        method: requestJson.method,
        data: requestJson.data
      }
      getUserList(requestData)
        .then(res => {
          console.log('res', res)
          this.tableData = res.data.data
          this.total = res.data.total
        })
        .catch(err => {
          console.log('err', err)
        })
    }
  }
}

export default tableLoadData
