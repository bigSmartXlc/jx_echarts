// 请求参数过滤
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
//防止js文件重复加载
export function isInclude(url) {
  var es = document.getElementsByTagName("script");
  for (var i = 0; i < es.length; i++) if (es[i]["src"] == url) return true;
  return false;
}
//异步加载js
export function loadJS(url, success) {
  if (isInclude(url)) {
    success();
    return;
  }
  var domScript = document.createElement("script");
  domScript.src = url;
  success = success || function () {};
  domScript.onload = domScript.onreadystatechange = function () {
    if (
      !this.readyState ||
      "loaded" === this.readyState ||
      "complete" === this.readyState
    ) {
      success();
      this.onload = this.onreadystatechange = null;
      this.parentNode.removeChild(this);
    }
  };
  document.getElementsByTagName("head")[0].appendChild(domScript);
}
