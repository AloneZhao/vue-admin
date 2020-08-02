<template>
  <!-- 封装弹框组件 基于 elementui -->
  <el-dialog width="580px"
             title="新增"
             :visible.sync="dialogFlag"
             append-to-body
             @close="closeDialog"
             @open="openDialog">
    <el-form :model="form"
             ref="addInfoForm">
      <el-form-item label="分类"
                    :label-width="formLabelWidth"
                    prop="category">
        <el-select v-model="form.category"
                   placeholder="请选择信息类型">
          <el-option v-for="item in categoryInfo"
                     :label="item.category_name"
                     :value="item.id"
                     :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题"
                    :label-width="formLabelWidth"
                    prop="title">
        <el-input v-model="form.title"
                  placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="概括"
                    :label-width="formLabelWidth"
                    prop="content">
        <el-input type="textarea"
                  v-model="form.content"
                  placeholder="请输入内容"
                  rows="5"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer"
         class="dialog-footer">
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="danger"
                 :loading="btnLoading"
                 @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { AddInfo } from '@/api/news'
export default {
  name: 'DialogInfo',
  data() {
    return {
      dialogFlag: false,
      form: {
        category: '',
        title: '',
        content: '',
        type: []
      },
      formLabelWidth: '70px',
      categoryInfo: [], // 分类信息
      btnLoading: false // 按钮的加载动画
    }
  },
  methods: {
    // 关闭新增弹框
    closeDialog() {
      this.$emit('update:flag', false)
      this.$refs.addInfoForm.resetFields()
    },
    // 打开弹窗后执行的方法
    openDialog() {
      this.categoryInfo = this.category
    },

    submit() {
      let reqData = {
        category: this.form.category,
        title: this.form.title,
        content: this.form.content
      }
      this.btnLoading = true
      AddInfo(reqData)
        .then(response => {
          this.$message({
            message: response.message,
            type: 'success'
          })
          this.btnLoading = false
          this.$refs.addInfoForm.resetFields()
        })
        .catch(error => {
          console.log(error)
          this.$message({
            message: error.message,
            type: 'error'
          })
          this.btnLoading = false
        })
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
    }
  },
  watch: {
    flag: {
      handler(newValue) {
        this.dialogFlag = newValue
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
