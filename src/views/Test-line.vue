<template>
  <div class="container">
    <div class="left">
      <ul>
        <li @click="garbageType = 10">
          <div><img src="../assets/images/line/2.png" alt="" srcset="" /></div>
          <div :class="{ typeActive: garbageType == 10 }">回收</div>
        </li>
        <li @click="garbageType = 20">
          <div><img src="../assets/images/line/5.png" alt="" srcset="" /></div>
          <div :class="{ typeActive: garbageType == 20 }">有害</div>
        </li>
        <li @click="garbageType = 30">
          <div><img src="../assets/images/line/4.png" alt="" srcset="" /></div>
          <div :class="{ typeActive: garbageType == 30 }">餐厨</div>
        </li>
        <li @click="garbageType = 31">
          <div><img src="../assets/images/line/4.png" alt="" srcset="" /></div>
          <div :class="{ typeActive: garbageType == 31 }">厨余</div>
        </li>
        <li @click="garbageType = 32">
          <div><img src="../assets/images/line/4.png" alt="" srcset="" /></div>
          <div :class="{ typeActive: garbageType == 32 }">生鲜</div>
        </li>
        <li @click="garbageType = 40">
          <div><img src="../assets/images/line/3.png" alt="" srcset="" /></div>
          <div :class="{ typeActive: garbageType == 40 }">其他</div>
        </li>
        <li @click="garbageType = 70">
          <div><img src="../assets/images/line/4.png" alt="" srcset="" /></div>
          <div :class="{ typeActive: garbageType == 70 }">大件</div>
        </li>
        <li @click="garbageType = 60">
          <div><img src="../assets/images/line/4.png" alt="" srcset="" /></div>
          <div :class="{ typeActive: garbageType == 60 }">园林</div>
        </li>
        <li @click="garbageType = 80">
          <div><img src="../assets/images/line/4.png" alt="" srcset="" /></div>
          <div :class="{ typeActive: garbageType == 80 }">装修</div>
        </li>
      </ul>
    </div>
    <div id="chart-box"></div>
    <div style="width: 30%">
      <div class="topbtn">
        <span :class="[{ active: table == 1 }, 'sort']" @click="table = 1"
          >地磅称重</span
        ><span :class="[{ active: table == 2 }, 'sort']" @click="table = 2"
          >车辆载重</span
        >
      </div>
      <div class="right">
        <ul
          v-show="table == 1"
          class="thead animate__animated animate__flipInY"
        >
          <span style="width: 40px">序号</span>
          <span style="width: 145px">中转站名称</span>
          <span style="width: 80px">车牌</span>
          <span style="width: 110px">来源/去向</span>
          <span style="width: 65px">重量</span>
          <span style="width: 105px">时间</span>
        </ul>
        <ul
          v-show="table == 2"
          class="thead animate__animated animate__flipInY"
        >
          <span style="width: 40px">序号</span>
          <span style="width: 145px">组织机构</span>
          <span style="width: 80px">车牌</span>
          <span style="width: 110px">运输次数</span>
          <span style="width: 65px">运输总重量</span>
          <span style="width: 105px">次均装重量</span>
        </ul>
        <VueSeamlessScroll
          :data="leftBottom"
          :class-option="seamlessScrollOption"
          style="
            overflow: hidden;
            color: white;
            font-size: 18px;
            text-align: center;
          "
        >
          <div class="table">
            <div class="tbody" v-for="(item, index) in leftBottom" :key="index">
              <span style="width: 40px">{{ item.index }}</span>
              <span style="width: 145px">{{ item.position }}</span>
              <span style="width: 80px">{{ item.num }}</span>
              <span style="width: 110px">{{ item.jingdu }}</span>
              <span style="width: 65px">{{ item.wieght }}</span>
              <span style="width: 105px">{{ item.time }}</span>
            </div>
          </div>
        </VueSeamlessScroll>
      </div>
    </div>
    <!-- <div class="core-dynamic-content-container">
      <div class="scroll-wrapper" ref="scroll">
        <div class="scroll-content c1" key="1" v-if="!switcher">
          <div class="scroll-item" v-for="n in nums1" :key="n">{{ n }}</div>
        </div>
        <div class="scroll-content c2" key="2" v-else>
          <div class="scroll-item" v-for="n in nums2" :key="n">
            {{ nums2 - n + 1 }}
          </div>
        </div>
      </div>
      <button class="btn" @click="handleClick">switch content element</button>
    </div> -->
  </div>
</template>

<script>
// import * as echarts from "echarts/lib/echarts.js";
import * as echarts from "echarts";
import "echarts-gl";
import yls_json from "./ljpt_xz";
import VueSeamlessScroll from "vue-seamless-scroll";
import BScroll from "@better-scroll/core";
export default {
  components: {
    VueSeamlessScroll,
  },
  data() {
    return {
      color: [
        "#5470c6",
        "#91cc75",
        "#fac858",
        "#ee6666",
        "#73c0de",
        "#3ba272",
        "#fc8452",
        "#9a60b4",
        "#ea7ccc",
      ],
      nums1: 30,
      nums2: 60,
      switcher: false,
      echarts,
      data: {},
      yls_json,
      table: 1,
      garbageType: 10,
      chart: null,
      lines_coord: [
        [
          [120.732776, 30.728946],
          [120.842186, 30.711139],
        ],
        [
          [120.902273, 30.8996],
          [120.842186, 30.711139],
        ],
        [
          [120.623277, 30.425793],
          [120.842186, 30.711139],
        ],
        [
          [120.709047, 30.764811],
          [120.842186, 30.711139],
        ],
        [
          [120.483541, 30.606055],
          [120.842186, 30.711139],
        ],
        [
          [120.929474, 30.474419],
          [120.842186, 30.711139],
        ],
        [
          [121.103, 30.61039],
          [120.842186, 30.711139],
        ],
        [
          [121.103105, 30.705649],
          [120.842186, 30.711139],
        ],
      ],
      leftBottom: [
        {
          index: 1,
          position: "桐乡市",
          num: 5,
          jingdu: "10%",
          time: "2022-02-08",
          wieght: 900,
        },
        {
          index: 1,
          position: "桐乡市",
          num: 5,
          jingdu: "10%",
          time: "2022-02-08",
          wieght: 900,
        },
        {
          index: 1,
          position: "桐乡市",
          num: 5,
          jingdu: "10%",
          time: "2022-02-08",
          wieght: 900,
        },
        {
          index: 1,
          position: "桐乡市",
          num: 5,
          jingdu: "10%",
          time: "2022-02-08",
          wieght: 900,
        },
        {
          index: 1,
          position: "桐乡市",
          num: 5,
          jingdu: "10%",
          time: "2022-02-08",
          wieght: 900,
        },
        {
          index: 1,
          position: "桐乡市",
          num: 5,
          jingdu: "10%",
          time: "2022-02-08",
          wieght: 900,
        },
        {
          index: 1,
          position: "桐乡市",
          num: 5,
          jingdu: "10%",
          time: "2022-02-08",
          wieght: 900,
        },
        {
          index: 1,
          position: "桐乡市",
          num: 5,
          jingdu: "10%",
          time: "2022-02-08",
          wieght: 900,
        },
        {
          index: 1,
          position: "桐乡市",
          num: 5,
          jingdu: "10%",
          time: "2022-02-08",
          wieght: 900,
        },
        {
          index: 1,
          position: "桐乡市",
          num: 5,
          jingdu: "10%",
          time: "2022-02-08",
          wieght: 900,
        },
        {
          index: 1,
          position: "桐乡市",
          num: 5,
          jingdu: "10%",
          time: "2022-02-08",
          wieght: 900,
        },
      ],
    };
  },
  watch: {
    lines_coord(val) {
      if (val.length > 0) {
        this.drawFeixian();
      }
    },
    garbageType() {
      this.getFeixian();
    },
  },
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
  mounted() {
    this.drawFeixian();
    // this.getFeixian().then(() => {
    //   setTimeout(() => {
    //     this.drawFeixian();
    //     this.init();
    //   }, 1000);
    // });
    // this.getWieght();
  },
  methods: {
    init() {
      this.bs = new BScroll(this.$refs.scroll, {
        probeType: 3,
      });
      this.bs.on("contentChanged", (content) => {
        console.log("--- newContent ---");
        console.log(content);
      });
      this.bs.on("scroll", () => {
        console.log("scrolling-");
      });
      this.bs.on("scrollEnd", () => {
        console.log("scrollingEnd");
      });
    },
    //地磅称重 // 车辆载重
    getWieght() {
      this.$http({
        method: "post",
        url: "api/v1/jky/siBusinessWeight/selectStationJob",
        baseURL: "http://o792k95b.xiaomy.net/",
        data: {
          deptId: "400000000",
          // garbageType: this.garbageType.toString(),
          garbageType: "40",
          start: "2022-05-19",
          end: "2022-06-10",
        },
      }).then((res) => {
        console.log(1, res);
      });
      this.$http({
        method: "post",
        url: "api/v1/jky/vehicleLoadAnalysis/selectVehicleLoadAnalysis",
        baseURL: "http://o792k95b.xiaomy.net/",
        data: {
          deptId: "400000000",
          garbageType: this.garbageType.toString(),
          deptIdEnd: "499999999",
          startTime: "2022-05-19",
        },
      }).then((res) => {
        console.log(2, res);
      });
    },
    //飞线
    async getFeixian() {
      this.$http({
        method: "post",
        url: "api/v1/jky/pjProjectGarbage",
        baseURL: "http://o792k95b.xiaomy.net/",
        data: {
          deptId: "400000000",
          garbageType: this.garbageType.toString(),
          // garbageType: "40",
          deptIdEnd: "499999999",
        },
      })
        .then((res) => {
          this.lines_coord = [];
          if (typeof res.data === "string") {
            var result = eval("(" + res.data + ")").result;
            if (result) {
              Object.values(result).forEach((item) => {
                item.forEach((num) => {
                  if (Number(num.lng) !== 0) {
                    var start = [Number(num.lng), Number(num.lat)];
                    var end = [Number(num.factoryLng), Number(num.factoryLat)];
                    var coords = [start, end];
                    this.lines_coord.push({ coords });
                  }
                });
              });
            }
          } else if (typeof res.data === "object") {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    drawFeixian() {
      let data = yls_json;
      echarts.registerMap("yls", data);
      this.chart = echarts.init(document.getElementById("chart-box"));
      this.chart.showLoading();
      //地市取简称
      const color = [
        "#db1b6b",
        "#9a1bdb",
        "#1bdb33",
        "#dbd51b",
        "#e55009",
        "#3ba272",
        "#fc8452",
        "#9a60b4",
        "#ea7ccc",
      ];
      const coords_data = [];
      data.features.forEach((v) => {
        if (v.properties.centroid) {
          coords_data.push([v.properties.centroid]);
        }
      });
      var series = [];
      this.lines_coord.forEach((item, index) => {
        series.push({
          type: "lines",
          coordinateSystem: "geo",
          symbol: ["none", "circle"],
          zlevel: 15,
          effect: {
            show: true,
            color: color[index % 9],
            constantSpeed: 30,
            symbol: "pin",
            symbolSize: 11,
            trailLength: 0.8,
          },
          lineStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: color[index % 9],
                  },
                  {
                    offset: 1,
                    color: color[index % 9],
                  },
                ],
                false
              ),
              width: 1,
              opacity: 0.1,
              curveness: 0.2,
            },
          },
          emphasis: {
            lineStyle: {
              disabled: false,
              color: "#cb7f26",
            },
          },
          data: [item],
        });
      });
      // coords_data.forEach((item, index) => {
      //   series.push({
      //     name: "地点",
      //     type: "effectScatter",
      //     coordinateSystem: "geo",
      //     colorBy: "data",
      //     zlevel: 2,
      //     rippleEffect: {
      //       brushType: "fill",
      //       color: {
      //         type: "radial",
      //         x: 0.5,
      //         y: 0.5,
      //         r: 0.5,
      //         colorStops: [
      //           {
      //             offset: 0,
      //             color: "#4c502c00", // 0% 处的颜色
      //           },
      //           {
      //             offset: 1,
      //             color: color[index % 9], // 100% 处的颜色
      //           },
      //         ],
      //         global: false, // 缺省为 false
      //       },
      //       // brushType: "fill",
      //       number: 3,
      //       scale: 130 + index * 20,
      //     },
      //     label: {
      //       normal: {
      //         show: true,
      //         formatter: "{b}",
      //         position: "right",
      //         textStyle: {
      //           color: "#fff",
      //           fontSize: 9,
      //         },
      //       },
      //     },
      //     symbolSize: 1,
      //     showEffectOn: "render",
      //     itemStyle: {
      //       normal: {
      //         color: "#bfdd1d",
      //       },
      //     },
      //     data: item,
      //   });
      // });
      const option = {
        title: {
          text: "当前位置-嘉兴市",
          // textAlign: "center",
          textStyle: {
            color: "#fff",
          },
        },
        backgroundColor: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#05153a", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#062959", // 100% 处的颜色
            },
          ],
          globalCoord: false, // 缺省为 false
        },
        geo: {
          map: "yls",
          zoom: 1,
          label: {
            normal: {
              show: true,
              textStyle: {
                fontSize: 12,
                color: "#fff",
              },
            },
            emphasis: {
              show: true,
            },
          },
          itemStyle: {
            normal: {
              areaColor: "#21729a",
              borderColor: "#68ebf0", //线
              borderWidth: 0,
              borderJoin: "round",
              shadowColor: "rgba(18, 216, 250, 1)", //外发光
              shadowOffsetX: -3,
              shadowOffsetY: 5,
              shadowBlur: 2, //图形阴影的模糊大小
            },
            emphasis: {
              areaColor: "#2f9eff",
            },
          },
        },
        series: series,
      };
      this.chart.hideLoading();
      this.chart.setOption(option);
      this.chart.on("click", (res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.core-dynamic-content-container {
  text-align: center;
  .scroll-wrapper {
    height: 300px;
    overflow: hidden;
    .scroll-item {
      height: 50px;
      line-height: 50px;
      font-size: 24px;
      font-weight: bold;
      border-bottom: 1px solid #eee;
      text-align: center;
      &:nth-child(2n) {
        background-color: #f3f5f7;
      }
      &:nth-child(2n + 1) {
        background-color: #42b983;
      }
    }
  }
}
ul {
  list-style: none;
}
.typeActive {
  color: rgb(135, 247, 199);
}
.container {
  display: flex;
  justify-content: space-around;
  height: calc(100% - 90px);
  .left {
    width: 70px;
    background: rgba(255, 255, 255, 0.13);
    border-radius: 5px;
    ul {
      height: 100%;
      padding: 0;
      margin: 0;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      li {
        cursor: pointer;
      }
    }
    img {
      width: 34px;
    }
  }
  #chart-box {
    width: calc(100% - 70px);
  }
  .topbtn {
    margin-bottom: 5px;
    span {
      cursor: pointer;
      display: inline-block;
      width: 100px;
      height: 30px;
      line-height: 30px;
      color: #66bbf9;
    }
  }
  .active {
    border-radius: 8px;
    border: solid 1px #66bbf9;
  }
  .right {
    border: solid 1px rgb(11, 100, 233);
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    z-index: 10;
    height: calc(100% - 37px);
    overflow: hidden;
    position: relative;
    .thead {
      padding: 0;
      display: flex;
      margin: 0;
      justify-content: space-around;
    }
    .thead span {
      display: inline-block;
      text-align: center;
      font-size: 14px;
      font-weight: 700;
      color: #03a7f0;
    }
    .table {
      width: 100%;
      .tbody {
        width: 100%;
        height: 70px;
        line-height: 70px;
        display: flex;
        justify-content: space-around;
        margin-bottom: 3px;
        background: rgba(255, 255, 255, 0.13);
        span {
          font-size: 14px;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
