let paginations = {
  data() {
    return {
      currentPage: 1, // 当前页数
      pageSize: 10, // 每页条数
      total: 0, // 总条数
      pageSizes: [10, 20, 30, 40, 50]
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleSizeChange(val) {
      this.configData.requestData.data.pageSize = val
      this.loadTableData()
    },
    handleCurrentChange(val) {
      this.configData.requestData.data.pageNumber = val
      this.loadTableData()
    }
  }
}

export default paginations
