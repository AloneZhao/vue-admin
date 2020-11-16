<template>
  <div>
    <el-table :data="tableData"
              border
              stripe
              style="width: 100%; margin-top: 20px;">
      <!-- 多选框 -->
      <el-table-column type="selection"
                       v-if="tableConfig.tabSelect"
                       width="55">
      </el-table-column>
      <!-- 数据渲染 -->
      <template v-for="item in configData.tableHeader">
        <!-- 插槽的内容 == v-slot -->
        <el-table-column :key="item.field"
                         :prop="item.field"
                         :label="item.label"
                         :width="item.width"
                         v-if="item.columnType === 'slot' ">
          <template v-slot="scope">
            <slot :name="item.slotName"
                  :data="scope.row"></slot>
          </template>
        </el-table-column>

        <!-- 表格的基础数据 -->
        <el-table-column :key="item.field"
                         :prop="item.field"
                         :label="item.label"
                         :width="item.width"
                         v-else>
        </el-table-column>
      </template>
    </el-table>
    <div class="black-space-30"></div>
    <el-pagination background
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="pageSizes"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total">
    </el-pagination>
  </div>
</template>

<script>
import tableLoadData from '@/mixins/tableLoadData'
import pagination from '@/mixins/paginations'
export default {
  name: 'tableIndex',
  mixins: [tableLoadData, pagination],
  props: {
    // 父组件传过来的对象
    tableConfig: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // 当前子组件中表格的配置参数
      configData: {
        tableHeader: [], // 表头
        requestData: {} // 请求配置参数
      },
      tableData: []
    }
  },
  methods: {
    // 初始化table配置
    // 匹配相同的key 如果存在 替换
    initTable() {
      let configData = this.tableConfig // 父组件传来的值
      let keys = Object.keys(this.configData)
      // 主要是用于当前子组件中table表格组件中的配置与父组件传来的参数做对比，取相同的属性
      for (const key in configData) {
        if (keys.includes(key)) {
          this.configData[key] = configData[key]
        }
      }
    }
  },
  created() {
    this.initTable()
  }
}
</script>

<style lang="scss" scoped></style>
