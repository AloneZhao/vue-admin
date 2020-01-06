import service from "@/utils/request";
/**
 * 获取验证码
 */
function GetSms(data) {
  return service.request({
    method: "post",
    url: "/getSms/",
    data
  });
}

/**
 * 获取用户角色
 */

/**
 * 登陆
 */
function Login(data) {
  return service.request({
    method: "post",
    url: "/login/",
    data
  });
}
/**
 * 注册
 */
function Register(data) {
  return service.request({
    method: "post",
    url: "/register/",
    data
  });
}

export { GetSms, Register, Login };
