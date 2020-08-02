<template>
  <el-upload class="avatar-uploader"
             :action="config.action"
             :data="uploadKey"
             :show-file-list="false"
             :on-success="handleAvatarSuccess"
             :before-upload="beforeAvatarUpload">
    <img v-if="image"
         :src="image"
         class="avatar">
    <i v-else
       class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
import { getQiniuToken } from '@/api/common'
export default {
  /**
   * 1. 组件的过程要做什么事?
   * 2. 最终结果要做什么事?
   */
  name: 'uploadImg',
  data() {
    return {
      image: '',
      uploadKey: {
        token: '',
        key: ''
      }
    }
  },
  props: {
    imgUrl: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    imgUrl: {
      handle(newValue) {
        this.image = newValue
      }
    }
  },
  methods: {
    handleAvatarSuccess() {
      let image = `${this.$store.getters['common/qiniuUrl']}${res.key}`
      this.image = image
      this.$emit('update:imgUrl', image)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      // 文件名转码
      let suffix = file.name
      let key = encodeURI(`${suffix}`)
      this.uploadKey.key = key
      return isJPG && isLt2M
    },
    getQiToken() {
      let reqData = {
        accesskey: this.config.accesskey,
        secertkey: this.config.secertkey,
        buckety: this.config.buckety
      }
      getQiniuToken(reqData).then(res => {
        this.uploadKey.token = res.data.token
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>