import cookie from "cookie_js";

/**
 * 该方法是从 cookie 中读取token
 */
function get_Token() {
  return cookie.get("admin_token");
}

/**
 * 将仓库中的 tonken 存到 cookie
 */
function set_Token(toKen) {
  return cookie.set("admin_token", toKen);
}

/**
 * 移除 cookie
 */
function remove_Token() {
  return cookie.remove("admin_token");
}

/**
 * 存用户cookie
 */
function set_Username(value) {
  return cookie.set("username", value);
}

/**
 * 获取 cookie 中的username
 */
function get_Username() {
  return cookie.get("username");
}

/**
 * 移除 cookie 中的 username
 */
function remove_Username() {
  return cookie.remove("username");
}

export {
  get_Token,
  set_Token,
  remove_Token,
  set_Username,
  get_Username,
  remove_Username
};
