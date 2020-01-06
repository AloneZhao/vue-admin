import router from "./index";
import stroe from "../store/index";
import { get_Token, remove_Token, remove_Username } from "@/utils/storage";

// 声明白名单
const whiteRouter = ["/login"]; // 用 indexOf 判断数组中是否存在指定元素  不存在  返回-1

// 路由守卫 ==> 在路由跳转前执行进行 token 验证
router.beforeEach((to, from, next) => {
  // 通过读取get_Token这个方法来判断 token 是否存在 cookie 中
  if (get_Token()) {
    // 路由动态添加 分配菜单 每个角色分配不同的菜单

    /**
     * 需求：当用户通过url跳转到 /login 后再次返回 /index 后需要失效
     * 方法：利用 to 中的 path 属性判断 是否是 /login 如果是就清楚 cookie 中的 token
     */
    if (to.path === "/login") {
      // 清除 cookie 中的 token
      remove_Token();
      remove_Username();
      // 清除 store 中的 token
      stroe.commit("app/setToken", "");
      stroe.commit("app/setUserName", "");
      next();
    } else {
      // 获取用户角色 动态分配用户权限
      next();
    }
  } else {
    if (whiteRouter.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
    }
    /**
     * 为什么当进行路由跳转的时候不直接 next('/login')  ==>  因为这样写的话会直接卡死页面，一直在进行跳转
     * 所以通过设置白名单来进行如下判断
     *
     * 功能分析
     *    1. 当未登录通过url想直接跳转到后台页面,这时 to 被改变成 '/index' 由于是路由跳转 所以会执行beforeEach
     *    2. 由于没有存在 token 则执行else中的方法 其次由于 '/index' 不存在白名单中 所以执行else中的语句  此时 next 执行 '/login' 由于是路由跳转 再次执行beforeEach
     *    3. 此时执行到此处中 由于所访问的路径在白名单中存在，则执行next() 因为没有参数 所以不会再次执行beforeEach
     */
  }
});
