// 请求参数
export function delObjectKey(obj) {
  var param = {};
  if (obj == null || obj == "" || obj == undefined) return param;
  for (var key in obj) {
    if (obj[key] !== null && obj[key] !== "" && obj[key] !== undefined) {
      param[key] = obj[key];
    }
  }
  return param;
}
