import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./router/guard"; // 路由守卫 跳转前 token 验证
// 自定义全局组件
// import "./icons";

// 自定义全局方法
import global from "@/utils/global";

Vue.use(ElementUI);
Vue.use(global);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
