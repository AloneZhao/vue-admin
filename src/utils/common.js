// 时间戳转换
function timestampToTime(timestamp) {
  let date = new Date(timestamp * 1000); // 时间戳是10位需要*1000，时间戳为13位不需要*1000
  let Y = date.getFullYear();

  let M =
    date.getMonth() + 1 > 10
      ? date.getMonth() + 1
      : "0" + (date.getMonth() + 1);

  let D = date.getDate() > 10 ? date.getDate() : "0" + date.getDate();

  let h = date.getHours() > 10 ? date.getHours() : "0" + date.getHours();

  let m = date.getMinutes() > 10 ? date.getMinutes() : "0" + date.getMinutes();

  return `${Y}-${M}-${D} ${h}:${m}`;
}

export { timestampToTime };
