var myChart = echarts.init(document.getElementById("main"));
myChart.setOption({
  tooltip: {
    trigger: "item",
    formatter: function (params) {
      var res = "";
      res += params.data.name + "<br/>";
      res += "我就：" + params.data.options.obj1 + "<br/>";
      return res;
    },
  },

  legend: {
    bottom: 10,
    data: ["合作社", "涉农企业"],
    backgroundColor: "#fff",
  },
  bmap: {
    center: [117.208714, 37.325947],
    zoom: 7,
    roam: true,
  },
  series: [
    {
      name: "合作社",
      type: "scatter",
      coordinateSystem: "bmap",
      zlevel: 9,
      z: 9,
      data: [
        {
          name: "12313123",
          options: {
            obj1: "哈哈",
          },
          value: [117.208714, 37.325947, 1],
        },
      ],
    },
    {
      name: "涉农企业",
      type: "scatter",
      coordinateSystem: "bmap",
      zlevel: 9,
      z: 9,
      data: [
        {
          name: "3435535",
          options: {
            obj1: "啦啦啦",
          },
          value: [117.328714, 37.325947, 1],
        },
      ],
    },
  ],
});
// 获得百度地图实例对象
var bmap = myChart.getModel().getComponent("bmap").getBMap();
//地图图层切换控件
bmap.addControl(new BMap.MapTypeControl());
// 设置中心点及缩放级别
bmap.centerAndZoom(new BMap.Point(117.208714, 37.325947), 10);
// 开启滚轮缩放
bmap.enableScrollWheelZoom();
//设置地图默认图层（实景）
bmap.setMapType(BMAP_HYBRID_MAP); //BMAP_NORMAL_MAP(展示普通街道视图)/BMAP_PERSPECTIVE_MAP(展示透视图像视图)/BMAP_SATELLITE_MAP(展示卫星视图)/BMAP_HYBRID_MAP(展示卫星和路网的混合视图)
//缩放大小限制
bmap.setMinZoom(8);
bmap.setMaxZoom(12);
// 行政区划展示
function getBoundary(data) {
  var bdary = new BMap.Boundary();
  // 这里填写要展示的行政区划
  bdary.get(data, function (rs) {
    //获取行政区域
    var count = rs.boundaries.length; //行政区域的点有多少个
    if (count === 0) {
      alert("未能获取当前输入行政区域");
      return;
    }
    var pointArray = [];
    for (var i = 0; i < count; i++) {
      var ply = new BMap.Polygon(rs.boundaries[i], {
        strokeWeight: 2,
        strokeColor: "#ff0000",
      }); //建立多边形覆盖物
      bmap.addOverlay(ply); //添加覆盖物
      pointArray = pointArray.concat(ply.getPath());
    }
    bmap.setViewport(pointArray); //调整视野
  });
}

getBoundary("商河县");
// 这里传参可同时渲染多个省市的行政区划
// getBoundary("临邑县");
