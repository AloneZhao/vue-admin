<template>
  <div>
    <el-row>
      <el-col :span="20">
        <div class="label-wrap category">
          <label>关键字:</label>
          <div class="wrap-content">
            <el-row :gutter="16">
              <el-col :span="5">
                <select-vue :config="initOption"></select-vue>
              </el-col>
              <el-col :span="10">
                <el-input placeholder="请输入内容"></el-input>
              </el-col>
              <el-col :span="7">
                <el-button size="small"
                           type="danger">搜索</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button type="danger"
                   size="small"
                   class="pull-right"
                   @click="dialog_add = true">添加用户</el-button>
      </el-col>
    </el-row>
    <table-vue :tableConfig="tableConfig">
      <template v-slot:status="slotData">
        <el-switch active-color="#13ce66"
                   inactive-color="#ff4949">
        </el-switch>
      </template>
      <!-- 操作 -->
      <template v-slot:operation="slotData">
        <el-button type="danger">删除</el-button>
        <el-button type="success">编辑</el-button>
      </template>
    </table-vue>
    <dialog-add :flag.sync="dialog_add"></dialog-add>
  </div>
</template>

<script>
import SelectVue from '@c/select'
import TableVue from '@c/Table'
import DialogAdd from './dialog/add'
export default {
  name: 'userIndex',
  data() {
    return {
      dialog_add: false,
      selectValue: '',
      initOption: ['name', 'phone'],
      // table组件配置参数
      tableConfig: {
        // name: 'abc',
        // num: '5'
        tabSelect: true,
        // 表头
        tableHeader: [
          {
            label: '邮箱/用户名',
            field: 'title',
            width: '200'
          },
          {
            label: '真实姓名',
            field: 'name',
            width: '100'
          },
          {
            label: '手机号',
            field: 'phone'
          },
          {
            label: '地区',
            field: 'address'
          },
          {
            label: '角色',
            field: 'role'
          },
          {
            label: '禁用状态',
            field: 'status',
            columnType: 'slot',
            slotName: 'status'
          },
          {
            label: '操作',
            columnType: 'slot',
            slotName: 'operation',
            width: '200'
          }
        ],
        tableData: [],
        requestData: {
          url: 'getUserList',
          method: 'post',
          data: {
            pageNumber: 1,
            pageSize: 10
          }
        },
        name: 'hello'
      }
    }
  },
  components: {
    SelectVue,
    TableVue,
    DialogAdd
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.label-wrap {
  &.category {
    @include labelDom(left, 60, 40);
  }
}
</style>
