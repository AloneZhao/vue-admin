<template>
  <div class="login">
    <div class="login-wrap">
      <ul class="login-tab">
        <li
          v-for="(item, index) in menuTab"
          :class="{ current: item.current }"
          :key="index"
          @click="toggleMenu(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <!-- 表单 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="userName" class="item-form">
          <label>邮箱</label>
          <el-input
            type="text"
            v-model="ruleForm.userName"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="pwd" class="item-form">
          <label>密码</label>
          <el-input
            type="password"
            v-model="ruleForm.pwd"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="pwds"
          class="item-form"
          v-show="module === 'regist'"
        >
          <label>重复密码</label>
          <el-input
            type="password"
            v-model="ruleForm.pwds"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-form">
          <label>验证码</label>
          <el-row :gutter="20">
            <el-col :span="15">
              <el-input
                v-model="ruleForm.code"
                minlength="6"
                maxlength="6"
              ></el-input>
            </el-col>
            <el-col :span="9">
              <el-button
                type="success"
                class="login-block"
                :disabled="codeBtnState"
                @click="getSms()"
                >{{ codeBtnText }}</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-block login-btn"
            type="danger"
            @click="submitForm('loginForm')"
            >{{ module === "login" ? "登陆" : "注册" }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import sha1 from "js-sha1";
import {
  stripscript,
  validateEmail,
  validatePassword,
  validateCod
} from "@/utils/validate";
import { GetSms, Register } from "@/api/login";
export default {
  name: "Login",
  data() {
    //邮箱验证
    var validateUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("用户邮箱不能为空"));
      } else if (validateEmail(value)) {
        callback(new Error("用户邮箱格式有误"));
      } else {
        callback();
      }
    };

    // 密码验证
    var validatePwd = (rule, value, callback) => {
      // 过滤特殊字符
      this.ruleForm.pwd = stripscript(value);
      value = this.ruleForm.pwd;
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (validatePassword(value)) {
        callback(new Error("密码是6-20位 字母+数字"));
      } else {
        callback();
      }
    };

    // 重复密码验证
    var validatePwds = (rule, value, callback) => {
      /**
       * 方法一：如用了 v-show 则需要做如下判断
       * 方法二：如用了 v-if 则不需要做如下判断
       */
      if (this.module == "login") {
        callback();
      }
      // 过滤特殊字符
      this.ruleForm.pwds = stripscript(value);
      value = this.ruleForm.pwds;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.ruleForm.pwd) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };

    // 验证码  验证
    var validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("验证码不能为空"));
      } else if (validateCod(value)) {
        callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };

    return {
      menuTab: [
        //定义type 用于点击时变换model
        { txt: "登陆", current: true, type: "login" },
        { txt: "注册", current: false, type: "regist" }
      ],
      // 定义一个模块值，用于检验当前是登陆还是注册
      module: "login",

      // 定义验证码按钮状态
      codeBtnState: false,

      // 定义按钮文字
      codeBtnText: "获取验证码",
      // 定义倒计时
      btnTime: null,
      ruleForm: {
        userName: "",
        pwd: "",
        pwds: "",
        code: ""
      },
      //验证规则 在失去焦点的时候触发validator属性中对应的方法
      rules: {
        userName: [{ validator: validateUserName, trigger: "blur" }],
        pwd: [{ validator: validatePwd, trigger: "blur" }],
        pwds: [{ validator: validatePwds, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 登陆与注册样式的改变
    toggleMenu(data) {
      this.menuTab.forEach(element => {
        element.current = false;
      });
      data.current = true;
      // 改变 module 状态
      this.module = data.type;

      //清空表单数据  element中运用了 $refs 来操作
      this.$refs["loginForm"].resetFields();
    },
    // 获取验证码
    getSms() {
      if (this.ruleForm.userName === "") {
        this.$message.error("邮箱不能为空");
        return;
      }
      if (validatePassword(this.ruleForm.userName)) {
        this.$message.error("邮箱格式有错误");
        return;
      }
      // 改变验证码按钮状态
      this.codeBtnState = true;
      this.codeBtnText = "发送中...";

      // 所传的参数
      let param = {
        username: this.ruleForm.userName,
        module: this.module
      };

      // 请求验证码接口
      GetSms(param)
        .then(response => {
          this.$message({
            message: response.message,
            type: "success"
          });
          // 调用定时器 验证码按钮倒计时
          this.countDown(60);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 倒计时方法定义
    countDown(number) {
      this.btnTime = setInterval(() => {
        number--;
        if (number == 0) {
          clearInterval(this.btnTime);
          this.codeBtnText = "获取验证码";
          this.codeBtnState = false;
        } else {
          this.codeBtnText = `重新获取(${number})`;
        }
      }, 1000);
    },
    // 登陆
    login() {
      // 登陆参数
      let params = {
        username: this.ruleForm.userName,
        password: sha1(this.ruleForm.pwd),
        code: this.ruleForm.code
      };
      this.$store
        .dispatch("app/login", params)
        .then(response => {
          // console.log(response);
          this.$message({
            message: response.message,
            type: "success"
          });
          this.$router.push({
            name: "Console"
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 注册
    register() {
      // 注册的数据
      let params = {
        username: this.ruleForm.userName,
        password: sha1(this.ruleForm.pwd),
        code: this.ruleForm.code,
        module: this.module
      };
      // 注册接口
      Register(params)
        .then(response => {
          this.$message({
            message: response.message,
            type: "success"
          });
          this.toggleMenu(this.menuTab[0]); // 改变选项卡样式
          clearInterval(this.btnTime); //清楚注册时的定时器
          this.codeBtnText = "获取验证码";
          this.codeBtnState = false;
        })
        .catch(error => {
          console.log(error);
        });
    },

    // 表单提交
    submitForm(formName) {
      // 模拟注册成功
      /**
       * 需求 跳到登陆界面同时验证码按钮字样恢复到初始状态
       */

      this.$refs[formName].validate(valid => {
        // 表单验证通过后执行
        if (valid) {
          this.module === "login" ? this.login() : this.register();
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  background: #344a5f;
  .login-wrap {
    width: 330px;
    margin: 0 auto;
    .login-tab {
      text-align: center;
      > li {
        display: inline-block;
        width: 88px;
        line-height: 36px;
        font-size: 14px;
        color: #fff;
        border-radius: 2px;
        cursor: pointer;
        &:hover {
          background: rgba(0, 0, 0, 0.1);
        }
      }
      .current {
        background: rgba(0, 0, 0, 0.1);
      }
    }
    .login-form {
      margin-top: 29px;
      label {
        display: block;
        margin-bottom: 3px;
        font-size: 14px;
        color: #fff;
      }
      .item-form {
        margin: 13px 0;
      }
      .login-block {
        display: block;
        width: 100%;
      }
      .login-btn {
        margin-top: 20px;
      }
    }
  }
  /deep/ .el-form-item__content {
    margin-left: 0 !important;
  }
}
</style>
