<template>
  <div>
    <el-row :gutter="8">
      <!-- 类型 -->
      <el-col :span="4">
        <div class="label-wrap category">
          <label for="">类型：</label>
          <div class="wrap-content">
            <el-select
              v-model="categoryValue"
              placeholder="请选择"
              style="width: 100%;"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>

      <!-- 日期 -->
      <el-col :span="8">
        <div class="label-wrap date">
          <label for="" style="padding-right: 15px;">日期：</label>
          <div class="wrap-content">
            <el-date-picker
              v-model="dateValue"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 100%;"
            >
            </el-date-picker>
          </div>
        </div>
      </el-col>

      <!-- ID -->
      <el-col :span="4">
        <div class="label-wrap keywords">
          <label for="" style="padding-right: 15px;">关键字： </label>
          <div class="wrap-content">
            <el-select v-model="searchKey" style="width: 100%;">
              <el-option
                v-for="item in searchOptions"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>

      <el-col :span="3">
        <el-input v-model="searchValue" placeholder="请输入内容"></el-input>
      </el-col>

      <el-col :span="2">
        <el-button type="danger" style="width: 100%;">查询</el-button>
      </el-col>
      <el-col :span="2" style="float: right;">
        <el-button
          type="danger"
          class="pull-right"
          style="width: 100%;"
          @click="dialogInfo = true"
          >新增</el-button
        >
      </el-col>
    </el-row>
    <div class="black-space-30"></div>
    <!-- 表格数据 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="selection" width="40"> </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column
        prop="category"
        label="类型"
        width="100"
      ></el-table-column>
      <el-table-column prop="date" label="日期" width="170"> </el-table-column>
      <el-table-column prop="user" label="管理员" width="115">
      </el-table-column>
      <el-table-column label="操作" width="170">
        <!-- slot-scope="scope" -->
        <template>
          <el-button size="mini" type="danger" @click="deleteItem()"
            >删除</el-button
          >
          <el-button size="mini" type="success" @click="dialogInfo = true"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="black-space-30"></div>
    <!-- 底部分页 -->
    <el-row>
      <el-col :span="8">
        <el-button size="medium" @click="deleteAll()">批量删除</el-button>
      </el-col>
      <el-col :span="16">
        <el-pagination
          class="pull-right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="1000"
          :page-sizes="[10, 50, 100, 200]"
        >
        </el-pagination>
      </el-col>
    </el-row>

    <!-- 新增弹窗 -->
    <dialog-info :flag.sync="dialogInfo"></dialog-info>
  </div>
</template>

<script>
import DialogInfo from "./dialog/info";
export default {
  name: "InfoIndex",
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "国际信息"
        },
        {
          value: "选项2",
          label: "国内信息"
        },
        {
          value: "选项3",
          label: "行业信息"
        }
      ],
      // 类型数据
      categoryValue: "",
      // 日期数据
      dateValue: "",
      // search
      searchKey: "id",
      searchOptions: [
        { value: "id", label: "ID" },
        { value: "title", label: "标题" }
      ],
      searchValue: "",
      // 表格的数据
      tableData: [
        {
          title: "纽约市长白思豪宣布退出总统竞选 特朗普发推回应",
          category: "国内信息",
          date: "2019-09-10 19:31:31",
          user: "管理员"
        },
        {
          title: "纽约市长白思豪宣布退出总统竞选 特朗普发推回应",
          category: "国内信息",
          date: "2019-09-10 19:31:31",
          user: "管理员"
        },
        {
          title: "纽约市长白思豪宣布退出总统竞选 特朗普发推回应",
          category: "国内信息",
          date: "2019-09-10 19:31:31",
          user: "管理员"
        },
        {
          title: "纽约市长白思豪宣布退出总统竞选 特朗普发推回应",
          category: "国内信息",
          date: "2019-09-10 19:31:31",
          user: "管理员"
        }
      ],
      // 弹窗显示与隐藏的值
      dialogInfo: false
    };
  },
  methods: {
    // 这是选择下拉框的值
    handleSizeChange(val) {
      console.log(val);
    },
    // 这个是分页按钮的值
    handleCurrentChange(val) {
      console.log(val);
    },
    // 删除
    deleteItem() {
      this.confirm({
        content: "确认删除当前信息，确认后将无法恢复",
        tip: "警告",
        callback: this.confirmDelete
      });
    },
    // 批量删除
    deleteAll() {
      this.confirm({
        content: "确认删除所选信息"
      });
    },
    // 确认删除后执行的方法
    confirmDelete(value) {
      console.log(value);
    }
  },
  components: {
    DialogInfo
  }
};
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
