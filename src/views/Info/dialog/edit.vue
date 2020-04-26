<template>
  <!-- 封装弹框组件 基于 elementui -->
  <el-dialog
    width="580px"
    title="编辑"
    :visible.sync="dialogFlag"
    append-to-body
    @close="closeDialog"
    @open="openDialog"
  >
    <el-form :model="form" ref="addInfoForm">
      <el-form-item label="分类" :label-width="formLabelWidth" prop="category">
        <el-select v-model="form.category" placeholder="请选择信息类型">
          <el-option
            v-for="item in categoryInfo"
            :label="item.category_name"
            :value="item.id"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="概括" :label-width="formLabelWidth" prop="content">
        <el-input
          type="textarea"
          v-model="form.content"
          placeholder="请输入内容"
          rows="5"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="danger" :loading="btnLoading" @click="submit"
        >确定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { GetList, EditInfo } from "@/api/news";
export default {
  name: "DialogInfo",
  data() {
    return {
      dialogFlag: false,
      form: {
        category: "",
        title: "",
        content: ""
      },
      formLabelWidth: "70px",
      categoryInfo: [], // 分类信息
      btnLoading: false // 按钮的加载动画
    };
  },
  methods: {
    // 关闭新增弹框
    closeDialog() {
      this.$emit("update:flag", false);
      this.$refs.addInfoForm.resetFields();
    },
    // 打开弹窗
    openDialog() {
      this.categoryInfo = this.category;
      this.editGetList();
    },
    submit() {
      let reqData = {
        id: this.id,
        categoryId: this.form.category,
        title: this.form.title,
        content: this.form.content
      };
      this.btnLoading = true;
      EditInfo(reqData)
        .then(response => {
          this.$message({
            message: response.message,
            type: "success"
          });
          this.btnLoading = false;
          this.$refs.addInfoForm.resetFields();
          this.$emit("getList");
        })
        .catch(error => {
          console.log(error);
          this.$message({
            message: error.message,
            type: "error"
          });
          this.btnLoading = false;
        });
    },
    editGetList() {
      let requestData = {
        pageNumber: 1,
        pageSize: 1,
        id: this.id
      };
      // console.log(requestData);
      GetList(requestData)
        .then(response => {
          // console.log(response);
          let { data } = response.data;
          // console.log(data[0]);
          this.form = {
            category: data[0].categoryId,
            title: data[0].title,
            content: data[0].content
          };
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    category: {
      type: Array,
      default: () => []
    },
    id: {
      type: String,
      default: ""
    }
  },
  watch: {
    flag: {
      handler(newValue) {
        this.dialogFlag = newValue;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
