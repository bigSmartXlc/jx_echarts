<template>
  <div class="home">
    <div class="content">
      <div class="left">
        <div class="left_top">
          <div class="enlargeTitle title_style">规划引领</div>
          <div id="review_box" @click="handleClick($event)">
            <VueSeamlessScroll
              :data="lefttopdata"
              :class-option="seamlessScrollOption"
              style="
                height: 100%;
                overflow: hidden;
                color: white;
                font-size: 18px;
                text-align: center;
              "
            >
              <table class="tbody">
                <tr
                  v-for="(item, index) in lefttopdata"
                  :key="index"
                  :class="{ li_bg: index % 2 == 0, li_bg1: index % 2 == 1 }"
                >
                  <td class="city_container">
                    <div
                      class="l_top_cityname"
                      :data-dept="JSON.stringify(item)"
                    >
                      {{ item.cityName }}
                    </div>
                  </td>
                  <td class="title_container">
                    <div class="l_top_title" :data-dept="JSON.stringify(item)">
                      {{ item.title }}
                    </div>
                  </td>
                </tr>
              </table>
            </VueSeamlessScroll>
          </div>
        </div>
        <div class="left_bottom">
          <div class="enlargeTitle title_style">项目建设</div>
          <div class="map_border">
            <ul class="thead">
              <span style="width: 50px">序号</span>
              <span style="width: 150px">区县</span>
              <span style="width: 70px">项目数</span>
              <span style="width: 150px">完成进度</span>
            </ul>
            <div id="table_box">
              <VueSeamlessScroll
                :data="leftBottom"
                :class-option="seamlessScrollOption"
                style="
                  height: 100%;
                  overflow: hidden;
                  color: white;
                  font-size: 18px;
                  text-align: center;
                "
              >
                <ul>
                  <li v-for="(item, index) in leftBottom" :key="index">
                    <span style="width: 50px">{{ index + 1 }}</span>
                    <span style="width: 150px">
                      <span>{{ item.projectName }}</span></span
                    >
                    <span style="width: 70px">{{ item.projectValue }}</span>
                    <span style="width: 150px">
                      <span
                        :class="{
                          spanP1: parseFloat(item.completionSchedule) < 50,
                          spanP2:
                            parseFloat(item.completionSchedule) >= 50 &&
                            parseFloat(item.completionSchedule) < 80,
                          spanP3: parseFloat(item.completionSchedule) >= 80,
                        }"
                        class="spanP"
                        :style="{
                          backgroundSize:
                            parseFloat(item.completionSchedule) + '%' + ' 15px',
                        }"
                      >
                      </span>
                      <span class="spanS1"
                        >{{ parseFloat(item.completionSchedule) }}%</span
                      >
                    </span>
                  </li>
                </ul>
              </VueSeamlessScroll>
            </div>
          </div>
        </div>
      </div>
      <div class="center">
        <div class="chart-wrapper" id="chart-city"></div>
      </div>
      <div class="right">
        <div class="enlargeTitle title_style right_title">基础资源</div>
        <div class="tab-class map_border">
          <!-- 菜单 -->
          <div class="tab-menu">
            <div
              :class="{ menu_active: tabContent == 2 }"
              class="tab-menu-span"
              @click="tabContentToggle(2)"
            >
              投放
            </div>
            <div
              :class="{ menu_active: tabContent == 3 }"
              class="tab-menu-span"
              @click="tabContentToggle(3)"
            >
              收集
            </div>
            <div
              :class="{ menu_active: tabContent == 4 }"
              class="tab-menu-span"
              @click="tabContentToggle(4)"
            >
              运输
            </div>
            <div
              :class="{ menu_active: tabContent == 5 }"
              class="tab-menu-span"
              @click="tabContentToggle(5)"
            >
              处置
            </div>
          </div>
          <div class="core-dynamic-content-container">
            <div class="scroll-wrapper" ref="scroll">
              <div class="scroll-content" v-show="tabContent === 2">
                <div
                  class="scroll-item animate__animated animate__flipInY"
                  @click="right_item_click(index, item, tabContent)"
                  :class="{
                    active_right_item:
                      active_right_item == index && tabContent === 2,
                  }"
                  v-for="(item, index) in dataList1"
                  :key="index"
                >
                  <span class="name"> {{ item.projectName }}</span
                  ><span class="num">{{ item.projectValueTotal }}</span>
                </div>
              </div>
              <div class="scroll-content" v-show="tabContent === 3">
                <div
                  class="scroll-item animate__animated animate__flipInY"
                  @click="right_item_click(index, item, tabContent)"
                  :class="{
                    active_right_item:
                      active_right_item == index && tabContent === 3,
                  }"
                  v-for="(item, index) in dataList2"
                  :key="index"
                >
                  <span class="name"> {{ item.projectName }}</span
                  ><span class="num">{{ item.projectValueTotal }}</span>
                </div>
              </div>
              <div class="scroll-content" v-show="tabContent === 4">
                <div
                  class="scroll-item animate__animated animate__flipInY"
                  @click="right_item_click(index, item, tabContent)"
                  :class="{
                    active_right_item:
                      active_right_item == index && tabContent === 4,
                  }"
                  v-for="(item, index) in dataList3"
                  :key="index"
                >
                  <span class="name"> {{ item.projectName }}</span
                  ><span class="num">{{ item.projectValueTotal }}</span>
                </div>
              </div>
              <div class="scroll-content" v-show="tabContent === 5">
                <div
                  class="scroll-item animate__animated animate__flipInY"
                  @click="right_item_click(index, item, tabContent)"
                  :class="{
                    active_right_item:
                      active_right_item == index && tabContent === 5,
                  }"
                  v-for="(item, index) in dataList4"
                  :key="index"
                >
                  <span class="name"> {{ item.projectName }}</span>
                  <span class="num">{{ item.projectValueTotal }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="solutionShow" class="solution commom_dialog">
      <div class="dialog__header">
        <div class="header-title">
          <div class="title_left">
            <div class="circleIcon"></div>
            <div class="circleIcon"></div>
            <div class="circleIcon"></div>
            <div class="circleIcon" style="background: rgb(5, 68, 137)"></div>
            <div
              class="circleIcon"
              style="background: rgba(8, 77, 173, 0.58)"
            ></div>
            <div class="circleIcon" style="background: rgb(8, 40, 78)"></div>
          </div>
          <div class="fontStyle">{{ solution_title }}</div>
          <div class="rightIcon"></div>
        </div>
        <!---->
      </div>
      <div class="dialog_body">
        <div class="solutionContent">
          <p class="dialog_prog" v-html="solution"></p>
        </div>
      </div>
      <div class="videoOff" @click="solutionShow = false">关闭</div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import VueSeamlessScroll from "vue-seamless-scroll";
import yls_json from "./ljpt_xz.json";
import json11 from "./mock/1.1.json";
import json12 from "./mock/1.2.json";
import json13 from "./mock/1.3.json";
import json14 from "./mock/1.4.json";
import "echarts-gl";
// import BScroll from "@better-scroll/core";
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
      dataList1: [],
      dataList2: [],
      dataList3: [],
      dataList4: [],
      areaNumList: [],
      solutionShow: false,
      solution: null,
      solution_title: null,
      myChart: null,
      tabContent: 2,
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
      lefttopdata: [],
      leftBottom: [],
      bs: null,
      active_right_item: null,
    };
  },
  mounted() {
    this.map();
    this.planningGuidance();
    this.projectConstruction();
    this.basicResources(2);
  },
  methods: {
    //基础资源
    basicResources(val) {
      this.$http({
        method: "post",
        url: "api/v1/jky/planConstruct/basicResources",
        baseURL: "http://o792k95b.xiaomy.net/",
        data: {
          deptId: "400000000",
          deptIdEnd: "499999999",
          state: val,
        },
      })
        .then((res) => {
          if (val == 2) {
            this.dataList1 = res.data.result;
          } else if (val == 3) {
            this.dataList2 = res.data.result;
          } else if (val == 4) {
            this.dataList3 = res.data.result;
          } else if (val == 5) {
            this.dataList4 = res.data.result;
          }
        })
        .catch(() => {
          var res = json13;
          console.log(res);
          this.dataList1 = res.result;
          this.dataList2 = res.result;
          this.dataList3 = res.result;
          this.dataList4 = res.result;
        });
    },
    //项目建设
    projectConstruction() {
      this.$http({
        method: "post",
        url: "api/v1/jky/planConstruct/projectConstruction",
        baseURL: "http://o792k95b.xiaomy.net/",
        data: {
          deptId: "400000000",
          deptIdEnd: "499999999",
          state: 1,
        },
      })
        .then((res) => {
          this.leftBottom = res.data.result;
          // this.lefttopdata = res.data.result;
        })
        .catch((err) => {
          var res = json12;
          console.log(res);
          this.leftBottom = res.result;
        });
    },
    //地图点位信息查询
    mainpageMapQuantity(item, state) {
      this.$http({
        method: "post",
        url: "api/v1/jky/planConstruct/mainpageMapQuantity",
        baseURL: "http://o792k95b.xiaomy.net/",
        data: {
          deptId: "400000000",
          deptIdEnd: "499999999",
          projectName: item.projectName,
          projectType: item.projectType,
          state: state,
        },
      })
        .then((res) => {
          if (res.data.result) {
            var data = JSON.parse(JSON.stringify(res.data.result));
            data.forEach((item) => {
              this.btnlist3.forEach((n) => {
                if (n.rowId == item.deptId) {
                  item.deptName = n.deptName;
                }
              });
            });
            this.areaNumList = data;
            this.map();
          }
        })
        .catch((err) => {
          var res = json14;
          var data = res.result;
          data.forEach((item) => {
            this.btnlist3.forEach((n) => {
              if (n.rowId == item.deptId) {
                item.deptName = n.deptName;
              }
            });
          });
          this.areaNumList = data;
          this.map();
        });
    },
    // 规划引领
    planningGuidance() {
      this.$http({
        method: "post",
        url: "api/v1/jky/planConstruct/planningGuidance",
        baseURL: "http://o792k95b.xiaomy.net/",
        data: {
          deptId: "400000000",
          deptIdEnd: "499999999",
        },
      })
        .then((res) => {
          this.lefttopdata = res.data.result;
        })
        .catch((err) => {
          var res = json11;
          this.lefttopdata = res.result;
        });
    },
    right_item_click(index, item, tabContent) {
      this.active_right_item = index;
      this.mainpageMapQuantity(item, tabContent);
    },
    tabContentToggle(val) {
      this.basicResources(val);
      this.tabContent = val;
      this.active_right_item = null;
    },
    handleClick(event) {
      //防止重复点击某一条数据
      //获取点击的list对象
      let item = JSON.parse(event.target.dataset.dept);
      this.solution = item.content;
      this.solution_title = item.title;
      this.solutionShow = true;
    },
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
      const map3Ddata = yls_json.features.map((item) => {
        var area_value = 0;
        if (this.areaNumList.length > 0) {
          this.areaNumList.forEach((n) => {
            if (item.properties.name.indexOf(n.deptName) != -1) {
              area_value = n.projectValue;
              if (item.properties.centroid) {
                linedata.push([...item.properties.centroid, area_value]);
              }
            }
          });
        } else {
          linedata.push([...item.properties.centroid, 0]);
        }
        const geoAreaName = item.properties.name; // geo文件中的地理名称
        return {
          name: geoAreaName,
          // value: item.properties.centroid,
          itemStyle: {
            color: [0, 1, 255, 0.2],
          },
        };
      });
      const option = {
        // title: {
        //   text: "当前位置-嘉兴市",
        //   left: "35%",
        //   top: 160,
        //   textStyle: {
        //     color: "#fff",
        //   },
        // },
        geo3D: {
          map: "yls",
          show: false,
          regionHeight: 6,
          zoom: 1,
          left: 0,
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
            symbol: "pin",
            symbolSize: 20,
            animation: true,
            zlevel: -8,
            itemStyle: {
              color: "#FF5722",
              opacity: 1,
            },
            label: {
              show: true,
              distance: 0,
              position: "left",
              formatter(param) {
                const num = param.data[2];
                return `{sty1|${num > 0 ? num : ""}}`;
              },
              rich: {
                sty1: {
                  color: "#fff",
                  fontSize: 26,
                  fontWeight: 700,
                },
              },
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
              distance: 5,
              formatter(param) {
                const city = param.name;
                return `{sty1|${city}}`;
              },
              rich: {
                sty1: {
                  color: "#ffffff",
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
              borderWidth: 2, // (地图板块间的分隔线)图形描边的宽度。加上描边后可以更清晰的区分每个区域 [ default: 0 ]
              borderColor: "#ffffff", // 图形描边的颜色。[ default: #333 ]
            },
            data: map3Ddata,
            viewControl: {
              distance: 110, // 地图视角 控制初始大小
              rotateSensitivity: 1, // 旋转
              zoomSensitivity: 1, // 缩放
            },
          },
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
.title_style {
  margin: 0;
  margin-top: 10px;
  margin-bottom: 5px;
  height: 70px;
  color: #fff;
  font-size: 40px;
  font-weight: 500;
  line-height: 70px;
  background-image: url(../assets/images/u385.svg);
  background-size: cover;
  background-repeat: no-repeat;
  width: 64%;
  text-align: center;
}
.map_border {
  overflow: hidden;
  border: solid 2px #0167dd;
  background: linear-gradient(270deg, #0267d8, #0267d8) 0 0 no-repeat,
    linear-gradient(180deg, #0267d8, #0267d8) 0 0 no-repeat,
    linear-gradient(270deg, #0267d8, #0267d8) 100% 0 no-repeat,
    linear-gradient(180deg, #0267d8, #0267d8) 100% 0 no-repeat,
    linear-gradient(270deg, #0267d8, #0267d8) 0 100% no-repeat,
    linear-gradient(180deg, #0267d8, #0267d8) 0 100% no-repeat,
    linear-gradient(270deg, #0267d8, #0267d8) 100% 100% no-repeat,
    linear-gradient(270deg, #0267d8, #0267d8) 100% 100% no-repeat;
  background-size: 2px 25px, 25px 2px;
}
.chart-wrapper {
  z-index: 1;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.left {
  width: 28%;
  height: 100%;
  text-align: center;
  z-index: 10;
  .left_top {
    height: 50%;
    #review_box {
      height: calc(100% - 80px);
      .tbody {
        margin: 0;
        padding: 0;
        tr {
          cursor: pointer;
          font-size: 14px;
          height: 90px;
          margin: auto;
          td {
            padding: 0 !important;
            border: none;
          }
          .city_container {
            width: 90px;
            .l_top_cityname {
              width: 100%;
              vertical-align: middle;
            }
          }
          .title_container {
            .l_top_title {
              display: -webkit-box; //将对象作为弹性伸缩盒子模型显示。
              -webkit-box-orient: vertical; //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
              -webkit-line-clamp: 2; //限制行数
              overflow: hidden; //超出部分隐藏
              text-overflow: ellipsis; //用一个省略号代替超出的内容
            }
          }
        }
      }
    }
  }
  .left_bottom {
    height: 50%;
    .map_border {
      height: calc(100% - 100px);
    }
    .thead {
      padding: 0;
      margin-left: -80px;
      span {
        display: inline-block;
        text-align: center;
        font-size: 20px;
        font-weight: 700;
        color: #03a7f0;
      }
    }
    #table_box {
      position: relative;
      height: calc(100% - 58px);
      background-color: transparent;
      overflow: hiddden;
      color: #fff;
      border-radius: 5px;
      ul {
        padding: 0 !important;
        margin: 0;
        list-style: none;
        li {
          display: inline-block;
          width: 100%;
          height: 50px;
          margin-bottom: 10px;
          margin-left: -80px;
          span {
            display: inline-block;
            height: 100%;
            vertical-align: top;
          }
        }
      }
      span {
        display: inline-block;
        // text-align: center;
      }
      .spanP {
        display: inline-block;
        width: 120px;
        height: 15px;
        text-align: left;
        background-repeat: no-repeat;
      }
      .spanP1 {
        background-image: url(../assets/images/jingdu2.svg);
      }
      .spanP2 {
        background-image: url(../assets/images/jingdu1.svg);
      }
      .spanP3 {
        background-image: url(../assets/images/jingdu3.svg);
      }
      .spanS1 {
        width: 30px;
      }
    }
  }
}
.center {
  width: 44%;
  z-index: 1;
}
.right {
  width: 28%;
  height: 100%;
  z-index: 10;
  .right_title {
    margin-left: 16%;
  }
  .tab-class {
    width: 100%;
    height: calc(100% - 90px);
    .tab-menu {
      width: 100%;
      height: 40px;
      padding-top: 10px;
      color: #f5f6f8;
      display: flex;
      justify-content: space-around;
      .tab-menu-span {
        width: 80px;
        height: 30px;
        line-height: 30px;
        border-radius: 4px;
        cursor: pointer;
        text-align: center;
      }
    }
    .core-dynamic-content-container {
      text-align: center;
      height: calc(100% - 50px);
      .scroll-wrapper {
        height: 100%;
        overflow: auto;
        .scroll-content {
          color: #fff;
          margin: 0 10px;
          .active_right_item {
            background: rgb(129, 122, 122) !important;
          }
        }
        .scroll-content .name {
          display: inline-block;
          padding-left: 10px;
          font-weight: 800;
          text-align: left;
          width: 45%;
          height: 85px;
        }
        .scroll-content .num {
          display: inline-block;
          font-size: 25px;
          color: #00ece4;
          font-weight: 800;
          text-align: center;
          width: 50%;
          height: 85px;
        }
        .scroll-item {
          font-size: 24px;
          font-weight: bold;
          margin-top: 3px;
          line-height: 85px;
          background: rgba(36, 67, 116, 0.5);
          border-radius: 5px;
          text-align: center;
        }
        .scroll-item::before {
          content: "";
          float: left;
          height: 86px;
          width: 3px;
        }

        .scroll-item:hover {
          background: rgba(36, 67, 116, 0.9) !important;
          &::before {
            background: rgba(11, 138, 180, 0.9) !important;
          }
        }
      }
    }
  }
}

.home {
  height: calc(100% - 90px);
  .content {
    display: flex;
    justify-content: space-between;
    height: 100%;
  }
}

.active {
  background-color: #0c66a5 !important;
}
.li_bg {
  background: rgba(94, 148, 219, 0.5);
}
.li_bg1 {
  background: rgba(17, 49, 87, 0.5);
}
.menu_active {
  border: solid 1px #0c66a5 !important;
}
</style>
