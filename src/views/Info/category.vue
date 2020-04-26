<template>
  <div id="categor">
    <el-button type="danger"
               @click="addFirst({ type: 'category_first_add' })">添加一级分类</el-button>
    <div style="border-top: 1px solid #ccc;margin:10px -20px;"></div>
    <el-row :gutter="30">
      <el-col :span="8">
        <div class="category-wrap">
          <div class="category"
               v-for="firseItem in category"
               :key="firseItem.id">
            <!-- 一级分类 -->
            <h4>
              <i class="el-icon-circle-plus-outline"></i>
              {{ firseItem.category_name }}
              <div class="button-group">
                <el-button size="mini"
                           type="danger"
                           round
                           @click="
                    editCategory({
                      data: firseItem,
                      type: 'category_first_edit'
                    })
                  ">编辑</el-button>
                <el-button size="mini"
                           type="success"
                           round
                           @click="
                    addChildren({
                      data: firseItem,
                      type: 'category_children_add'
                    })
                  ">添加子级</el-button>
                <el-button size="mini"
                           round
                           @click="deleteCategory(firseItem.id)">删除</el-button>
              </div>
            </h4>
            <!-- 二级分类 -->
            <ul v-show="firseItem.children">
              <li v-for="childrenItem in firseItem.children"
                  :key="childrenItem.id">
                {{ childrenItem.category_name }}
                <div class="button-group">
                  <el-button size="mini"
                             type="danger"
                             round>编辑</el-button>
                  <el-button size="mini"
                             round>删除</el-button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <h3 class="menu-title">一级分类编辑</h3>
        <el-form label-width="142px"
                 class="from-wrap"
                 ref="categoryForm"
                 :model="form">
          <el-form-item label="一级分类名："
                        prop="categoryName">
            <el-input v-model="form.categoryName"
                      :disabled="category_first_disabled"></el-input>
          </el-form-item>
          <el-form-item label="二级分类名称："
                        v-if="children"
                        prop="secCategoryName">
            <el-input v-model="form.secCategoryName"
                      :disabled="category_child_disabled"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger"
                       @click="submit"
                       :disabled="category_button_disabled">确定</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  AddFirstCategory,
  DelCategory,
  EditCategoryFirst,
  AddChildrenCategory
} from "@/api/news";
export default {
  name: "Category",
  data () {
    return {
      // 一级与子级输入的隐藏与显示
      children: true,
      category_first_disabled: true,
      category_child_disabled: true,
      category_button_disabled: true,
      // 列表信息
      category: [],
      form: {
        categoryName: "",
        secCategoryName: ""
      },

      // 用于判断修改的是一级分类还是二级分类
      subit_button_type: "",

      // 用来存放修改分类名的相关数据
      current: []
    };
  },
  methods: {
    // 编辑一级分类
    editCategory (params) {
      this.children = false;
      this.category_first_disabled = false;
      this.category_button_disabled = false;
      this.subit_button_type = params.type;
      this.form.categoryName = params.data.category_name;
      this.current = params.data;
      // console.log(this.current);
    },

    // 确定按钮
    submit () {
      if (this.subit_button_type === "category_first_add") {
        this.addFirstCategory();
      }
      if (this.subit_button_type === "category_first_edit") {
        this.editCategoryFirst();
      }
      if (this.subit_button_type === "category_children_add") {
        this.addChildrenCategory();
      }
      if (!this.form.categoryName) {
        this.$message({
          message: "分类名称不能为空",
          type: "error"
        });
        return false;
      }
    },

    // 添加一级分类的数据接口
    addFirstCategory () {
      AddFirstCategory({
        categoryName: this.form.categoryName
      })
        .then(response => {
          if (response.resCode == 0) {
            this.$message({
              message: response.message,
              type: "success"
            });
            this.category.push(response.data);
            this.$refs.categoryForm.resetFields();
          }
        })
        .catch(error => {
          console.log(error);
          this.$refs.form.resetFields();
        });
    },

    // 一级分类编辑
    editCategoryFirst () {
      if (this.current.length == 0) {
        this.$message({
          message: "未选择分类",
          type: "error"
        });
        return false;
      }
      let requestData = {
        id: this.current.id,
        categoryName: this.form.categoryName
      };
      EditCategoryFirst(requestData)
        .then(response => {
          this.$message({
            message: response.message,
            type: "success"
          });
          this.current.category_name = response.data.data.categoryName;
          // let data = this.category.filter(item => item.id === this.current.id);
          // data[0].category_name = response.data.data.categoryName;
          this.$refs.categoryForm.resetFields();
          this.current = [];
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 添加一级分类
     * 需求：当点击一级分类按钮后，右侧只显示一级分类输入框，不显示二级分类输入框
     * 方法：通过定义两个变量，true  false 利用 v-if 来显示与隐藏
     */
    addFirst (params) {
      this.subit_button_type = params.type;
      this.children = false;
      this.category_first_disabled = false;
      this.category_button_disabled = false;
    },
    // 添加子级
    addChildren (params) {
      this.subit_button_type = params.type;
      this.current = params.data;
      this.category_child_disabled = false;
      this.category_button_disabled = false;
      this.category_first_disabled = true;
      this.children = true;
      // console.log(params);
      this.form.categoryName = params.data.category_name;
    },

    // 添加子级接口方法
    addChildrenCategory () {
      if (!this.form.secCategoryName) {
        this.$message({
          type: "error",
          message: "子级分类名称不能为空"
        });
        return false;
      }
      let requestData = {
        categoryName: this.form.secCategoryName,
        parentId: this.current.id
      };
      AddChildrenCategory(requestData)
        .then(response => {
          this.$message({
            type: "success",
            message: response.message
          });
          this.form.secCategoryName = "";
          this.getCategoryAll();
        })
        .catch(error => {
          console.log(error);
        });
    },

    // 获取信息分类数据接口
    getCategory () {
      this.$getCommon(res => {
        this.category = res.data;
      });
    },
    // 获取信息分类(含子级)
    getCategoryAll () {
      this.$getDataAll(res => {
        this.category = res;
      });
    },

    // 删除信息分类
    deleteCategory (id) {
      this.confirm({
        content: "确认删除当前信息，确认后将无法恢复",
        tip: "警告",
        callback: this.delCategory,
        id
      });
    },
    // 信息分类删除接口
    delCategory (id) {
      DelCategory({ categoryId: id })
        .then(response => {
          if (response.resCode == 0) {
            this.$message({
              message: response.message,
              type: "success"
            });
            let index = this.category.findIndex(item => item.id == id);
            this.category.splice(index, 1);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted () {
    this.getCategoryAll();
  }
};
</script>

<style lang="scss" scoped>
.category-wrap {
  div:first-child {
    &::before {
      top: 20px;
    }
  }
  div:last-child {
    &::before {
      bottom: 21px;
    }
  }
}
.category {
  position: relative;
  line-height: 44px;
  &::before {
    content: '';
    position: absolute;
    left: 22px;
    top: 0;
    bottom: 0;
    width: 32px;
    border-left: 1px dotted #000;
  }
  h4 {
    position: relative;
    padding-left: 40px;
    i {
      position: absolute;
      left: 14px;
      font-size: 17px;
      &::before {
        background: #fff;
      }
    }
  }
  li {
    position: relative;
    padding-left: 36px;
    margin-left: 24px;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 22px;
      width: 32px;
      border-bottom: 1px dotted #000;
    }
  }
  li,
  h4 {
    transition: all 0.3s ease 0s;
    cursor: pointer;
    &:hover {
      background: #f3f3f3;
      .button-group {
        display: block;
      }
    }
  }
  .button-group {
    position: absolute;
    top: 0;
    right: 11px;
    display: none;
    font-size: 12px;
    z-index: 2;
  }
}

.menu-title {
  padding-left: 22px;
  line-height: 44px;
  background: #f3f3f3;
}
.from-wrap {
  width: 410px;
  padding-top: 26px;
}
</style>
