<template>
  <el-select v-model="selectValue"
             placeholder="请选择">
    <el-option v-for="(item, index) in initOptionsList"
               :value="item.value"
               :label="item.label"
               :key="index">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'Myselect',
  data() {
    return {
      selectValue: '',
      initOptionsList: [],
      options: [
        {
          value: 'name',
          label: '姓名'
        },
        {
          value: 'phone',
          label: '手机号'
        },
        {
          value: 'email',
          label: '邮箱'
        }
      ]
    }
  },
  props: {
    config: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    initOptions() {
      if (this.config.length === 0) {
        this.$message({
          type: 'error',
          message: '参数不能为空'
        })
        return false
      }
      let optionArr = []
      this.config.forEach(item => {
        let arr = this.options.filter(el => el.value == item)
        if (arr.length > 0) {
          optionArr.push(arr[0])
        }
      })
      if (optionArr.length === 0) {
        this.$message({
          type: 'error',
          message: '匹配数据为空'
        })
        return false
      }
      this.initOptionsList = optionArr
      this.selectValue = this.initOptionsList[0]
    }
  },
  mounted() {
    this.initOptions()
  }
}
</script>

<style lang="scss" scoped>
</style>
