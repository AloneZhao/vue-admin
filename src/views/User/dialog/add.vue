<template>
  <!-- 封装弹框组件 基于 elementui -->
  <el-dialog width="700px"
             title="新增"
             top="50px"
             destroy-on-close
             :visible.sync="dialogFlag"
             append-to-body
             @close="closeDialog"
             @open="openDialog">
    <el-form :model="form"
             ref="addInfoForm">
      <el-form-item label="用户名"
                    :label-width="formLabelWidth"
                    prop="title">
        <el-input v-model="form.title"
                  placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="姓名"
                    :label-width="formLabelWidth"
                    prop="content">
        <el-input v-model="form.content"
                  placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号"
                    :label-width="formLabelWidth"
                    prop="content">
        <el-input v-model="form.content"
                  placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="地区"
                    :label-width="formLabelWidth"
                    prop="content">
        <city-picker :city-picker.sync="cityPicker" :city-pick-level="['province', 'city', 'area', 'street']"></city-picker>
      </el-form-item>
      <el-form-item label="是否启用"
                    :label-width="formLabelWidth"
                    prop="content">
        <!-- <el-radio v-model="radio"
                  label="1">禁用</el-radio>
        <el-radio v-model="radio"
                  label="2">启用</el-radio> -->
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
import CityPicker from '@c/CityPicker/index'
export default {
  name: 'DialogInfo',
  components: {
    CityPicker
  },
  data() {
    return {
      radio: '1',
      dialogFlag: false,
      cityPicker: {},
      form: {
        categoryId: '',
        title: '',
        content: '',
        imgUrl: '',
        createDate: '',
        status: '1'
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
      // let reqData = {
      //   categoryId: this.form.categoryId,
      //   title: this.form.title,
      //   content: this.form.content
      // }
      this.btnLoading = true
      AddInfo(this.form)
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
