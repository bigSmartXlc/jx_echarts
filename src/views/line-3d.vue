<template>
  <div class="container">
    <div class="left">
      <ul>
        <li @click="garbageType = 10">
          <div><img src="../assets/images/line/2.png" alt="" srcset="" /></div>
          <div :class="{ typeActive1: garbageType == 10 }">回收</div>
        </li>
        <li @click="garbageType = 20">
          <div><img src="../assets/images/line/5.png" alt="" srcset="" /></div>
          <div :class="{ typeActive2: garbageType == 20 }">有害</div>
        </li>
        <li @click="garbageType = 30">
          <div><img src="../assets/images/line/4.png" alt="" srcset="" /></div>
          <div :class="{ typeActive3: garbageType == 30 }">餐厨</div>
        </li>
        <li @click="garbageType = 31">
          <div><img src="../assets/images/line/4.png" alt="" srcset="" /></div>
          <div :class="{ typeActive4: garbageType == 31 }">厨余</div>
        </li>
        <li @click="garbageType = 32">
          <div><img src="../assets/images/line/4.png" alt="" srcset="" /></div>
          <div :class="{ typeActive5: garbageType == 32 }">生鲜</div>
        </li>
        <li @click="garbageType = 40">
          <div><img src="../assets/images/line/3.png" alt="" srcset="" /></div>
          <div :class="{ typeActive6: garbageType == 40 }">其他</div>
        </li>
        <li @click="garbageType = 70">
          <div><img src="../assets/images/line/4.png" alt="" srcset="" /></div>
          <div :class="{ typeActive7: garbageType == 70 }">大件</div>
        </li>
        <li @click="garbageType = 60">
          <div><img src="../assets/images/line/4.png" alt="" srcset="" /></div>
          <div :class="{ typeActive8: garbageType == 60 }">园林</div>
        </li>
        <li @click="garbageType = 80">
          <div><img src="../assets/images/line/4.png" alt="" srcset="" /></div>
          <div :class="{ typeActive9: garbageType == 80 }">装修</div>
        </li>
      </ul>
    </div>
    <div id="chart-box"></div>
    <div class="rightContainer">
      <div class="right">
        <div class="topbtn">
          <span :class="[{ active: table == 1 }, 'sort']" @click="table = 1"
            >地磅称重</span
          ><span :class="[{ active: table == 2 }, 'sort']" @click="table = 2"
            >车辆载重</span
          >
        </div>
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
  </div>
</template>

<script>
import * as echarts from "echarts/lib/echarts.js";
import "echarts-gl";
import yls_json from "./jx.json";
import VueSeamlessScroll from "vue-seamless-scroll";
export default {
  components: {
    VueSeamlessScroll,
  },
  data() {
    return {
      echarts,
      data: {},
      yls_json,
      table: 1,
      color: [
        "#4d82c1",
        "#c84139",
        "#5ca864",
        "#5ca864",
        "#5ca864",
        "#040404",
        "#da9141",
        "#9ab575",
        "#97885e",
      ],
      garbageType: 10,
      chart: null,
      lines_coord: [],
      scatter_coords: [],
      scatter_coord: [],
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
    garbageType(val) {
      this.getFeixian(val);
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
    this.getFeixian(10);
    // this.getWieght();
    //下钻参考https://blog.csdn.net/qq_23447231/article/details/121928744
    // chart.on("click", function (params) {
    //   console.log(params);
    // });
  },
  methods: {
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
    getFeixian(garbageType) {
      this.$http({
        method: "post",
        url: "api/v1/jky/pjProjectGarbage",
        baseURL: "http://o792k95b.xiaomy.net/",
        data: {
          deptId: "400000000",
          garbageType: garbageType.toString(),
          // garbageType: "40",
          deptIdEnd: "499999999",
        },
      })
        .then((res) => {
          this.lines_coord = [];
          this.scatter_coord = [];
          this.scatter_coords = [];
          if (typeof res.data === "string") {
            var result = eval("(" + res.data + ")").result;
            if (result) {
              Object.values(result).forEach((item) => {
                item.forEach((num) => {
                  if (
                    Number(num.lng) &&
                    Number(num.lat) &&
                    Number(num.factoryLng) &&
                    Number(num.factoryLat)
                  ) {
                    var start = [Number(num.lng), Number(num.lat), 0];
                    var end = [
                      Number(num.factoryLng),
                      Number(num.factoryLat),
                      0,
                    ];
                    var coords = [start, end];
                    this.lines_coord.push({ coords, name: "测试" });
                    this.scatter_coords.push(start, end);
                  }
                });
              });
              let set = new Set(this.scatter_coords);
              //通过Array.from()方法将 set 转化为数组 并赋给新数组
              this.scatter_coord = Array.from(set);
              setTimeout(() => {
                switch (garbageType) {
                  case 10:
                    this.drawFeixian(this.color[0]);
                    break;
                  case 20:
                    this.drawFeixian(this.color[1]);
                    break;
                  case 30:
                    this.drawFeixian(this.color[2]);
                    break;
                  case 31:
                    this.drawFeixian(this.color[3]);
                    break;
                  case 32:
                    this.drawFeixian(this.color[4]);
                    break;
                  case 40:
                    this.drawFeixian(this.color[5]);
                    break;
                  case 70:
                    this.drawFeixian(this.color[6]);
                    break;
                  case 60:
                    this.drawFeixian(this.color[7]);
                    break;
                  case 80:
                    this.drawFeixian(this.color[8]);
                    break;
                  default:
                    this.drawFeixian(this.color[0]);
                    break;
                }
              }, 300);
            }
          } else if (typeof res.data === "object") {
            this.drawFeixian(this.color[0]);
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    drawFeixian(linecolor) {
      let data = yls_json;
      echarts.registerMap("yls", data);
      console.log(this.scatter_coord);
      if (this.chart != null && this.chart != "" && this.chart != undefined) {
        this.chart.dispose(); //销毁
      }
      this.chart = echarts.init(document.getElementById("chart-box"));
      this.chart.showLoading();
      //地市取简称
      // data.features.forEach(v => {
      //     v.properties.name = v.properties.name.indexOf('版纳')>-1 ?v.properties.name.substr(0,4) : v.properties.name.substr(0,2);
      // })

      const option = {
        title: {
          text: "当前位置-嘉兴市",
          left: 100,
          top: 160,
          textStyle: {
            color: "#fff",
          },
        },
        geo3D: {
          map: "yls",
          zoom: 1,
          label: {
            show: true,
            textStyle: {
              fontSize: 12,
              color: "#f51c0b",
            },
          },
          itemStyle: {
            color: "rgba(107,91,237,.7)",
            opacity: 0.1,
            borderWidth: 1.5,
            borderColor: "#0b7ef5",
          },
          emphasis: {
            itemStyle: {
              // color: "#14e9c0",
              opacity: 0.1,
              borderWidth: 1.5,
              borderColor: "#14e9c0",
            },
          },
          viewControl: {
            zoomSensitivity: 0,
            panSensitivity: 0,
            rotateSensitivity: 0,
          },
          zlevel: -11,
        },
        series: [
          //   {
          //     name: "地点",
          //     type: "effectScatter",
          //     coordinateSystem: "geo",
          //     zlevel: 2,
          //     rippleEffect: {
          //       brushType: "stroke",
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
          //     symbolSize: 8,
          //     showEffectOn: "render",
          //     itemStyle: {
          //       normal: {
          //         color: "#46bee9",
          //       },
          //     },
          //     data: coord.slice(0, 3),
          //   },
          // {
          //   type: "effectScatter",
          //   coordinateSystem: "geo",
          //   zlevel: 15,
          //   symbolSize: 12,
          //   rippleEffect: {
          //     period: 6,
          //     brushType: "stroke",
          //     scale: 8,
          //   },
          //   itemStyle: {
          //     color: "#FF5722",
          //     opacity: 1,
          //   },
          //   data: lines_coord.slice(0, 4),
          // },
          // {
          //   type: "lines3D",
          //   coordinateSystem: "geo3D",
          //   zlevel: 15,
          //   effect: {
          //     show: true,
          //     constantSpeed: 80,
          //     symbol: "pin",
          //     symbolSize: 10,
          //     trailLength: 0,
          //   },
          //   lineStyle: {
          //     normal: {
          //       color: new echarts.graphic.LinearGradient(
          //         0,
          //         0,
          //         0,
          //         1,
          //         [
          //           {
          //             offset: 0,
          //             color: "#58B3CC",
          //           },
          //           {
          //             offset: 1,
          //             color: "#F58158",
          //           },
          //         ],
          //         false
          //       ),
          //       width: 2,
          //       opacity: 0.4,
          //       curveness: 0.3,
          //     },
          //   },
          //   // label: {
          //   //   show: true,
          //   //   position: "middle",
          //   //   formatter: (params) => {
          //   //     console.log(params);
          //   //     return params.data.coords[0];
          //   //   },
          //   // },
          //   emphasis: {
          //     lineStyle: {
          //       disabled: false,
          //       color: "#cb7f26",
          //     },
          //   },
          //   data: this.lines_coord,
          // },
          {
            type: "lines3D",
            coordinateSystem: "geo3D",
            zlevel: 100,
            effect: {
              show: true,
              period: 6,
              // constantSpeed: 30,
              trailWidth: 6,
              trailLength: 0.2,
            },
            lineStyle: {
              color: linecolor,
              width: 2,
              opacity: 1,
              curveness: 0.2,
            },
            emphasis: {
              lineStyle: {
                disabled: false,
                color: "#cb7f26",
              },
            },
            data: this.lines_coord,
          },
          {
            type: "scatter3D",
            coordinateSystem: "geo3D",
            zlevel: 1,
            effect: "symbol",
            symbolSize: "7",
            rippleEffect: {
              period: 6,
              brushType: "stroke",
              scale: 8,
            },
            emphasis: {
              itemStyle: {
                color: "#ff1863",
              },
              label: {
                show: true,
              },
            },
            itemStyle: {
              color: "#FF5722",
              opacity: 1,
            },
            data: this.scatter_coord,
          },
        ],
      };
      this.chart.hideLoading();
      this.chart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
}
.typeActive1 {
  color: #4d82c1;
}
.typeActive2 {
  color: #c84139;
}
.typeActive3 {
  color: rgb(135, 247, 199);
}
.typeActive4 {
  color: rgb(135, 247, 199);
}
.typeActive5 {
  color: rgb(135, 247, 199);
}
.typeActive6 {
  color: rgb(5, 5, 5);
}
.typeActive7 {
  color: #da9141;
}
.typeActive8 {
  color: #9ab575;
}
.typeActive9 {
  color: #97885e;
}
.container {
  height: calc(100% - 90px);
  width: 100%;
  .left {
    z-index: 100;
    width: 70px;
    display: inline-block;
    background: rgba(255, 255, 255, 0.13);
    position: absolute;
    left: 0;
    top: 100px;
    margin: 0 10px;
    height: calc(100% - 125px);
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
    display: inline-block;
    position: absolute;
    right: 80px;
    top: -60px;
    width: calc(100% - 100px);
    height: 100%;
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
  .rightContainer {
    width: 25%;
    position: absolute;
    right: 10px;
    height: calc(100% - 100px);
    .right {
      border: solid 1px rgb(11, 100, 233);
      background: rgba(255, 255, 255, 0.2);
      border-radius: 10px;
      z-index: 10;
      height: 100%;
      overflow: hidden;
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
}
</style>
