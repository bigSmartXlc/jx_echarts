<template>
  <div class="home">
    <div class="content">
      <div class="left">
        <h3>规划引领</h3>
        <div class="box" id="review_box">
          <VueSeamlessScroll
            :data="lefttopdata"
            :class-option="seamlessScrollOption"
            style="
              height: 300px;
              overflow: hidden;
              width: 400px;
              color: white;
              font-size: 18px;
              text-align: center;
            "
          >
            <ul id="tbody">
              <li v-for="(item, index) in lefttopdata" :key="index">
                {{ item }}
              </li>
            </ul>
          </VueSeamlessScroll>
        </div>
        <h3>项目建设</h3>
        <ul class="thead">
          <span style="width: 100px">序号</span>
          <span style="width: 100px">区县</span>
          <span style="width: 100px">项目数</span>
          <span style="width: 100px">完成进度</span>
        </ul>
        <div class="box" id="table_box">
          <VueSeamlessScroll
            :data="leftBottom"
            :class-option="seamlessScrollOption"
            style="
              height: 300px;
              overflow: hidden;
              width: 400px;
              color: white;
              font-size: 18px;
              text-align: center;
            "
          >
            <ul id="comment1">
              <li v-for="(item, index) in leftBottom" :key="index">
                <span>{{ item.index }}</span>
                <span>{{ item.position }}</span>
                <span>{{ item.num }}</span>
                <span>
                  <span class="spanP">
                    <div class="spanS1" :style="{ width: item.jingdu }">
                      {{ item.jingdu }}
                    </div>
                  </span>
                </span>
              </li>
            </ul>
          </VueSeamlessScroll>
        </div>
      </div>
      <div class="center">
        <div class="chart-wrapper" id="chart-city"></div>
      </div>
      <div class="right">
        <h3>基础资源</h3>
        <div class="tab-class">
          <!-- 菜单 -->
          <div class="tab-menu">
            <div class="tab-menu-span" @click="tabContent = 0">投放</div>
            <div class="tab-menu-span" @click="tabContent = 1">收集</div>
            <div class="tab-menu-span" @click="tabContent = 2">运输</div>
            <div class="tab-menu-span" @click="tabContent = 3">处置</div>
          </div>
          <!-- tab list -->
          <div class="tab-list">
            <div
              class="tab-list-span animate__animated animate__flipInY"
              v-show="tabContent === 0"
            >
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
            <div
              class="tab-list-span animate__animated animate__flipInY"
              v-show="tabContent === 1"
            >
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
            <div
              class="tab-list-span animate__animated animate__flipInY"
              v-show="tabContent === 2"
            >
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
            <div
              class="tab-list-span animate__animated animate__flipInY"
              v-show="tabContent === 3"
            >
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
            <div style="clear: both"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import VueSeamlessScroll from "vue-seamless-scroll";
import yls_json from "./ljpt_xz.json";
import "echarts-gl";
export default {
  components: {
    VueSeamlessScroll,
  },
  name: "HomeView",
  computed: {
    seamlessScrollOption() {
      return {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
  data() {
    return {
      myChart: null,
      tabContent: 0,
      btnlist3: [
        { deptName: "南湖", rowId: 410000000, rowIdEnd: 419999999 },
        { deptName: "秀洲", rowId: 420000000, rowIdEnd: 429999999 },
        { deptName: "嘉善", rowId: 430000000, rowIdEnd: 439999999 },
        { deptName: "海盐", rowId: 440000000, rowIdEnd: 449999999 },
        { deptName: "海宁", rowId: 450000000, rowIdEnd: 459999999 },
        { deptName: "平湖", rowId: 460000000, rowIdEnd: 469999999 },
        { deptName: "桐乡", rowId: 470000000, rowIdEnd: 479999999 },
        { deptName: "经开", rowId: 480000000, rowIdEnd: 489999999 },
        { deptName: "港区", rowId: 490000000, rowIdEnd: 499999999 },
      ],
      color: ["#fecb9a", "#fefdce", "#fefa7d", "#cdccfb", "#cdf99d", "#fdcdcc"],
      lefttopdata: [
        "消息1 : 2006年1月John Resig等人创建了jQuery",
        "消息1 : 2006年1月John Resig等人创建了jQuery",
        "消息2 : 2007年7月，jQuery 1.1.3版发布",
        "消息3 : 2008年5月，jQuery 1.2.6版发布",
        "消息3 : 2008年5月，jQuery 1.2.6版发布",
        "消息3 : 2008年5月，jQuery 1.2.6版发布",
        "消息3 : 2008年5月，jQuery 1.2.6版发布",
        "消息3 : 2008年5月，jQuery 1.2.6版发布",
        "消息3 : 2008年5月，jQuery 1.2.6版发布",
        "消息3 : 2008年5月，jQuery 1.2.6版发布",
        "消息3 : 2008年5月，jQuery 1.2.6版发布",
        "消息4 : 2010年1月，也是jQuery的四周年生日",
      ],
      leftBottom: [
        { index: 1, position: "桐乡市", num: 5, jingdu: "10%" },
        { index: 2, position: "桐乡市", num: 5, jingdu: "20%" },
        { index: 3, position: "桐乡市", num: 5, jingdu: "30%" },
        { index: 4, position: "桐乡市", num: 5, jingdu: "40%" },
        { index: 5, position: "桐乡市", num: 5, jingdu: "50%" },
        { index: 6, position: "桐乡市", num: 5, jingdu: "60%" },
        { index: 7, position: "桐乡市", num: 5, jingdu: "70%" },
        { index: 8, position: "桐乡市", num: 5, jingdu: "50%" },
        { index: 9, position: "桐乡市", num: 5, jingdu: "50%" },
        { index: 10, position: "桐乡市", num: 5, jingdu: "50%" },
        { index: 11, position: "桐乡市", num: 5, jingdu: "50%" },
        { index: 11, position: "桐乡市", num: 5, jingdu: "50%" },
        { index: 11, position: "桐乡市", num: 5, jingdu: "50%" },
        { index: 11, position: "桐乡市", num: 5, jingdu: "50%" },
        { index: 11, position: "桐乡市", num: 5, jingdu: "50%" },
        { index: 11, position: "桐乡市", num: 5, jingdu: "50%" },
        { index: 11, position: "桐乡市", num: 5, jingdu: "50%" },
        { index: 11, position: "桐乡市", num: 5, jingdu: "50%" },
        { index: 11, position: "桐乡市", num: 5, jingdu: "50%" },
        { index: 11, position: "桐乡市", num: 5, jingdu: "50%" },
        { index: 11, position: "桐乡市", num: 5, jingdu: "50%" },
        { index: 11, position: "桐乡市", num: 5, jingdu: "50%" },
        { index: 12, position: "桐乡市", num: 5, jingdu: "50%" },
      ],
    };
  },
  mounted() {
    this.map();
  },
  methods: {
    map() {
      // 初始化图表
      let data = yls_json;
      echarts.registerMap("yls", data);
      var myChart = echarts.init(document.getElementById("chart-city"));

      // JSON文件(地图数据)路径

      // 显示加载动画效果,可以在加载数据前手动调用该接口显示加载动画，在数据加载完成后调用 hideLoading 隐藏加载动画。
      myChart.showLoading();

      // 引入JSON文件
      var linedata = [];
      console.log(yls_json.features);
      const map3Ddata = yls_json.features.map((item) => {
        if (item.properties.centroid) {
          linedata.push([...item.properties.centroid, 0]);
        }
        const geoAreaName = item.properties.name; // geo文件中的地理名称
        return {
          name: geoAreaName,
          // value: item.properties.centroid,
          itemStyle: {
            color: "#0b7ef5",
          },
        };
      });
      const option = {
        title: {
          text: "当前位置-嘉兴市",
          left: "35%",
          top: 160,
          textStyle: {
            color: "#fff",
          },
        },
        geo3D: {
          map: "yls",
          show: false,
          regionHeight: 6,
          zoom: 1,
          left: 0,
          label: {
            show: true,
            distance: 0,
            formatter(param) {
              const city = param.name;
              return `{sty1|${city}}`;
            },
            rich: {
              sty1: {
                color: "#8d0121",
                align: "center",
              },
            },
            textStyle: {
              fontSize: 12,
              color: "#f51c0b",
            },
          },
          viewControl: {
            distance: 110,
            zoomSensitivity: 1,
            panSensitivity: 1,
            rotateSensitivity: 1,
          },
          zlevel: -11,
        },
        series: [
          {
            type: "scatter3D",
            name: "yls",
            coordinateSystem: "geo3D",
            symbol:
              "path://M201.142857 58.514286v658.285714s131.657143-160.914286 336.457143-73.142857c80.457143 43.885714 153.6 109.714286 277.942857 109.714286 124.342857 0 204.8-73.142857 204.8-73.142858V43.885714s-182.857143 182.857143-409.6 29.257143C552.228571 29.257143 449.828571-14.628571 369.371429 7.314286 281.6 29.257143 201.142857 58.514286 201.142857 58.514286M54.857143 1024c-29.257143 0-51.2-21.942857-51.2-58.514286V51.2C3.657143 21.942857 25.6 0 54.857143 0s51.2 21.942857 51.2 51.2v914.285714c7.314286 36.571429-14.628571 58.514286-51.2 58.514286z",
            // symbolSize: 20,
            //http://47.99.127.192:9903/images/%E9%A6%96%E9%A1%B5/u31.svg
            // symbol:
            //   "image://http://47.99.127.192:9903/images/%E9%A6%96%E9%A1%B5/u31.svg",
            symbolSize: 30,
            animation: true,
            zlevel: -8,
            itemStyle: {
              color: "#FF5722",
              opacity: 1,
            },
            label: {
              distance: 20,
            },
            data: linedata,
          },
          {
            name: "yls",
            type: "map3D", // map3D / map
            map: "yls",
            zlevel: -9,
            // regionHeight: 5,
            label: {
              show: true,
              distance: 0,
              formatter(param) {
                const city = param.name;
                return `{sty1|${city}}`;
              },
              rich: {
                sty1: {
                  color: "#02a7f0",
                  align: "center",
                  fontSize: 18,
                  fontWeight: 700,
                },
              },
              // textStyle:{
              //     color:'#f73205'
              // }
            },
            emphasis: {
              // 鼠标 hover 高亮时图形和标签的样式 (当鼠标放上去时 label和itemStyle 的样式)
              label: {
                // label高亮时的配置
                show: true,
                textStyle: {
                  color: "#f73205", // 高亮时标签颜色变为 白色
                  fontSize: 18, // 高亮时标签字体 变大
                },
              },
              itemStyle: {
                color: "#0b7ef5",
                opacity: 0.5,
              },
            },
            groundPlane: {
              //工作台
              // show: true,
            },
            shading: "realistic",
            // shading: "color",
            // realisticMaterial: {
            //   detailTexture: bg, // 纹理贴图
            //   textureTiling: 1, // 纹理平铺，1是拉伸，数字表示纹理平铺次数
            // },
            itemStyle: {
              // 三维地理坐标系组件 中三维图形的视觉属性，包括颜色，透明度，描边等。
              // areaColor: "#000", // 地图板块的颜色
              opacity: 0.6, // 图形的不透明度 [ default: 1 ]
              borderWidth: 2, // (地图板块间的分隔线)图形描边的宽度。加上描边后可以更清晰的区分每个区域 [ default: 0 ]
              borderColor: "#ffffff", // 图形描边的颜色。[ default: #333 ]
            },
            data: map3Ddata,
            viewControl: {
              distance: 130, // 地图视角 控制初始大小
              rotateSensitivity: 1, // 旋转
              zoomSensitivity: 1, // 缩放
            },
          },
          // {
          //   type: "scatter3D",
          //   coordinateSystem: "geo3D",
          //   zlevel: 1,
          //   effect: "symbol",
          //   symbolSize: "7",
          //   rippleEffect: {
          //     period: 6,
          //     brushType: "stroke",
          //     scale: 8,
          //   },
          //   emphasis: {
          //     itemStyle: {
          //       color: "#ff1863",
          //     },
          //     label: {
          //       show: true,
          //     },
          //   },
          //   itemStyle: {
          //     color: "#FF5722",
          //     opacity: 1,
          //   },
          //   data: this.scatter_coord,
          // },
        ],
      };
      myChart.hideLoading();
      myChart.setOption(option);
      myChart.on("click", (res) => {
        var deptId;
        var deptIdEnd;
        this.btnlist3.forEach((item) => {
          if (res.name.indexOf(item.deptName) != -1) {
            deptId = item.rowId;
            deptIdEnd = item.rowIdEnd;
          }
        });
        this.$router.push({
          name: "homeDetail",
          query: {
            areaName: res.name,
            deptId,
            deptIdEnd,
          },
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.spanP {
  border: solid 1px red;
  height: 26px;
  line-height: 26px;
  display: flex;
  justify-content: space-around;
  .spanS1 {
    background: red;
    height: 26px;
    color: #000;
  }
}
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
  height: calc(100% - 90px);
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
  height: calc(100% - 90px);
  z-index: 10;
}
#table_box {
  position: relative;
  height: 375px;
  background-color: transparent;
  overflow: hid den;
  color: #fff;
  border-radius: 5px;
}
#table_box ul {
  padding: 0 !important;
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
  background-color: transparent;
  margin: auto;
  overflow: hidden;
  color: #fff;
  border-radius: 5px;
}
.box ul li {
  line-height: 50px;
  list-style: none;
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
  border: solid 1px #fff;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}

.tab-menu-span:hover {
  border: solid 1px rgb(11, 113, 247);
  border-radius: 5px;
}
.tab-class {
  width: 100%;
}
.tab-list {
  width: 100%;
}

.tab-list-span {
  color: #fff;
  margin: 0 10px;
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
