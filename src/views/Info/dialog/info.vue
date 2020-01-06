<template>
  <!-- 封装弹框组件 基于 elementui -->
  <el-dialog
    width="580px"
    title="新增"
    :visible.sync="dialogFlag"
    append-to-body
    @close="closeDialog"
  >
    <el-form :model="form">
      <el-form-item label="分类" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" :label-width="formLabelWidth">
        <el-input v-model="form.name" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="概括" :label-width="formLabelWidth">
        <el-input
          type="textarea"
          v-model="form.name"
          placeholder="请输入内容"
          rows="5"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="danger" @click="closeDialog">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "DialogInfo",
  data() {
    return {
      dialogFlag: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "70px"
    };
  },
  methods: {
    closeDialog() {
      this.$emit("update:flag", false);
    }
  },
  props: {
    flag: {
      type: Boolean,
      default: false
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
