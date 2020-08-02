<template>
  <el-form ref="form"
           :model="infoForm"
           label-width="120px">
    <el-form-item label="信息分类">
      <el-select v-model="infoForm.categoryId"
                 placeholder="请选择">
        <el-option v-for="item in categoryList"
                   :key="item.id"
                   :label="item.category_name"
                   :value="item.id"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="新闻标题">
      <el-input v-model="infoForm.title"></el-input>
    </el-form-item>

    <el-form-item label="缩略图">
      <UploadImg :imgUrl.sync="infoForm.imageUrl"
                 :config="uploadImgConfig " />
    </el-form-item>

    <el-form-item label="发布日期">
      <el-date-picker v-model="infoForm.createDate"
                      type="date"
                      placeholder="发布日期"
                      disabled>
      </el-date-picker>
    </el-form-item>

    <el-form-item label="详细内容">
      <quill-editor v-model="infoForm.content"
                    ref="myQuillEditor"
                    :options="editorOption"></quill-editor>
    </el-form-item>

    <el-form-item>
      <el-button type="primary"
                 :loading="btnLoading"
                 @click="onSeave()">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { GetList, EditInfo } from '@/api/news'
import { timestampToTime } from '@/utils/common'
import UploadImg from '@c/uploadImg'

// 富文本编辑器
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  name: 'InfoDetailed',
  data() {
    return {
      // 表单中的数据
      infoForm: {
        categoryId: '', // 分类ID
        title: '', // 标题
        createDate: '',
        content: '',
        imageUrl: ''
      },
      uploadImgConfig: {
        action: 'http://up-z2.qiniup.com',
        accesskey: 'Avh-EZZAa4TxqPQZsEW42fXBUbTMFi-RKSZTRKJj',
        secretkey: 'l9AXtnhCVkZexXNRcmHXzmecXiCUiLynwGboMeUw',
        buckety: 'webjshtml'
      },
      id: this.$route.params.id || this.$store.getters['infoDetailed/infoId'],

      btnLoading: false,

      // 信息类型列表
      categoryList: [],

      // 富文本编辑器的配置参数
      editorOption: {}
    }
  },
  components: {
    UploadImg,
    quillEditor
  },
  methods: {
    // getInfoParams() {
    //   let id =
    //     this.$route.params.id || this.$store.getters["infoDetailed/infoId"];
    //   let title =
    //     this.$route.params.title ||
    //     this.$store.getters["infoDetailed/infoTitle"];
    //   console.log(id, title);
    // },
    // 获取信息分类
    getCatgeory() {
      this.$getCommon(res => {
        this.categoryList = res.data
      })
    },
    // 获取详细信息
    getInfo() {
      let requestData = {
        pageNumber: 1,
        pageSize: 1,
        id: this.$route.params.id || this.$store.getters['infoDetailed/infoId']
      }
      GetList(requestData)
        .then(response => {
          console.log(response)
          // console.log(response);
          let { data } = response.data
          this.infoForm = {
            categoryId: data[0].categoryId,
            title: data[0].title,
            createDate: timestampToTime(data[0].createDate),
            content: data[0].content
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 保存
    onSeave() {
      let reqData = {
        id: this.id,
        categoryId: this.infoForm.categoryId,
        title: this.infoForm.title,
        content: this.infoForm.content
      }
      console.log(reqData)
      this.btnLoading = true
      EditInfo(reqData)
        .then(response => {
          this.$message({
            message: response.message,
            type: 'success'
          })
          this.btnLoading = false
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
  mounted() {
    this.getCatgeory()
    this.getInfo()
  }
}
</script>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
