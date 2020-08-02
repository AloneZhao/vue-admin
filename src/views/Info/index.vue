<template>
  <div>
    <el-row :gutter="8">
      <!-- 类型 -->
      <el-col :span="4">
        <div class="label-wrap category">
          <label for="">分类：</label>
          <div class="wrap-content">
            <el-select v-model="categoryValue"
                       placeholder="请选择"
                       style="width: 100%;">
              <el-option v-for="item in options"
                         :key="item.id"
                         :label="item.category_name"
                         :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>

      <!-- 日期 -->
      <el-col :span="8">
        <div class="label-wrap date">
          <label for=""
                 style="padding-right: 15px;">日期：</label>
          <div class="wrap-content">
            <el-date-picker v-model="dateValue"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            style="width: 100%;">
            </el-date-picker>
          </div>
        </div>
      </el-col>

      <!-- ID -->
      <el-col :span="4">
        <div class="label-wrap keywords">
          <label for=""
                 style="padding-right: 15px;">关键字： </label>
          <div class="wrap-content">
            <el-select v-model="searchKey"
                       style="width: 100%;">
              <el-option v-for="item in searchOptions"
                         :key="item.value"
                         :value="item.value"
                         :label="item.label"></el-option>
            </el-select>
          </div>
        </div>
      </el-col>

      <el-col :span="3">
        <el-input v-model="searchValue"
                  placeholder="请输入内容"></el-input>
      </el-col>

      <el-col :span="2">
        <el-button type="danger"
                   style="width: 100%;"
                   @click="getList()">查询</el-button>
      </el-col>
      <el-col :span="2"
              style="float: right;">
        <el-button type="danger"
                   class="pull-right"
                   style="width: 100%;"
                   @click="dialogInfo = true">新增</el-button>
      </el-col>
    </el-row>
    <div class="black-space-30"></div>

    <!-- 表格数据 -->
    <el-table :data="tableData"
              border
              v-loading="loading"
              style="width: 100%"
              @selection-change="selectionChange">
      <el-table-column type="selection"
                       width="40"> </el-table-column>
      <el-table-column prop="title"
                       label="标题"> </el-table-column>
      <el-table-column prop="categoryId"
                       label="类型"
                       width="100"
                       :formatter="formatName"></el-table-column>
      <el-table-column prop="createDate"
                       label="日期"
                       width="170"
                       :formatter="formatDate">
      </el-table-column>
      <!-- <el-table-column prop="content" label="管理员" width="115">
      </el-table-column> -->
      <el-table-column label="操作"
                       width="270">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="danger"
                     @click="deleteItem(scope.row.id)">删除</el-button>
          <el-button size="mini"
                     type="success"
                     @click="editInfo(scope.row.id)">编辑</el-button>
          <!-- <router-link :to="{ name: 'InfoDetailed' }" class="margin-left-10"> -->
          <el-button size="mini"
                     type="success"
                     @click="detailedInfo(scope.row)">编辑详情</el-button>
          <!-- </router-link> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="black-space-30"></div>
    <!-- 底部分页 -->
    <el-row>
      <el-col :span="8">
        <el-button size="medium"
                   @click="deleteAll()">批量删除</el-button>
      </el-col>
      <el-col :span="16">
        <el-pagination class="pull-right"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       background
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total"
                       :page-sizes="[5, 10, 15, 20]"
                       :page-size="page.pageSize">
        </el-pagination>
      </el-col>
    </el-row>

    <!-- 新增弹窗 子组件 -->
    <dialog-info :flag.sync="dialogInfo"
                 :category="options"></dialog-info>

    <!-- 编辑弹窗 -->
    <edit-info :flag.sync="dialogInfo_edit"
               :id="infoId"
               :category="options"
               @getList="getList"></edit-info>
  </div>
</template>

<script>
import DialogInfo from './dialog/info'
import EditInfo from './dialog/edit'
import { GetList, DeleteInfo } from '@/api/news'
import { timestampToTime } from '@/utils/common'

export default {
  name: 'InfoIndex',
  data() {
    return {
      // 信息列表
      options: [],

      // 数据总共条数
      total: 0,

      // 页码与页大小
      page: {
        pageNumber: 1,
        pageSize: 5
      },

      // 类型数据
      categoryValue: '',

      // 日期数据
      dateValue: '',

      // search
      searchKey: 'id',
      searchOptions: [
        { value: 'id', label: 'ID' },
        { value: 'title', label: '标题' }
      ],
      searchValue: '',

      // 表格的数据
      tableData: [],

      // 新增弹窗显示与隐藏的值
      dialogInfo: false,

      // 编辑弹窗
      dialogInfo_edit: false,
      // 编辑id
      infoId: '',

      // 加载状态
      loading: false,

      // 删除信息id
      delInfoId: []
    }
  },
  methods: {
    // 获取信息分类
    getCatgeory() {
      this.$getCommon(res => {
        this.options = res.data
      })
    },

    // 查询参数定义
    formaData() {
      let reqData = {
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize
      }

      // 分类ID
      if (this.categoryValue) {
        reqData.categoryId = this.categoryValue
      }

      // 日期
      if (this.dateValue.length > 0) {
        reqData.startTiem = this.dateValue[0]
        reqData.endTime = this.dateValue[1]
      }

      // 关键字
      reqData[this.searchKey] = this.searchValue

      return reqData
    },

    // 获取信息列表
    getList() {
      let reqData = this.formaData()
      this.loading = true
      GetList(reqData)
        .then(response => {
          // console.log(response);
          this.tableData = response.data.data
          this.total = response.data.total
          this.loading = false
        })
        .catch(error => {
          this.loading = false
          console.log(error)
        })
    },

    // 条目数改变触发的方法
    handleSizeChange(val) {
      this.page.pageSize = val
      this.getList()
      console.log(val)
    },

    // 分页按钮值改变后执行的方法
    handleCurrentChange(val) {
      this.page.pageNumber = val
      this.getList()
      console.log(val)
    },

    // 删除
    deleteItem(value) {
      this.delInfoId.push(value)
      this.confirm({
        content: '确认删除当前信息，确认后将无法恢复',
        tip: '警告',
        id: this.delInfoId,
        callback: this.confirmDelete // 点击弹框中的确定后执行的方法
      })
    },

    // 复选框变化时触发的方法
    selectionChange(val) {
      // console.log(val);
      let arrId = val.map(item => item.id)
      this.delInfoId = arrId
    },
    // 批量删除
    deleteAll() {
      if (!this.delInfoId || this.delInfoId.length == 0) {
        this.$message({
          message: '请选择要删除的数据',
          type: 'error'
        })
        return false
      }
      this.confirm({
        content: '确认删除所选信息',
        id: this.delInfoId,
        callback: this.confirmDelete
      })
    },

    // 确认删除后执行的方法
    confirmDelete(id) {
      DeleteInfo({ id })
        .then(response => {
          this.$message({
            type: 'success',
            message: response.message
          })
          this.delInfoId = []
          this.getList()
        })
        .catch(error => {
          console.log(error)
        })
    },

    // 编辑按钮
    editInfo(id) {
      this.infoId = id
      this.dialogInfo_edit = true
    },

    // 格式化日期
    formatDate(row) {
      // console.log(row.createDate);
      return timestampToTime(row.createDate)
    },
    // 格式化类型
    formatName(row) {
      // console.log(row);
      let categoryName = this.options.filter(
        item => item.id == row.categoryId
      )[0]
      // console.log(categoryName);
      return categoryName.category_name
    },
    detailedInfo(data) {
      // 预先存值
      // this.$store.commit("infoDetailed/_setId", data.id);
      // this.$store.commit("infoDetailed/_setTitle", data.title);
      this.$store.commit('infoDetailed/_SetState', {
        id: {
          value: data.id,
          session: true, // 是否存入缓存
          name: 'infoId' // 存入session中的key值名称
        },
        title: {
          value: data.title,
          session: false
        }
      })
      // 跳转编辑详情
      this.$router.push({
        name: 'InfoDetailed',
        params: {
          id: data.id,
          title: data.title
        }
      })
    }
  },
  components: {
    DialogInfo,
    EditInfo
  },

  mounted() {
    this.getCatgeory()
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
.label-wrap {
  &.category {
    @include labelDom(left, 60, 40);
  }
  &.date {
    @include labelDom(right, 93, 40);
  }
  &.keywords {
    @include labelDom(right, 87, 40);
  }
}
</style>
