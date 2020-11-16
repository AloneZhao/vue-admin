/**
 * 分页组件的逻辑拆分
 */
export function paginationHoos() {
  const pageData = {
    currentPage: 1, // 当前页数
    pageSize: 10, // 每页条数
    total: 100, // 总条数
    pageSizes: [10, 20, 30, 40, 50]
  }
  // 统计总条数
  const totalCount = val => {
    pageData.total = val
  }
  // 每页条数改变后触发
  const handleSizeChange = (val) => {
    console.log('val', val)
    pageData.pageSize = val
  }
  // 翻页
  const handleCurrentChange = (val) => {
    console.log('翻页', val)
    pageData.currentPage = val
  }
  return {
    totalCount,
    pageData,
    handleSizeChange,
    handleCurrentChange
  }
}