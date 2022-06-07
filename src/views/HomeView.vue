<template>
  <div class="home">
    <div class="content">
      <div class="left">
        <h3>规划引领</h3>
        <div class="box" id="review_box">
          <ul id="comment1"></ul>
          <ul id="comment2"></ul>
        </div>
        <h3>项目建设</h3>
        <ul class="thead">
          <span style="width: 100px">序号</span>
          <span style="width: 100px">区县</span>
          <span style="width: 100px">项目数</span>
          <span style="width: 100px">完成进度</span>
        </ul>
        <div id="table_box">
          <ul id="tbody"></ul>
          <ul id="tbody1"></ul>
        </div>
      </div>
      <div class="center">
        <h4 style="color: #fff">当前位置-嘉兴市</h4>
        <div class="chart-wrapper" id="chart-city"></div>
      </div>
      <div class="right">
        <h3>基础资源</h3>
        <div class="tab-class">
          <!-- 菜单 -->
          <div class="tab-menu">
            <div class="tab-menu-span">投放</div>
            <div class="tab-menu-span">收集</div>
            <div class="tab-menu-span">运输</div>
            <div class="tab-menu-span">处置</div>
          </div>
          <!-- tab list -->
          <div class="tab-list">
            <div class="tab-list-span">
              <p>
                <span class="name">收集车辆</span><span class="num">3214</span>
              </p>
              <p>
                <span class="name">收集车辆</span><span class="num">3214</span>
              </p>
              <p>
                <span class="name">收集车辆</span><span class="num">3214</span>
              </p>
              <p>
                <span class="name">收集车辆</span><span class="num">3214</span>
              </p>
              <p>
                <span class="name">收集车辆</span><span class="num">3214</span>
              </p>
              <p>
                <span class="name">收集车辆</span><span class="num">3214</span>
              </p>
              <p>
                <span class="name">收集车辆</span><span class="num">3214</span>
              </p>
              <p>
                <span class="name">收集车辆</span><span class="num">3214</span>
              </p>
            </div>
            <div class="tab-list-span">
              <p>
                <span class="name">定时定点小区</span
                ><span class="num">5624</span>
              </p>
              <p>
                <span class="name">定时定点小区</span
                ><span class="num">5624</span>
              </p>
              <p>
                <span class="name">定时定点小区</span
                ><span class="num">5624</span>
              </p>
              <p>
                <span class="name">定时定点小区</span
                ><span class="num">5624</span>
              </p>
              <p>
                <span class="name">定时定点小区</span
                ><span class="num">5624</span>
              </p>
              <p>
                <span class="name">定时定点小区</span
                ><span class="num">5624</span>
              </p>
              <p>
                <span class="name">定时定点小区</span
                ><span class="num">5624</span>
              </p>
              <p>
                <span class="name">定时定点小区</span
                ><span class="num">5624</span>
              </p>
            </div>
            <div class="tab-list-span">
              <p>
                <span class="name">劝导员数量</span
                ><span class="num">8954</span>
              </p>
              <p>
                <span class="name">劝导员数量</span
                ><span class="num">8954</span>
              </p>
              <p>
                <span class="name">劝导员数量</span
                ><span class="num">8954</span>
              </p>
              <p>
                <span class="name">劝导员数量</span
                ><span class="num">8954</span>
              </p>
              <p>
                <span class="name">劝导员数量</span
                ><span class="num">8954</span>
              </p>
              <p>
                <span class="name">劝导员数量</span
                ><span class="num">8954</span>
              </p>
              <p>
                <span class="name">劝导员数量</span
                ><span class="num">8954</span>
              </p>
              <p>
                <span class="name">劝导员数量</span
                ><span class="num">8954</span>
              </p>
            </div>
            <div class="tab-list-span">
              <p>
                <span class="name">省高标小区</span
                ><span class="num">1562</span>
              </p>
              <p>
                <span class="name">省高标小区</span
                ><span class="num">1562</span>
              </p>
              <p>
                <span class="name">省高标小区</span
                ><span class="num">1562</span>
              </p>
              <p>
                <span class="name">省高标小区</span
                ><span class="num">1562</span>
              </p>
              <p>
                <span class="name">省高标小区</span
                ><span class="num">1562</span>
              </p>
              <p>
                <span class="name">省高标小区</span
                ><span class="num">1562</span>
              </p>
              <p>
                <span class="name">省高标小区</span
                ><span class="num">1562</span>
              </p>
              <p>
                <span class="name">省高标小区</span
                ><span class="num">1562</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-gl";
export default {
  name: "HomeView",
  data() {
    return {
      myChart: null,
      color: ["#fecb9a", "#fefdce", "#fefa7d", "#cdccfb", "#cdf99d", "#fdcdcc"],
    };
  },
  mounted() {
    this.setCityChart();
  },
  methods: {
    setCityChart() {
      if (this.myChart) {
        this.myChart.dispose(); // 销毁实例，实例销毁后无法再被使用。
      }
      // 初始化图表
      this.myChart = echarts.init(document.getElementById("chart-city"));
      // JSON文件(地图数据)路径

      // 显示加载动画效果,可以在加载数据前手动调用该接口显示加载动画，在数据加载完成后调用 hideLoading 隐藏加载动画。
      this.myChart.showLoading();
      let mapName = "jx";
      // 引入JSON文件
      this.$http.get("./jx.json").then((geoJson) => {
        const data = geoJson.data.features.map((item, index) => {
          const geoAreaName = item.properties.name; // geo文件中的地理名称
          return {
            name: geoAreaName,
            coord: item.properties.centroid,
            selected: true,
            itemStyle: {
              areaColor: this.color[index] || "#046357",
            },
          };
        });
        echarts.registerMap(mapName, geoJson.data);

        // 隐藏动画加载效果。
        this.myChart.hideLoading();

        // 图表配置项
        var option = {
          selectedMode: "multiple", // 选中效果固话
          tooltip: {
            // 提示框
            show: true,
            trigger: "item",
            formatter: function (params) {
              return params.name;
            },
          },
          series: [
            {
              name: "map3D",
              type: "map3D", // map3D / map
              zoom: 0.7,
              map: mapName,
              label: {
                // 标签的相关设置
                show: true, // (地图上的城市名称)是否显示标签 [ default: false ]
                distance: 15, // 距离
                // rotate:-90,
                formatter: function (params) {
                  // return '{b|'+params.name+'}'
                  return params.name;
                },
                textStyle: {
                  // 标签的字体样式
                  color: "#ffffff", // 地图初始化区域字体颜色
                  backgroundColor: "transparent",
                  fontSize: 14, // 字体大小
                  opacity: 1, // 字体透明度
                  rich: {
                    b: {
                      backgroundColor: {
                        image: "images/home.png",
                      },
                    },
                    height: 40,
                  },
                },
                emphasis: {
                  show: true,
                },
              },
              tooltip: {
                //提示框组件。
                alwaysShowContent: true,
                hoverAnimation: true,
                trigger: "item", //触发类型 散点图
                enterable: true, //鼠标是否可进入提示框
                transitionDuration: 1, //提示框移动动画过渡时间
                triggerOn: "click",
                formatter: function (params) {
                  if (params.name) {
                    var str = `
                  <div class="map-tooltip">
                    <div class="city-name">${params.name}</div>
                  </div>
                  `;
                    return str;
                  }
                },
                // backgroundColor: 'rgba(30, 54, 124,1)',
                // backgroundColor: '#01FEDD',
                borderWidth: "1px",
                borderRadius: "4",
                borderColor: "#00B2AC",
                textStyle: {
                  color: "#00B2AC",
                },
                padding: [5, 10],
              },
              itemStyle: {
                // 三维地理坐标系组件 中三维图形的视觉属性，包括颜色，透明度，描边等。
                areaColor: "#00B2AC", // 地图板块的颜色
                opacity: 0.3, // 图形的不透明度 [ default: 1 ]
                borderWidth: 1.5, // (地图板块间的分隔线)图形描边的宽度。加上描边后可以更清晰的区分每个区域 [ default: 0 ]
                borderColor: "#ffffff", // 图形描边的颜色。[ default: #333 ]
              },
              data: data,
              viewControl: {
                distance: 130, // 地图视角 控制初始大小
                rotateSensitivity: 1, // 旋转
                zoomSensitivity: 1, // 缩放
              },
            },
          ],
        };
        this.myChart.setOption(option);
      });
    },
  },
};
</script>
<style lang="scss" scopd>
.chart-wrapper {
  z-index: 1;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
h3 {
  margin: 0;
  line-height: 70px;
  font-family: Source Han Sans CN;
  font-size: 28px;
  font-weight: bold;
  color: transparent;
  text-align: center;
  background: linear-gradient(0deg, #bff5ff 0%, #00ece4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.select-panel {
  position: absolute;
  z-index: 2;
  color: #ffffff;
}
.left {
  width: 28%;
  height: 900px;
  text-align: center;
  z-index: 10;
}
.center {
  width: 44%;
  z-index: 1;
}
.right {
  border: solid 1px rgb(11, 100, 233);
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  width: 28%;
  height: 900px;
  z-index: 10;
}
#table_box {
  position: relative;
  width: 400px;
  height: 375px;
  background-color: transparent;
  margin: auto;
  overflow: hidden;
  color: #fff;
  border-radius: 5px;
}
#table_box span {
  width: 100px;
  display: inline-block;
  text-align: center;
}
.thead {
  width: 400px;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
}
.thead span {
  /* width: 100px; */
  display: inline-block;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  color: #03a7f0;
}
.box {
  position: relative;
  width: 400px;
  height: 375px;
  background-color: transparent;
  margin: auto;
  overflow: hidden;
  color: #fff;
  border-radius: 5px;
}
/* .box ul {
        position: absolute;
        top: 0;
        left: 0;
        } */
.box ul li {
  line-height: 50px;
  list-style: none;
  padding: 0 30px;
  box-sizing: border-box;
  cursor: pointer;
}
.tab-menu {
  width: 100%;
  height: 40px;
  padding-top: 10px;
  color: #f5f6f8;
  display: flex;
  justify-content: space-around;
}

.tab-menu-span {
  width: 80px;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  text-align: center;
}

.tab-menu-span-hover {
  border: solid 1px rgb(11, 113, 247);
  border-radius: 5px;
}

.tab-list {
  position: relative;
}

.tab-list-span {
  color: #fff;
  padding: 20px 10px;
  height: 200px;
  position: absolute;
  top: 0;
  width: 100%;
  display: none;
}
.tab-list-span .name {
  display: inline-block;
  padding-left: 10px;
  font-weight: 800;
  text-align: left;
  width: 45%;
  height: 85px;
}
.tab-list-span .num {
  display: inline-block;
  font-size: 25px;
  color: #00ece4;
  font-weight: 800;
  text-align: center;
  width: 50%;
  height: 85px;
}
.tab-list-span p {
  margin-top: 3px;
  line-height: 85px;
  background: rgba(3, 157, 247, 0.2);
  border-radius: 5px;
}
.tab-list-span p:hover {
  background: rgba(3, 88, 247, 0.5) !important;
}
#tbody li,
#tbody1 li {
  display: flex;
  justify-content: space-between;
}
#tbody td {
  text-align: center;
}
.content {
  display: flex;
  justify-content: space-between;
}
.active {
  background-color: #0c66a5 !important;
}
</style>
