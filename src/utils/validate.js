/**
 * 过滤特殊字符 方法
 */

function stripscript(str) {
  var pattern = new RegExp(
    "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~%！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]"
  );
  var rs = "";
  for (var i = 0; i < str.length; i++) {
    rs = rs + str.substr(i, 1).replace(pattern, "");
  }
  return rs;
}

/**
 * 邮箱验证
 */
function validateEmail(value) {
  let reg = /^([a-zA-Z]|[0-9])(\w|)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  if (!reg.test(value)) {
    return true;
  } else {
    return false;
  }
}

/**
 * 密码 验证
 */
function validatePassword(value) {
  // 验证密码 字母+数字 长度是6-20
  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  if (!reg.test(value)) {
    return true;
  } else {
    return false;
  }
}

/**
 * 验证码 验证
 */
function validateCod(value) {
  let reg = /^[a-z0-9]{6}$/;
  if (!reg.test(value)) {
    return true;
  } else {
    return false;
  }
}
export { stripscript, validateEmail, validatePassword, validateCod };
