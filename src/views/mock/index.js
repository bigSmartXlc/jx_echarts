const fs = require("fs"); //定义一个fs ,fs模块为nodejs的核心模块之一，主要处理文件的读写、复制、S删除、重命名等操作
const path = require("path"); //定义一个path,path模块为nodejs的一个模块，在这个模块中，提供了许多使用的，可被用来处理与转换路径的方法和属性
const JSON5 = require("json5"); //引入json5 模块
const Mock = require("mockjs"); //引入mock.js

//读取json文件
function getJsonFile(filePath) {
  //fs.readFileSync同步读取文件，第一个参数代表文件路径（不可省略），第二个参数代表读出文件的编码方式（可省略，省略后读出的数据是buffer数据格式）
  //path.join,将 以逗号分隔的一系列路径，这些路径将连接在一起以构成最终路径
  //__dirname,表示当前文件所在目录
  var json = fs.readFileSync(path.join(__dirname, filePath), "utf-8"); //将获取到内容保存到变量json中
  console.log("nihao");
  console.log(json); //打印json
  var obj = JSON5.parse(json); //用JSON5来解析读取到的json
  console.log(obj);
  return obj;
}

//返回一个函数
module.exports = function (app) {
  //用app这个对象来监听它的 '/user/userinfo' url,
  //监听http请求
  app.get("/user/userinfo", function (rep, res) {
    //每次响应请求时读取mock data的json文件
    //getJsonFile方法定义了如何读取json文件并解析成数据对象
    var json = getJsonFile("./1.1.json");
    //将json传入Mock.mock 方法中,生成的数据返回给浏览器
    res.json(Mock.mock(json));
  });
};
